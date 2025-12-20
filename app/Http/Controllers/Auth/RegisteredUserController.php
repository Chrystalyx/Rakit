<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CrafterProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:20',
            'role' => 'required|string|in:customer,crafter',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'ktp_number' => 'required_if:role,crafter|nullable|numeric|digits:16',
            'address' => 'required_if:role,crafter|nullable|string|max:500',
        ]);

        $dbRole = $request->role === 'crafter' ? 'crafter' : 'customer';

        DB::transaction(function () use ($request, $dbRole) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone,
                'role' => $dbRole,
                'password' => Hash::make($request->password),
            ]);

            if ($dbRole === 'crafter') {
                CrafterProfile::create([
                    'user_id' => $user->id,
                    'ktp_number' => $request->ktp_number,
                    'address' => $request->address,
                ]);
            }

            event(new Registered($user));

            Auth::login($user);
        });

        return redirect(route('dashboard', absolute: false));
    }
}
