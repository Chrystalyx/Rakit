import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown, Bell } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import NotificationDropdown from "@/Components/NotificationDropdown";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const { auth } = usePage().props;
    const user = auth.user;

    const navLinks = useMemo(() => {
        if (!user) {
            return [
                { name: "Beranda", href: "/" },
                { name: "Rakit Kabinet", href: "/Customize/Index" },
                { name: "Pengrajin", href: "/crafters" },
            ];
        }

        if (user.role === "crafter") {
            return [
                { name: "Portofolio", href: "/crafter/portfolio" },
                { name: "Rakit Kabinet", href: "/Customize/Index" },
                { name: "Project List", href: "/crafter/projectlist" },
                { name: "History Transaksi", href: "/transactions" },
            ];
        }

        return [
            { name: "Beranda", href: "/dashboard" },
            { name: "Rakit Kabinet", href: "/Customize/Index" },
            { name: "Pengrajin", href: "/crafters" },
            { name: "Lihat Progress", href: "#" },
            { name: "History Transaksi", href: "/transactions" },
        ];
    }, [user]);

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

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
                        <Link href="/">
                            <img
                                src="/images/RakitLogo.png"
                                alt="Rakit Logo"
                                className="w-14 h-14 rounded-2xl object-contain shadow-lg shadow-rakit-800/10 bg-white p-1"
                            />
                        </Link>
                        <Link href="/" className="text-2xl font-bold text-rakit-800 tracking-tight">
                            RAKIT
                        </Link>
                    </div>

                    {/* Desktop Navigation (Dinamis) */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`hover:text-rakit-500 transition-colors relative group ${route().current(item.href) ? "text-rakit-800 font-bold" : ""
                                    }`}
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rakit-500 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth / User Dropdown */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                {/* --- NOTIFIKASI (Hanya muncul jika user login) --- */}
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown("notification")}
                                        className="p-2 text-gray-600 hover:text-rakit-800 hover:bg-rakit-200 rounded-full transition relative"
                                    >
                                        <Bell size={20} />
                                        {/* Menggunakan data unread dari Global Shared Props (HandleInertiaRequests) */}
                                        {auth.unread_notifications_count > 0 && (
                                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
                                        )}
                                    </button>

                                    <NotificationDropdown
                                        isOpen={activeDropdown === "notification"}
                                        onToggle={() => toggleDropdown("notification")}
                                    />
                                </div>
                                {/* --------------------------------------------- */}

                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown("profile")}
                                        className="flex items-center gap-2 text-sm font-semibold text-rakit-800 hover:text-rakit-600 transition focus:outline-none pl-2 border-l border-gray-300 ml-1"
                                    >
                                        <span>Halo, {user.name}</span>
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-200 ${activeDropdown === "profile" ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Profile */}
                                    <AnimatePresence>
                                        {activeDropdown === "profile" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50"
                                            >
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-rakit-50 hover:text-rakit-600 transition"
                                                >
                                                    <User size={16} />
                                                    Profile
                                                </Link>

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
                            </>
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
                    <div className="md:hidden flex items-center gap-3">
                        {/* Notifikasi Mobile (Hanya jika login) */}
                        {user && (
                            <Link
                                href="/notifications"
                                className="relative p-2 text-rakit-800"
                            >
                                <Bell size={22} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </Link>
                        )}

                        <button
                            className="p-2 text-rakit-800"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-rakit-100 border-b border-rakit-300 overflow-hidden sticky top-[88px] z-40"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {/* Render Menu Dinamis di Mobile */}
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

                            <div className="flex flex-col gap-3">
                                {user ? (
                                    <div className="space-y-3">
                                        <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
                                            Akun ({user.name})
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
                                            Keluar
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