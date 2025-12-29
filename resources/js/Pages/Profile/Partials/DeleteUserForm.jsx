import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                toast.success("Akun berhasil dihapus.");
            },
            onError: () => {
                passwordInput.current.focus();
                toast.error("Gagal menghapus akun. Password salah.");
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <header className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-red-600 flex items-center gap-3">
                    <AlertTriangle className="text-red-500" /> Zona Bahaya
                </h2>
                <p className="mt-2 text-gray-500">
                    Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
                    Harap berhati-hati.
                </p>
            </header>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <h3 className="font-bold text-red-900 text-lg">
                        Hapus Akun Permanen
                    </h3>
                    <p className="text-red-700/80 text-sm mt-1 max-w-xl">
                        Menghapus akun akan menghilangkan semua riwayat pesanan,
                        data profil, dan akses Anda ke platform ini selamanya.
                    </p>
                </div>

                <DangerButton
                    onClick={confirmUserDeletion}
                    className="rounded-xl px-6 py-3 bg-red-600 hover:bg-red-700 border-0 shadow-lg shadow-red-500/30 whitespace-nowrap"
                >
                    <Trash2 size={18} className="mr-2" />
                    Hapus Akun Saya
                </DangerButton>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form
                    onSubmit={deleteUser}
                    className="p-8 bg-white rounded-[2rem]"
                >
                    <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={32} />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Konfirmasi Penghapusan
                    </h2>

                    <p className="text-gray-500 text-center mb-8 max-w-sm mx-auto">
                        Untuk keamanan, silakan masukkan password Anda untuk
                        mengonfirmasi penghapusan akun ini.
                    </p>

                    <div className="space-y-4">
                        <div className="relative">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="mt-1 block w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 px-4 py-3 text-center text-lg"
                                isFocused
                                placeholder="Masukkan Password Anda"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-center"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-3">
                        <SecondaryButton
                            onClick={closeModal}
                            className="rounded-xl px-6 py-3 border-gray-200"
                        >
                            Batalkan
                        </SecondaryButton>

                        <DangerButton
                            className="rounded-xl px-6 py-3 bg-red-600 shadow-lg shadow-red-600/20"
                            disabled={processing}
                        >
                            Ya, Hapus Sekarang
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
