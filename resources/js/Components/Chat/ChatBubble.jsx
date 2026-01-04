import React from "react";
import { Check, CheckCheck } from "lucide-react";

export default function ChatBubble({ message }) {
    const isMe = message.sender === "me";

    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm relative text-sm ${isMe
                        ? "bg-rakit-800 text-white rounded-br-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                    }`}
            >
                {/* Tipe Pesan: Gambar (Persiapan fitur masa depan) */}
                {message.type === "image" && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                        <img
                            src={message.content}
                            alt="Attachment"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Isi Pesan Teks */}
                <p className="leading-relaxed whitespace-pre-wrap">
                    {message.text}
                </p>

                {/* Metadata (Waktu & Status) */}
                <div
                    className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${isMe ? "text-rakit-200" : "text-gray-400"
                        }`}
                >
                    <span>{message.time}</span>
                    {isMe && (
                        <span>
                            {message.status === "read" ? (
                                <CheckCheck
                                    size={14}
                                    className="text-blue-300"
                                />
                            ) : (
                                <Check size={14} />
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
