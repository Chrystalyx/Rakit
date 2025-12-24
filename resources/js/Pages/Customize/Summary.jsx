import React from "react";
import { Check } from "lucide-react";

export default function Summary({ config, handleChange, materials }) {
    return (
        <div className="space-y-8">
            {/* MATERIAL SELECTION */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    Pilih Material
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {materials.map((mat) => (
                        <button
                            key={mat.id}
                            onClick={() => handleChange("material", mat)}
                            className={`relative group rounded-xl overflow-hidden aspect-[4/3] border transition-all ${
                                config.material.id === mat.id
                                    ? "border-rakit-600 ring-2 ring-rakit-600 ring-offset-2"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <div
                                className="w-full h-full"
                                style={{ backgroundColor: mat.color }}
                            ></div>

                            {/* Overlay Nama */}
                            <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm p-2 text-left border-t border-white/50">
                                <p className="text-xs font-bold text-gray-900 truncate">
                                    {mat.name}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                    {mat.type}
                                </p>
                            </div>

                            {/* Checkmark */}
                            {config.material.id === mat.id && (
                                <div className="absolute top-2 right-2 bg-rakit-600 text-white rounded-full p-1 shadow-md">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ORDER DETAILS */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    Spesifikasi
                </h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between py-1 border-b border-gray-200 border-dashed">
                        <span className="text-gray-500">Dimensi</span>
                        <span className="font-medium text-gray-900">
                            {config.width} x {config.depth} x {config.height} cm
                        </span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-200 border-dashed">
                        <span className="text-gray-500">Material</span>
                        <span className="font-medium text-gray-900">
                            {config.material.name}
                        </span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-gray-200 border-dashed">
                        <span className="text-gray-500">Pintu</span>
                        <span className="font-medium text-gray-900 capitalize">
                            {config.doorType}
                        </span>
                    </li>
                    <li className="flex justify-between py-1 pt-2">
                        <span className="text-gray-500">Add-ons</span>
                        <div className="text-right flex flex-col items-end gap-1">
                            {config.ledStrip && (
                                <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded uppercase">
                                    LED Strip
                                </span>
                            )}
                            {config.lock && (
                                <span className="text-[10px] font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded uppercase">
                                    Kunci
                                </span>
                            )}
                            {!config.ledStrip && !config.lock && (
                                <span className="text-gray-400">-</span>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
