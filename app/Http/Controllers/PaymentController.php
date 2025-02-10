<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
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
        ]);

        try {
            // Cek apakah produk ada
            $product = Product::findOrFail($request->input('product_id'));

            // Konfigurasi transaksi Midtrans
            $transaction = Snap::createTransaction([
                'transaction_details' => [
                    'order_id' => $request->input('order_id'),
                    'gross_amount' => $product->price,
                ],
                'customer_details' => [
                    'first_name' => $request->input('customer_name', 'Guest'),
                    'email' => $request->input('customer_email', 'guest@example.com'),
                ],
                'item_details' => [
                    [
                        'id' => $product->id,
                        'price' => $product->price,
                        'quantity' => 1,
                        'name' => $product->name,
                        'description' => $product->description, 
                    ]
                ]
            ]);

            // Jika transaksi gagal
            if (!$transaction) {
                throw new \Exception('Failed to create transaction');
            }

            return response()->json(['snap_token' => $transaction->token]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Payment processing failed'], 500);
        }
    }



}
