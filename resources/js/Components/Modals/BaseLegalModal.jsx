import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function BaseLegalModal({
    isOpen,
    onClose,
    title,
    icon: Icon,
    children,
}) {
    // Kunci scroll body saat modal terbuka
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => (document.body.style.overflow = "unset");
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop Gelap */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Container Modal */}
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            {/* Header */}
                            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white border border-gray-200 rounded-lg text-rakit-800">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {title}
                                    </h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Isi Konten (Scrollable) */}
                            <div className="p-6 overflow-y-auto custom-scrollbar text-sm leading-relaxed text-gray-600 space-y-4">
                                {children}
                            </div>

                            {/* Footer */}
                            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 bg-rakit-800 text-white text-sm font-bold rounded-xl hover:bg-rakit-900 transition shadow-lg shadow-rakit-800/20"
                                >
                                    Saya Mengerti
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
