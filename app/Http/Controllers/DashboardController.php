<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $userName = Auth::user()->name;
        $totalOrders = Order::count();
        $totalProducts = Product::count();

        return Inertia::render('Dashboard', [
            'userName' => $userName,
            'totalOrders' => $totalOrders,
            'totalProducts' => $totalProducts
        ]);
    }
}