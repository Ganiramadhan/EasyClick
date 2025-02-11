<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Product Admin 
Route::prefix('product')->name('product.')->middleware('auth')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::post('/', [ProductController::class, 'store'])->name('store');
    Route::post('{product}', [ProductController::class, 'update'])->name('update');
    Route::delete('/delete/{product}', [ProductController::class, 'destroy'])->name('product.destroy');
});


// Product User 
Route::get('/products', [UserProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [UserProductController::class, 'show'])->name('products.show');





Route::post('/checkout', [PaymentController::class, 'checkout']);
Route::get('/cart', [PaymentController::class, 'cart']);
