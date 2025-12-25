<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    // 1. Menampilkan Halaman Utama Chat & Daftar Kontak
// GANTI FUNCTION INDEX() DENGAN INI:
public function index()
{
    $currentUser = Auth::user();
    $myId = $currentUser->id;
    $myRole = $currentUser->role; 

    // Filter: Customer hanya lihat Crafter, Crafter hanya lihat Customer
    $targetRole = match ($myRole) {
        'customer' => ['crafter'],
        'crafter'  => ['customer'],
        default    => ['customer', 'crafter'], // Admin lihat semua
    };

    $contacts = User::whereIn('role', $targetRole)
        ->where('id', '!=', $myId)
        ->get()
        ->map(function ($user) use ($myId) { // Use $myId here
            // Cek pesan terakhir biar list kontak lebih informatif
            $lastMsg = Message::where(function($q) use ($user, $myId) {
                    $q->where('sender_id', $myId)->where('receiver_id', $user->id);
                })
                ->orWhere(function($q) use ($user, $myId) {
                    $q->where('sender_id', $user->id)->where('receiver_id', $myId);
                })
                ->latest()
                ->first();

            return [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'avatar' => substr($user->name, 0, 1),
                'online' => false, 
                'lastMessage' => $lastMsg ? $lastMsg->message : 'Mulai percakapan',
                'time' => $lastMsg ? $lastMsg->created_at->format('H:i') : '',
                'unread' => 0,
            ];
        });

    return Inertia::render('Chat/Index', [
        'contacts' => $contacts,
        'currentUser' => $currentUser // Penting untuk UI ChatBubble nanti
    ]);
}

    // 2. Mengambil Isi Chat dengan User Tertentu (API)
    public function getMessages($userId)
    {
        $myId = Auth::id();

        // Ambil pesan antara SAYA dan DIA (bolak-balik)
        $messages = Message::where(function ($query) use ($myId, $userId) {
            $query->where('sender_id', $myId)
                  ->where('receiver_id', $userId);
        })->orWhere(function ($query) use ($myId, $userId) {
            $query->where('sender_id', $userId)
                  ->where('receiver_id', $myId);
        })
        ->orderBy('created_at', 'asc') // Urutkan dari yang terlama ke terbaru
        ->get()
        ->map(function ($msg) use ($myId) {
            return [
                'id' => $msg->id,
                // Tentukan apakah pesan ini dari "me" (saya) atau "them" (lawan bicara)
                'sender' => $msg->sender_id === $myId ? 'me' : 'them',
                'text' => $msg->message,
                'type' => $msg->type,
                'time' => $msg->created_at->format('H:i'),
                'status' => $msg->read_at ? 'read' : 'sent',
            ];
        });

        return response()->json($messages);
    }

    // 3. Mengirim Pesan Baru (API)
    public function sendMessage(Request $request, $userId)
    {
        // Validasi input
        $request->validate([
            'message' => 'required|string',
        ]);

        // Simpan ke database
        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $userId,
            'message' => $request->message,
            'type' => 'text', // Default text dulu
        ]);

        // Return format yang sama dengan frontend
        return response()->json([
            'id' => $message->id,
            'sender' => 'me',
            'text' => $message->message,
            'time' => $message->created_at->format('H:i'),
            'status' => 'sent',
            'type' => 'text'
        ]);
    }
}