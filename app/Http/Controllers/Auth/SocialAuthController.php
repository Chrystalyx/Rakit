<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();

            $user = User::where('email', $socialUser->getEmail())->first();

            if ($user) {
                $field = $provider . '_id';
                if (!$user->$field) {
                    $user->update([
                        $field => $socialUser->getId(),
                        'avatar' => $user->avatar ?? $socialUser->getAvatar(),
                        'email_verified_at' => now(),
                    ]);
                }
            } else {
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'role' => 'customer',
                    $provider . '_id' => $socialUser->getId(),
                    'avatar' => $socialUser->getAvatar(),
                    'password' => Hash::make(Str::random(16)),
                    'email_verified_at' => now(),
                ]);
            }

            Auth::login($user);

            if ($user->role === 'admin') {
                return redirect()->intended(route('admin.analytics.index', absolute: false));
            }

            if ($user->role === 'crafter') {
                return redirect()->intended(route('crafter.portfolio', absolute: false));
            }

            if ($user->role === 'customer') {
                return redirect()->intended(route('dashboard', absolute: false));
            }

            return redirect()->intended(route('home', absolute: false));
        } catch (\Exception $e) {
            return redirect()->route('login')->with('status', 'Login gagal atau dibatalkan.');
        }
    }
}
