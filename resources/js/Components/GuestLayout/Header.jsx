import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // ArrowRight dihapus jika tidak dipakai di button baru

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Beranda", href: "#" },
        { name: "Rakit Kabinet", href: "#" },
        { name: "Pengrajin", href: "#" },
        { name: "Lihat Progress", href: "#" },
        { name: "History Transaksi", href: "#" },
        { name: "Tentang Kami", href: "#" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="sticky top-0 z-50 bg-rakit-100/90 backdrop-blur-md border-b border-rakit-300"
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/RakitLogo.png"
                            alt="Rakit Logo"
                            className="w-14 h-14 rounded-2xl object-contain shadow-lg shadow-rakit-800/10 bg-white p-1"
                        />
                        <span className="text-2xl font-bold text-rakit-800 tracking-tight">
                            RAKIT
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        {navLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="hover:text-rakit-500 transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rakit-500 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons (Login & Register) */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Tombol Login */}
                        <a
                            href="/login"
                            className="text-sm font-semibold text-rakit-800 hover:text-rakit-500 transition-colors"
                        >
                            Masuk
                        </a>

                        {/* Tombol Register */}
                        <a
                            href="/register"
                            className="px-6 py-2.5 rounded-xl bg-rakit-800 text-white text-sm font-semibold hover:bg-rakit-900 transition shadow-lg shadow-rakit-800/10"
                        >
                            Daftar
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-rakit-800"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-rakit-100 border-b border-rakit-300 overflow-hidden sticky top-[88px] z-40" // top disesuaikan sedikit jika perlu
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block text-rakit-800 font-medium text-lg hover:text-rakit-500"
                                >
                                    {item.name}
                                </a>
                            ))}

                            <hr className="border-rakit-300 my-4" />

                            {/* Mobile Auth Buttons */}
                            <div className="flex flex-col gap-3">
                                <a
                                    href="/login"
                                    className="block w-full text-center px-6 py-3 rounded-xl border border-rakit-800 text-rakit-800 font-semibold hover:bg-rakit-200 transition"
                                >
                                    Masuk
                                </a>
                                <a
                                    href="/register"
                                    className="block w-full text-center px-6 py-3 rounded-xl bg-rakit-800 text-white font-semibold hover:bg-rakit-900 transition shadow-lg"
                                >
                                    Daftar Sekarang
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
