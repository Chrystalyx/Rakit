import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import ChatWindow from "@/Components/Chat/ChatWindow";

export default function ChatIndex({ contacts, currentUser }) {
    const [activeChat, setActiveChat] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const chatWithId = params.get("chat_with");

        if (chatWithId) {
            const targetContact = contacts.find(
                (c) => c.id === parseInt(chatWithId)
            );
            if (targetContact) {
                setActiveChat(targetContact);
            }
        }
    }, [contacts]);

    return (
        <GuestLayout>
            <Head title="Pesan - Rakit" />

            <div className="h-[calc(100vh-80px)] bg-rakit-50 flex overflow-hidden">
                {/* Sidebar */}
                <ChatSidebar
                    contacts={contacts}
                    activeChat={activeChat}
                    onSelectChat={(contact) => {
                        setActiveChat(contact);
                        window.history.replaceState(null, "", "/chat");
                    }}
                    className={`w-full md:w-[350px] ${activeChat ? "hidden md:flex" : "flex"
                        }`}
                />

                {/* Chat Window */}
                {activeChat ? (
                    <ChatWindow
                        activeChat={activeChat}
                        currentUser={currentUser}
                        onBack={() => setActiveChat(null)}
                        className="flex-1 flex"
                    />
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-white">
                        <div className="text-center">
                            <p className="text-lg font-medium">Pilih percakapan untuk memulai chat</p>
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}