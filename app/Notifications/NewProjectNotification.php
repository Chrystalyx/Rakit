<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProjectNotification extends Notification
{
    use Queueable;

    protected $project;
    protected $customerName;

    public function __construct($project, $customerName)
    {
        $this->project = $project;
        $this->customerName = $customerName;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'title' => 'Pesanan Baru Masuk!',
            'message' => "Anda menerima pesanan baru: '{$this->project->title}' dari {$this->customerName}.",
            'url' => route('crafter.project.detail', $this->project->id),
            'type' => 'project_request'
        ];
    }
}
