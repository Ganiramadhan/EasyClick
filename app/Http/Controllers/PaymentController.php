<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Import DB
use Midtrans\Config;
use Midtrans\Snap;

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
        $request->validate([
            'order_id' => 'required|string',
            'product_id' => 'required|integer',
            'discounted_price' => 'required|numeric',
        ]);

        try {
            $product = Product::findOrFail($request->input('product_id'));
            $discountedPrice = $request->input('discounted_price');

            // Konfigurasi transaksi Midtrans
            $transaction = Snap::createTransaction([
                'transaction_details' => [
                    'order_id' => $request->input('order_id'),
                    'gross_amount' => $discountedPrice,
                ],
                'customer_details' => [
                    'first_name' => $request->input('customer_name', 'Guest'),
                    'email' => $request->input('customer_email', 'guest@example.com'),
                ],
                'item_details' => [
                    [
                        'id' => $product->id,
                        'price' => $discountedPrice,
                        'quantity' => 1,
                        'name' => $product->name,
                        'description' => $product->description,
                    ]
                ]
            ]);

            if (!$transaction) {
                throw new \Exception('Failed to create transaction');
            }

            // Jika transaksi sukses, simpan ke tabel orders dan update stok
            DB::transaction(function () use ($request, $product) {
                // Simpan data ke tabel orders
                DB::table('orders')->insert([
                    'order_num' => strtoupper(uniqid('ORD-')),
                    'product_name' => $product->name,
                    'status' => 'paid', 
                    'created_at' => now()->format('Y-m-d H:i:s'), 
                    'updated_at' => now()->format('Y-m-d H:i:s'), 
                ]);
                

                // Update stok produk dan jumlah terjual
                $product->decrement('stock', 1); // Kurangi stok
                $product->increment('sold', 1);  // Tambah jumlah produk terjual
            });

            return response()->json(['snap_token' => $transaction->token]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Payment processing failed'], 500);
        }
    }
}
