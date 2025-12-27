import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Clock,
    MapPin,
    CheckCircle2,
    Circle,
    Camera,
    UploadCloud,
    Ruler,
    Layers,
    MessageSquare,
    Banknote,
    X,
} from "lucide-react";

// Import ChatWindow untuk dipasang di Modal
import ChatWindow from "@/Components/Chat/ChatWindow";

// --- KOMPONEN KECIL: BARIS SPESIFIKASI ---
const SpecRow = ({ label, value, className = "" }) => (
    <div
        className={`flex justify-between items-start py-3 border-b border-dashed border-gray-100 last:border-0 ${className}`}
    >
        <span className="text-sm text-gray-500 font-medium">{label}</span>
        <span className="text-sm font-bold text-gray-800 text-right max-w-[60%]">
            {value}
        </span>
    </div>
);

// --- KOMPONEN MODAL CHAT (PERBAIKAN TOTAL UI) ---
const ChatModal = ({ isOpen, onClose, activeChat }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                // 1. Container Utama: Fixed Fullscreen + Flexbox Centering (Stabil)
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
                    {/* 2. Backdrop Gelap */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* 3. Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        // Responsive Layout:
                        // Mobile: w-full h-full (Fullscreen)
                        // Desktop (sm ke atas): w-full max-w-2xl h-[600px] rounded-2xl
                        className="relative w-full h-full sm:h-[600px] sm:max-w-2xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Tombol Close Floating (Hanya muncul di Desktop) */}
                        {/* Di mobile, user pakai tombol 'Back' bawaan header ChatWindow */}
                        <div className="absolute top-4 right-4 z-20 hidden sm:block">
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/90 hover:bg-gray-100 text-gray-500 hover:text-red-500 rounded-full transition shadow-sm border border-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Window Component */}
                        {/* className="h-full" wajib agar area chat mengisi modal */}
                        <div className="flex-1 h-full relative">
                            <ChatWindow
                                activeChat={activeChat}
                                onBack={onClose}
                                className="h-full w-full"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- MAIN PAGE ---
export default function ProjectDetail({ project }) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [note, setNote] = useState("");

    const chatProfile = {
        id: project.client_id, // Pastikan key ini dikirim dari backend
        name: project.client,
        avatar: project.client_avatar,
        online: false, // Fitur online butuh websocket, sementara false
        role: "Klien",
        projectId: `#${project.id}`,
    };

    return (
        <GuestLayout>
            <Head title={`Detail Proyek #${project.id} - Rakit`} />

            <div className="min-h-screen bg-rakit-50 py-8 lg:py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 1. HEADER & BREADCRUMB */}
                    <div className="mb-8">
                        <Link
                            href="/crafter/dashboard"
                            className="flex items-center text-sm text-gray-500 hover:text-rakit-800 mb-4 transition w-fit"
                        >
                            <ChevronLeft size={16} /> Kembali ke Dashboard
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-rakit-800">
                                        {project.title}
                                    </h1>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wide">
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600 mt-2">
                                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                        <MapPin
                                            size={14}
                                            className="text-rakit-500"
                                        />
                                        {project.address}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100 font-medium">
                                        <Clock size={14} />
                                        Deadline: {project.deadline}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- LEFT COLUMN: PROGRESS & UPLOAD --- */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* PROGRESS TIMELINE */}
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm p-6">
                                <h3 className="font-bold text-rakit-800 text-lg mb-6 flex items-center gap-2">
                                    <Clock
                                        size={20}
                                        className="text-rakit-500"
                                    />{" "}
                                    Timeline Pengerjaan
                                </h3>
                                <div className="relative pl-2">
                                    {/* Garis Vertikal */}
                                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                    <div className="space-y-6 relative">
                                        {project.timeline.map((step, idx) => (
                                            <div
                                                key={idx}
                                                className="flex gap-4 items-start group"
                                            >
                                                <div
                                                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step.status ===
                                                        "completed"
                                                        ? "bg-green-50 border-green-500 text-green-600"
                                                        : step.status ===
                                                            "current"
                                                            ? "bg-white border-blue-500 text-blue-600 ring-4 ring-blue-50"
                                                            : "bg-white border-gray-200 text-gray-300"
                                                        }`}
                                                >
                                                    {step.status ===
                                                        "completed" ? (
                                                        <CheckCircle2
                                                            size={16}
                                                        />
                                                    ) : (
                                                        <Circle
                                                            size={12}
                                                            fill={
                                                                step.status ===
                                                                    "current"
                                                                    ? "currentColor"
                                                                    : "none"
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <div className="pt-1">
                                                    <h4
                                                        className={`font-bold text-sm ${step.status ===
                                                            "current"
                                                            ? "text-blue-700"
                                                            : "text-gray-800 group-hover:text-rakit-800"
                                                            }`}
                                                    >
                                                        {step.stage}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        {step.date}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* UPLOAD ACTION */}
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm p-6">
                                <h3 className="font-bold text-rakit-800 text-lg mb-4 flex items-center gap-2">
                                    <Camera
                                        size={20}
                                        className="text-rakit-500"
                                    />
                                    Update Progress
                                </h3>

                                <div className="space-y-4">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-rakit-300 border-dashed rounded-xl cursor-pointer bg-rakit-50 hover:bg-rakit-100 transition group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 text-rakit-400 group-hover:text-rakit-600 mb-2 transition" />
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold text-rakit-600">
                                                    Klik untuk upload
                                                </span>{" "}
                                                bukti foto terbaru
                                            </p>
                                        </div>
                                        <input type="file" className="hidden" />
                                    </label>

                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-2 block">
                                            Catatan untuk Klien
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="w-full rounded-xl border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 text-sm"
                                            placeholder="Tulis update pengerjaan hari ini..."
                                            value={note}
                                            onChange={(e) =>
                                                setNote(e.target.value)
                                            }
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-end">
                                        <button className="bg-rakit-800 hover:bg-rakit-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-rakit-800/20 transition flex items-center gap-2">
                                            <UploadCloud size={16} /> Kirim
                                            Laporan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: CLIENT & SPECS --- */}
                        <div className="space-y-6">
                            {/* CLIENT CARD */}
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm p-5">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-rakit-100 flex items-center justify-center text-rakit-700 font-bold text-lg">
                                        {project.client.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">
                                            {project.client}
                                        </h4>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <CheckCircle2
                                                size={10}
                                                className="text-green-500"
                                            />{" "}
                                            Verified Client
                                        </p>
                                    </div>
                                </div>
                                {/* Tombol Buka Chat */}
                                <button
                                    onClick={() => setIsChatOpen(true)}
                                    className="w-full py-2.5 border border-rakit-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-rakit-50 hover:text-rakit-800 transition flex items-center justify-center gap-2"
                                >
                                    <MessageSquare size={16} /> Hubungi Klien
                                </button>
                            </div>

                            {/* SPESIFIKASI & ESTIMASI JASA */}
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-rakit-100 bg-rakit-50">
                                    <h3 className="font-bold text-rakit-800 flex items-center gap-2">
                                        <Ruler size={18} /> Spesifikasi Teknis
                                    </h3>
                                </div>

                                <div className="p-5">
                                    <div className="mb-4">
                                        <h4 className="text-xs font-bold text-rakit-600 uppercase mb-2 flex items-center gap-1">
                                            <Layers size={12} /> Material &
                                            Struktur
                                        </h4>
                                        <SpecRow
                                            label="Material Dasar"
                                            value={project.specs.materialName}
                                        />
                                        <SpecRow
                                            label="Finishing"
                                            value={project.specs.finishing}
                                        />
                                        <SpecRow
                                            label="Dimensi (PxLxT)"
                                            value={`${project.specs.width} x ${project.specs.depth} x ${project.specs.height} cm`}
                                        />
                                        <SpecRow
                                            label="Tinggi Plint"
                                            value={`${project.specs.plinth} cm`}
                                        />
                                        <SpecRow
                                            label="Tutup Belakang"
                                            value={
                                                project.specs.backPanel
                                                    ? "Ya (Tertutup)"
                                                    : "Tidak"
                                            }
                                        />
                                    </div>

                                    <div className="mb-4 pt-2">
                                        <h4 className="text-xs font-bold text-rakit-600 uppercase mb-2 flex items-center gap-1">
                                            <Layers size={12} /> Interior &
                                            Aksesoris
                                        </h4>
                                        <SpecRow
                                            label="Jumlah Sekat"
                                            value={`${project.specs.partitions} Sekat Vertikal`}
                                        />
                                        <SpecRow
                                            label="Jumlah Ambalan"
                                            value={`${project.specs.shelves} Susun`}
                                        />
                                        <SpecRow
                                            label="Pintu"
                                            value={
                                                project.specs.doorType ===
                                                    "swing"
                                                    ? "Pintu Ayun (Swing)"
                                                    : project.specs.doorType ===
                                                        "sliding"
                                                        ? "Pintu Geser (Sliding)"
                                                        : "Tanpa Pintu"
                                            }
                                        />
                                        <SpecRow
                                            label="Kunci Pengaman"
                                            value={
                                                project.specs.lock
                                                    ? "Ya"
                                                    : "Tidak"
                                            }
                                        />
                                        <SpecRow
                                            label="Lampu LED"
                                            value={
                                                project.specs.ledStrip
                                                    ? "Ya (Termasuk Instalasi)"
                                                    : "Tidak"
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="bg-rakit-800 p-5 text-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 opacity-90">
                                            <Banknote size={20} />
                                            <span className="text-sm font-medium">
                                                Nilai Jasa Anda
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold tracking-tight">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(project.fee)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-rakit-200 mt-2 opacity-80 text-right">
                                        *Sudah termasuk biaya material & tenaga
                                        kerja sesuai RAB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RENDER MODAL CHAT --- */}
            <ChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                activeChat={chatProfile}
            />
        </GuestLayout>
    );
}
