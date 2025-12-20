import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import LoginImage from "../../../images/Login.jpg";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // State untuk fitur lihat password (ikon mata)
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex min-h-screen w-full bg-white">
            <Head title="Log in" />

            {/* KOLOM KIRI: Gambar/Artwork */}
            <div className="hidden lg:flex w-1/2 max-h-screen bg-gray-50 items-center justify-center relative overflow-hidden p-6">
                {/* Ganti src ini dengan path gambar geometris Anda */}
                <img
                    src={LoginImage}
                    alt="Abstract Design"
                    className="object-cover w-full h-full rounded-3xl"
                />
            </div>

            {/* KOLOM KANAN: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
                {/* Header Navigasi */}
                <div className="mb-10">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2"
                    >
                        &lt; Back to website
                    </Link>
                </div>

                {/* Judul */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Welcome!
                    </h1>
                    <p className="text-gray-600 text-sm">
                        <Link
                            href={route("register")}
                            className="font-bold text-black underline hover:no-underline"
                        >
                            Create a free account
                        </Link>{" "}
                        or log in to get started using SportWrench
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    {/* Input Email */}
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
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="chandler.blanks"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Input Password */}
                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1"
                        />
                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-full border-gray-400 focus:border-black focus:ring-black py-3 px-4 pr-10"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="• • • • • • • •"
                            />
                            {/* Tombol Mata (Toggle Visibility) */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
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

                        {/* Forgot Password Link - Kanan Bawah Input */}
                        <div className="flex justify-end mt-2">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm font-bold text-gray-600 underline hover:text-gray-900"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Tombol Login Utama */}
                    <PrimaryButton
                        className="w-full justify-center rounded-full bg-black py-4 text-white hover:bg-gray-800"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>

                    {/* Tombol Login Social (Google & Facebook) */}
                    <div className="space-y-3 mt-4">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                            Log in with Google
                        </button>

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg
                                className="h-5 w-5 text-[#1877F2]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 2.848-6.307 6.165-6.307 1.59 0 3.253.076 3.253.076v3.748h-1.832c-2.022 0-2.653 1.255-2.653 2.536v1.527h4.088l-1.002 3.667h-3.086v7.98H9.101z" />
                            </svg>
                            Log in with Facebook
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
