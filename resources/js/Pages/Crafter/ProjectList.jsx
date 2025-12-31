import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import toast, { Toaster } from "react-hot-toast";
import BursaModal from "@/Components/Modals/BursaModal";
import {
    Hammer,
    Briefcase,
    Banknote,
    Star,
    Clock,
    CheckCircle2,
    TrendingUp,
    MapPin,
} from "lucide-react";

export default function ProjectList({ crafter, activeProjects, newRequests }) {
    // --- STATE UNTUK MODAL ---
    const [selectedRequest, setSelectedRequest] = useState(null);

    // --- HANDLERS ---
    const handleOpenModal = (req) => {
        setSelectedRequest(req);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    const handleAccept = () => {
        // Disini nanti logika backend (Inertia.post)
        toast.success(
            "Proyek berhasil diambil! Silakan cek tab 'Proyek Berjalan'.",
            {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
                iconTheme: {
                    primary: "#10B981",
                    secondary: "#FFFAEE",
                },
            }
        );
        handleCloseModal();
    };

    const handleReject = () => {
        toast.error("Penawaran proyek ditolak.", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        });
        handleCloseModal();
    };

    return (
        <GuestLayout hideFooter={true}>
            <Head title="Dashboard Mitra - Rakit" />
            <Toaster position="top-center" reverseOrder={false} />

            <div className="min-h-screen bg-rakit-50 py-12 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* --- HEADER SECTION --- */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-rakit-800">
                                    Halo, {crafter?.name}
                                </h1>
                                <span className="px-3 py-1 bg-rakit-100 text-rakit-800 text-xs font-bold rounded-full border border-rakit-200 flex items-center gap-1 uppercase">
                                    <CheckCircle2
                                        size={12}
                                        className="text-rakit-600"
                                    />
                                    {crafter?.level || "Mitra"}
                                </span>
                            </div>
                            <p className="text-gray-500 mt-1">
                                Semangat berkarya! Anda memiliki{" "}
                                <span className="font-bold text-rakit-600">
                                    {crafter?.active_projects || 0} proyek aktif
                                </span>{" "}
                                saat ini.
                            </p>
                        </div>
                    </div>

                    {/* --- STATS GRID --- */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {/* Pendapatan Bulan Ini */}
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
                                        crafter?.monthly_income || 0
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
                                {crafter?.active_projects || 0}
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
                                    {crafter?.rating || 0}
                                </h3>
                                <div className="flex text-yellow-400 mb-1.5">
                                    <Star size={14} fill="currentColor" />
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
                                {crafter?.completed_projects || 0}
                            </h3>
                            <p className="text-xs text-gray-400 mt-2">
                                Proyek yang telah anda selesaikan
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- LEFT COLUMN: ACTIVE PROJECTS --- */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-rakit-100 flex justify-between items-center">
                                    <h3 className="font-bold text-rakit-800 text-lg">
                                        Proyek Sedang Dikerjakan
                                    </h3>
                                </div>
                                <div className="divide-y divide-rakit-100">
                                    {activeProjects &&
                                    activeProjects.length > 0 ? (
                                        activeProjects.map((project) => (
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
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                                        <div
                                                            className="bg-rakit-600 h-2.5 rounded-full transition-all duration-500"
                                                            style={{
                                                                width: `${project.progress}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Link
                                                        href={`/crafter/project/${project.id}`}
                                                        className="px-5 py-2.5 bg-white border border-rakit-300 rounded-xl text-sm font-bold text-rakit-800 hover:bg-rakit-800 hover:text-white hover:border-rakit-800 transition shadow-sm"
                                                    >
                                                        Kelola & Update
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6 text-center text-gray-500">
                                            Belum ada proyek aktif.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: MARKETPLACE (BURSA PROYEK BARU) --- */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm p-6 sticky top-6">
                                <h3 className="font-bold text-rakit-800 text-lg mb-4 flex items-center gap-2">
                                    <Briefcase
                                        size={20}
                                        className="text-rakit-500"
                                    />{" "}
                                    Bursa Proyek Baru
                                </h3>
                                <div className="space-y-4">
                                    {newRequests && newRequests.length > 0 ? (
                                        newRequests.map((req) => (
                                            <div
                                                key={req.id}
                                                onClick={() =>
                                                    handleOpenModal(req)
                                                }
                                                className="p-4 rounded-xl border border-rakit-100 bg-rakit-50/50 hover:border-rakit-300 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                                            >
                                                <div className="flex justify-between items-start relative z-10">
                                                    <h4 className="font-bold text-gray-800 group-hover:text-rakit-800 transition line-clamp-2">
                                                        {req.title}
                                                    </h4>
                                                    <span className="shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1.5 animate-pulse"></span>
                                                </div>

                                                <div className="flex justify-between text-sm text-gray-500 mt-2 relative z-10">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={12} />{" "}
                                                        {req.location}
                                                    </span>
                                                    <span className="font-bold text-rakit-600">
                                                        {req.budget}
                                                    </span>
                                                </div>

                                                <button className="w-full mt-3 py-2 bg-white border border-rakit-200 text-rakit-800 text-xs font-bold rounded-lg group-hover:bg-rakit-800 group-hover:text-white transition relative z-10">
                                                    Lihat Detail
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <p className="text-sm text-gray-500">
                                                Belum ada permintaan baru.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MEMANGGIL MODAL DARI COMPONENT TERPISAH --- */}
                <BursaModal
                    isOpen={!!selectedRequest}
                    onClose={handleCloseModal}
                    request={selectedRequest}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            </div>
        </GuestLayout>
    );
}
