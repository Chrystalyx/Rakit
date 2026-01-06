<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\ProjectRejection;
use App\Notifications\ProjectNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'crafter_id' => 'nullable|exists:users,id',
            'budget' => 'nullable|numeric',
            'deadline' => 'nullable|date',
            'address' => 'nullable|string',
        ]);

        $project = Project::create([
            'customer_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => 'pending',
            'crafter_id' => $request->crafter_id,
            'total_amount' => $request->budget ?? 0,
            'end_date' => $request->deadline,
            'address' => $request->address,
            'progress' => 0,
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->notify(new ProjectNotification($project, 'submitted'));

        if ($project->crafter_id) {
            $crafter = User::find($project->crafter_id);
            if ($crafter) {
                $crafter->notify(new ProjectNotification($project, 'new_order'));
            }
        }

        return redirect()->route('customer.dashboard')->with('success', 'Proyek berhasil diajukan!');
    }

    public function accept($id)
    {
        $project = Project::findOrFail($id);

        if ($project->crafter_id !== Auth::id()) {
            abort(403, 'Anda tidak memiliki akses untuk menerima proyek ini.');
        }

        $project->update(['status' => 'pending_payment']);

        $customer = User::find($project->customer_id);
        if ($customer) {
            $customer->notify(new ProjectNotification($project, 'accepted'));
        }

        return back()->with('success', 'Proyek diterima. Menunggu pembayaran DP dari Customer.');
    }

    public function reject(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $project = Project::findOrFail($id);

        if ($project->crafter_id !== Auth::id()) {
            abort(403);
        }

        ProjectRejection::create([
            'project_id' => $project->id,
            'crafter_id' => Auth::id(),
            'reason' => $request->reason
        ]);

        $project->update([
            'status' => 'rejected',
            'reject_reason' => $request->reason
        ]);

        $project->customer->notify(new ProjectNotification($project, 'rejected', $request->reason));

        return redirect()->back();
    }

    public function updateProgress(Request $request, $id)
    {
        $request->validate([
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $project = Project::findOrFail($id);

        if ($project->crafter_id !== Auth::id()) {
            abort(403);
        }

        $project->update([
            'progress' => $request->progress,
            'updated_at' => now(),
        ]);

        if ($request->progress == 100) {
            $project->update(['status' => 'completed']);
        }

        $customer = User::find($project->customer_id);
        if ($customer) {
            $customer->notify(new ProjectNotification($project, 'progress_updated'));
        }

        return back()->with('success', 'Progress berhasil diupdate.');
    }
}
