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
    Edit2,
    Save,
    Calendar,
    Image as ImageIcon,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import ChatWindow from "@/Components/Chat/ChatWindow";

// --- HELPERS ---
const formatRp = (val) => new Intl.NumberFormat("id-ID").format(val);

const SpecRow = ({ label, value }) => (
    <div className="flex justify-between items-start py-3 border-b border-dashed border-gray-100 last:border-0">
        <span className="text-sm text-gray-500 font-medium">{label}</span>
        <span className="text-sm font-bold text-gray-800 text-right max-w-[60%]">
            {value}
        </span>
    </div>
);

// --- KOMPONEN MODAL CHAT ---
const ChatModal = ({ isOpen, onClose, activeChat }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full h-full sm:h-[600px] sm:max-w-2xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="absolute top-4 right-4 z-20 hidden sm:block">
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/90 hover:bg-gray-100 text-gray-500 rounded-full border border-gray-100"
                        >
                            <X size={20} />
                        </button>
                    </div>
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

// --- TIMELINE ITEM (EXPANDABLE & INTEGRATED UPLOAD) ---
const TimelineItem = ({ step, index, isLast, onSave }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editData, setEditData] = useState({
        ...step,
        note: "",
        photo: null,
    });

    const handleSave = () => {
        // Simulasi simpan data (termasuk foto/catatan baru)
        onSave(index, editData);
        setIsExpanded(false);
        // Reset form sementara
        setEditData((prev) => ({ ...prev, note: "", photo: null }));
    };

    const statusColors = {
        completed: "bg-green-500 border-green-500 text-white",
        current: "bg-white border-blue-500 text-blue-600 ring-4 ring-blue-50",
        upcoming: "bg-white border-gray-200 text-gray-300",
    };

    return (
        <div className="flex gap-4 items-start relative group">
            {/* Garis Vertikal */}
            {!isLast && (
                <div
                    className={`absolute left-[15px] top-8 bottom-[-32px] w-0.5 transition-colors duration-300 ${
                        step.status === "completed"
                            ? "bg-green-500"
                            : "bg-gray-200"
                    }`}
                ></div>
            )}

            {/* Icon Status */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shrink-0 cursor-pointer hover:scale-110 ${
                    statusColors[step.status]
                }`}
            >
                {step.status === "completed" ? (
                    <CheckCircle2 size={16} />
                ) : (
                    <Circle
                        size={12}
                        fill={
                            step.status === "current" ? "currentColor" : "none"
                        }
                    />
                )}
            </button>

            {/* Konten Utama */}
            <div
                className={`flex-1 transition-all duration-300 ${
                    isExpanded ? "pb-8" : "pb-6"
                }`}
            >
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`bg-white border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                        isExpanded
                            ? "border-rakit-300 shadow-md ring-1 ring-rakit-300"
                            : "border-gray-200"
                    }`}
                >
                    {/* Header Item */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h4
                                className={`font-bold text-sm mb-1 ${
                                    step.status === "current"
                                        ? "text-blue-700"
                                        : "text-gray-800"
                                }`}
                            >
                                {step.stage}
                            </h4>
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                <Calendar size={12} /> {step.date}
                                {step.hasPhoto && (
                                    <span className="flex items-center gap-1 text-rakit-600 bg-rakit-50 px-1.5 py-0.5 rounded border border-rakit-100">
                                        <ImageIcon size={10} /> Foto Ada
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="text-gray-400">
                            {isExpanded ? (
                                <ChevronUp size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            )}
                        </div>
                    </div>

                    {/* Expandable Area (Edit & Upload) */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                    marginTop: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                    marginTop: 16,
                                }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="overflow-hidden border-t border-dashed border-gray-200 pt-4"
                                onClick={(e) => e.stopPropagation()} // Mencegah klik menutup accordion
                            >
                                <div className="space-y-4">
                                    {/* 1. Status & Tanggal */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                                                Status
                                            </label>
                                            <select
                                                value={editData.status}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        status: e.target.value,
                                                    })
                                                }
                                                className="w-full text-xs rounded-lg border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 py-2"
                                            >
                                                <option value="upcoming">
                                                    Menunggu
                                                </option>
                                                <option value="current">
                                                    Sedang Proses
                                                </option>
                                                <option value="completed">
                                                    Selesai
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                                                Tanggal
                                            </label>
                                            <input
                                                type="date"
                                                value={editData.date} // Pastikan format YYYY-MM-DD
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        date: e.target.value,
                                                    })
                                                }
                                                className="w-full text-xs rounded-lg border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 py-2"
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Upload Foto & Catatan */}
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <label className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2 cursor-pointer w-fit hover:text-rakit-600 transition">
                                            <Camera
                                                size={14}
                                                className="text-rakit-500"
                                            />
                                            Upload Bukti Pengerjaan
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        photo: e.target
                                                            .files[0],
                                                    })
                                                }
                                            />
                                        </label>

                                        {editData.photo ? (
                                            <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 mb-2 flex items-center gap-1">
                                                <CheckCircle2 size={10} />{" "}
                                                {editData.photo.name}
                                            </div>
                                        ) : (
                                            <p className="text-[10px] text-gray-400 italic mb-2">
                                                Belum ada foto dipilih.
                                            </p>
                                        )}

                                        <textarea
                                            placeholder="Tambahkan catatan untuk klien..."
                                            rows="2"
                                            className="w-full text-xs rounded-lg border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 bg-white"
                                            value={editData.note}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    note: e.target.value,
                                                })
                                            }
                                        ></textarea>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button
                                            onClick={() => setIsExpanded(false)}
                                            className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-1.5 text-xs font-bold text-white bg-rakit-800 hover:bg-rakit-900 rounded-lg shadow-sm flex items-center gap-1.5 transition"
                                        >
                                            <Save size={12} /> Simpan Update
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
export default function ProjectDetail({ project }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // State lokal timeline (simulasi data awal dengan flag 'hasPhoto')
    const [timeline, setTimeline] = useState(
        project.timeline.map((t) => ({
            ...t,
            hasPhoto: t.status === "completed", // Simulasi: step selesai punya foto
        }))
    );

    const handleUpdateTimeline = (index, newData) => {
        const updated = [...timeline];
        // Logika sederhana: jika ada file foto baru, set flag hasPhoto true
        if (newData.photo) newData.hasPhoto = true;
        updated[index] = newData;
        setTimeline(updated);
        // Backend sync here...
    };

    const chatProfile = {
        id: project.client_id,
        name: project.client,
        avatar: project.client_avatar,
        role: "Klien",
        projectId: `#${project.id}`,
    };

    return (
        <GuestLayout hideFooter={true}>
            <Head title={`Detail Proyek #${project.id}`} />

            <div className="min-h-screen bg-rakit-50 py-8 lg:py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* HEADER */}
                    <div className="mb-8">
                        <Link
                            href="/crafter/dashboard"
                            className="flex items-center text-sm text-gray-500 hover:text-rakit-800 mb-4 transition w-fit"
                        >
                            <ChevronLeft size={16} /> Kembali ke Dashboard
                        </Link>
                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-rakit-800">
                                        {project.title}
                                    </h1>
                                    <span
                                        className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${
                                            project.status === "Produksi"
                                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                                : "bg-green-100 text-green-700 border-green-200"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                                        <MapPin
                                            size={14}
                                            className="text-rakit-500"
                                        />{" "}
                                        {project.address}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100 font-medium">
                                        <Clock size={14} /> Deadline:{" "}
                                        {project.deadline}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- LEFT: TIMELINE & PROGRESS (GABUNGAN) --- */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm p-6 lg:p-8">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <h3 className="font-bold text-rakit-800 text-xl flex items-center gap-2">
                                            <Layers
                                                size={22}
                                                className="text-rakit-500"
                                            />
                                            Timeline & Progress
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Klik pada tahapan untuk update
                                            status & foto.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-rakit-50 rounded-full flex items-center justify-center text-rakit-600 border border-rakit-100">
                                        <span className="text-xs font-bold">
                                            {Math.round(
                                                (timeline.filter(
                                                    (t) =>
                                                        t.status === "completed"
                                                ).length /
                                                    timeline.length) *
                                                    100
                                            )}
                                            %
                                        </span>
                                    </div>
                                </div>

                                <div className="relative pl-2 pr-2">
                                    {timeline.map((step, idx) => (
                                        <TimelineItem
                                            key={idx}
                                            index={idx}
                                            step={step}
                                            isLast={idx === timeline.length - 1}
                                            onSave={handleUpdateTimeline}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT: CLIENT & SPECS --- */}
                        <div className="space-y-6">
                            {/* CLIENT CARD */}
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm p-5">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-rakit-100 overflow-hidden border-2 border-white shadow-sm">
                                        <img
                                            src={project.client_avatar}
                                            alt={project.client}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">
                                            {project.client}
                                        </h4>
                                        <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                                            <CheckCircle2 size={10} /> Verified
                                            Client
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(true)}
                                    className="w-full py-2.5 border border-rakit-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-rakit-50 hover:text-rakit-800 transition flex items-center justify-center gap-2"
                                >
                                    <MessageSquare size={16} /> Hubungi Klien
                                </button>
                            </div>

                            {/* SPECS CARD */}
                            <div className="bg-white rounded-2xl border border-rakit-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-rakit-100 bg-rakit-50">
                                    <h3 className="font-bold text-rakit-800 flex items-center gap-2">
                                        <Ruler size={18} /> Spesifikasi Teknis
                                    </h3>
                                </div>
                                <div className="p-5">
                                    <div className="mb-6">
                                        <h4 className="text-xs font-bold text-rakit-600 uppercase mb-3 flex items-center gap-1">
                                            Material & Struktur
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
                                            label="Dimensi"
                                            value={`${project.specs.width}x${project.specs.depth}x${project.specs.height} cm`}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-rakit-600 uppercase mb-3 flex items-center gap-1">
                                            Interior & Aksesoris
                                        </h4>
                                        <SpecRow
                                            label="Sekat/Ambalan"
                                            value={`${project.specs.partitions} / ${project.specs.shelves}`}
                                        />
                                        <SpecRow
                                            label="Pintu"
                                            value={project.specs.doorType}
                                        />
                                        <SpecRow
                                            label="Lampu LED"
                                            value={
                                                project.specs.ledStrip
                                                    ? "Ya"
                                                    : "Tidak"
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="bg-rakit-800 p-5 text-white">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium opacity-90 flex items-center gap-2">
                                            <Banknote size={18} /> Nilai Jasa
                                        </span>
                                        <span className="text-xl font-bold">
                                            Rp {formatRp(project.fee)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                activeChat={chatProfile}
            />
        </GuestLayout>
    );
}
