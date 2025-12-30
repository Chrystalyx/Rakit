import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Visualizer from "../Customize/Visualizer";
import {
    MapPin,
    Truck,
    ShieldCheck,
    ChevronRight,
    User,
    Phone,
    ArrowLeft,
    Wallet,
    Ruler,
    Layers,
    Palette,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

export default function Checkout() {
    // --- STATE FORM ---
    const [shipping, setShipping] = useState({
        recipient: "Daffa Maulana",
        phone: "0812-3456-7890",
        address: "Jl. Sukabirus No. 64, RT 01 RW 09",
        city: "Bandung",
        zip: "40257",
        courier: "lalamove",
    });

    const [paymentMethod, setPaymentMethod] = useState("bca");

    // --- DUMMY DATA LENGKAP ---
    const productConfig = {
        name: "Lemari Pakaian 3 Pintu Custom",
        price: 4500000,

        // Config Teknis untuk Visualizer
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

        // Data Material & Harga untuk Rincian
        components: {
            base: { name: "Multiplek Meranti 18mm", price: 2150000 },
            finish: { name: "HPL Taco - Folk Walnut (TH-888)", price: 1850000 },
            features: [
                { name: "Pintu Swing (Soft Close)", price: 250000 },
                { name: "Kunci Pengaman (x2)", price: 100000 },
                { name: "LED Strip Warm White", price: 350000 },
            ],
        },

        // Object finishingLayer (Penting untuk Visualizer)
        finishingLayer: {
            id: "hpl-solid-1",
            texture:
                "/storage/materials/BMSFcDRQDiQEQJ36dUeq10p1lAJ0zBuF6MeffdkC.jpg",
        },
    };

    const selectedCrafter = {
        name: "Workshop Kayu Jati",
        location: "Bandung",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    };

    // Helper Format Rupiah
    const formatRp = (val) => new Intl.NumberFormat("id-ID").format(val);

    // Kalkulasi Biaya
    const featuresTotal = productConfig.components.features.reduce(
        (acc, curr) => acc + curr.price,
        0
    );
    const productSubtotal =
        productConfig.components.base.price +
        productConfig.components.finish.price +
        featuresTotal;
    const shippingCost = 150000;
    const appFee = 25000;
    const grandTotal = productSubtotal + shippingCost + appFee;

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShipping((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <GuestLayout hideFooter={true}>
            <Head title="Checkout" />

            <div className="flex flex-col lg:flex-row min-h-screen bg-white font-sans text-gray-900">
                {/* ================= KOLOM KIRI (VISUALIZER & SPECS) ================= */}
                <div className="w-full lg:w-[45%] bg-rakit-50 lg:h-screen lg:sticky lg:top-0 border-r border-rakit-200 overflow-y-auto custom-scrollbar order-1 lg:order-1">
                    <div className="p-6 lg:p-10 flex flex-col h-full">
                        {/* Tombol Kembali */}
                        <div className="mb-6">
                            <Link
                                href="/pengrajin"
                                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-rakit-800 transition"
                            >
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline">
                                    Kembali
                                </span>
                            </Link>
                        </div>

                        {/* Judul Produk */}
                        <div className="mb-6">
                            <span className="px-3 py-1 bg-rakit-200 text-rakit-800 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 inline-block">
                                Custom Order
                            </span>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                {productConfig.name}
                            </h1>
                        </div>

                        {/* AREA VISUALIZER */}
                        <div className="relative w-full aspect-square bg-white rounded-3xl shadow-sm border border-rakit-100 mb-8 overflow-hidden flex items-center justify-center p-8 group">
                            <Visualizer config={productConfig} />

                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-100 text-xs font-medium text-gray-600 shadow-sm flex items-center gap-2">
                                <Ruler size={14} />
                                {productConfig.width} x {productConfig.height} x{" "}
                                {productConfig.depth} cm
                            </div>
                        </div>

                        {/* Rincian Spesifikasi DENGAN HARGA */}
                        <div className="space-y-6 pb-10">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-rakit-200 pb-2">
                                Spesifikasi & Harga Satuan
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs mb-1">
                                        Material Dasar
                                    </p>
                                    <div className="font-semibold text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <Layers
                                                size={16}
                                                className="text-rakit-600"
                                            />
                                            {productConfig.components.base.name}
                                        </div>
                                        <p className="text-xs text-rakit-700 mt-1 font-bold pl-6">
                                            Rp{" "}
                                            {formatRp(
                                                productConfig.components.base
                                                    .price
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs mb-1">
                                        Finishing
                                    </p>
                                    <div className="font-semibold text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <Palette
                                                size={16}
                                                className="text-rakit-600"
                                            />
                                            {
                                                productConfig.components.finish
                                                    .name
                                            }
                                        </div>
                                        <p className="text-xs text-rakit-700 mt-1 font-bold pl-6">
                                            Rp{" "}
                                            {formatRp(
                                                productConfig.components.finish
                                                    .price
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs mb-2">
                                    Fitur Tambahan
                                </p>
                                <div className="flex flex-col gap-2">
                                    {productConfig.components.features.map(
                                        (feat, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Sparkles
                                                        size={14}
                                                        className="text-yellow-500"
                                                    />
                                                    {feat.name}
                                                </div>
                                                <span className="text-xs font-bold text-rakit-800 bg-rakit-50 px-2 py-1 rounded">
                                                    Rp {formatRp(feat.price)}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= KOLOM KANAN (FORM CHECKOUT) ================= */}
                <div className="w-full lg:w-[55%] bg-white order-2 lg:order-2">
                    <div className="max-w-2xl mx-auto p-6 lg:p-12 lg:pt-16">
                        {/* Stepper */}
                        <div className="flex items-center gap-3 text-sm mb-10">
                            <span className="text-gray-400">1. Desain</span>
                            <ChevronRight size={14} className="text-gray-300" />
                            <span className="text-gray-400">2. Pengrajin</span>
                            <ChevronRight size={14} className="text-gray-300" />
                            <span className="font-bold text-rakit-800 border-b-2 border-rakit-800 pb-0.5">
                                3. Pembayaran
                            </span>
                        </div>

                        {/* SECTION 1: ALAMAT */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rakit-100 text-rakit-700 text-xs font-bold">
                                    1
                                </span>
                                Informasi Pengiriman
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <User size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            name="recipient"
                                            value={shipping.recipient}
                                            onChange={handleShippingChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rakit-500/20 focus:border-rakit-500 transition text-sm bg-gray-50/50 focus:bg-white"
                                            placeholder="Nama Penerima"
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Phone size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={shipping.phone}
                                            onChange={handleShippingChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rakit-500/20 focus:border-rakit-500 transition text-sm bg-gray-50/50 focus:bg-white"
                                            placeholder="Nomor Telepon"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                                        <MapPin size={16} />
                                    </div>
                                    <textarea
                                        name="address"
                                        rows="2"
                                        value={shipping.address}
                                        onChange={handleShippingChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rakit-500/20 focus:border-rakit-500 transition text-sm bg-gray-50/50 focus:bg-white resize-none"
                                        placeholder="Alamat Lengkap"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: KURIR */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rakit-100 text-rakit-700 text-xs font-bold">
                                    2
                                </span>
                                Metode Pengiriman
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    {
                                        id: "lalamove",
                                        name: "Lalamove Van",
                                        price: 150000,
                                        desc: "Instan",
                                    },
                                    {
                                        id: "deliveree",
                                        name: "Deliveree",
                                        price: 145000,
                                        desc: "1-2 Hari",
                                    },
                                    {
                                        id: "pickup",
                                        name: "Ambil Sendiri",
                                        price: 0,
                                        desc: "Di Workshop",
                                    },
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() =>
                                            setShipping({
                                                ...shipping,
                                                courier: opt.id,
                                            })
                                        }
                                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                                            shipping.courier === opt.id
                                                ? "border-rakit-600 bg-rakit-50/50"
                                                : "border-gray-100 hover:border-gray-200"
                                        }`}
                                    >
                                        {shipping.courier === opt.id && (
                                            <div className="absolute top-2 right-2 text-rakit-600">
                                                <CheckCircle2
                                                    size={16}
                                                    fill="currentColor"
                                                    className="text-white"
                                                />
                                            </div>
                                        )}
                                        <div className="text-sm font-bold text-gray-900">
                                            {opt.name}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {opt.desc}
                                        </div>
                                        <div className="mt-3 text-sm font-bold text-rakit-800">
                                            {opt.price === 0
                                                ? "Gratis"
                                                : `Rp ${formatRp(opt.price)}`}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 3: PEMBAYARAN */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rakit-100 text-rakit-700 text-xs font-bold">
                                    3
                                </span>
                                Pembayaran
                            </h2>
                            <div className="space-y-3">
                                {[
                                    {
                                        id: "bca",
                                        name: "Virtual Account BCA",
                                        icon: "🏦",
                                    },
                                    {
                                        id: "mandiri",
                                        name: "Virtual Account Mandiri",
                                        icon: "🏦",
                                    },
                                    {
                                        id: "gopay",
                                        name: "GoPay / QRIS",
                                        icon: "📱",
                                    },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() =>
                                            setPaymentMethod(method.id)
                                        }
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                            paymentMethod === method.id
                                                ? "border-rakit-600 bg-rakit-50/30 shadow-sm"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">
                                                {method.icon}
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {method.name}
                                            </span>
                                        </div>
                                        <div
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                paymentMethod === method.id
                                                    ? "border-rakit-600 bg-rakit-600"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            {paymentMethod === method.id && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 flex gap-3">
                                <ShieldCheck
                                    size={20}
                                    className="text-green-600 shrink-0"
                                />
                                <p className="text-xs text-green-800 leading-relaxed">
                                    <strong>Pembayaran Aman (Escrow).</strong>{" "}
                                    Dana Anda ditahan oleh RAKIT dan baru
                                    diteruskan ke
                                    <span className="font-bold">
                                        {" "}
                                        {selectedCrafter.name}
                                    </span>{" "}
                                    setelah Anda mengonfirmasi penerimaan
                                    barang.
                                </p>
                            </div>
                        </div>

                        {/* SECTION 4: COST BREAKDOWN */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4">
                                Ringkasan Biaya
                            </h3>
                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Total Material & Jasa</span>
                                    <span>Rp {formatRp(productSubtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>
                                        Ongkos Kirim ({shipping.courier})
                                    </span>
                                    <span className="text-green-600 font-medium">
                                        {shippingCost === 0
                                            ? "Gratis"
                                            : `Rp ${formatRp(shippingCost)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Biaya Layanan & Penanganan</span>
                                    <span>Rp {formatRp(appFee)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                                    <span className="font-bold text-gray-900 text-lg">
                                        Total Bayar
                                    </span>
                                    <span className="font-bold text-rakit-800 text-2xl">
                                        Rp {formatRp(grandTotal)}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-rakit-800 hover:bg-rakit-900 text-white font-bold rounded-xl shadow-lg shadow-rakit-800/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                                <Wallet size={18} />
                                Bayar Sekarang
                            </button>
                            <p className="text-[10px] text-center text-gray-400 mt-4">
                                Dengan melanjutkan, Anda menyetujui Syarat &
                                Ketentuan RAKIT.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
