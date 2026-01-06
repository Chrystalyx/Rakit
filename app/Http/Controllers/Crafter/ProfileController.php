<?php

namespace App\Http\Controllers\Crafter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\CrafterProfile;

class ProfileController extends Controller
{
    public function updateAvatar(Request $request)
    {
        $request->validate(['avatar' => 'required|image|max:2048']);
        $user = Auth::user();

        $profile = CrafterProfile::firstOrCreate(['user_id' => $user->id]);

        if ($request->hasFile('avatar')) {
            if ($profile->photo_path && Storage::disk('public')->exists(str_replace('/storage/', '', $profile->photo_path))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $profile->photo_path));
            }

            $path = $request->file('avatar')->store('crafters/avatars', 'public');

            $profile->update(['photo_path' => '/storage/' . $path]);

            $user->update(['avatar' => '/storage/' . $path]);
        }

        return back()->with('success', 'Foto profil diperbarui');
    }

    public function updateCover(Request $request)
    {
        $request->validate([
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ]);

        $user = Auth::user();
        $profile = CrafterProfile::firstOrCreate(['user_id' => $user->id]);

        if ($request->hasFile('cover')) {
            if ($profile->cover_image && str_contains($profile->cover_image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $profile->cover_image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('cover')->store('crafters/covers', 'public');

            $profile->update([
                'cover_image' => '/storage/' . $path
            ]);
        }

        return back()->with('success', 'Sampul berhasil diperbarui');
    }

    public function updateBio(Request $request)
    {
        $request->validate(['bio' => 'required|string']);

        CrafterProfile::updateOrCreate(
            ['user_id' => Auth::id()],
            ['bio' => $request->bio]
        );

        return back()->with('success', 'Bio berhasil diperbarui');
    }
}
