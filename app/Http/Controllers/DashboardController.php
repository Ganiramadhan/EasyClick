<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $totalOrders = Order::count();
        $totalProducts = Product::count();

        return Inertia::render('Dashboard', [
            'totalOrders' => $totalOrders,
            'totalProducts' => $totalProducts
        ]);
    }
}
