import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Search,
    MapPin,
    Star,
    ShieldCheck,
    Filter,
    ArrowRight,
    Hammer,
    User,
} from "lucide-react";

// --- KOMPONEN KARTU PENGRAJIN (PERSONAL STYLE) ---
const CrafterCard = ({ crafter }) => {
    return (
        <div className="group bg-white rounded-2xl border border-rakit-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
            {/* 1. COVER IMAGE (PORTFOLIO UTAMA) - UKURAN FIXED */}
            <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                {crafter.portfolios && crafter.portfolios.length > 0 ? (
                    <img
                        src={crafter.portfolios[0].image}
                        alt="Karya Pengrajin"
                        // Class object-cover memastikan gambar mengisi area tanpa gepeng
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-rakit-50">
                        <Hammer size={32} className="mb-2 opacity-30" />
                    </div>
                )}

                {/* Overlay Gradient biar teks diatasnya terbaca (opsional) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
            </div>

            {/* 2. PROFIL & INFO (PERSONAL FEEL) */}
            <div className="px-5 pb-5 pt-0 flex-1 flex flex-col relative">
                {/* Avatar Pengrajin (Numpang di atas Cover) */}
                <div className="-mt-10 mb-3 flex justify-between items-end">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                            {/* Menggunakan Placeholder Avatar jika tidak ada foto */}
                            <div className="w-full h-full bg-rakit-100 flex items-center justify-center text-rakit-700 font-bold text-2xl">
                                {crafter.avatar ? (
                                    <img
                                        src={crafter.avatar}
                                        alt={crafter.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    crafter.name.charAt(0)
                                )}
                            </div>
                        </div>
                        {crafter.is_verified && (
                            <div
                                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white"
                                title="Terverifikasi"
                            >
                                <ShieldCheck size={12} fill="currentColor" />
                            </div>
                        )}
                    </div>

                    {/* Badge Level (Di sebelah kanan avatar) */}
                    <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                            crafter.level === "ahli"
                                ? "bg-purple-100 text-purple-700 border border-purple-200"
                                : crafter.level === "menengah"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : "bg-green-100 text-green-700 border border-green-200"
                        }`}
                    >
                        {crafter.level}
                    </span>
                </div>

                {/* Nama & Lokasi */}
                <div className="mb-3">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:text-rakit-800 transition">
                        {crafter.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={14} className="text-rakit-500" />
                        {crafter.address}
                    </p>
                </div>

                {/* Statistik Singkat */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-5 pb-5 border-b border-gray-50 border-dashed">
                    <div className="flex items-center gap-1.5">
                        <Star
                            size={16}
                            className="text-yellow-400 fill-yellow-400"
                        />
                        <span className="font-bold text-gray-900">
                            {crafter.rating}
                        </span>
                        <span className="text-gray-400 text-xs">Rating</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div>
                        <span className="font-bold text-gray-900">
                            {crafter.projects_count}
                        </span>
                        <span className="text-gray-400 text-xs ml-1">
                            Proyek
                        </span>
                    </div>
                </div>

                {/* Tombol Action */}
                <div className="mt-auto">
                    <Link
                        href={`/crafter/${crafter.id}`}
                        className="group/btn flex items-center justify-between w-full py-2.5 px-4 bg-gray-50 hover:bg-rakit-800 text-gray-600 hover:text-white rounded-xl transition-all duration-300 font-medium text-sm"
                    >
                        <span>Lihat Profil</span>
                        <ArrowRight
                            size={16}
                            className="text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function CrafterList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("all");

    // DATA DUMMY (Updated agar lebih personal)
    const allCrafters = [
        {
            id: 1,
            name: "Pak Joko Susilo",
            level: "ahli",
            address: "Jepara, Jawa Tengah",
            rating: 4.9,
            is_verified: true,
            projects_count: 42,
            avatar: null, // Nanti akan jadi inisial "P"
            portfolios: [
                {
                    id: 1,
                    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=500&h=400&auto=format&fit=crop",
                },
            ],
        },
        {
            id: 2,
            name: "Kang Asep",
            level: "menengah",
            address: "Bandung, Jawa Barat",
            rating: 4.5,
            is_verified: true,
            projects_count: 15,
            avatar: null,
            portfolios: [
                {
                    id: 2,
                    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500&h=400&auto=format&fit=crop",
                },
            ],
        },
        {
            id: 3,
            name: "Dimas Anggara",
            level: "pemula",
            address: "Surabaya, Jawa Timur",
            rating: 4.2,
            is_verified: false,
            projects_count: 3,
            avatar: null,
            portfolios: [
                {
                    id: 3,
                    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=500&h=400&auto=format&fit=crop",
                },
            ],
        },
        {
            id: 4,
            name: "Hendra Gunawan",
            level: "ahli",
            address: "Jakarta Selatan",
            rating: 5.0,
            is_verified: true,
            projects_count: 89,
            avatar: null,
            portfolios: [
                {
                    id: 4,
                    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=500&h=400&auto=format&fit=crop",
                },
            ],
        },
        {
            id: 5,
            name: "Rian Hidayat",
            level: "menengah",
            address: "Yogyakarta",
            rating: 4.6,
            is_verified: true,
            projects_count: 22,
            avatar: null,
            portfolios: [],
        },
    ];

    const filteredCrafters = allCrafters.filter((crafter) => {
        const matchesSearch =
            crafter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crafter.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel =
            selectedLevel === "all" || crafter.level === selectedLevel;
        return matchesSearch && matchesLevel;
    });

    return (
        <GuestLayout>
            <Head title="Cari Pengrajin - Rakit" />

            <div className="min-h-screen bg-rakit-50/50">
                {/* --- HERO SECTION (REVISED) --- */}
                {/* Padding Top besar (pt-24) agar tidak mepet header */}
                <div className="bg-white pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-rakit-100">
                    <div className="max-w-5xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Temukan{" "}
                            <span className="text-rakit-600">
                                Tangan Terampil
                            </span>{" "}
                            untuk
                            <br className="hidden md:block" /> Mewujudkan Ide
                            Furnitur Anda
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
                            Terhubung langsung dengan pengrajin lokal
                            terverifikasi. Dari pengerjaan kayu klasik hingga
                            desain modern minimalis.
                        </p>

                        {/* Search Bar (Lebih Rapi & Menyatu) */}
                        <div className="max-w-2xl mx-auto relative shadow-lg shadow-rakit-900/5 rounded-2xl">
                            <div className="bg-white p-2 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 relative flex items-center">
                                    <Search
                                        className="absolute left-4 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cari nama pengrajin (mis: Pak Joko) atau kota..."
                                        className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder:text-gray-400"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                                <button className="bg-rakit-800 hover:bg-rakit-900 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                                    Cari Pengrajin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Filter Tabs */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h2 className="text-xl font-bold text-gray-900">
                            Daftar Pengrajin
                        </h2>

                        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                            {[
                                { id: "all", label: "Semua" },
                                { id: "ahli", label: "Ahli" },
                                { id: "menengah", label: "Menengah" },
                                { id: "pemula", label: "Pemula" },
                            ].map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => setSelectedLevel(level.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                        selectedLevel === level.id
                                            ? "bg-rakit-100 text-rakit-800"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid Crafters */}
                    {filteredCrafters.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredCrafters.map((crafter) => (
                                <CrafterCard
                                    key={crafter.id}
                                    crafter={crafter}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="inline-flex bg-gray-100 p-4 rounded-full mb-4">
                                <Search size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Pengrajin tidak ditemukan
                            </h3>
                            <p className="text-gray-500">
                                Coba gunakan kata kunci lain atau ubah filter
                                level.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
