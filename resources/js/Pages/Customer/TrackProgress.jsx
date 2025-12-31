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
    Package,
    Ruler,
    Layers,
    MessageSquare,
    Banknote,
    X,
    Calendar,
    Image as ImageIcon,
    Truck,
    ShieldCheck,
    Download,
    User,
} from "lucide-react";

import Visualizer from "../Customize/Visualizer";
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

// --- KOMPONEN ITEM UPDATE (FOTO/CATATAN) ---
const UpdateItem = ({ update }) => {
    const [zoom, setZoom] = useState(false);

    return (
        <div className="mt-4 mb-2 bg-gray-50 rounded-xl border border-gray-200 p-4 relative group">
            {/* Dekorasi panah kecil ke atas */}
            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-gray-50 border-t border-l border-gray-200 transform rotate-45"></div>

            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                    <User size={14} className="text-gray-500" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                        <p className="text-xs font-bold text-gray-800">
                            Crafter Update
                        </p>
                        <p className="text-[10px] text-gray-400">
                            {update.date}
                        </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        {update.note}
                    </p>

                    {update.photo && (
                        <div
                            className="relative rounded-lg overflow-hidden border border-gray-200 w-full sm:w-64 cursor-pointer"
                            onClick={() => setZoom(true)}
                        >
                            <img
                                src={update.photo}
                                alt="Progress"
                                className="w-full h-40 object-cover hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition flex items-center justify-center">
                                <div className="bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                                    <ImageIcon
                                        size={14}
                                        className="text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Zoom Gambar Sederhana */}
            <AnimatePresence>
                {zoom && update.photo && (
                    <div
                        className="fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setZoom(false);
                        }}
                    >
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={update.photo}
                            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- DATA DUMMY (MOCK) ---
const DUMMY_ORDER = {
    id: "INV-2311-8890",
    status: "Produksi",
    purchaseDate: "20 Okt 2023",
    totalPrice: 4675000,

    crafter: {
        name: "Workshop Kayu Jati",
        location: "Bandung, Jawa Barat",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
        verified: true,
    },

    product: {
        name: "Lemari Pakaian 3 Pintu Custom",
        width: 180,
        height: 200,
        depth: 60,
        plinth: 10,
        backPanel: true,
        partitions: 2,
        shelves: 4,
        ledStrip: true,
        doorType: "swing",
        lock: true,
        components: {
            base: { name: "Multiplek Meranti 18mm" },
            finish: { name: "HPL Taco - Folk Walnut" },
        },
        finishingLayer: {
            id: "hpl-solid-1",
            texture:
                "/storage/materials/BMSFcDRQDiQEQJ36dUeq10p1lAJ0zBuF6MeffdkC.jpg",
        },
    },

    // Timeline yang SUDAH digabung dengan updates di dalamnya
    timeline: [
        {
            stage: "Pesanan Dikonfirmasi",
            date: "20 Okt 2023",
            status: "completed",
            updates: [],
        },
        {
            stage: "Pembelian Material",
            date: "22 Okt 2023",
            status: "completed",
            updates: [
                {
                    date: "22 Okt, 09:15",
                    note: "Halo kak, pesanan sudah kami terima. Kami akan mulai belanja material besok pagi ya.",
                    photo: null,
                },
            ],
        },
        {
            stage: "Pengerjaan (Potong & Rakit)",
            date: "Sedang Berjalan",
            status: "current",
            updates: [
                {
                    date: "25 Okt, 14:30",
                    note: "Material multiplek meranti 18mm sudah tiba di workshop. Kualitas grade A sesuai pesanan.",
                    photo: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600",
                },
                {
                    date: "27 Okt, 10:00",
                    note: "Proses pemotongan bahan sudah 50%. Lanjut perakitan rangka.",
                    photo: "https://images.unsplash.com/photo-1629016843648-4034eb224429?auto=format&fit=crop&q=80&w=600",
                },
            ],
        },
        {
            stage: "Finishing & QC",
            date: "Estimasi 5 Nov",
            status: "upcoming",
            updates: [],
        },
        { stage: "Pengiriman", date: "-", status: "upcoming", updates: [] },
    ],
};

export default function TrackProgress() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const order = DUMMY_ORDER;

    const chatProfile = {
        id: "crafter-001",
        name: order.crafter.name,
        avatar: order.crafter.avatar,
        role: "Mitra Pengrajin",
        projectId: `#${order.id}`,
    };

    return (
        <GuestLayout hideFooter={true}>
            <Head title={`Lacak Pesanan #${order.id}`} />

            <div className="min-h-screen bg-gray-50/50 py-8 lg:py-12 font-sans text-gray-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 1. HEADER & NAVIGATION */}
                    <div className="mb-8">
                        <Link
                            href="/my-orders"
                            className="flex items-center text-sm font-bold text-gray-500 hover:text-rakit-800 mb-6 transition w-fit"
                        >
                            <ChevronLeft size={18} /> Kembali ke Pesanan Saya
                        </Link>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Pesanan #{order.id}
                                    </h1>
                                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wide">
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Dipesan pada {order.purchaseDate}
                                </p>
                            </div>

                            {/* Simple Progress Bar */}
                            <div className="flex items-center gap-1">
                                {[
                                    "Menunggu",
                                    "Produksi",
                                    "Pengiriman",
                                    "Selesai",
                                ].map((step, i) => {
                                    const isActive = i <= 1; // Logic simulasi (current stage = Produksi/1)
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <div
                                                className={`flex flex-col items-center gap-2 ${
                                                    isActive
                                                        ? "text-rakit-800"
                                                        : "text-gray-300"
                                                }`}
                                            >
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                                        isActive
                                                            ? "bg-rakit-50 border-rakit-600"
                                                            : "bg-white border-gray-200"
                                                    }`}
                                                >
                                                    {i + 1}
                                                </div>
                                                <span className="text-[10px] font-bold uppercase hidden sm:block">
                                                    {step}
                                                </span>
                                            </div>
                                            {i !== 3 && (
                                                <div
                                                    className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 transition-all ${
                                                        i < 1
                                                            ? "bg-rakit-600"
                                                            : "bg-gray-200"
                                                    }`}
                                                ></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- LEFT COLUMN: UNIFIED TIMELINE --- */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
                                <h3 className="font-bold text-gray-900 text-lg mb-8 flex items-center gap-2">
                                    <Layers
                                        size={22}
                                        className="text-rakit-600"
                                    />
                                    Timeline Progress
                                </h3>

                                <div className="relative pl-3">
                                    {order.timeline.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className="flex gap-5 items-start group relative pb-10 last:pb-0"
                                        >
                                            {/* Garis Vertikal */}
                                            {idx !==
                                                order.timeline.length - 1 && (
                                                <div
                                                    className={`absolute left-[11px] top-8 bottom-0 w-0.5 ${
                                                        step.status ===
                                                        "completed"
                                                            ? "bg-green-500"
                                                            : "bg-gray-200"
                                                    }`}
                                                ></div>
                                            )}

                                            {/* Icon Bulat */}
                                            <div
                                                className={`relative z-10 w-6 h-6 rounded-full border-2 shrink-0 mt-1 transition-all flex items-center justify-center ${
                                                    step.status === "completed"
                                                        ? "bg-green-500 border-green-500 text-white"
                                                        : step.status ===
                                                          "current"
                                                        ? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50"
                                                        : "bg-white border-gray-300 text-gray-300"
                                                }`}
                                            >
                                                {step.status ===
                                                    "completed" && (
                                                    <CheckCircle2 size={14} />
                                                )}
                                                {step.status === "current" && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                                )}
                                            </div>

                                            {/* Konten Timeline */}
                                            <div className="flex-1 -mt-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4
                                                            className={`font-bold text-base ${
                                                                step.status ===
                                                                "current"
                                                                    ? "text-blue-700"
                                                                    : "text-gray-900"
                                                            }`}
                                                        >
                                                            {step.stage}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1 font-medium bg-gray-50 px-2 py-0.5 rounded w-fit">
                                                            {step.date}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* --- UPDATE/FOTO MUNCUL DISINI (MERGED) --- */}
                                                {step.updates.length > 0 && (
                                                    <div className="mt-4 space-y-4 border-l-2 border-dashed border-gray-200 pl-4 ml-1">
                                                        {step.updates.map(
                                                            (update, i) => (
                                                                <UpdateItem
                                                                    key={i}
                                                                    update={
                                                                        update
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: INFO & SPECS --- */}
                        <div className="space-y-6">
                            {/* CRAFTER INFO */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                    Dikerjakan Oleh
                                </p>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                        <img
                                            src={order.crafter.avatar}
                                            alt={order.crafter.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">
                                            {order.crafter.name}
                                        </h4>
                                        <p className="text-xs text-green-600 flex items-center gap-1 font-bold mt-0.5">
                                            <ShieldCheck size={12} /> Mitra
                                            Terverifikasi
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <MapPin size={10} />{" "}
                                            {order.crafter.location}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(true)}
                                    className="w-full py-3 bg-rakit-800 text-white rounded-xl text-sm font-bold hover:bg-rakit-900 transition flex items-center justify-center gap-2 shadow-lg shadow-rakit-800/20"
                                >
                                    <MessageSquare size={16} /> Hubungi
                                    Pengrajin
                                </button>
                            </div>

                            {/* PRODUCT SPECS (VISUALIZER MINI) */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                                        <Package size={16} /> Rincian Produk
                                    </h3>
                                </div>

                                {/* Visualizer Preview */}
                                <div className="h-56 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                                    {/* Visualizer Scale Up dikit */}
                                    <div className="scale-90 origin-center w-full h-full">
                                        <Visualizer config={order.product} />
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="space-y-1 mb-5">
                                        <SpecRow
                                            label="Dimensi"
                                            value={`${order.product.width}x${order.product.height}x${order.product.depth} cm`}
                                        />
                                        <SpecRow
                                            label="Material"
                                            value={
                                                order.product.components.base
                                                    .name
                                            }
                                        />
                                        <SpecRow
                                            label="Finishing"
                                            value={
                                                order.product.components.finish
                                                    .name
                                            }
                                        />
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex justify-between items-center">
                                        <span className="text-xs font-bold text-green-800 uppercase">
                                            Total Biaya
                                        </span>
                                        <span className="text-lg font-bold text-green-800">
                                            Rp {formatRp(order.totalPrice)}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-1.5 justify-center opacity-70">
                                        <ShieldCheck
                                            size={12}
                                            className="text-green-700"
                                        />
                                        <p className="text-[10px] text-gray-500 font-medium">
                                            Pembayaran aman via Escrow RAKIT
                                        </p>
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
