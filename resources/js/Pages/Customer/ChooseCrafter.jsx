import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Search,
    MapPin,
    Star,
    ShieldCheck,
    Trophy,
    Briefcase,
    ArrowRight,
    Users,
} from "lucide-react";

// --- DUMMY DATA PENGRAJIN (Sama seperti sebelumnya) ---
const CRAFTERS = [
    {
        id: 1,
        name: "Workshop Kayu Jati",
        location: "Bandung, Jawa Barat",
        rating: 4.9,
        reviews: 120,
        projects: 342,
        verified: true,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
        cover: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80",
        status: "Available",
    },
    {
        id: 2,
        name: "Berkah Furniture",
        location: "Cimahi, Jawa Barat",
        rating: 4.7,
        reviews: 85,
        projects: 156,
        verified: true,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
        cover: "https://images.unsplash.com/photo-1505693416388-b0346efee958?w=800&q=80",
        status: "Busy",
    },
    {
        id: 3,
        name: "Creative Woodworks",
        location: "Jakarta Selatan",
        rating: 4.8,
        reviews: 210,
        projects: 500,
        verified: true,
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=faces",
        cover: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80",
        status: "Available",
    },
    {
        id: 4,
        name: "Sentra Mebel Jepara",
        location: "Jepara, Jawa Tengah",
        rating: 5.0,
        reviews: 45,
        projects: 89,
        verified: false,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
        cover: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
        status: "Available",
    },
];

export default function ChooseCrafter() {
    const [search, setSearch] = useState("");
    const [filterLoc, setFilterLoc] = useState("Semua");

    // Filter Logic
    const filteredCrafters = CRAFTERS.filter((crafter) => {
        const matchSearch =
            crafter.name.toLowerCase().includes(search.toLowerCase()) ||
            crafter.specialties.some((s) =>
                s.toLowerCase().includes(search.toLowerCase())
            );
        const matchLoc =
            filterLoc === "Semua" || crafter.location.includes(filterLoc);
        return matchSearch && matchLoc;
    });

    const locations = ["Semua", "Bandung", "Jakarta", "Cimahi", "Jepara"];

    return (
        <GuestLayout hideFooter={true}>
            <Head title="Pilih Mitra Pengrajin" />

            <div className="bg-gray-50/50 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* --- HEADER CLEAN & SEARCH --- */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-rakit-600 font-medium text-sm">
                                <Users size={18} />
                                <span>Langkah 2: Pilih Eksekutor</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Temukan Pengrajin Terbaik
                            </h1>
                            <p className="text-gray-500 mt-2 max-w-xl">
                                Pilih mitra terverifikasi yang sesuai dengan
                                lokasi proyek Anda.
                            </p>
                        </div>

                        {/* Search Bar yang Rapi */}
                        <div className="w-full md:w-96 relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Cari nama atau keahlian..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-rakit-500 focus:ring-1 focus:ring-rakit-500 transition-shadow shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* --- FILTER TABS --- */}
                    <div className="mb-10 border-b border-gray-200">
                        <div className="flex gap-8 overflow-x-auto pb-px no-scrollbar">
                            {locations.map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => setFilterLoc(loc)}
                                    className={`whitespace-nowrap pb-4 border-b-2 font-medium text-sm transition-colors ${
                                        filterLoc === loc
                                            ? "border-rakit-800 text-rakit-800"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    {loc === "Semua" ? "Semua Lokasi" : loc}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- LIST GRID --- */}
                    {filteredCrafters.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCrafters.map((crafter, index) => (
                                <CrafterCard
                                    key={crafter.id}
                                    data={crafter}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 border-dashed">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Search size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Tidak ditemukan
                            </h3>
                            <p className="text-gray-500 mt-1">
                                Coba ubah kata kunci atau filter lokasi Anda.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}

// --- SUB-COMPONENT: CARD PENGRAJIN (Revisi sedikit agar lebih clean) ---
function CrafterCard({ data, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-rakit-900/5 hover:border-rakit-300 transition-all duration-300 flex flex-col h-full"
        >
            {/* Cover Image */}
            <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img
                    src={data.cover}
                    alt="Cover Workshop"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Badge Status */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    <span
                        className={`${
                            data.status === "Available"
                                ? "text-green-600"
                                : "text-red-500"
                        } flex items-center gap-1.5`}
                    >
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {data.status === "Available" ? "Available" : "Busy"}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 pt-0 flex-grow flex flex-col relative">
                {/* Avatar (Overlapping) */}
                <div className="-mt-10 mb-4 flex justify-between items-end">
                    <div className="relative">
                        <img
                            src={data.avatar}
                            alt={data.name}
                            className="w-20 h-20 rounded-2xl border-4 border-white shadow-sm object-cover bg-white"
                        />
                        {data.verified && (
                            <div
                                className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white"
                                title="Verified Partner"
                            >
                                <ShieldCheck size={12} />
                            </div>
                        )}
                    </div>
                    {/* Rating */}
                    <div className="flex flex-col items-end mb-1">
                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
                            <Star size={18} fill="currentColor" />
                            {data.rating}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                            ({data.reviews} Review)
                        </span>
                    </div>
                </div>

                {/* Info Utama */}
                <div className="mb-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-rakit-800 transition-colors mb-1">
                        {data.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <MapPin size={14} />
                        {data.location}
                    </div>
                </div>

                {/* Stats Divider */}
                <div className="mt-auto border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Briefcase size={16} className="text-rakit-500" />
                            <span className="font-bold text-gray-900">
                                {data.projects}
                            </span>{" "}
                            Proyek
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Trophy size={16} className="text-yellow-500" />
                            <span className="font-bold text-gray-900">
                                Top Rated
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <Link
                    href="/checkout" // Update link ke halaman checkout
                    className="w-full py-3 rounded-xl bg-white border border-rakit-200 text-rakit-800 font-bold flex items-center justify-center gap-2 hover:bg-rakit-800 hover:text-white hover:border-rakit-800 transition-all shadow-sm"
                >
                    Pilih Pengrajin
                    <ArrowRight size={18} />
                </Link>
            </div>
        </motion.div>
    );
}
