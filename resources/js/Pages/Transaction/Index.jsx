import React, { useState, useEffect, useCallback } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Search,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Truck,
    ShoppingBag,
    ChevronRight,
    AlertCircle
} from "lucide-react";
import debounce from "lodash/debounce";

export default function TransactionIndex({ transactions = [], filters = {} }) {
    const { auth } = usePage().props;
    const userRole = auth.user.role;

    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const [activeTab, setActiveTab] = useState(filters?.tab || "all");

    const getRouteName = (type, id = null) => {
        const prefix = userRole === 'crafter' ? 'crafter.transactions' : 'customer.transactions';
        return id ? route(`${prefix}.${type}`, id) : route(`${prefix}.${type}`);
    };

    const handleSearch = useCallback(
        debounce((value) => {
            router.get(
                getRouteName('index'),
                { search: value, tab: activeTab },
                { preserveState: true, replace: true }
            );
        }, 500),
        [activeTab, userRole]
    );

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearch(e.target.value);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.get(
            getRouteName('index'),
            { search: searchQuery, tab: tab },
            { preserveState: true }
        );
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case "pending": return { color: "text-yellow-700 bg-yellow-50 border-yellow-200", icon: Clock, label: "Menunggu Pembayaran" };
            case "processing":
            case "on_progress": return { color: "text-blue-700 bg-blue-50 border-blue-200", icon: Package, label: "Sedang Diproses" };
            case "shipping": return { color: "text-purple-700 bg-purple-50 border-purple-200", icon: Truck, label: "Dalam Pengiriman" };
            case "done":
            case "completed": return { color: "text-green-700 bg-green-50 border-green-200", icon: CheckCircle, label: "Selesai" };
            case "cancelled":
            case "rejected":
            case "ditolak":
                return { color: "text-red-700 bg-red-50 border-red-200", icon: XCircle, label: "Ditolak / Batal" };

            default: return { color: "text-gray-700 bg-gray-50 border-gray-200", icon: Clock, label: status };
        }
    };

    return (
        <GuestLayout>
            <Head title="Riwayat Transaksi" />

            <div className="bg-gray-50/50 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Riwayat Pesanan</h1>
                            <p className="text-gray-500 mt-1">Kelola dan pantau semua pesanan furnitur custom Anda.</p>
                        </div>

                        <div className="relative w-full sm:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-rakit-500 focus:border-rakit-500 sm:text-sm transition duration-150 ease-in-out shadow-sm"
                                placeholder="Cari No. Invoice atau Nama Barang..."
                                value={searchQuery}
                                onChange={onSearchChange}
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                        <nav className="-mb-px flex gap-8" aria-label="Tabs">
                            {[
                                { id: "all", label: "Semua Pesanan" },
                                { id: "active", label: "Sedang Berjalan" },
                                { id: "done", label: "Selesai" },
                                { id: "rejected", label: "Ditolak / Batal" }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? "border-rakit-800 text-rakit-800"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-4">
                        {transactions.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 border-dashed">
                                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    {activeTab === 'rejected' ? <XCircle className="text-gray-400" size={32} /> : <Package className="text-gray-400" size={32} />}
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {activeTab === 'rejected' ? 'Tidak ada pesanan ditolak' : 'Belum ada transaksi'}
                                </h3>
                                <p className="text-gray-500 mt-1">
                                    {activeTab === 'rejected' ? 'Semua pesanan Anda berjalan lancar.' : 'Pesanan Anda akan muncul di sini.'}
                                </p>
                            </div>
                        ) : (
                            transactions.map((trx) => {
                                const statusInfo = getStatusInfo(trx.status);
                                const StatusIcon = statusInfo.icon;
                                const isRejected = ['rejected', 'ditolak', 'cancelled'].includes(trx.status);

                                return (
                                    <Link
                                        key={trx.id}
                                        href={getRouteName('show', trx.original_id)}
                                        className={`block group bg-white border rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-0.5 ${isRejected ? 'border-red-200 hover:border-red-300 hover:shadow-red-50' : 'border-gray-200 hover:border-rakit-300 hover:shadow-lg'
                                            }`}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-start gap-5 flex-1">
                                                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gray-50 items-center justify-center shrink-0 border border-gray-100">
                                                    <ShoppingBag size={24} className="text-gray-400" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                            {trx.id}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-500">{trx.date}</span>
                                                    </div>

                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-rakit-800 transition-colors mb-1 truncate">
                                                        {trx.item_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 truncate">{trx.specs}</p>

                                                    {/* Info Status Ditolak */}
                                                    {isRejected && (
                                                        <p className="text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                                                            <AlertCircle size={12} /> Pesanan Ditolak / Dibatalkan
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-2 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6 md:border-l md:border-gray-100 min-w-[180px]">
                                                <div className="text-left md:text-right">
                                                    <p className="text-xs text-gray-400 mb-0.5">Total Harga</p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        Rp {new Intl.NumberFormat("id-ID").format(trx.total_price)}
                                                    </p>
                                                </div>

                                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                                                    <StatusIcon size={14} />
                                                    <span>{statusInfo.label}</span>
                                                </div>
                                            </div>

                                            <div className="hidden md:flex items-center justify-center text-gray-300 group-hover:text-rakit-600 transition-colors pl-2">
                                                <ChevronRight size={24} />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}