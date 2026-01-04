import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
    Send,
    Paperclip,
    MoreVertical,
    ChevronLeft,
    Loader2,
} from "lucide-react";
import ChatBubble from "./ChatBubble";

export default function ChatWindow({ activeChat, onBack, className = "" }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (activeChat?.id) {
            setLoading(true);
            setMessages([]);

            axios
                .get(`/chat/messages/${activeChat.id}`)
                .then((response) => {
                    setMessages(response.data);
                    setLoading(false);
                    scrollToBottom();
                })
                .catch((error) => {
                    console.error("Gagal mengambil pesan:", error);
                    setLoading(false);
                });
        }
    }, [activeChat?.id]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const tempId = Date.now();

        const tempMsg = {
            id: tempId,
            sender: "me",
            text: newMessage,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            status: "sending",
        };

        setMessages((prev) => [...prev, tempMsg]);

        const messageToSend = newMessage;
        setNewMessage("");

        axios
            .post(`/chat/messages/${activeChat.id}`, { message: messageToSend })
            .then((response) => {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === tempId ? response.data : msg
                    )
                );
            })
            .catch((error) => {
                console.error("Gagal mengirim pesan:", error);
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === tempId ? { ...msg, status: "failed" } : msg
                    )
                );
            });
    };

    if (!activeChat) {
        return (
            <div
                className={`flex-1 flex flex-col items-center justify-center bg-rakit-50 text-gray-400 ${className}`}
            >
                <div className="w-16 h-16 bg-rakit-100 rounded-full flex items-center justify-center mb-4">
                    <Send size={32} className="text-rakit-300 ml-1" />
                </div>
                <p>Pilih percakapan untuk memulai</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full bg-[#f0eadd]/30 relative ${className}`}>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-rakit-200 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-3">
                    {/* Tombol Back untuk Mobile */}
                    <button
                        onClick={onBack}
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="w-10 h-10 rounded-full bg-rakit-800 text-white flex items-center justify-center font-bold text-lg uppercase">
                        {activeChat.avatar || activeChat.name.charAt(0)}
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900">
                            {activeChat.name}
                        </h3>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                            Online
                        </p>
                    </div>
                </div>

                <div className="flex gap-1">
                    <button className="p-2 text-gray-400 hover:text-rakit-800 hover:bg-rakit-50 rounded-full transition">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Area (List Pesan) */}
            <div
                className="flex-1 overflow-y-auto p-4 custom-scrollbar"
                style={{
                    backgroundImage: "radial-gradient(#d6d1cb 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            >
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin text-rakit-500" />
                    </div>
                ) : (
                    <>
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 text-sm mt-10">
                                Belum ada pesan. Sapa {activeChat.name} sekarang!
                            </div>
                        )}

                        {messages.map((msg) => (
                            <ChatBubble key={msg.id} message={msg} />
                        ))}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-rakit-200">
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-end gap-2 max-w-4xl mx-auto"
                >
                    <button
                        type="button"
                        className="p-3 text-gray-400 hover:text-rakit-600 hover:bg-rakit-50 rounded-xl transition"
                    >
                        <Paperclip size={20} />
                    </button>

                    <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-rakit-500 focus-within:border-transparent transition-all">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                            placeholder="Ketik pesan anda..."
                            className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-4 max-h-32 resize-none text-gray-800 placeholder:text-gray-400"
                            rows="1"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3 bg-rakit-800 text-white rounded-xl hover:bg-rakit-900 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-rakit-800/20"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}