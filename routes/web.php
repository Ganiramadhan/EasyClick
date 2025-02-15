<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\UserProductController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Halaman Not Found (404)
Route::fallback(function () {
    return Inertia::render('NotFound', [
        'status' => 404,
    ]);
});

Route::get('/', [UserProductController::class, 'index'])->name('products.index');


// Dashboard & Admin Routes (hanya untuk admin)
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    // Dashboard Admin
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Admin
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Product Admin
    Route::prefix('product')->name('product.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::post('{product}', [ProductController::class, 'update'])->name('update');
        Route::delete('/delete/{product}', [ProductController::class, 'destroy'])->name('destroy');
    });

    // Orders Admin
    Route::prefix('order')->name('order.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::delete('/delete/{order}', [OrderController::class, 'destroy'])->name('destroy');
    });
});

// OAuth Google
Route::get('/auth/google/redirect', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

// Product User (akses umum)
// Route::get('/products', [UserProductController::class, 'index'])->name('products.index');
// Route::get('/products/{product}', [UserProductController::class, 'show'])->name('products.show');

// Payment & Cart (akses umum)
Route::post('/checkout', [PaymentController::class, 'checkout']);
Route::get('/cart', [PaymentController::class, 'cart']);

require __DIR__.'/auth.php';
