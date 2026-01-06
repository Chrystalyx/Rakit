<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectNotification extends Notification
{
    use Queueable;

    private $project;
    private $type;
    private $reason;

    /**
     * Create a new notification instance.
     */
    public function __construct($project, $type, $reason = null)
    {
        $this->project = $project;
        $this->type = $type;
        $this->reason = $reason;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable)
    {
        $data = [
            'project_id' => $this->project->id,
            'type' => $this->type,
        ];

        switch ($this->type) {
            case 'new_order':
                $data['title'] = 'Proyek Baru Masuk!';
                $data['message'] = "Customer {$this->project->customer->name} mengajukan proyek: {$this->project->title}";
                $data['url'] = route('crafter.project.detail', $this->project->id);
                break;

            case 'reminder_update':
                $data['title'] = 'Jangan Lupa Update Progress';
                $data['message'] = "Proyek '{$this->project->title}' belum di-update dalam 3 hari.";
                $data['url'] = route('crafter.project.detail', $this->project->id);
                break;

            case 'submitted':
                $data['title'] = 'Proyek Berhasil Diajukan';
                $data['message'] = "Proyek '{$this->project->title}' menunggu respon Crafter.";
                $data['url'] = route('customer.orders.index');
                break;

            case 'accepted':
                $data['title'] = 'Proyek Diterima!';
                $data['message'] = "Crafter telah menerima proyek '{$this->project->title}'. Silakan lakukan pembayaran DP.";
                $data['url'] = route('customer.orders.show', $this->project->id);
                break;

            case 'rejected':
                $data['title'] = 'Tawaran Ditolak';
                $reasonMsg = $this->reason ? " Alasan: \"{$this->reason}\"" : "";
                $data['message'] = "Mohon maaf, Crafter menolak proyek '{$this->project->title}'.{$reasonMsg}. Silakan pilih pengrajin lain.";
                $data['url'] = route('customer.orders.index');
                break;

            case 'progress_updated':
                $data['title'] = 'Progress Proyek Update';
                $data['message'] = "Ada update terbaru pada pengerjaan '{$this->project->title}'.";
                $data['url'] = route('customer.orders.show', $this->project->id);
                break;
        }

        return $data;
    }
}
