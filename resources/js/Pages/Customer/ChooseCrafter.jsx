import React, { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
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
    AlertCircle
} from "lucide-react";

function CrafterCard({ data, index, reorderId }) {
    const checkoutLink = reorderId
        ? `/checkout?crafter_id=${data.id}&reorder_id=${reorderId}`
        : `/checkout?crafter_id=${data.id}`;

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
                    <span className={`${data.status === "Available" ? "text-green-600" : "text-red-500"} flex items-center gap-1.5`}>
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {data.status}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 pt-0 flex-grow flex flex-col relative">
                {/* Avatar */}
                <div className="-mt-10 mb-4 flex justify-between items-end">
                    <div className="relative">
                        <img
                            src={data.avatar}
                            alt={data.name}
                            className="w-20 h-20 rounded-2xl border-4 border-white shadow-sm object-cover bg-white"
                        />
                        {data.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white" title="Verified Partner">
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
                        <span className="text-xs text-gray-400 font-medium">({data.reviews} Review)</span>
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
                            <span className="font-bold text-gray-900">{data.projects}</span> Proyek
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Trophy size={16} className="text-yellow-500" />
                            <span className="font-bold text-gray-900">Top Rated</span>
                        </div>
                    </div>
                </div>

                {/* Action Button: Mengarah ke Checkout dengan ID Crafter */}
                {/* Di sini kita bisa kirim ID crafter via URL query param */}
                <Link
                    href={checkoutLink}
                    className="w-full py-3 rounded-xl bg-white border border-rakit-200 text-rakit-800 font-bold flex items-center justify-center gap-2 hover:bg-rakit-800 hover:text-white hover:border-rakit-800 transition-all shadow-sm"
                >
                    Pilih Pengrajin
                    <ArrowRight size={18} />
                </Link>
            </div>
        </motion.div>
    );
}

export default function ChooseCrafter({ crafters, filters }) {
    const { url } = usePage();
    const [search, setSearch] = useState(filters.search || "");
    const [filterLoc, setFilterLoc] = useState(filters.location || "Semua");
    const urlParams = new URLSearchParams(window.location.search);
    const reorderId = urlParams.get('reorder_id');
    const locations = ["Semua", "Bandung", "Jakarta", "Cimahi", "Jepara"];

    const updateParams = (newSearch, newLoc) => {
        const query = {};
        if (newSearch) query.search = newSearch;
        if (newLoc !== "Semua") query.location = newLoc;

        if (reorderId) query.reorder_id = reorderId;

        router.get(route('crafter.choose'), query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => {
        updateParams(search, filterLoc);
    }, [filterLoc]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            updateParams(search, filterLoc);
        }
    };

    return (
        <GuestLayout hideFooter={true}>
            <Head title="Pilih Mitra Pengrajin" />

            <div className="bg-gray-50/50 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {reorderId && (
                        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 text-blue-700 animate-in fade-in slide-in-from-top-4">
                            <AlertCircle className="shrink-0" />
                            <div>
                                <p className="font-bold">Memilih Pengrajin Pengganti</p>
                                <p className="text-sm">Kami menyembunyikan pengrajin yang sebelumnya menolak pesanan ini.</p>
                            </div>
                        </div>
                    )}

                    {/* HEADER */}
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
                                Pilih mitra terverifikasi yang sesuai dengan lokasi proyek Anda.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full md:w-96 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari nama pengrajin..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-rakit-500 focus:ring-1 focus:ring-rakit-500 transition-shadow shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>

                    {/* FILTER TABS */}
                    <div className="mb-10 border-b border-gray-200">
                        <div className="flex gap-8 overflow-x-auto pb-px no-scrollbar">
                            {locations.map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => setFilterLoc(loc)}
                                    className={`whitespace-nowrap pb-4 border-b-2 font-medium text-sm transition-colors ${filterLoc === loc
                                        ? "border-rakit-800 text-rakit-800"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                >
                                    {loc === "Semua" ? "Semua Lokasi" : loc}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* LIST GRID */}
                    {crafters.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {crafters.map((crafter, index) => (
                                <CrafterCard
                                    key={crafter.id}
                                    data={crafter}
                                    index={index}
                                    reorderId={reorderId}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 px-6">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
                                {/* Ganti icon jika konteksnya reorder */}
                                {reorderId ? <AlertCircle size={32} /> : <Search size={28} />}
                            </div>

                            {reorderId ? (
                                <>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Belum ada Pengrajin Tersedia
                                    </h3>
                                    <p className="text-gray-500 max-w-lg mx-auto mb-6">
                                        Tampaknya spesifikasi proyek ini belum menemukan kecocokan dengan mitra kami yang tersedia saat ini.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Link
                                            href="/Customize/Index"
                                            className="px-6 py-2.5 bg-rakit-800 text-white font-bold rounded-xl hover:bg-rakit-900 transition"
                                        >
                                            Buat Pesanan Baru (Ubah Spesifikasi)
                                        </Link>
                                        <Link
                                            href={route('customer.orders.index')}
                                            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                                        >
                                            Kembali ke Pesanan Saya
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold text-gray-900">Pengrajin tidak ditemukan</h3>
                                    <p className="text-gray-500 mt-1">Coba ubah kata kunci atau lokasi pencarian Anda.</p>
                                    <button
                                        onClick={() => { setSearch(""); setFilterLoc("Semua"); }}
                                        className="mt-4 text-rakit-600 font-bold hover:underline"
                                    >
                                        Reset Filter
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}