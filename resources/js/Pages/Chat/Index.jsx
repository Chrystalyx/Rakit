import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatWindow from "@/Components/Chat/ChatWindow";

export default function ChatIndex({ contacts, currentUser }) {
    // State Chat Aktif
    const [activeChat, setActiveChat] = useState(null);

    return (
        <GuestLayout>
            <Head title="Pesan - Rakit" />

            <div className="h-[calc(100vh-80px)] bg-rakit-50 flex overflow-hidden">
                {/* Sidebar Kontak */}
                <ChatSidebar
                    contacts={contacts}
                    activeChat={activeChat}
                    onSelectChat={setActiveChat}
                    // Responsif: Sembunyikan sidebar di mobile jika sedang buka chat
                    className={`w-full md:w-[350px] ${
                        activeChat ? "hidden md:flex" : "flex"
                    }`}
                />

                {/* Jendela Chat Utama */}
                <ChatWindow
                    activeChat={activeChat}
                    onBack={() => setActiveChat(null)} // Tombol back untuk mobile
                    // Responsif: Sembunyikan window di mobile jika tidak ada chat aktif
                    className={`flex-1 ${
                        !activeChat ? "hidden md:flex" : "flex"
                    }`}
                />
            </div>
        </GuestLayout>
    );
}
