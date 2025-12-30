import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Search,
    Filter,
    ChevronRight,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Truck,
    ShoppingBag,
} from "lucide-react";

export default function TransactionIndex() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // DATA DUMMY
    const transactions = [
        {
            id: "TRX-2024001",
            date: "29 Des 2025",
            item_name: "Lemari Pakaian 3 Pintu Custom",
            total_price: 4500000,
            status: "pending",
            specs: "Multiplek Meranti • HPL Taco Wood",
        },
        {
            id: "TRX-2024002",
            date: "15 Des 2025",
            item_name: "Kitchen Set Minimalis",
            total_price: 12500000,
            status: "processing",
            specs: "Blockboard Melamine • HPL Solid White",
        },
        {
            id: "TRX-2024003",
            date: "01 Nov 2025",
            item_name: "Meja Kerja Industrial",
            total_price: 1850000,
            status: "done",
            specs: "Besi Hollow • Top Table Jati Belanda",
        },
    ];

    const getStatusInfo = (status) => {
        switch (status) {
            case "pending":
                return {
                    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
                    icon: Clock,
                    label: "Menunggu Pembayaran",
                };
            case "processing":
                return {
                    color: "text-blue-700 bg-blue-50 border-blue-200",
                    icon: Package,
                    label: "Sedang Diproses",
                };
            case "shipping":
                return {
                    color: "text-purple-700 bg-purple-50 border-purple-200",
                    icon: Truck,
                    label: "Dalam Pengiriman",
                };
            case "done":
                return {
                    color: "text-green-700 bg-green-50 border-green-200",
                    icon: CheckCircle,
                    label: "Selesai",
                };
            case "cancelled":
                return {
                    color: "text-red-700 bg-red-50 border-red-200",
                    icon: XCircle,
                    label: "Dibatalkan",
                };
            default:
                return {
                    color: "text-gray-700 bg-gray-50 border-gray-200",
                    icon: Clock,
                    label: status,
                };
        }
    };

    return (
        <GuestLayout>
            <Head title="Riwayat Transaksi" />

            <div className="bg-gray-50/50 min-h-[calc(100vh-80px)]">
                {/* Gunakan max-w-7xl agar lebih luas */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Riwayat Pesanan
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Kelola dan pantau semua pesanan furnitur custom
                                Anda.
                            </p>
                        </div>

                        {/* Search Bar (Optional Style) */}
                        <div className="relative w-full sm:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rakit-500 focus:border-rakit-500 sm:text-sm transition duration-150 ease-in-out shadow-sm"
                                placeholder="Cari No. Invoice atau Nama Barang..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filter Tabs - Lebar Penuh dengan garis bawah yang rapi */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex gap-8" aria-label="Tabs">
                            {["all", "active", "done"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab
                                            ? "border-rakit-800 text-rakit-800"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    {tab === "all"
                                        ? "Semua Pesanan"
                                        : tab === "active"
                                        ? "Sedang Berjalan"
                                        : "Selesai"}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-4">
                        {transactions.map((trx) => {
                            const statusInfo = getStatusInfo(trx.status);
                            const StatusIcon = statusInfo.icon;

                            return (
                                <Link
                                    key={trx.id}
                                    href={`/transaction/${trx.id}`}
                                    className="block group bg-white border border-gray-200 rounded-2xl p-6 hover:border-rakit-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        {/* Kolom Kiri: Info Utama */}
                                        <div className="flex items-start gap-5 flex-1">
                                            {/* Icon Bag Besar */}
                                            <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gray-50 items-center justify-center shrink-0 border border-gray-100">
                                                <ShoppingBag
                                                    size={24}
                                                    className="text-gray-400"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                        {trx.id}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        •
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {trx.date}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-rakit-800 transition-colors mb-1 truncate">
                                                    {trx.item_name}
                                                </h3>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {trx.specs}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Kolom Kanan: Status & Harga */}
                                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-2 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6 md:border-l md:border-gray-100 min-w-[180px]">
                                            <div className="text-left md:text-right">
                                                <p className="text-xs text-gray-400 mb-0.5">
                                                    Total Harga
                                                </p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(trx.total_price)}
                                                </p>
                                            </div>

                                            <div
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusInfo.color}`}
                                            >
                                                <StatusIcon size={14} />
                                                <span>{statusInfo.label}</span>
                                            </div>
                                        </div>

                                        {/* Chevron (Indikator Klik) */}
                                        <div className="hidden md:flex items-center justify-center text-gray-300 group-hover:text-rakit-600 transition-colors pl-2">
                                            <ChevronRight size={24} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
