import React, { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    Check,
    Palette,
    Layers,
} from "lucide-react";

export default function Summary({
    config,
    handleChange,
    baseOptions,
    finishOptions,
}) {
    const [openBaseCategory, setOpenBaseCategory] = useState(null);

    const toggleBaseCategory = (id) => {
        setOpenBaseCategory(openBaseCategory === id ? null : id);
    };

    const formatRp = (val) => new Intl.NumberFormat("id-ID").format(val);

    return (
        <div className="space-y-8">
            {/* --- BAGIAN 1: MATERIAL DASAR (TIDAK UBAH GAMBAR) --- */}
            <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                    <Layers size={16} className="text-rakit-600" /> 1. Material
                    Dasar
                </h3>
                <div className="space-y-2">
                    {baseOptions.map((category) => {
                        const isCategoryActive =
                            config.baseMaterial.id === category.id;

                        return (
                            <div
                                key={category.id}
                                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                                    isCategoryActive
                                        ? "border-rakit-500 bg-white shadow-sm"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        toggleBaseCategory(category.id)
                                    }
                                    className={`w-full flex items-center justify-between p-3 text-left transition-colors ${
                                        openBaseCategory === category.id
                                            ? "bg-rakit-50"
                                            : "bg-white"
                                    }`}
                                >
                                    <div>
                                        <h4
                                            className={`text-xs font-bold ${
                                                isCategoryActive
                                                    ? "text-rakit-800"
                                                    : "text-gray-800"
                                            }`}
                                        >
                                            {category.name}
                                        </h4>
                                        <p className="text-[10px] text-gray-500">
                                            {category.type}
                                        </p>
                                    </div>
                                    {openBaseCategory === category.id ? (
                                        <ChevronDown
                                            size={14}
                                            className="text-gray-400"
                                        />
                                    ) : (
                                        <ChevronRight
                                            size={14}
                                            className="text-gray-300"
                                        />
                                    )}
                                </button>

                                {openBaseCategory === category.id && (
                                    <div className="bg-gray-50/50 border-t border-gray-100 divide-y divide-gray-100/50">
                                        {category.variants.map(
                                            (variant, idx) => {
                                                const isSelected =
                                                    isCategoryActive &&
                                                    config.baseMaterial
                                                        .thickness ===
                                                        variant.thickness;

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() =>
                                                            handleChange(
                                                                "baseMaterial",
                                                                {
                                                                    id: category.id,
                                                                    name: category.name,
                                                                    thickness:
                                                                        variant.thickness,
                                                                    price: variant.price,
                                                                }
                                                            )
                                                        }
                                                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-all ${
                                                            isSelected
                                                                ? "bg-rakit-100 text-rakit-900"
                                                                : "text-gray-600 hover:bg-white"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                                                                    isSelected
                                                                        ? "border-rakit-600 bg-rakit-600 text-white"
                                                                        : "border-gray-300 bg-white"
                                                                }`}
                                                            >
                                                                {isSelected && (
                                                                    <Check
                                                                        size={8}
                                                                        strokeWidth={
                                                                            4
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <span
                                                                className={
                                                                    isSelected
                                                                        ? "font-bold"
                                                                        : "font-medium"
                                                                }
                                                            >
                                                                {
                                                                    variant.thickness
                                                                }
                                                            </span>
                                                        </div>
                                                        <span className="font-medium text-[11px]">
                                                            Rp{" "}
                                                            {formatRp(
                                                                variant.price
                                                            )}
                                                        </span>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- BAGIAN 2: FINISHING HPL (UBAH GAMBAR) --- */}
            <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                    <Palette size={16} className="text-rakit-600" /> 2.
                    Finishing (HPL)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {finishOptions.map((hpl) => {
                        const isSelected = config.finishingLayer.id === hpl.id;

                        return (
                            <button
                                key={hpl.id}
                                onClick={() =>
                                    handleChange("finishingLayer", hpl)
                                }
                                className={`relative group rounded-xl overflow-hidden aspect-[4/3] border transition-all text-left ${
                                    isSelected
                                        ? "border-rakit-600 ring-2 ring-rakit-600 ring-offset-1"
                                        : "border-gray-200 hover:border-gray-300 shadow-sm"
                                }`}
                            >
                                {/* Gambar Tekstur */}
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${hpl.texture})`,
                                    }}
                                ></div>

                                {/* Label */}
                                <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-2 border-t border-white/50">
                                    <p className="text-[11px] font-bold text-gray-900 truncate">
                                        {hpl.name}
                                    </p>
                                    <p className="text-[10px] text-rakit-700 font-medium">
                                        Rp {formatRp(hpl.price)}
                                    </p>
                                </div>

                                {/* Checkmark */}
                                {isSelected && (
                                    <div className="absolute top-1.5 right-1.5 bg-rakit-600 text-white rounded-full p-0.5 shadow-md z-10">
                                        <Check size={10} strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
