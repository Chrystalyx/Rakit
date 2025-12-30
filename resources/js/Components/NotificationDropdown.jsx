import React, { useState, useEffect, useRef } from "react";
import { Bell, Check, Trash2, ExternalLink } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationDropdown({ isOpen, onToggle }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/notifications");
            setNotifications(res.data.notifications);
            setUnreadCount(res.data.unread_count);
        } catch (error) {
            console.error("Gagal mengambil notifikasi", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id, url) => {
        try {
            await axios.post(`/notifications/${id}/read`);
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read_at: new Date() } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));

            if (url && url !== "#") {
                router.visit(url);
            }
        } catch (error) {
            console.error("Error marking read", error);
        }
    };

    const markAllRead = async () => {
        try {
            await axios.post("/notifications/read-all");
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, read_at: new Date() }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking all read", error);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case "new_order": return "🎉";
            case "payment_success": return "💰";
            case "progress_updated": return "🔨";
            case "chat": return "💬";
            case "rejected": return "❌";
            case "verified": return "✅";
            default: return "📢";
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllRead}
                                    className="text-xs text-rakit-600 hover:text-rakit-800 font-medium flex items-center gap-1 transition-colors"
                                >
                                    <Check size={14} /> Tandai semua dibaca
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {loading ? (
                                <div className="p-4 text-center text-gray-400 text-sm">Memuat...</div>
                            ) : notifications.length === 0 ? (
                                <div className="p-8 text-center flex flex-col items-center text-gray-400">
                                    <Bell size={32} className="mb-2 opacity-20" />
                                    <span className="text-sm">Belum ada notifikasi</span>
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id, notif.url)}
                                        className={`p-4 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50 flex gap-3 ${!notif.read_at ? "bg-blue-50/30" : "bg-white"
                                            }`}
                                    >
                                        <div className="text-2xl">{getIcon(notif.type)}</div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`text-sm ${!notif.read_at ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                                                    {notif.title}
                                                </h4>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                                    {notif.created_at}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                                {notif.message}
                                            </p>
                                        </div>
                                        {!notif.read_at && (
                                            <div className="self-center">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-2 border-t border-gray-100 bg-gray-50/50 text-center">
                            <Link href="/notifications" className="text-xs text-rakit-600 hover:text-rakit-800 font-medium block w-full py-1">
                                Lihat Semua
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}