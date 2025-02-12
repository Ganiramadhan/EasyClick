<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class SocialAuthController extends Controller
{
    /**
     * Redirect user to Google login page.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google callback.
     */
    public function handleGoogleCallback()
    {
        // Jika user membatalkan login
        if (request()->has('error') && request()->get('error') === 'access_denied') {
            return redirect('/login')->with('error', 'You have denied Google login permission.');
        }

        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Google login failed. Please try again.');
        }

        // Cari atau buat user baru
        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'password' => Hash::make(uniqid()), 
                'avatar' => $googleUser->getAvatar(),
                'remember_token' => Str::random(60), 
                'email_verified_at' => Carbon::now(), 
            ]
        );

        Auth::login($user);

        return redirect('/dashboard')->with('success', 'Login successful!');
    }
}
