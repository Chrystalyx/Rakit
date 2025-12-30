import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";

export default function Detail({ show, onClose, crafter }) {
    const { post, processing } = useForm();

    const handleApprove = () => {
        if (!crafter?.id) return;

        post(route("admin.verification.approve", crafter.id), {
            onSuccess: () => {
                onClose();
            },
            preserveScroll: true,
        });
    };

    if (!crafter) return null;

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                {/* --- Header Modal --- */}
                <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        Detail Verifikasi Crafter
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* --- Konten Data --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kolom Kiri: Info Umum */}
                    <div className="space-y-5">
                        <div>
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                Nama Lengkap
                            </span>
                            <div className="text-lg font-medium text-gray-900">
                                {crafter.user?.name || crafter.name || "-"}
                            </div>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                Email
                            </span>
                            <div className="text-gray-900">
                                {crafter.user?.email || crafter.email || "-"}
                            </div>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                No. Handphone
                            </span>
                            <div className="text-gray-900">
                                {crafter.user?.phone_number || crafter.phone || "-"}
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Data Profil (KTP & Alamat) */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-5">
                        <div>
                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Nomor KTP (NIK)
                            </span>
                            <div className="text-lg font-mono font-bold text-gray-800 tracking-wide">
                                {crafter.ktp_number || "-"}
                            </div>
                        </div>
                        <div>
                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                Alamat Lengkap
                            </span>
                            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                                {crafter.address || "-"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Footer / Tombol Aksi --- */}
                <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Batal
                    </SecondaryButton>

                    <PrimaryButton
                        className="bg-black hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-900"
                        onClick={handleApprove}
                        disabled={processing}
                    >
                        {processing ? "Memproses..." : "Konfirmasi (Approve)"}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}