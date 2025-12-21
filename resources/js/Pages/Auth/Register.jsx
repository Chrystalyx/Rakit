import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import RegisterImage from "../../../images/Register.jpg"; // Pastikan path ini sesuai gambar Anda

export default function Register() {
    // State untuk mengontrol tampilan (null = pilih role, 'customer'/'crafter' = isi form)
    const [selectedRole, setSelectedRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        role: "",
        name: "",
        email: "",
        phone: "",
        ktp_number: "", // Khusus Crafter
        address: "", // Khusus Crafter
        password: "",
        password_confirmation: "",
    });

    // Update data role saat state berubah
    useEffect(() => {
        if (selectedRole) {
            setData("role", selectedRole);
        }
    }, [selectedRole]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    // Fungsi helper untuk memilih role
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="flex min-h-screen w-full bg-white">
            <Head title="Register" />

            <div className="hidden lg:flex w-1/2 max-h-screen bg-gray-50 items-center justify-center relative overflow-hidden p-6">
                <img
                    src={RegisterImage}
                    alt="Abstract Design"
                    className="object-cover w-full h-full rounded-3xl"
                />
            </div>

            {/* KOLOM KANAN: Konten */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 overflow-y-auto max-h-screen">
                {/* Header Navigasi */}
                <div className="mb-6">
                    {selectedRole ? (
                        <button
                            onClick={() => setSelectedRole(null)}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Kembali ke pemilihan peran
                        </button>
                    ) : (
                        <Link
                            href={route("login")}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Kembali ke halaman login
                        </Link>
                    )}
                </div>

                {/* LOGIKA TAMPILAN: Jika belum pilih role, tampilkan kartu pilihan */}
                {!selectedRole ? (
                    <div className="animate-fade-in-up">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Buat Akun
                            </h1>
                            <p className="text-gray-600">
                                Pilih cara Anda ingin bergabung dengan kami hari
                                ini.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Card Customer */}
                            <div
                                onClick={() => handleRoleSelect("customer")}
                                className="cursor-pointer group relative rounded-2xl border-2 border-gray-200 p-6 hover:border-black transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Customer
                                </h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Saya ingin mengkostum dan membeli produk.
                                </p>
                            </div>

                            {/* Card Crafter */}
                            <div
                                onClick={() => handleRoleSelect("crafter")}
                                className="cursor-pointer group relative rounded-2xl border-2 border-gray-200 p-6 hover:border-black transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Crafter
                                </h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Saya ingin menjual karya dan layanan saya.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                Sudah punya akun?{" "}
                                <Link
                                    href={route("login")}
                                    className="font-bold text-black underline hover:no-underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                ) : (
                    /* FORM REGISTRASI (Muncul setelah role dipilih) */
                    <div className="animate-fade-in-up">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                Daftar sebagai{" "}
                                <span className="capitalize text-indigo-600">
                                    {selectedRole}
                                </span>
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Silakan isi form detail Anda untuk melanjutkan.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Common Fields: Name */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Full Name"
                                    className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-full border-gray-400 focus:border-black focus:ring-black py-3 px-4"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Common Fields: Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-full border-gray-400 focus:border-black focus:ring-black py-3 px-4"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* CRAFTER SPECIFIC FIELDS */}
                            {selectedRole === "crafter" && (
                                <>
                                    <div>
                                        <InputLabel
                                            htmlFor="ktp_number"
                                            value="KTP Number (NIK)"
                                            className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                                        />
                                        <TextInput
                                            id="ktp_number"
                                            name="ktp_number"
                                            type="number"
                                            value={data.ktp_number}
                                            className="mt-1 block w-full rounded-full border-gray-400 focus:border-black focus:ring-black py-3 px-4"
                                            onChange={(e) =>
                                                setData(
                                                    "ktp_number",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.ktp_number}
                                            className="mt-2"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Common Fields: Phone */}
                            <div>
                                <InputLabel
                                    htmlFor="phone"
                                    value="No Handphone"
                                    className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                                />
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={data.phone}
                                    className="mt-1 block w-full rounded-full border-gray-400 focus:border-black focus:ring-black py-3 px-4"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            {/* CRAFTER SPECIFIC FIELDS (Address) */}
                            {selectedRole === "crafter" && (
                                <div>
                                    <InputLabel
                                        htmlFor="address"
                                        value="Full Address"
                                        className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                                    />
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full rounded-2xl border-gray-400 focus:border-black focus:ring-black py-3 px-4 shadow-sm"
                                        rows="3"
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        required
                                    ></textarea>
                                    <InputError
                                        message={errors.address}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {/* Common Fields: Password */}
                            <div className="relative">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                                />
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full rounded-full border-gray-400 focus:border-black focus:ring-black py-3 px-4 pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 mt-1"
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Common Fields: Confirm Password */}
                            <div className="relative">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                                />
                                <div className="relative">
                                    <TextInput
                                        id="password_confirmation"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full rounded-full border-gray-400 focus:border-black focus:ring-black py-3 px-4 pr-10"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 mt-1"
                                    >
                                        {showConfirmPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="w-full justify-center rounded-full bg-black py-4 text-white hover:bg-gray-800 mt-6"
                                disabled={processing}
                            >
                                Create {selectedRole} Account
                            </PrimaryButton>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
