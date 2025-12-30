<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentNotification extends Notification
{
    use Queueable;

    private $project;
    private $status;

    /**
     * Create a new notification instance.
     */
    public function __construct($project, $status)
    {
        $this->project = $project;
        $this->status = $status;
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
        if ($this->status === 'dp_confirmed') {
            return [
                'title' => 'DP Terkonfirmasi',
                'message' => "DP untuk proyek '{$this->project->title}' telah berhasil dikonfirmasi. Silakan mulai pengerjaan.",
                'url' => route('crafter.project.detail', $this->project->id),
                'type' => 'payment_success'
            ];
        }

        if ($this->status === 'dp_paid') {
            return [
                'title' => 'Pembayaran DP Berhasil',
                'message' => "Pembayaran DP untuk '{$this->project->title}' berhasil dikirim.",
                'url' => route('customer.dashboard'),
                'type' => 'payment_sent'
            ];
        }
    }
}
