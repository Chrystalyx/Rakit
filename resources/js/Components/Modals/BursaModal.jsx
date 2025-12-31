import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Clock,
    MapPin,
    User,
    Ruler,
    Layers,
    Palette,
    DoorOpen,
    Box,
    ShieldCheck,
    FileText,
} from "lucide-react";

export default function BursaModal({
    isOpen,
    onClose,
    request,
    onAccept,
    onReject,
}) {
    // Helper Format Rupiah
    const formatRp = (val) => new Intl.NumberFormat("id-ID").format(val);

    return (
        <AnimatePresence>
            {isOpen && request && (
                <>
                    {/* 1. BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* 2. WRAPPER POSISI */}
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
                        {/* 3. MODAL PANEL */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            {/* --- HEADER --- */}
                            <div className="p-5 border-b border-gray-100 flex justify-between items-start bg-white z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
                                            Penawaran Baru
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                                            <Clock size={10} /> Diposting 2 jam
                                            lalu
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                        {request.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition text-gray-400 hover:text-gray-600 shrink-0"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* --- BODY (SCROLLABLE) --- */}
                            <div className="p-6 overflow-y-auto custom-scrollbar bg-gray-50/50">
                                <div className="space-y-6">
                                    {/* A. CUSTOMER INFO & BUDGET */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Customer Card */}
                                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                            <div className="flex items-center gap-3 mb-3">
                                                <img
                                                    src={
                                                        request.customer
                                                            ?.avatar ||
                                                        "https://ui-avatars.com/api/?name=User&background=random"
                                                    }
                                                    alt="Customer"
                                                    className="w-10 h-10 rounded-full border border-gray-100"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-sm">
                                                        {request.customer
                                                            ?.name ||
                                                            "Nama Customer"}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold">
                                                        <ShieldCheck
                                                            size={10}
                                                        />{" "}
                                                        Verified Buyer
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                                                <MapPin
                                                    size={14}
                                                    className="shrink-0 mt-0.5"
                                                />
                                                <p className="leading-relaxed">
                                                    {request.customer
                                                        ?.address ||
                                                        "Alamat lengkap customer akan muncul di sini..."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Budget Card */}
                                        <div className="bg-rakit-800 p-4 rounded-xl border border-rakit-900 shadow-sm text-white flex flex-col justify-between relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full -mr-4 -mt-4"></div>
                                            <div>
                                                <p className="text-rakit-200 text-xs font-medium uppercase tracking-wider mb-1">
                                                    Nilai Proyek
                                                </p>
                                                <p className="text-2xl font-bold">
                                                    {request.budget}
                                                </p>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-rakit-300">
                                                *Sudah termasuk material & jasa
                                            </div>
                                        </div>
                                    </div>

                                    {/* B. SPESIFIKASI TEKNIS (Sesuai Configurator) */}
                                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                                            <FileText
                                                size={16}
                                                className="text-gray-500"
                                            />
                                            <h3 className="font-bold text-gray-800 text-sm">
                                                Spesifikasi Pesanan
                                            </h3>
                                        </div>

                                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                            {/* 1. Dimensi */}
                                            <div>
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    <Ruler size={12} /> Dimensi
                                                </h4>
                                                <ul className="space-y-1 text-sm text-gray-700 font-medium">
                                                    <li className="flex justify-between border-b border-dashed border-gray-100 pb-1">
                                                        <span>
                                                            Lebar (Panjang)
                                                        </span>{" "}
                                                        <span>
                                                            {request.specs
                                                                ?.width ||
                                                                0}{" "}
                                                            cm
                                                        </span>
                                                    </li>
                                                    <li className="flex justify-between border-b border-dashed border-gray-100 pb-1">
                                                        <span>
                                                            Tinggi Total
                                                        </span>{" "}
                                                        <span>
                                                            {request.specs
                                                                ?.height ||
                                                                0}{" "}
                                                            cm
                                                        </span>
                                                    </li>
                                                    <li className="flex justify-between border-b border-dashed border-gray-100 pb-1">
                                                        <span>Kedalaman</span>{" "}
                                                        <span>
                                                            {request.specs
                                                                ?.depth ||
                                                                0}{" "}
                                                            cm
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* 2. Material & Finish */}
                                            <div>
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    <Layers size={12} />{" "}
                                                    Material
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                                        <span className="text-xs text-gray-400 block">
                                                            Base Material
                                                        </span>
                                                        <span className="font-bold text-gray-800">
                                                            {request.specs
                                                                ?.baseMaterial ||
                                                                "Multiplek"}
                                                        </span>
                                                    </div>
                                                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                                                        <span className="text-xs text-gray-400 block">
                                                            Finishing
                                                        </span>
                                                        <span className="font-bold text-gray-800 flex items-center gap-1">
                                                            <Palette
                                                                size={12}
                                                            />{" "}
                                                            {request.specs
                                                                ?.finishing ||
                                                                "HPL Taco"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 3. Interior & Struktur */}
                                            <div>
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    <Box size={12} /> Interior
                                                </h4>
                                                <ul className="space-y-1 text-sm text-gray-700 font-medium">
                                                    <li className="flex justify-between">
                                                        <span>
                                                            Sekat Vertikal
                                                        </span>{" "}
                                                        <span>
                                                            {request.specs
                                                                ?.partitions ||
                                                                0}{" "}
                                                            Unit
                                                        </span>
                                                    </li>
                                                    <li className="flex justify-between">
                                                        <span>Ambalan</span>{" "}
                                                        <span>
                                                            {request.specs
                                                                ?.shelves ||
                                                                0}{" "}
                                                            Unit
                                                        </span>
                                                    </li>
                                                    <li className="flex justify-between">
                                                        <span>Lampu LED</span>{" "}
                                                        <span>
                                                            {request.specs
                                                                ?.ledStrip
                                                                ? "Ya"
                                                                : "Tidak"}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* 4. Pintu & Aksesoris */}
                                            <div>
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    <DoorOpen size={12} />{" "}
                                                    Aksesoris
                                                </h4>
                                                <ul className="space-y-1 text-sm text-gray-700 font-medium">
                                                    <li className="flex justify-between">
                                                        <span>Tipe Pintu</span>{" "}
                                                        <span className="capitalize">
                                                            {request.specs
                                                                ?.doorType ||
                                                                "None"}
                                                        </span>
                                                    </li>
                                                    <li className="flex justify-between">
                                                        <span>
                                                            Kunci Pengaman
                                                        </span>{" "}
                                                        <span>
                                                            {request.specs?.lock
                                                                ? "Ya"
                                                                : "Tidak"}
                                                        </span>
                                                    </li>
                                                    <li className="flex justify-between">
                                                        <span>
                                                            Tinggi Plint
                                                        </span>{" "}
                                                        <span>
                                                            {request.specs
                                                                ?.plinth ||
                                                                0}{" "}
                                                            cm
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- FOOTER (ACTIONS) --- */}
                            <div className="p-5 border-t border-gray-100 bg-white z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={onReject}
                                        className="w-full py-3.5 px-4 rounded-xl border-2 border-red-100 bg-white text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-200 transition shadow-sm flex items-center justify-center gap-2"
                                    >
                                        <X size={18} />
                                        Tolak Tawaran
                                    </button>
                                    <button
                                        onClick={onAccept}
                                        className="w-full py-3.5 px-4 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                                    >
                                        <ShieldCheck size={18} />
                                        Terima Proyek
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
