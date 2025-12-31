import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion } from "framer-motion";
import {
    Package,
    Clock,
    ShoppingBag,
    ArrowRight,
    Ruler,
    Layers,
    User,
    Truck,
    ChevronRight,
    CalendarDays,
} from "lucide-react";

// Import Visualizer
import Visualizer from "../Customize/Visualizer";

// --- DUMMY DATA ---
const DUMMY_ORDERS = [
    {
        id: "INV-2311-8890",
        productName: "Lemari Pakaian 3 Pintu Custom",
        crafter: "Workshop Kayu Jati",
        date: "20 Okt 2023",
        price: 4675000,
        status: "Produksi",
        progress: 60,

        config: {
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
            finishingLayer: {
                id: "hpl-wood",
                // Pastikan path texture ini valid di project Anda
                texture:
                    "/storage/materials/BMSFcDRQDiQEQJ36dUeq10p1lAJ0zBuF6MeffdkC.jpg",
            },
        },
        specs: {
            material: "Multiplek Meranti 18mm",
            finish: "HPL Taco - Folk Walnut",
        },
    },
    {
        id: "INV-2311-7721",
        productName: "Rak TV Minimalis Modern",
        crafter: "Bengkel Las Maju Jaya",
        date: "15 Okt 2023",
        price: 2150000,
        status: "Pengiriman",
        progress: 90,

        config: {
            width: 150,
            height: 60,
            depth: 40,
            plinth: 0,
            backPanel: false,
            partitions: 3,
            shelves: 2,
            ledStrip: false,
            doorType: "none",
            lock: false,
            finishingLayer: {
                id: "hpl-solid",
                // Pastikan path texture ini valid
                texture:
                    "/storage/materials/HFK1lgqSwfZPSckzrsRkL7fxR00tcQ6cvAmZXO9V.jpg",
            },
        },
        specs: {
            material: "Blockboard 15mm",
            finish: "Duco White Matte",
        },
    },
];

