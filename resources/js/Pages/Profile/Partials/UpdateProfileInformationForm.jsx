import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { Camera, User } from "lucide-react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onSuccess: () => toast.success("Profil berhasil diperbarui!"),
            onError: () =>
                toast.error("Gagal memperbarui profil. Cek input Anda."),
        });
    };

    return (
        <section className={className}>
            <header className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <User className="text-rakit-500" /> Informasi Profil
                </h2>
                <p className="mt-2 text-gray-500">
                    Kelola informasi pribadi dan kontak yang terhubung dengan
                    akun Anda.
                </p>
            </header>

            <form onSubmit={submit}>
                {/* Avatar Section (Visual Only) */}
                <div className="mb-10 flex items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-rakit-900 text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                            {user.name.charAt(0)}
                        </div>
                        <button
                            type="button"
                            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition text-gray-600"
                        >
                            <Camera size={16} />
                        </button>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Foto Profil</h4>
                        <p className="text-sm text-gray-500 mb-3">
                            Format JPG, GIF atau PNG. Maks 1MB.
                        </p>
                        <button
                            type="button"
                            className="text-sm font-bold text-rakit-600 hover:text-rakit-800 border border-rakit-200 px-4 py-2 rounded-full hover:bg-rakit-50 transition"
                        >
                            Upload Foto Baru
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 max-w-2xl">
                    <div className="space-y-2">
                        <InputLabel htmlFor="name" value="Nama Lengkap" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full rounded-xl border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 px-4 py-3 bg-gray-50 focus:bg-white transition-colors"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="email" value="Alamat Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full rounded-xl border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 px-4 py-3 bg-gray-50 focus:bg-white transition-colors"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-orange-800 text-sm">
                            <p className="font-medium">
                                Email Anda belum diverifikasi.
                            </p>
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline mt-1 hover:text-orange-900 font-bold"
                            >
                                Kirim ulang link verifikasi
                            </Link>
                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-green-600">
                                    Link verifikasi baru telah dikirim!
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex items-center gap-4 pt-6 border-t border-gray-100">
                    <PrimaryButton
                        disabled={processing}
                        className="rounded-xl px-8 py-3 bg-rakit-900 hover:bg-rakit-800 shadow-lg shadow-rakit-900/20"
                    >
                        Simpan Perubahan
                    </PrimaryButton>
                    <p className="text-xs text-gray-400">
                        Terakhir diupdate: Baru saja
                    </p>
                </div>
            </form>
        </section>
    );
}
