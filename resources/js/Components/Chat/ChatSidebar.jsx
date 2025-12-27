import React from "react";
import { Search } from "lucide-react";

export default function ChatSidebar({
    contacts,
    activeChat,
    onSelectChat,
    className = "",
}) {
    return (
        <div
            className={`flex flex-col bg-white border-r border-rakit-200 h-full ${className}`}
        >
            {/* Header Sidebar */}
            <div className="p-4 border-b border-rakit-100">
                <h1 className="text-xl font-bold text-rakit-800 mb-4">Pesan</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari nama atau proyek..."
                        className="w-full pl-10 pr-4 py-2 bg-rakit-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rakit-500 transition-shadow"
                    />
                    <Search
                        className="absolute left-3 top-2.5 text-gray-400"
                        size={18}
                    />
                </div>
            </div>

            {/* List Kontak */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {contacts.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        Belum ada kontak tersedia.
                    </div>
                ) : (
                    contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => onSelectChat(contact)}
                            className={`p-4 flex gap-3 cursor-pointer hover:bg-rakit-50 transition border-b border-gray-50 ${
                                activeChat?.id === contact.id
                                    ? "bg-rakit-50 border-l-4 border-l-rakit-600"
                                    : "border-l-4 border-l-transparent"
                            }`}
                        >
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full bg-rakit-200 flex items-center justify-center text-rakit-800 font-bold text-lg uppercase">
                                    {contact.avatar}
                                </div>
                                {/* Status Online (Nanti diurus Reverb) */}
                                {contact.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-gray-900 truncate capitalize">
                                        {contact.name}
                                    </h4>
                                    <span className="text-[10px] text-gray-400">
                                        {contact.time}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                    {contact.lastMessage}
                                </p>
                                <span className="inline-block mt-1 text-[10px] text-rakit-600 bg-rakit-100 px-2 py-0.5 rounded capitalize">
                                    {contact.role}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
