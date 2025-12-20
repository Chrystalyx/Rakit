import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

// Ikon SVG (Langsung di-embed agar tidak perlu install library tambahan)
const Icons = {
    Dashboard: () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
        </svg>
    ),
    Materials: () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            ></path>
        </svg>
    ),
    Orders: () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
        </svg>
    ),
    Verification: () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
        </svg>
    ),
    Crafters: () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
        </svg>
    ),
    Menu: () => (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
            ></path>
        </svg>
    ),
    Logout: () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
        </svg>
    ),
};

export default function AdminLayout({ children, user }) {
    const { url } = usePage(); // Untuk mendeteksi halaman aktif
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Daftar Menu Navigasi
    const navigation = [
        { name: "Dashboard", href: "/admin/analytics", icon: Icons.Dashboard },
        { name: "Materials", href: "/admin/materials", icon: Icons.Materials }, // Database harga
        { name: "Orders", href: "/admin/orders", icon: Icons.Orders }, // Kelola proyek & RAB
        {
            name: "Verification",
            href: "/admin/verification",
            icon: Icons.Verification,
        }, // Kurasi Mitra [cite: 42]
        { name: "Crafters", href: "/admin/crafters", icon: Icons.Crafters }, // Daftar Teknisi [cite: 28]
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            {/* --- MOBILE SIDEBAR OVERLAY --- */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* --- SIDEBAR NAVIGATION --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo Area */}
                <div className="flex items-center justify-center h-20 border-b border-gray-100 bg-white">
                    <Link href="/" className="flex items-center gap-2">
                        {/* Logo Icon Rakit Sederhana */}
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            R
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight">
                            Rakit<span className="text-indigo-600">.</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="mt-6 px-4 space-y-1">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Main Menu
                    </p>

                    {navigation.map((item) => {
                        // Cek apakah link ini sedang aktif
                        const isActive = url.startsWith(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 shadow-sm font-semibold"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <span
                                    className={`mr-3 transition-colors ${
                                        isActive
                                            ? "text-indigo-600"
                                            : "text-gray-400 group-hover:text-gray-600"
                                    }`}
                                >
                                    <item.icon />
                                </span>
                                {item.name}

                                {/* Indikator Aktif (Dot kecil di kanan) */}
                                {isActive && (
                                    <span className="ml-auto w-2 h-2 rounded-full bg-indigo-600"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Sidebar (Logout) */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-600 transition-colors rounded-lg hover:bg-red-50 hover:text-red-600 group"
                    >
                        <span className="mr-3 text-gray-400 group-hover:text-red-500">
                            <Icons.Logout />
                        </span>
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header (Mobile Toggle & Title) */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 lg:hidden">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-500 focus:outline-none lg:hidden"
                        >
                            <Icons.Menu />
                        </button>
                        <span className="ml-4 text-lg font-bold text-gray-800">
                            Rakit Admin
                        </span>
                    </div>
                </header>

                {/* Page Content Scrollable */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {/* Breadcrumb / Greeting Area */}
                    <div className="mb-8 flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {navigation.find((n) => url.startsWith(n.href))
                                    ?.name || "Dashboard"}
                            </h2>
                            <p className="text-gray-500">
                                Selamat datang kembali, Admin.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-sm font-medium bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full">
                                {new Date().toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Render Content Anak (Halaman Analytics, dll) */}
                    <div className="animate-fade-in-up">{children}</div>
                </main>
            </div>
        </div>
    );
}
