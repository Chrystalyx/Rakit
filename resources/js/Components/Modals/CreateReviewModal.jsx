import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateReviewModal({ isOpen, onClose }) {
    const { data, setData, post, processing, reset } = useForm({
        rating: 5,
        comment: "",
    });

    // Handle hover state untuk bintang
    const [hoverRating, setHoverRating] = useState(0);

    const submit = (e) => {
        e.preventDefault();
        post(route("reviews.store"), {
            onSuccess: () => {
                toast.success("Terima kasih! Ulasan Anda berhasil dikirim.");
                reset();
                onClose();
            },
            onError: () => {
                toast.error("Gagal mengirim ulasan. Silakan coba lagi.");
            },
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[110] 
                                   w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">
                                Tulis Ulasan
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Star Rating Input */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">
                                    Berikan Rating
                                </span>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setData("rating", star)
                                            }
                                            onMouseEnter={() =>
                                                setHoverRating(star)
                                            }
                                            onMouseLeave={() =>
                                                setHoverRating(0)
                                            }
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                size={32}
                                                className={`${
                                                    star <=
                                                    (hoverRating || data.rating)
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-gray-300"
                                                } transition-colors`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Comment Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pengalaman Anda
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-xl border-gray-300 shadow-sm focus:border-rakit-500 focus:ring-rakit-500 resize-none"
                                    placeholder="Ceritakan pengalaman Anda merakit furnitur di sini..."
                                    value={data.comment}
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                    required
                                ></textarea>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2.5 rounded-xl bg-rakit-800 text-white font-bold hover:bg-rakit-900 transition flex items-center gap-2 disabled:opacity-70"
                                >
                                    {processing && (
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                    )}
                                    Kirim Ulasan
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
