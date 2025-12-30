import React from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Printer, MessageCircle, MapPin, Layers, Ruler, Palette,
    Box, FileText, DoorOpen, GripVertical, Lightbulb,
    Lock, ArrowLeft, Truck, Phone
} from "lucide-react";

export default function TransactionDetail({ transaction }) {
    const steps = ["pending", "processing", "shipping", "done"];
    const stepLabels = ["Menunggu Bayar", "Diproses", "Dikirim", "Selesai"];

    let currentStepIdx = steps.indexOf(transaction.status);
    if (transaction.status === 'paid' || transaction.status === 'pending_payment') currentStepIdx = 0;
    if (currentStepIdx === -1 && transaction.status === 'on_progress') currentStepIdx = 1;
    if (currentStepIdx === -1) currentStepIdx = 0;

    const formatBool = (val) => (val ? "Ya" : "Tidak");

    const config = transaction.item.config || {};

    return (
        <GuestLayout>
            <Head title={`Detail Transaksi ${transaction.id}`} />

            <div className="bg-gray-50/50 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Header Navigasi */}
                    <div className="mb-8">
                        <Link href="/transactions" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-rakit-800 transition mb-4">
                            <ArrowLeft size={18} /> Kembali ke Riwayat
                        </Link>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                Detail Pesanan <span className="text-gray-400 font-normal">#{transaction.id}</span>
                            </h1>
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                                    {transaction.status.replace('_', ' ')}
                                </span>
                                <button className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition shadow-sm" title="Cetak Invoice">
                                    <Printer size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- KOLOM KIRI (Detail Utama) --- */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* 1. STATUS TRACKER */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-6">Status Pesanan</h3>
                                <div className="relative">
                                    <div className="absolute top-3 left-0 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
                                    <div
                                        className="absolute top-3 left-0 h-1 bg-rakit-800 rounded-full -z-10 transition-all duration-500"
                                        style={{ width: `${(currentStepIdx / (stepLabels.length - 1)) * 100}%` }}
                                    ></div>
                                    <div className="flex justify-between">
                                        {stepLabels.map((label, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all ${idx <= currentStepIdx ? "bg-rakit-800 border-rakit-800 text-white" : "bg-white border-gray-200 text-gray-300"}`}>
                                                    {idx + 1}
                                                </div>
                                                <span className={`text-xs font-medium text-center max-w-[80px] ${idx <= currentStepIdx ? "text-rakit-800" : "text-gray-400"}`}>
                                                    {label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 2. SPESIFIKASI PRODUK */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Box size={18} className="text-gray-400" /> Spesifikasi Produk
                                    </h3>
                                </div>
                                <div className="p-8">
                                    <div className="flex flex-col sm:flex-row gap-8 mb-8">
                                        <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                                            <img src={transaction.item.image} alt={transaction.item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{transaction.item.name}</h2>
                                            <p className="text-gray-500 text-sm mb-6">Dipesan pada {transaction.created_at}</p>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <Layers size={18} className="text-rakit-600" />
                                                    <span className="text-gray-500">Material Dasar:</span>
                                                    <span className="font-bold text-gray-900">{config.base_material || '-'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                    <Palette size={18} className="text-rakit-600" />
                                                    <span className="text-gray-500">Finishing:</span>
                                                    <span className="font-bold text-gray-900">{config.finish_material || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grid Detail Teknis */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 border-t border-gray-100 pt-8">
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Ruler size={14} /> Dimensi</h4>
                                            <ul className="space-y-3 text-sm text-gray-600">
                                                <li className="flex justify-between border-b border-dashed border-gray-200 pb-1"><span>Lebar</span> <span className="font-bold text-gray-900">{config.width} cm</span></li>
                                                <li className="flex justify-between border-b border-dashed border-gray-200 pb-1"><span>Tinggi</span> <span className="font-bold text-gray-900">{config.height} cm</span></li>
                                                <li className="flex justify-between border-b border-dashed border-gray-200 pb-1"><span>Kedalaman</span> <span className="font-bold text-gray-900">{config.depth} cm</span></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Layers size={14} /> Struktur</h4>
                                            <ul className="space-y-3 text-sm text-gray-600">
                                                <li className="flex justify-between border-b border-dashed border-gray-200 pb-1"><span>Tinggi Kaki</span> <span className="font-bold text-gray-900">{config.plinth > 0 ? `${config.plinth} cm` : "Tanpa"}</span></li>
                                                <li className="flex justify-between border-b border-dashed border-gray-200 pb-1"><span>Penutup Belakang</span> <span className="font-bold text-gray-900">{formatBool(config.backPanel)}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- KOLOM KANAN (Sidebar) --- */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* INFO PENGRAJIN */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide text-gray-400">Pengrajin</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={transaction.crafter.avatar} alt="Crafter" className="w-14 h-14 rounded-full border-2 border-gray-100" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{transaction.crafter.name}</h3>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {transaction.crafter.location}</p>
                                    </div>
                                </div>
                                <button className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-bold hover:bg-green-100 transition border border-green-100">
                                    <MessageCircle size={18} /> Chat Sekarang
                                </button>
                            </div>

                            {/* INFORMASI PENGIRIMAN */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100"><h3 className="font-bold text-gray-900 flex items-center gap-2"><Truck size={18} className="text-gray-400" /> Informasi Pengiriman</h3></div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-2">Penerima</p>
                                            <p className="font-bold text-gray-900">{transaction.shipping.recipient}</p>
                                            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {transaction.shipping.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase mb-2">Alamat</p>
                                            <p className="text-sm text-gray-700 leading-relaxed mb-4">{transaction.shipping.address}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-50">
                                            <p className="text-xs text-gray-400 mb-1">Kurir</p>
                                            <p className="text-sm font-medium text-gray-900">{transaction.shipping.courier}</p>
                                            {transaction.shipping.tracking_code !== '-' && (
                                                <p className="text-sm font-medium text-rakit-800 font-mono mt-1">Resi: {transaction.shipping.tracking_code}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RINCIAN PEMBAYARAN */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-100"><h3 className="font-bold text-gray-900 flex items-center gap-2"><FileText size={18} className="text-gray-400" /> Rincian Pembayaran</h3></div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between text-sm"><span className="text-gray-500">Metode</span> <span className="font-medium text-gray-900">{transaction.payment.method}</span></div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Status</span>
                                        <span className={`font-bold px-2 py-0.5 rounded text-xs uppercase ${transaction.payment.status === 'Paid' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'}`}>{transaction.payment.status}</span>
                                    </div>
                                    <hr className="border-dashed border-gray-200 my-2" />
                                    <div className="pt-2 flex justify-between items-center">
                                        <span className="font-bold text-gray-900 text-lg">Total</span>
                                        <span className="text-2xl font-bold text-rakit-800">Rp {new Intl.NumberFormat("id-ID").format(transaction.payment.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}