import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Clock, BellOff } from "lucide-react";

export default function NotificationDropdown({ isOpen, onToggle }) {
    // Data Dummy
    const notifications = [
        {
            id: 1,
            title: "Pesanan Dikonfirmasi",
            message: "Pesanan lemari custom #ORD-001 telah diterima pengrajin.",
            time: "Baru saja",
            unread: true,
            type: "order",
        },
        {
            id: 2,
            title: "Menunggu Pembayaran",
            message: "Selesaikan pembayaran untuk pesanan Kitchen Set Anda.",
            time: "1 jam lalu",
            unread: true,
            type: "payment",
        },
        {
            id: 3,
            title: "Promo Spesial",
            message: "Diskon 10% untuk pembuatan meja kerja minimalis.",
            time: "1 hari lalu",
            unread: false,
            type: "promo",
        },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;
    const hasNotification = unreadCount > 0;

    return (
        <div className="relative z-50">
            {/* --- BUTTON LONCENG --- */}
            <button
                className={`relative p-2 rounded-full transition-all duration-200 group ${
                    isOpen
                        ? "bg-rakit-100 text-rakit-900"
                        : "text-rakit-800 hover:bg-rakit-50"
                }`}
                onClick={onToggle}
            >
                {/* ICON: Tetap warna gelap (text-rakit-800) */}
                <Bell
                    size={20}
                    className={`transition-transform group-hover:scale-105 ${
                        hasNotification
                            ? "fill-current text-rakit-800"
                            : "text-rakit-800"
                    }`}
                />

                {/* BADGE: Warna HIJAU */}
                {hasNotification && (
                    <span className="absolute top-1.5 right-2 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-white"></span>
                    </span>
                )}
            </button>

            {/* --- DROPDOWN CONTENT --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-80 sm:w-[400px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden origin-top-right ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h3 className="font-bold text-gray-900 text-[15px]">
                                Notifikasi
                            </h3>
                            {hasNotification && (
                                <button className="text-xs font-semibold text-black hover:text-rakit-900 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                                    <Check size={14} /> Tandai dibaca
                                </button>
                            )}
                        </div>

                        {/* List Item */}
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-white">
                            {notifications.length > 0 ? (
                                <div>
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4 relative group ${
                                                // REVISI: Background putih bersih (agar tidak terlalu banyak hijau)
                                                // Hanya bold text untuk membedakan
                                                notif.unread
                                                    ? "bg-white"
                                                    : "bg-white opacity-60"
                                            }`}
                                        >
                                            {/* Indikator Garis Kiri (HIJAU untuk unread) */}
                                            {notif.unread && (
                                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-green-500 rounded-r-full"></div>
                                            )}

                                            {/* Bullet Status (HIJAU untuk unread) */}
                                            <div className="mt-1.5 shrink-0 relative">
                                                {notif.unread ? (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/30 ring-2 ring-white"></div>
                                                ) : (
                                                    // Kalau sudah dibaca, abu-abu pudar
                                                    <div className="w-2 h-2 rounded-full bg-gray-200 mt-0.5 ml-0.5"></div>
                                                )}
                                            </div>

                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h4
                                                        className={`text-[14px] leading-snug ${
                                                            notif.unread
                                                                ? "font-bold text-gray-900"
                                                                : "font-medium text-gray-600"
                                                        }`}
                                                    >
                                                        {notif.title}
                                                    </h4>
                                                    <span className="text-[11px] text-gray-400 flex items-center gap-1 shrink-0 pt-0.5 font-medium">
                                                        <Clock
                                                            size={11}
                                                            className="text-gray-300"
                                                        />{" "}
                                                        {notif.time}
                                                    </span>
                                                </div>
                                                <p
                                                    className={`text-[13px] leading-relaxed line-clamp-2 ${
                                                        notif.unread
                                                            ? "text-gray-600"
                                                            : "text-gray-400"
                                                    }`}
                                                >
                                                    {notif.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Empty State (Dipercantik)
                                <div className="px-8 py-16 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                        <BellOff size={28} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-gray-900 font-medium text-sm">
                                        Tidak ada notifikasi
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        Belum ada aktivitas terbaru untuk
                                        ditampilkan.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
