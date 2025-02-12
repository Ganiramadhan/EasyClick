<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Midtrans\Config;
use Midtrans\Snap;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'total_price' => 'required|numeric|min:0',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:products,id',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1'
        ]);

        try {
            $products = Product::whereIn('id', collect($validated['items'])->pluck('id'))->get();

            foreach ($validated['items'] as $item) {
                $product = $products->where('id', $item['id'])->first();
                if (!$product || $product->stock < $item['quantity']) {
                    return response()->json(['error' => "Produk {$product->name} stok tidak mencukupi"], 400);
                }
            }

            $itemDetails = [];
            foreach ($validated['items'] as $item) {
                $product = $products->where('id', $item['id'])->first();
                $itemDetails[] = [
                    'id' => $product->id,
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'name' => $product->name
                ];
            }

            $transaction = Snap::createTransaction([
                'transaction_details' => [
                    'order_id' => strtoupper(uniqid('ORD-')),
                    'gross_amount' => $validated['total_price'],
                ],
                'customer_details' => [
                    'first_name' => $validated['customer_name'],
                    'email' => $validated['customer_email'],
                ],
                'item_details' => $itemDetails
            ]);

            if (!$transaction) {
                throw new \Exception('Failed to create transaction');
            }

            DB::transaction(function () use ($products, $validated, $transaction) {
                $order = Order::create([
                    'user_id' => 22, 
                    'order_num' => strtoupper(uniqid('ORD-')),
                    'total_price' => $validated['total_price'],
                    'status' => 'paid'
                ]);

                foreach ($validated['items'] as $item) {
                    $product = $products->where('id', $item['id'])->first();

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $item['quantity'],
                        'price' => $item['price']
                    ]);

                    $product->decrement('stock', $item['quantity']);
                    $product->increment('sold', $item['quantity']);
                }
            });

            return response()->json([
                'snap_token' => $transaction->token
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Payment processing failed', 'message' => $e->getMessage()], 500);
        }
    }

    public function cart()
    {
        return Inertia::render('UserProducts/Cart');
    }
}
