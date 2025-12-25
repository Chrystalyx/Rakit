import React from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Hammer,
    Briefcase,
    Banknote, // Ikon baru untuk pendapatan
    Star,
    Clock,
    CheckCircle2,
    ChevronRight,
    TrendingUp,
} from "lucide-react";

export default function DashboardCrafter() {
    // Data Dummy Crafter
    const crafter = {
        name: "Budi Santoso",
        level: "Master Crafter",
        rating: 4.8,
        monthly_income: 8500000, // Ganti saldo jadi pendapatan bulanan
        active_projects: 3,
        completed_projects: 42,
    };

    // Data Dummy Proyek
    const activeProjects = [
        {
            id: 1,
            title: "Kitchen Set Minimalis",
            client: "Ibu Sarah",
            deadline: "5 Hari lagi",
            progress: 75,
            status: "Finishing",
        },
        {
            id: 2,
            title: "Lemari Pakaian 3 Pintu",
            client: "Pak Hendra",
            deadline: "12 Hari lagi",
            progress: 30,
            status: "Perakitan",
        },
        {
            id: 3,
            title: "Meja Kerja Industrial",
            client: "Kantor RuangGuru",
            deadline: "20 Hari lagi",
            progress: 10,
            status: "Pembelian Bahan",
        },
    ];

    const newRequests = [
        {
            id: 101,
            title: "Rak TV Gantung",
            budget: "Rp 2.500.000",
            location: "Bandung Kota",
        },
        {
            id: 102,
            title: "Dipan Tempat Tidur Custom",
            budget: "Rp 4.000.000",
            location: "Cimahi",
        },
    ];

    return (
        <GuestLayout>
            <Head title="Dashboard Mitra - Rakit" />

            <div className="min-h-screen bg-rakit-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* --- HEADER SECTION --- */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-rakit-800">
                                    Halo, {crafter.name}
                                </h1>
                                <span className="px-3 py-1 bg-rakit-100 text-rakit-800 text-xs font-bold rounded-full border border-rakit-200 flex items-center gap-1">
                                    <CheckCircle2
                                        size={12}
                                        className="text-rakit-600"
                                    />
                                    {crafter.level}
                                </span>
                            </div>
                            <p className="text-gray-500 mt-1">
                                Semangat berkarya! Anda memiliki{" "}
                                <span className="font-bold text-rakit-600">
                                    {crafter.active_projects} proyek aktif
                                </span>{" "}
                                saat ini.
                            </p>
                        </div>
                        {/* Tombol Upload dihapus, dipindah ke detail */}
                    </div>

                    {/* --- STATS GRID --- */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {/* REVISI: Pendapatan Bulan Ini */}
                        <div className="bg-white p-6 rounded-2xl border border-rakit-200 shadow-sm relative overflow-hidden group hover:border-rakit-300 transition">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-rakit-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-rakit-100"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-gray-500 mb-2">
                                    <Banknote
                                        size={18}
                                        className="text-green-600"
                                    />
                                    <span className="text-sm font-medium">
                                        Pendapatan Bulan Ini
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-rakit-800">
                                    Rp{" "}
                                    {new Intl.NumberFormat("id-ID").format(
                                        crafter.monthly_income
                                    )}
                                </h3>
                                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                    <TrendingUp
                                        size={12}
                                        className="text-green-500"
                                    />{" "}
                                    Target: Rp 10jt
                                </p>
                            </div>
                        </div>

                        {/* Proyek Berjalan */}
                        <div className="bg-white p-6 rounded-2xl border border-rakit-200 shadow-sm group hover:border-rakit-300 transition">
                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                <Hammer size={18} />
                                <span className="text-sm font-medium">
                                    Proyek Berjalan
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-rakit-800">
                                {crafter.active_projects}
                            </h3>
                            <p className="text-xs text-gray-400 mt-2">
                                Fokus utama Anda
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="bg-white p-6 rounded-2xl border border-rakit-200 shadow-sm group hover:border-rakit-300 transition">
                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                <Star size={18} />
                                <span className="text-sm font-medium">
                                    Rating Kualitas
                                </span>
                            </div>
                            <div className="flex items-end gap-2">
                                <h3 className="text-3xl font-bold text-rakit-800">
                                    {crafter.rating}
                                </h3>
                                <div className="flex text-yellow-400 mb-1.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                Pertahankan kualitas!
                            </p>
                        </div>

                        {/* Total Selesai */}
                        <div className="bg-white p-6 rounded-2xl border border-rakit-200 shadow-sm group hover:border-rakit-300 transition">
                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                <Briefcase size={18} />
                                <span className="text-sm font-medium">
                                    Total Selesai
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-rakit-800">
                                {crafter.completed_projects}
                            </h3>
                            <p className="text-xs text-gray-400 mt-2">
                                Proyek seumur hidup
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- LEFT COLUMN: ACTIVE PROJECTS --- */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Alert "Butuh Tindakan" DIHAPUS */}

                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-rakit-100 flex justify-between items-center">
                                    <h3 className="font-bold text-rakit-800 text-lg">
                                        Proyek Sedang Dikerjakan
                                    </h3>
                                </div>
                                <div className="divide-y divide-rakit-100">
                                    {activeProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="p-6 hover:bg-rakit-50 transition flex flex-col md:flex-row justify-between gap-4"
                                        >
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <h4 className="font-bold text-gray-800 text-lg">
                                                        {project.title}
                                                    </h4>
                                                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full h-fit">
                                                        {project.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                                    {project.client}
                                                    <span className="text-gray-300">
                                                        |
                                                    </span>
                                                    <span className="text-red-500 flex items-center gap-1 font-medium bg-red-50 px-2 py-0.5 rounded">
                                                        <Clock size={12} />{" "}
                                                        Deadline{" "}
                                                        {project.deadline}
                                                    </span>
                                                </p>

                                                {/* Progress Bar */}
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                                    <div
                                                        className="bg-rakit-600 h-2.5 rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${project.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-400 font-medium">
                                                    <span>
                                                        Progress:{" "}
                                                        {project.progress}%
                                                    </span>
                                                    <span>Target: 100%</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center">
                                                {/* Tombol DETAIL mengarah ke halaman baru */}
                                                <Link
                                                    href={`/crafter/project/${project.id}`} // Sesuaikan dengan route Anda
                                                    className="px-5 py-2.5 bg-white border border-rakit-300 rounded-xl text-sm font-bold text-rakit-800 hover:bg-rakit-800 hover:text-white hover:border-rakit-800 transition shadow-sm"
                                                >
                                                    Kelola & Update
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: MARKETPLACE --- */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm p-6">
                                <h3 className="font-bold text-rakit-800 text-lg mb-4 flex items-center gap-2">
                                    <Briefcase
                                        size={20}
                                        className="text-rakit-500"
                                    />
                                    Bursa Proyek Baru
                                </h3>
                                <div className="space-y-4">
                                    {newRequests.map((req) => (
                                        <div
                                            key={req.id}
                                            className="p-4 rounded-xl border border-rakit-100 bg-rakit-50/50 hover:border-rakit-300 transition cursor-pointer group"
                                        >
                                            <h4 className="font-bold text-gray-800 group-hover:text-rakit-800 transition">
                                                {req.title}
                                            </h4>
                                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                                <span>{req.location}</span>
                                                <span className="font-bold text-rakit-600">
                                                    {req.budget}
                                                </span>
                                            </div>
                                            <button className="w-full mt-3 py-2 bg-white border border-rakit-200 text-rakit-800 text-xs font-bold rounded-lg hover:bg-rakit-800 hover:text-white transition">
                                                Ambil Penawaran
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 text-sm text-center text-rakit-600 font-medium hover:underline">
                                    Lihat Semua Peluang
                                </button>
                            </div>

                            {/* Pusat Bantuan (Tetap ada) */}
                            <div className="bg-rakit-800 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                                <div className="absolute -right-6 -bottom-6 opacity-10">
                                    <Hammer size={120} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">
                                    Pusat Bantuan Mitra
                                </h3>
                                <p className="text-rakit-200 text-sm mb-4">
                                    Butuh bantuan teknis atau masalah
                                    pembayaran?
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2 cursor-pointer hover:text-rakit-200">
                                        <ChevronRight size={16} /> Panduan
                                        Standar Kualitas
                                    </li>
                                    <li className="flex items-center gap-2 cursor-pointer hover:text-rakit-200">
                                        <ChevronRight size={16} /> Hubungi Admin
                                        Rakit
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
