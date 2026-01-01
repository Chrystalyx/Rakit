import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
    Eye,
    EyeOff,
    User,
    Hammer,
    ChevronLeft,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import RegisterImage from "../../../images/Register.jpg";

export default function Register() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        role: "",
        name: "",
        email: "",
        phone: "",
        ktp_number: "",
        address: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (selectedRole) setData("role", selectedRole);
    }, [selectedRole]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
            onSuccess: () => {
                if (selectedRole === "crafter") {
                    toast.success(
                        "Pendaftaran berhasil! Menunggu verifikasi admin.",
                        { duration: 5000 }
                    );
                } else {
                    toast.success("Akun berhasil dibuat! Selamat datang.");
                }
            },
            onError: () =>
                toast.error("Registrasi gagal. Periksa kembali data Anda."),
        });
    };

    // --- SUB-COMPONENTS ---
    const RoleCard = ({ role, icon: Icon, title, desc, onClick }) => (
        <div
            onClick={onClick}
            className="group relative cursor-pointer bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-rakit-800 hover:shadow-2xl hover:shadow-rakit-900/10 transition-all duration-300 flex flex-col items-center text-center h-full active:scale-95"
        >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-rakit-800 group-hover:text-white transition-colors duration-300 text-gray-500 shadow-sm">
                <Icon size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rakit-800 transition-colors">
                {title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>

            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-rakit-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 bg-rakit-50 px-3 py-1 rounded-full">
                Pilih <ArrowRight size={14} />
            </div>

            {/* Active Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-rakit-800 rounded-2xl pointer-events-none transition-colors"></div>
        </div>
    );

    return (
        <GuestLayout hideFooter={true}>
            <Head title="Daftar Akun Baru" />
            <Toaster position="top-center" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12">
                {/* Background Decor */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#cbd5e1 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                ></div>
                <div className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] bg-rakit-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

                <div className="w-full max-w-7xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] relative z-10 border border-white/50">
                    {/* LEFT: Visual Image */}
                    <div className="hidden lg:block lg:w-5/12 relative overflow-hidden bg-gray-900">
                        <img
                            src={RegisterImage}
                            alt="Register"
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-16 text-white max-w-lg">
                            <div className="mb-6 w-12 h-1 bg-white rounded-full"></div>
                            <h2 className="text-4xl font-bold mb-4 leading-tight">
                                Mulai Perjalanan Kreatif Anda.
                            </h2>
                            <p className="text-gray-300 text-base leading-relaxed opacity-90">
                                Bergabunglah dengan ekosistem RAKIT. Tempat di
                                mana ide desain bertemu dengan tangan-tangan
                                terampil.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-20 relative bg-white flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {!selectedRole ? (
                                <motion.div
                                    key="role-selection"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col h-full justify-center"
                                >
                                    <div className="text-center mb-12">
                                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                            Buat Akun Baru
                                        </h1>
                                        <p className="text-gray-500 text-lg">
                                            Bagaimana Anda ingin menggunakan
                                            RAKIT?
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                                        <RoleCard
                                            role="customer"
                                            icon={User}
                                            title="Customer"
                                            desc="Saya ingin memesan furnitur custom untuk hunian saya."
                                            onClick={() =>
                                                setSelectedRole("customer")
                                            }
                                        />
                                        <RoleCard
                                            role="crafter"
                                            icon={Hammer}
                                            title="Crafter (Mitra)"
                                            desc="Saya pengrajin yang ingin menawarkan jasa & produk."
                                            onClick={() =>
                                                setSelectedRole("crafter")
                                            }
                                        />
                                    </div>

                                    <p className="mt-16 text-center text-sm text-gray-500">
                                        Sudah punya akun?{" "}
                                        <Link
                                            href={route("login")}
                                            className="font-bold text-rakit-800 hover:text-black hover:underline transition-colors"
                                        >
                                            Masuk disini
                                        </Link>
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form-input"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <button
                                        onClick={() => setSelectedRole(null)}
                                        className="flex items-center text-sm font-bold text-gray-400 hover:text-rakit-800 mb-8 group transition-colors w-fit"
                                    >
                                        <ChevronLeft
                                            size={20}
                                            className="mr-1 group-hover:-translate-x-1 transition-transform"
                                        />{" "}
                                        Kembali pilih peran
                                    </button>

                                    <div className="mb-10">
                                        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                                            Daftar sebagai{" "}
                                            <span className="text-rakit-800 bg-rakit-50 px-4 py-1 rounded-xl border border-rakit-100 capitalize text-2xl">
                                                {selectedRole}
                                            </span>
                                        </h2>
                                        <p className="text-gray-500 mt-3 text-base">
                                            Isi data diri Anda dengan lengkap
                                            dan benar.
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={submit}
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Nama Lengkap"
                                                    className="mb-2 font-bold text-gray-700"
                                                />
                                                <TextInput
                                                    id="name"
                                                    value={data.name}
                                                    className="w-full rounded-xl py-3 px-4 border-gray-300 focus:border-rakit-800 focus:ring-rakit-800 bg-gray-50 focus:bg-white transition-all"
                                                    autoComplete="name"
                                                    isFocused={true}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    placeholder="Nama Anda"
                                                />
                                                <InputError
                                                    message={errors.name}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="No. WhatsApp"
                                                    className="mb-2 font-bold text-gray-700"
                                                />
                                                <TextInput
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    className="w-full rounded-xl py-3 px-4 border-gray-300 focus:border-rakit-800 focus:ring-rakit-800 bg-gray-50 focus:bg-white transition-all"
                                                    onChange={(e) =>
                                                        setData(
                                                            "phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    placeholder="08xxx"
                                                />
                                                <InputError
                                                    message={errors.phone}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="email"
                                                value="Alamat Email"
                                                className="mb-2 font-bold text-gray-700"
                                            />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                className="w-full rounded-xl py-3 px-4 border-gray-300 focus:border-rakit-800 focus:ring-rakit-800 bg-gray-50 focus:bg-white transition-all"
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                placeholder="email@contoh.com"
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-1"
                                            />
                                        </div>

                                        {selectedRole === "crafter" && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    height: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    height: "auto",
                                                }}
                                                className="space-y-6 p-6 bg-blue-50 rounded-2xl border border-blue-100"
                                            >
                                                <div>
                                                    <InputLabel
                                                        htmlFor="ktp_number"
                                                        value="NIK (Nomor KTP)"
                                                        className="mb-2 font-bold text-blue-900"
                                                    />
                                                    <TextInput
                                                        id="ktp_number"
                                                        type="number"
                                                        value={data.ktp_number}
                                                        className="w-full rounded-xl border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                                        onChange={(e) =>
                                                            setData(
                                                                "ktp_number",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        placeholder="16 digit NIK"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.ktp_number
                                                        }
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel
                                                        htmlFor="address"
                                                        value="Alamat Workshop / Domisili"
                                                        className="mb-2 font-bold text-blue-900"
                                                    />
                                                    <textarea
                                                        id="address"
                                                        value={data.address}
                                                        className="w-full rounded-xl border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-sm"
                                                        rows="3"
                                                        onChange={(e) =>
                                                            setData(
                                                                "address",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        placeholder="Alamat lengkap..."
                                                    ></textarea>
                                                    <InputError
                                                        message={errors.address}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="Password"
                                                    className="mb-2 font-bold text-gray-700"
                                                />
                                                <div className="relative">
                                                    <TextInput
                                                        id="password"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        value={data.password}
                                                        className="w-full rounded-xl py-3 px-4 pr-10 border-gray-300 focus:border-rakit-800 focus:ring-rakit-800 bg-gray-50 focus:bg-white transition-all [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                                                        autoComplete="new-password"
                                                        onChange={(e) =>
                                                            setData(
                                                                "password",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        placeholder="••••••••"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff size={18} />
                                                        ) : (
                                                            <Eye size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                                <InputError
                                                    message={errors.password}
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="password_confirmation"
                                                    value="Konfirmasi Password"
                                                    className="mb-2 font-bold text-gray-700"
                                                />
                                                <div className="relative">
                                                    <TextInput
                                                        id="password_confirmation"
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        value={
                                                            data.password_confirmation
                                                        }
                                                        className="w-full rounded-xl py-3 px-4 pr-10 border-gray-300 focus:border-rakit-800 focus:ring-rakit-800 bg-gray-50 focus:bg-white transition-all [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                                                        autoComplete="new-password"
                                                        onChange={(e) =>
                                                            setData(
                                                                "password_confirmation",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        placeholder="••••••••"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword
                                                            )
                                                        }
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff size={18} />
                                                        ) : (
                                                            <Eye size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <PrimaryButton
                                            className="w-full justify-center py-4 mt-6 rounded-xl text-base font-bold bg-gray-900 hover:bg-rakit-900 shadow-lg shadow-gray-900/20 active:scale-[0.98] transition-all"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Memproses..."
                                                : "Buat Akun Sekarang"}
                                        </PrimaryButton>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
