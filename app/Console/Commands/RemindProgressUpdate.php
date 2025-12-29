<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Project;
use App\Notifications\ProjectNotification;
use Carbon\Carbon;

class RemindProgressUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:remind-progress';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ingatkan crafter jika belum update progress > 3 hari';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $projects = Project::where('status', 'on_progress')
            ->where('updated_at', '<', Carbon::now()->subDays(3))
            ->get();

        foreach ($projects as $project) {
            if ($project->crafter) {
                $project->crafter->notify(new ProjectNotification($project, 'reminder_update'));
                $this->info("Reminder sent to {$project->crafter->name}");
            }
        }
    }
}
