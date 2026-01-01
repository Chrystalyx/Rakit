import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Toaster, toast } from "react-hot-toast";
import { Eye, EyeOff, ArrowLeft, Star, Quote } from "lucide-react";
import LoginImage from "../../../images/Login.jpg";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
            onSuccess: () => toast.success("Selamat datang kembali!"),
            onError: () => toast.error("Login gagal. Cek kembali data Anda."),
        });
    };

    return (
        <GuestLayout hideFooter={true}>
            <Head title="Masuk - Rakit" />
            <Toaster position="top-center" />

            {/* --- BACKGROUND DENGAN DEKORASI --- */}
            <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12">
                {/* Grid Pattern Background */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#cbd5e1 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                ></div>

                {/* Ambient Glow / Blur */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-rakit-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                {/* MAIN CARD */}
                <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 border border-white/50">
                    {/* LEFT: Image Section with Content */}
                    <div className="hidden lg:block lg:w-5/12 relative overflow-hidden bg-gray-900 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                        <img
                            src={LoginImage}
                            alt="Login Visual"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Content di atas Gambar */}
                        <div className="relative z-20 h-full flex flex-col justify-between p-12 text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                                    <Quote size={16} className="text-white" />
                                </div>
                                <span className="text-sm font-medium tracking-wide uppercase opacity-80">
                                    Rakit Interior
                                </span>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold leading-tight">
                                    Wujudkan Ruangan <br /> Impian Anda.
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                                    Bergabunglah dengan ribuan pengrajin dan
                                    pelanggan yang telah menciptakan karya
                                    furnitur unik bersama RAKIT.
                                </p>

                                {/* Testimonial Card Floating */}
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                fill="#FBBF24"
                                                className="text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-white/90 italic mb-3">
                                        "Platform terbaik untuk mencari
                                        pengrajin custom. Pengerjaan rapi dan
                                        transparan!"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                            <img
                                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                                alt="User"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">
                                                Budi Santoso
                                            </p>
                                            <p className="text-[10px] text-gray-400">
                                                Customer Verified
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form Section */}
                    <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
                        {/* Decorative background element inside form */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <svg
                                width="120"
                                height="120"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>

                        <div className="mb-10">
                            <Link
                                href="/"
                                className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-rakit-800 transition mb-8 group"
                            >
                                <ArrowLeft
                                    size={18}
                                    className="mr-2 group-hover:-translate-x-1 transition-transform"
                                />{" "}
                                Kembali ke Beranda
                            </Link>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                Selamat Datang!
                            </h1>
                            <p className="text-gray-500 text-base">
                                Masukkan detail akun Anda untuk mulai berkarya.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 font-medium text-sm text-green-700 bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Alamat Email"
                                    className="text-gray-800 font-bold mb-2 text-sm"
                                />
                                <div className="relative group">
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full px-5 py-4 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-rakit-800 focus:ring-4 focus:ring-rakit-800/10 transition-all font-medium"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="contoh@email.com"
                                    />
                                </div>
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="text-gray-800 font-bold text-sm"
                                    />
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs font-semibold text-rakit-600 hover:text-rakit-800 hover:underline"
                                        >
                                            Lupa Password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative group">
                                    <TextInput
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        className="block w-full px-5 py-4 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-rakit-800 focus:ring-4 focus:ring-rakit-800/10 transition-all font-medium pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 shadow-sm focus:ring-rakit-800 checked:bg-rakit-800 checked:border-transparent transition-all"
                                        />
                                        <svg
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <span className="ml-3 text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                                        Ingat saya di perangkat ini
                                    </span>
                                </label>
                            </div>

                            <PrimaryButton
                                className="w-full justify-center py-4 text-base font-bold rounded-xl bg-gray-900 hover:bg-rakit-900 shadow-lg shadow-gray-900/20 active:scale-[0.98] transition-all duration-200"
                                disabled={processing}
                            >
                                Masuk Sekarang
                            </PrimaryButton>
                        </form>

                        {/* Divider */}
                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-400 font-medium tracking-wide">
                                    Atau lanjutkan dengan
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href={route("social.redirect", "google")}
                                className="flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
                            >
                                <svg
                                    className="h-5 w-5 group-hover:scale-110 transition-transform"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">
                                    Google
                                </span>
                            </a>
                            <a
                                href={route("social.redirect", "facebook")}
                                className="flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
                            >
                                <svg
                                    className="h-5 w-5 text-[#1877F2] group-hover:scale-110 transition-transform"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 2.848-6.307 6.165-6.307 1.59 0 3.253.076 3.253.076v3.748h-1.832c-2.022 0-2.653 1.255-2.653 2.536v1.527h4.088l-1.002 3.667h-3.086v7.98H9.101z" />
                                </svg>
                                <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">
                                    Facebook
                                </span>
                            </a>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Belum punya akun?{" "}
                            <Link
                                href={route("register")}
                                className="font-bold text-rakit-800 hover:text-black hover:underline transition-colors"
                            >
                                Daftar Gratis Sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