export default function OrderList() {
    const [filter, setFilter] = useState("all");

    const filteredOrders = DUMMY_ORDERS.filter((order) => {
        if (filter === "all") return true;
        if (filter === "active") return order.status !== "Selesai";
        if (filter === "completed") return order.status === "Selesai";
        return true;
    });

    return (
        <GuestLayout>
            <Head title="Pesanan Saya" />

            <div className="min-h-screen bg-gray-50/50 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Pesanan Saya
                            </h1>
                            <p className="text-gray-500 max-w-md">
                                Pantau progress pengerjaan furnitur custom Anda
                                secara real-time langsung dari workshop.
                            </p>
                        </div>

                        <Link
                            href="/customize"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-rakit-800 text-white rounded-xl font-bold hover:bg-rakit-900 transition shadow-lg shadow-rakit-800/20 active:scale-95"
                        >
                            <Package size={20} />
                            Buat Pesanan Baru
                        </Link>
                    </div>

                    {/* FILTER TABS */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar border-b border-gray-200">
                        {[
                            { id: "all", label: "Semua Pesanan" },
                            { id: "active", label: "Sedang Berjalan" },
                            { id: "completed", label: "Riwayat Selesai" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setFilter(tab.id)}
                                className={`px-5 py-3 text-sm font-bold transition-all whitespace-nowrap border-b-2 -mb-px ${
                                    filter === tab.id
                                        ? "border-rakit-800 text-rakit-800"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* ORDER LIST GRID */}
                    <motion.div layout className="space-y-8">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    index={index}
                                />
                            ))
                        ) : (
                            <EmptyState />
                        )}
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}

// --- SUB-COMPONENT: ORDER CARD ---
function OrderCard({ order, index }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case "Produksi":
                return "text-blue-700 bg-blue-50 border-blue-100 ring-4 ring-blue-50/50";
            case "Pengiriman":
                return "text-orange-700 bg-orange-50 border-orange-100 ring-4 ring-orange-50/50";
            case "Selesai":
                return "text-green-700 bg-green-50 border-green-100 ring-4 ring-green-50/50";
            default:
                return "text-gray-700 bg-gray-50 border-gray-100";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-[2rem] border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-rakit-900/5 hover:border-rakit-300 transition-all duration-300 flex flex-col lg:flex-row"
        >
            {/* LEFT: VISUALIZER PREVIEW (LEBIH BESAR & BERSIH) */}
            <div className="w-full lg:w-5/12 bg-gradient-to-br from-gray-50 to-gray-100 relative min-h-[320px] lg:min-h-full flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-gray-200 group-hover:bg-gray-50 transition-colors">
                {/* Visualizer Component */}
                <div className="w-full h-full drop-shadow-xl transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Visualizer config={order.config} />
                </div>

                {/* Badges Overlay */}
                <div className="absolute top-6 left-6 flex gap-2">
                    <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-600 shadow-sm border border-gray-100 flex items-center gap-1.5">
                        <Package size={12} className="text-rakit-500" /> Custom
                        Order
                    </div>
                </div>
            </div>

            {/* RIGHT: INFO & ACTIONS */}
            <div className="w-full lg:w-7/12 p-6 lg:p-8 flex flex-col justify-between">
                <div>
                    {/* Header: ID & Date */}
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                            <span>#{order.id}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="flex items-center gap-1">
                                <CalendarDays size={12} /> {order.date}
                            </span>
                        </div>
                        <div
                            className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(
                                order.status
                            )}`}
                        >
                            {order.status}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-rakit-800 transition-colors">
                        {order.productName}
                    </h3>

                    {/* Specs Grid (Lebih Rapi) */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 flex items-center gap-1.5">
                                <Ruler size={12} /> Dimensi
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                                {order.config.width} x {order.config.height} x{" "}
                                {order.config.depth} cm
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 flex items-center gap-1.5">
                                <Layers size={12} /> Material
                            </p>
                            <p
                                className="text-sm font-semibold text-gray-700 truncate"
                                title={order.specs.material}
                            >
                                {order.specs.material}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 flex items-center gap-1.5">
                                <User size={12} /> Crafter
                            </p>
                            <p className="text-sm font-semibold text-gray-700 truncate">
                                {order.crafter}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 flex items-center gap-1.5">
                                <Truck size={12} /> Estimasi
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                                3-4 Minggu
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row items-end justify-between gap-6">
                        {/* Progress Bar */}
                        <div className="w-full sm:w-1/2">
                            <div className="flex justify-between text-xs mb-2">
                                <span className="font-bold text-gray-500">
                                    Progress Pengerjaan
                                </span>
                                <span className="text-rakit-600 font-bold">
                                    {order.progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${order.progress}%` }}
                                    transition={{
                                        duration: 1,
                                        ease: "easeOut",
                                    }}
                                    className="bg-rakit-600 h-full rounded-full relative"
                                >
                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Price & Action */}
                        <div className="text-right flex flex-col items-end gap-1">
                            <p className="text-xs text-gray-400 font-medium uppercase">
                                Total Harga
                            </p>
                            <p className="text-xl font-bold text-gray-900 mb-2">
                                Rp{" "}
                                {new Intl.NumberFormat("id-ID").format(
                                    order.price
                                )}
                            </p>
                            <Link
                                href="/track-order"
                                className="inline-flex items-center gap-2 text-sm font-bold text-rakit-600 hover:text-rakit-800 transition group/link"
                            >
                                {order.status === "Selesai"
                                    ? "Lihat Detail"
                                    : "Lacak Pesanan"}
                                <ChevronRight
                                    size={16}
                                    className="group-hover/link:translate-x-1 transition-transform"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- SUB-COMPONENT: EMPTY STATE ---
function EmptyState() {
    return (
        <div className="bg-white rounded-[2rem] border border-dashed border-gray-300 p-16 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <ShoppingBag size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
                Belum ada pesanan
            </h3>
            <p className="text-gray-500 mt-2 mb-8 max-w-sm mx-auto">
                Anda belum memiliki transaksi aktif. Mulai desain furnitur
                impian Anda sekarang juga.
            </p>
            <Link
                href="/customize"
                className="inline-flex items-center gap-2 px-8 py-4 bg-rakit-800 text-white rounded-xl font-bold hover:bg-rakit-900 transition shadow-xl shadow-rakit-800/20"
            >
                Mulai Desain Sekarang <ArrowRight size={18} />
            </Link>
        </div>
    );
}
