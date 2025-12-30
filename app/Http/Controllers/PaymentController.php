<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Notifications\PaymentNotification;
use App\Notifications\ProjectNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function pay(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->notify(new ProjectNotification($project, 'dp_paid'));

        return back()->with('success', 'Bukti pembayaran terkirim. Menunggu konfirmasi.');
    }

    public function confirm($id)
    {
        $project = Project::findOrFail($id);

        $project->update(['status' => 'on_progress']);

        if ($project->crafter_id) {
            $crafter = User::find($project->crafter_id);
            if ($crafter) {
                $crafter->notify(new PaymentNotification($project, 'dp_confirmed'));
            }
        }

        return back()->with('success', 'Pembayaran dikonfirmasi. Proyek dimulai.');
    }
}
