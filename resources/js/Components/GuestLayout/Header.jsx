import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth.user;

    const navLinks = [
        {
            name: "Beranda",
            href: user?.role === 'customer' ? "/customer/dashboard" : "/dashboard"
        },
        { name: "Rakit Kabinet", href: "/Customize/Index" },
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
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:text-rakit-500 transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rakit-500 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth / User Dropdown */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 text-sm font-semibold text-rakit-800 hover:text-rakit-600 transition focus:outline-none"
                                >
                                    <span>Hello, {user.name}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Dropdown Content */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1"
                                        >
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-rakit-50 hover:text-rakit-600 transition"
                                            >
                                                <User size={16} />
                                                Profile
                                            </Link>

                                            {/* Tombol Logout harus method="post" di Laravel */}
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition text-left"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold text-rakit-800 hover:text-rakit-500 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2.5 rounded-xl bg-rakit-800 text-white text-sm font-semibold hover:bg-rakit-900 transition shadow-lg shadow-rakit-800/10"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
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
                        className="md:hidden bg-rakit-100 border-b border-rakit-300 overflow-hidden sticky top-[88px] z-40"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block text-rakit-800 font-medium text-lg hover:text-rakit-500"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <hr className="border-rakit-300 my-4" />

                            {/* Mobile Auth Buttons */}
                            <div className="flex flex-col gap-3">
                                {user ? (
                                    // Mobile View: Jika Login
                                    <div className="space-y-3">
                                        <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
                                            Account ({user.name})
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 w-full px-6 py-3 rounded-xl border border-rakit-800 text-rakit-800 font-semibold hover:bg-rakit-200 transition"
                                        >
                                            <User size={18} />
                                            Profile
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold hover:bg-red-100 transition"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="block w-full text-center px-6 py-3 rounded-xl border border-rakit-800 text-rakit-800 font-semibold hover:bg-rakit-200 transition"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="block w-full text-center px-6 py-3 rounded-xl bg-rakit-800 text-white font-semibold hover:bg-rakit-900 transition shadow-lg"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}