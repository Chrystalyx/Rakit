<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CrafterProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\SystemNotification;

class VerificationController extends Controller
{
    public function index()
    {
        $crafters = User::where('role', 'crafter')
            ->whereHas('crafterProfile', function ($query) {
                $query->where('is_verified', false);
            })
            ->with('crafterProfile')
            ->latest()
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id' => $user->crafterProfile->id,
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone_number,
                    'created_at' => $user->created_at->format('d M Y'),
                    'ktp_number' => $user->crafterProfile->ktp_number ?? '-',
                    'address' => $user->crafterProfile->address ?? '-',
                ];
            });

        return Inertia::render('Admin/Verification/index', [
            'crafters' => $crafters
        ]);
    }

    public function approve($id)
    {
        $profile = CrafterProfile::with('user')->findOrFail($id);
        $profile->update(['is_verified' => true]);

        if ($profile->user) {
            $profile->user->notify(new SystemNotification([
                'title' => 'Akun Terverifikasi!',
                'message' => 'Selamat! Akun Anda telah diverifikasi oleh Admin. Anda sekarang bisa menerima proyek.',
                'url' => route('crafter.dashboard'),
                'type' => 'verified'
            ]));
        }

        return back()->with('success', 'Crafter berhasil diverifikasi.');
    }
}
