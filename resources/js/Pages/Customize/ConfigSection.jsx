import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ConfigSection({
    title,
    icon: Icon,
    isOpen,
    onClick,
    children,
}) {
    return (
        <div
            className={`border-b border-rakit-100 last:border-0 ${
                isOpen ? "bg-rakit-50/50 rounded-xl" : ""
            } transition-colors duration-300`}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-4 px-3 text-left group"
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`p-2 rounded-lg transition-colors ${
                            isOpen
                                ? "bg-rakit-200 text-rakit-800"
                                : "bg-gray-50 text-gray-400 group-hover:bg-rakit-100 group-hover:text-rakit-600"
                        }`}
                    >
                        <Icon size={18} />
                    </div>
                    <span
                        className={`font-semibold text-sm ${
                            isOpen
                                ? "text-rakit-800"
                                : "text-gray-600 group-hover:text-rakit-800"
                        }`}
                    >
                        {title}
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp size={16} className="text-rakit-500" />
                ) : (
                    <ChevronDown size={16} className="text-gray-300" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 pb-6 pt-1 space-y-5">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
