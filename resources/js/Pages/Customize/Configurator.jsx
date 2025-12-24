import React from "react";
import {
    Ruler,
    Layers,
    GripVertical,
    DoorOpen,
    Lightbulb,
    Lock,
} from "lucide-react";
import ConfigSection from "./ConfigSection";

// Komponen Slider Custom
const SliderControl = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    unit = "cm",
}) => (
    <div>
        <div className="flex justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {label}
            </label>
            <span className="text-xs font-bold text-rakit-800 bg-rakit-100 px-2 py-0.5 rounded">
                {value} {unit}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rakit-600 hover:accent-rakit-500"
        />
    </div>
);

export default function Configurator({
    config,
    handleChange,
    activeSection,
    toggleSection,
}) {
    return (
        <div className="space-y-1">
            {/* 1. DIMENSI */}
            <ConfigSection
                title="Dimensi & Ukuran"
                icon={Ruler}
                isOpen={activeSection === "dimensions"}
                onClick={() => toggleSection("dimensions")}
            >
                <SliderControl
                    label="Lebar Kabinet"
                    value={config.width}
                    min={80}
                    max={300}
                    step={10}
                    onChange={(v) => handleChange("width", v)}
                />
                <SliderControl
                    label="Tinggi Total"
                    value={config.height}
                    min={150}
                    max={300}
                    step={10}
                    onChange={(v) => handleChange("height", v)}
                />
                <SliderControl
                    label="Kedalaman"
                    value={config.depth}
                    min={40}
                    max={80}
                    step={5}
                    onChange={(v) => handleChange("depth", v)}
                />
            </ConfigSection>

            {/* 2. STRUKTUR */}
            <ConfigSection
                title="Struktur Dasar"
                icon={Layers}
                isOpen={activeSection === "structure"}
                onClick={() => toggleSection("structure")}
            >
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                        Tinggi Kaki (Plint)
                    </label>
                    <div className="flex gap-2">
                        {[0, 5, 10].map((val) => (
                            <button
                                key={val}
                                onClick={() => handleChange("plinth", val)}
                                className={`flex-1 py-2 text-xs rounded-lg border transition-all ${
                                    config.plinth === val
                                        ? "border-rakit-600 bg-rakit-600 text-white shadow-md"
                                        : "border-gray-200 text-gray-600 hover:border-rakit-300"
                                }`}
                            >
                                {val === 0 ? "Tanpa" : `${val} cm`}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        Penutup Belakang
                    </span>
                    <input
                        type="checkbox"
                        checked={config.backPanel}
                        onChange={(e) =>
                            handleChange("backPanel", e.target.checked)
                        }
                        className="w-5 h-5 text-rakit-600 border-gray-300 rounded focus:ring-rakit-500"
                    />
                </div>
            </ConfigSection>

            {/* 3. INTERIOR */}
            <ConfigSection
                title="Interior & Rak"
                icon={GripVertical}
                isOpen={activeSection === "interior"}
                onClick={() => toggleSection("interior")}
            >
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                        Sekat Vertikal
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                config.partitions > 0 &&
                                handleChange(
                                    "partitions",
                                    config.partitions - 1
                                )
                            }
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-rakit-50"
                        >
                            -
                        </button>
                        <span className="font-bold text-rakit-800 text-sm">
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
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-rakit-50"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                        Jumlah Ambalan
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                config.shelves > 0 &&
                                handleChange("shelves", config.shelves - 1)
                            }
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-rakit-50"
                        >
                            -
                        </button>
                        <span className="font-bold text-rakit-800 text-sm">
                            {config.shelves}
                        </span>
                        <button
                            onClick={() =>
                                config.shelves < 10 &&
                                handleChange("shelves", config.shelves + 1)
                            }
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-rakit-50"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50/50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-yellow-100 rounded-full text-yellow-600">
                            <Lightbulb size={14} />
                        </div>
                        <span className="text-sm font-medium text-yellow-800">
                            LED Strip
                        </span>
                    </div>
                    <input
                        type="checkbox"
                        checked={config.ledStrip}
                        onChange={(e) =>
                            handleChange("ledStrip", e.target.checked)
                        }
                        className="w-5 h-5 text-yellow-500 border-yellow-300 rounded focus:ring-yellow-500"
                    />
                </div>
            </ConfigSection>

            {/* 4. PINTU */}
            <ConfigSection
                title="Pintu & Aksesoris"
                icon={DoorOpen}
                isOpen={activeSection === "door"}
                onClick={() => toggleSection("door")}
            >
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                        Tipe Pintu
                    </label>
                    <div className="space-y-2">
                        {["none", "swing", "sliding"].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleChange("doorType", type)}
                                className={`w-full text-left px-4 py-3 rounded-xl border flex justify-between items-center transition-all ${
                                    config.doorType === type
                                        ? "border-rakit-600 bg-rakit-50 text-rakit-800 ring-1 ring-rakit-600"
                                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                                }`}
                            >
                                <span className="text-sm font-medium capitalize">
                                    {type === "none"
                                        ? "Tanpa Pintu (Open)"
                                        : `Pintu ${type}`}
                                </span>
                                {config.doorType === type && (
                                    <div className="w-2 h-2 rounded-full bg-rakit-600"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                {config.doorType !== "none" && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mt-3">
                        <div className="flex items-center gap-2">
                            <Lock size={16} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">
                                Kunci Pengaman
                            </span>
                        </div>
                        <input
                            type="checkbox"
                            checked={config.lock}
                            onChange={(e) =>
                                handleChange("lock", e.target.checked)
                            }
                            className="w-5 h-5 text-rakit-600 border-gray-300 rounded focus:ring-rakit-500"
                        />
                    </div>
                )}
            </ConfigSection>
        </div>
    );
}
