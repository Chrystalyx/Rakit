<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CrafterProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
                    'id' => $user->id,
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
        $user = User::findOrFail($id);

        if ($user->crafterProfile) {
            $user->crafterProfile->update([
                'is_verified' => true,
                'status' => 'active'
            ]);
        } else {
            CrafterProfile::create([
                'user_id' => $user->id,
                'is_verified' => true,
                'level' => 'pemula'
            ]);
        }

        return redirect()->back()->with('success', 'Mitra berhasil diverifikasi.');
    }
}
