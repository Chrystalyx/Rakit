import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronUp,
    Ruler,
    Layers,
    DoorOpen,
    Lightbulb,
    Lock,
    GripVertical,
    CheckCircle2,
    Info,
} from "lucide-react";

// --- DATA DUMMY MATERIAL ---
const materials = [
    {
        id: "M01",
        name: "Classic Teak",
        type: "Wood",
        color: "#8a5a2b",
        price: 0,
    }, // Base price
    {
        id: "M02",
        name: "Modern White",
        type: "Solid",
        color: "#f3f4f6",
        price: 150000,
    },
    {
        id: "M03",
        name: "Matte Black",
        type: "Solid",
        color: "#1f2937",
        price: 200000,
    },
    {
        id: "M04",
        name: "Dark Walnut",
        type: "Wood",
        color: "#452208",
        price: 50000,
    },
    {
        id: "M05",
        name: "Grey Oak",
        type: "Wood",
        color: "#78716c",
        price: 100000,
    },
];

// --- KOMPONEN ACCORDION ITEM ---
const ConfigSection = ({ title, icon: Icon, isOpen, onClick, children }) => {
    return (
        <div className="border border-rakit-300 rounded-xl bg-white overflow-hidden mb-3 shadow-sm">
            <button
                onClick={onClick}
                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                    isOpen
                        ? "bg-rakit-50 text-rakit-800"
                        : "text-gray-600 hover:bg-gray-50"
                }`}
            >
                <div className="flex items-center gap-3 font-semibold">
                    <Icon
                        size={20}
                        className={isOpen ? "text-rakit-500" : "text-gray-400"}
                    />
                    {title}
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-rakit-100"
                    >
                        <div className="p-5 space-y-4">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Customize() {
    // --- STATE CONFIGURATION ---
    const [activeSection, setActiveSection] = useState("dimensions");

    // Spesifikasi Lemari
    const [config, setConfig] = useState({
        width: 120, // cm
        height: 200, // cm
        depth: 60, // cm
        plinth: 10, // cm (kaki kabinet)
        backPanel: true,
        partitions: 1, // sekat vertikal
        shelves: 4, // ambalan horizontal
        ledStrip: false,
        doorType: "swing", // none, swing, sliding
        handleType: "standard",
        lock: false,
        material: materials[0],
    });

    // Estimasi Harga (Logika Sederhana untuk RAB Transparan)
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Rumus Harga Dummy (Volume based + Addons)
        const volume = (config.width * config.height * config.depth) / 10000; // factor
        let basePrice = volume * 15000;

        // Addons
        if (config.backPanel) basePrice += config.width * config.height * 50;
        basePrice += config.partitions * 150000;
        basePrice += config.shelves * 75000;
        if (config.ledStrip) basePrice += 350000;
        if (config.doorType !== "none")
            basePrice += config.width * config.height * 100;
        if (config.lock) basePrice += 120000;

        // Material Upgrade
        basePrice += config.material.price;

        setTotalPrice(basePrice);
    }, [config]);

    const handleChange = (key, value) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <GuestLayout>
            <Head title="Kustomisasi Lemari - Rakit" />

            {/* HEADER PAGE */}
            <div className="bg-white border-b border-rakit-300 py-6 px-6 shadow-sm sticky top-0 z-30">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-rakit-800">
                            Studio Kustomisasi Rakit
                        </h1>
                        <p className="text-sm text-gray-500">
                            Desain lemari impian Anda, dapatkan harga transparan
                            seketika.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 font-medium bg-rakit-50 px-3 py-1 rounded-full border border-rakit-200">
                            Estimasi RAB
                        </span>
                        <span className="text-2xl font-bold text-rakit-600">
                            Rp{" "}
                            {new Intl.NumberFormat("id-ID").format(totalPrice)}
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto p-4 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                    {/* --- LEFT COLUMN: CONFIGURATION --- */}
                    <div className="lg:col-span-3 space-y-2 h-fit overflow-y-auto pr-2 custom-scrollbar">
                        {/* 1. DIMENSI */}
                        <ConfigSection
                            title="Dimensi Awal"
                            icon={Ruler}
                            isOpen={activeSection === "dimensions"}
                            onClick={() => toggleSection("dimensions")}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                                        Lebar (cm)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="80"
                                            max="300"
                                            step="10"
                                            value={config.width}
                                            onChange={(e) =>
                                                handleChange(
                                                    "width",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-full accent-rakit-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <input
                                            type="number"
                                            value={config.width}
                                            onChange={(e) =>
                                                handleChange(
                                                    "width",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-20 p-2 border border-gray-300 rounded-lg text-center font-bold text-rakit-800 focus:ring-rakit-500 focus:border-rakit-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                                        Tinggi (cm)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="150"
                                            max="300"
                                            step="10"
                                            value={config.height}
                                            onChange={(e) =>
                                                handleChange(
                                                    "height",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-full accent-rakit-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <input
                                            type="number"
                                            value={config.height}
                                            onChange={(e) =>
                                                handleChange(
                                                    "height",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-20 p-2 border border-gray-300 rounded-lg text-center font-bold text-rakit-800 focus:ring-rakit-500 focus:border-rakit-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                                        Kedalaman (cm)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="40"
                                            max="80"
                                            step="5"
                                            value={config.depth}
                                            onChange={(e) =>
                                                handleChange(
                                                    "depth",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-full accent-rakit-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <input
                                            type="number"
                                            value={config.depth}
                                            onChange={(e) =>
                                                handleChange(
                                                    "depth",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-20 p-2 border border-gray-300 rounded-lg text-center font-bold text-rakit-800 focus:ring-rakit-500 focus:border-rakit-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ConfigSection>

                        {/* 2. STRUKTUR & PLINT */}
                        <ConfigSection
                            title="Struktur Kabinet"
                            icon={Layers}
                            isOpen={activeSection === "structure"}
                            onClick={() => toggleSection("structure")}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Tinggi Plint (Kaki)
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[0, 5, 10].map((val) => (
                                            <button
                                                key={val}
                                                onClick={() =>
                                                    handleChange("plinth", val)
                                                }
                                                className={`py-2 text-sm border rounded-lg transition-all ${
                                                    config.plinth === val
                                                        ? "border-rakit-500 bg-rakit-50 text-rakit-800 font-bold"
                                                        : "border-gray-200 hover:border-rakit-300"
                                                }`}
                                            >
                                                {val === 0
                                                    ? "Tanpa"
                                                    : `${val} cm`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">
                                        Penutup Belakang
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={config.backPanel}
                                            onChange={(e) =>
                                                handleChange(
                                                    "backPanel",
                                                    e.target.checked
                                                )
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rakit-500"></div>
                                    </label>
                                </div>
                            </div>
                        </ConfigSection>

                        {/* 3. INTERIOR (SEKAT & AMBALAN) */}
                        <ConfigSection
                            title="Interior & Rak"
                            icon={GripVertical}
                            isOpen={activeSection === "interior"}
                            onClick={() => toggleSection("interior")}
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">
                                        Sekat Vertikal
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                config.partitions > 0 &&
                                                handleChange(
                                                    "partitions",
                                                    config.partitions - 1
                                                )
                                            }
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="font-bold text-rakit-800 w-4 text-center">
                                            {config.partitions}
                                        </span>
                                        <button
                                            onClick={() =>
                                                config.partitions < 5 &&
                                                handleChange(
                                                    "partitions",
                                                    config.partitions + 1
                                                )
                                            }
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">
                                        Ambalan (Rak)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                config.shelves > 0 &&
                                                handleChange(
                                                    "shelves",
                                                    config.shelves - 1
                                                )
                                            }
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="font-bold text-rakit-800 w-4 text-center">
                                            {config.shelves}
                                        </span>
                                        <button
                                            onClick={() =>
                                                config.shelves < 10 &&
                                                handleChange(
                                                    "shelves",
                                                    config.shelves + 1
                                                )
                                            }
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Lightbulb
                                            size={18}
                                            className="text-yellow-600"
                                        />
                                        <span className="text-sm font-medium text-yellow-800">
                                            LED Strip
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={config.ledStrip}
                                            onChange={(e) =>
                                                handleChange(
                                                    "ledStrip",
                                                    e.target.checked
                                                )
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                                    </label>
                                </div>
                            </div>
                        </ConfigSection>

                        {/* 4. PINTU & AKSESORIS */}
                        <ConfigSection
                            title="Pintu & Aksesoris"
                            icon={DoorOpen}
                            isOpen={activeSection === "door"}
                            onClick={() => toggleSection("door")}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Tipe Pintu
                                    </label>
                                    <select
                                        value={config.doorType}
                                        onChange={(e) =>
                                            handleChange(
                                                "doorType",
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rakit-500 focus:border-rakit-500"
                                    >
                                        <option value="none">
                                            Tanpa Pintu (Open)
                                        </option>
                                        <option value="swing">
                                            Pintu Ayun (Swing)
                                        </option>
                                        <option value="sliding">
                                            Pintu Geser (Sliding)
                                        </option>
                                    </select>
                                </div>
                                {config.doorType !== "none" && (
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Lock
                                                size={18}
                                                className="text-gray-600"
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                Kunci Pengaman
                                            </span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={config.lock}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "lock",
                                                        e.target.checked
                                                    )
                                                }
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rakit-500"></div>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </ConfigSection>
                    </div>

                    {/* --- CENTER COLUMN: VISUAL PREVIEW (SVG DYNAMIC) --- */}
                    <div className="lg:col-span-6 bg-[#f4f4f5] rounded-3xl flex items-center justify-center p-8 relative overflow-hidden border border-gray-200 shadow-inner">
                        <div className="absolute top-4 left-6 text-xs font-bold text-gray-400 tracking-widest">
                            VISUALISASI RAKIT 2D
                        </div>

                        {/* DYNAMIC SVG REPRESENTATION 
                            - Menggambar lemari berdasarkan state Dimensions, Partition, Shelves
                        */}
                        <svg
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${config.width + 40} ${
                                config.height + 40
                            }`}
                            className="max-h-[600px] drop-shadow-2xl transition-all duration-500"
                            style={{ overflow: "visible" }}
                        >
                            {/* Bayangan Lantai */}
                            <ellipse
                                cx={config.width / 2 + 20}
                                cy={config.height + 35}
                                rx={config.width / 1.5}
                                ry="10"
                                fill="#000"
                                opacity="0.2"
                            />

                            {/* Badan Lemari Utama */}
                            <rect
                                x="20"
                                y="20"
                                width={config.width}
                                height={config.height}
                                fill={config.material.color}
                                stroke="#3f3f46"
                                strokeWidth="2"
                            />

                            {/* Plint (Kaki) */}
                            {config.plinth > 0 && (
                                <rect
                                    x="22"
                                    y={20 + config.height - config.plinth}
                                    width={config.width - 4}
                                    height={config.plinth - 2}
                                    fill="black"
                                    opacity="0.3"
                                />
                            )}

                            {/* Sekat Vertikal (Partitions) */}
                            {Array.from({ length: config.partitions }).map(
                                (_, i) => {
                                    const spacing =
                                        config.width / (config.partitions + 1);
                                    return (
                                        <line
                                            key={i}
                                            x1={20 + spacing * (i + 1)}
                                            y1="22"
                                            x2={20 + spacing * (i + 1)}
                                            y2={
                                                20 +
                                                config.height -
                                                (config.plinth || 2)
                                            }
                                            stroke="#000"
                                            strokeWidth="2"
                                            opacity="0.3"
                                        />
                                    );
                                }
                            )}

                            {/* Ambalan (Shelves) */}
                            {Array.from({ length: config.shelves }).map(
                                (_, i) => {
                                    const spacing =
                                        (config.height - config.plinth) /
                                        (config.shelves + 1);
                                    return (
                                        <line
                                            key={i}
                                            x1="22"
                                            y1={20 + spacing * (i + 1)}
                                            x2={20 + config.width - 2}
                                            y2={20 + spacing * (i + 1)}
                                            stroke="#000"
                                            strokeWidth="2"
                                            opacity="0.3"
                                        />
                                    );
                                }
                            )}

                            {/* LED Effect (Glow) */}
                            {config.ledStrip && (
                                <rect
                                    x="25"
                                    y="25"
                                    width={config.width - 10}
                                    height={config.height - config.plinth - 10}
                                    fill="none"
                                    stroke="#fef08a"
                                    strokeWidth="4"
                                    filter="drop-shadow(0 0 8px #facc15)"
                                    opacity="0.6"
                                />
                            )}

                            {/* Pintu (Overlay) */}
                            {config.doorType !== "none" && (
                                <g>
                                    {/* Pintu Kiri */}
                                    <rect
                                        x="20"
                                        y="20"
                                        width={config.width / 2}
                                        height={config.height}
                                        fill={config.material.color}
                                        opacity="0.9"
                                        stroke="#000"
                                        strokeWidth="1"
                                    />
                                    {/* Handle Kiri */}
                                    <rect
                                        x={config.width / 2 + 10}
                                        y={config.height / 2 + 20}
                                        width="4"
                                        height="30"
                                        fill="#d4d4d8"
                                        rx="2"
                                    />

                                    {/* Pintu Kanan */}
                                    <rect
                                        x={20 + config.width / 2}
                                        y="20"
                                        width={config.width / 2}
                                        height={config.height}
                                        fill={config.material.color}
                                        opacity="0.85" // Sedikit beda opacity biar kelihatan 2 pintu
                                        stroke="#000"
                                        strokeWidth="1"
                                    />
                                    {/* Handle Kanan */}
                                    <rect
                                        x={config.width / 2 + 26}
                                        y={config.height / 2 + 20}
                                        width="4"
                                        height="30"
                                        fill="#d4d4d8"
                                        rx="2"
                                    />

                                    {/* Visualisasi Sliding (Garis panah jika sliding) */}
                                    {config.doorType === "sliding" && (
                                        <text
                                            x={config.width / 2 + 20}
                                            y={40}
                                            fontSize="20"
                                            fill="white"
                                            opacity="0.5"
                                        >
                                            ↔
                                        </text>
                                    )}
                                </g>
                            )}

                            {/* Kunci */}
                            {config.lock && config.doorType !== "none" && (
                                <circle
                                    cx={config.width / 2 + 20}
                                    cy={config.height / 2 + 60}
                                    r="3"
                                    fill="gold"
                                    stroke="black"
                                    strokeWidth="1"
                                />
                            )}

                            {/* Dimensi Label */}
                            <text
                                x={config.width / 2 + 20}
                                y={config.height + 60}
                                textAnchor="middle"
                                fill="#71717a"
                                fontSize="14"
                                fontWeight="bold"
                            >
                                {config.width} cm
                            </text>
                            <text
                                x={config.width + 50}
                                y={config.height / 2 + 20}
                                textAnchor="middle"
                                fill="#71717a"
                                fontSize="14"
                                fontWeight="bold"
                                transform={`rotate(90, ${config.width + 50}, ${
                                    config.height / 2 + 20
                                })`}
                            >
                                {config.height} cm
                            </text>
                        </svg>

                        {/* Hint Control */}
                        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-3 rounded-xl border border-white shadow-sm max-w-xs text-xs text-gray-500">
                            <p className="flex items-center gap-2 mb-1 font-bold text-rakit-800">
                                <Info size={14} /> Info Visual
                            </p>
                            Visualisasi ini adalah representasi skematik 2D
                            untuk mempermudah estimasi proporsi. Hasil akhir
                            akan menyesuaikan standar produksi Rakit.
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: MATERIAL & SUMMARY --- */}
                    <div className="lg:col-span-3 space-y-6 h-fit">
                        {/* Material Selector */}
                        <div className="bg-white p-5 rounded-2xl border border-rakit-300 shadow-sm">
                            <h3 className="font-bold text-rakit-800 mb-4 flex items-center gap-2">
                                <Layers size={18} /> Material & Warna
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {materials.map((mat) => (
                                    <button
                                        key={mat.id}
                                        onClick={() =>
                                            handleChange("material", mat)
                                        }
                                        className={`relative group rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                                            config.material.id === mat.id
                                                ? "border-rakit-500 ring-2 ring-rakit-500/20 scale-105"
                                                : "border-transparent hover:border-gray-300"
                                        }`}
                                    >
                                        <div
                                            className="w-full h-full"
                                            style={{
                                                backgroundColor: mat.color,
                                            }}
                                        ></div>
                                        {config.material.id === mat.id && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <CheckCircle2 className="text-white" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] p-1 text-center truncate px-2">
                                            {mat.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-rakit-50 rounded-lg text-xs text-gray-600 border border-rakit-200">
                                <span className="font-bold text-rakit-800">
                                    {config.material.name}
                                </span>
                                <br />
                                Type: {config.material.type}
                                {config.material.price > 0 && (
                                    <span className="block text-rakit-600 font-bold mt-1">
                                        + Rp{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            config.material.price
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white p-5 rounded-2xl border border-rakit-300 shadow-sm">
                            <h3 className="font-bold text-rakit-800 mb-4">
                                Ringkasan Pesanan
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-600 mb-6">
                                <li className="flex justify-between">
                                    <span>Dimensi (PxLxT)</span>
                                    <span className="font-medium text-gray-900">
                                        {config.width}x{config.depth}x
                                        {config.height} cm
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Material</span>
                                    <span className="font-medium text-gray-900">
                                        {config.material.name}
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Pintu</span>
                                    <span className="font-medium text-gray-900 capitalize">
                                        {config.doorType === "none"
                                            ? "Tanpa Pintu"
                                            : config.doorType}
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Fitur Tambahan</span>
                                    <div className="text-right">
                                        {config.ledStrip && (
                                            <span className="block text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full mb-1">
                                                LED Strip
                                            </span>
                                        )}
                                        {config.lock && (
                                            <span className="block text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                                                Kunci
                                            </span>
                                        )}
                                        {!config.ledStrip && !config.lock && (
                                            <span>-</span>
                                        )}
                                    </div>
                                </li>
                            </ul>

                            <hr className="border-dashed border-gray-300 my-4" />

                            <div className="flex justify-between items-end mb-6">
                                <span className="text-gray-500 font-medium">
                                    Estimasi Total
                                </span>
                                <span className="text-2xl font-bold text-rakit-800">
                                    Rp{" "}
                                    {new Intl.NumberFormat("id-ID").format(
                                        totalPrice
                                    )}
                                </span>
                            </div>

                            <button className="w-full py-4 bg-rakit-800 hover:bg-rakit-900 text-white font-bold rounded-xl shadow-lg shadow-rakit-800/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                                Simpan Desain & Lanjut
                                <ArrowRight size={18} />
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-3">
                                Harga belum termasuk ongkos kirim.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* STICKY BOTTOM BAR (Mobile Only) */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-rakit-300 p-4 shadow-2xl z-40 flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-500">Estimasi Total</p>
                    <p className="text-xl font-bold text-rakit-800">
                        Rp {new Intl.NumberFormat("id-ID").format(totalPrice)}
                    </p>
                </div>
                <button className="px-6 py-3 bg-rakit-800 text-white font-bold rounded-xl text-sm">
                    Lanjut
                </button>
            </div>
        </GuestLayout>
    );
}

// Icon ArrowRight component (missing import fix)
function ArrowRight({ size = 24, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
