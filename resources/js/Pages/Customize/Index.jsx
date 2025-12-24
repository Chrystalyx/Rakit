import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Configurator from "./Configurator";
import Visualizer from "./Visualizer";
import Summary from "./Summary";

const MATERIALS = [
    {
        id: "M01",
        name: "Jati Klasik",
        type: "Wood",
        color: "#8a5a2b",
        price: 0,
    },
    {
        id: "M02",
        name: "Putih Modern",
        type: "Solid",
        color: "#f3f4f6",
        price: 150000,
    },
    {
        id: "M03",
        name: "Hitam Matte",
        type: "Solid",
        color: "#1f2937",
        price: 200000,
    },
    {
        id: "M04",
        name: "Walnut Gelap",
        type: "Wood",
        color: "#452208",
        price: 50000,
    },
    {
        id: "M05",
        name: "Abu Oak",
        type: "Wood",
        color: "#78716c",
        price: 100000,
    },
];

export default function CustomizeIndex() {
    const [activeSection, setActiveSection] = useState("dimensions");
    const [config, setConfig] = useState({
        width: 120,
        height: 200,
        depth: 60,
        plinth: 10,
        backPanel: true,
        partitions: 1,
        shelves: 4,
        ledStrip: false,
        doorType: "swing",
        handleType: "standard",
        lock: false,
        material: MATERIALS[0],
    });
    const [totalPrice, setTotalPrice] = useState(0);

    // Kalkulasi Harga Real-time
    useEffect(() => {
        const volume = (config.width * config.height * config.depth) / 10000;
        let basePrice = volume * 15000;

        if (config.backPanel) basePrice += config.width * config.height * 50;
        basePrice += config.partitions * 150000;
        basePrice += config.shelves * 75000;
        if (config.ledStrip) basePrice += 350000;
        if (config.doorType !== "none")
            basePrice += config.width * config.height * 100;
        if (config.lock) basePrice += 120000;
        basePrice += config.material.price;

        setTotalPrice(basePrice);
    }, [config]);

    const handleChange = (key, value) =>
        setConfig((prev) => ({ ...prev, [key]: value }));
    const toggleSection = (section) =>
        setActiveSection(activeSection === section ? null : section);

    return (
        <GuestLayout>
            <Head title="Studio Kustomisasi - Rakit" />

            {/* WRAPPER UTAMA: Full Height tanpa scroll window (kecuali mobile) */}
            <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-rakit-50 overflow-hidden">
                {/* 1. KOLOM KIRI: KONFIGURATOR (Scrollable) */}
                <div className="w-full lg:w-[320px] xl:w-[360px] bg-white border-r border-rakit-200 flex flex-col h-full z-20 shadow-xl">
                    <div className="p-6 border-b border-rakit-100 bg-white z-10">
                        <h2 className="text-xl font-bold text-rakit-800">
                            Konfigurasi
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Sesuaikan spesifikasi lemari Anda.
                        </p>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                        <Configurator
                            config={config}
                            handleChange={handleChange}
                            activeSection={activeSection}
                            toggleSection={toggleSection}
                        />
                    </div>
                </div>

                {/* 2. KOLOM TENGAH: VISUALIZER (Fixed Stage) */}
                <div className="flex-1 bg-rakit-100 relative flex items-center justify-center p-8 lg:p-16 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(#602d0d 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    ></div>
                    <Visualizer config={config} />
                </div>

                {/* 3. KOLOM KANAN: SUMMARY & MATERIAL (Scrollable) */}
                <div className="w-full lg:w-[340px] xl:w-[380px] bg-white border-l border-rakit-200 flex flex-col h-full z-20 shadow-xl">
                    <div className="p-6 border-b border-rakit-100">
                        <h2 className="text-xl font-bold text-rakit-800">
                            Detail Pesanan
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Review material dan estimasi harga.
                        </p>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <Summary
                            config={config}
                            handleChange={handleChange}
                            totalPrice={totalPrice}
                            materials={MATERIALS}
                        />
                    </div>
                    {/* Bottom Action (Fixed) */}
                    <div className="p-6 border-t border-rakit-200 bg-rakit-50">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-sm text-gray-500">
                                Total Estimasi
                            </span>
                            <span className="text-2xl font-bold text-rakit-800">
                                Rp{" "}
                                {new Intl.NumberFormat("id-ID").format(
                                    totalPrice
                                )}
                            </span>
                        </div>
                        <button className="w-full py-4 bg-rakit-800 hover:bg-rakit-900 text-white font-bold rounded-xl shadow-lg shadow-rakit-800/20 transition-all active:scale-[0.98]">
                            Pesan Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
