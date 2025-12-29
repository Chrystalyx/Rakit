import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Lock, Check } from "lucide-react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [strength, setStrength] = useState(0);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    // Simple password strength calculator
    useEffect(() => {
        const len = data.password.length;
        if (len === 0) setStrength(0);
        else if (len < 6) setStrength(1);
        else if (len < 10) setStrength(2);
        else setStrength(3);
    }, [data.password]);

    const updatePassword = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success("Password berhasil diubah!");
            },
            onError: (errors) => {
                toast.error("Gagal mengubah password.");
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const PasswordInput = ({
        id,
        value,
        onChange,
        show,
        setShow,
        placeholder,
        refProp,
    }) => (
        <div className="relative group">
            <TextInput
                id={id}
                ref={refProp}
                value={value}
                onChange={onChange}
                type={show ? "text" : "password"}
                className="mt-1 block w-full rounded-xl border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 px-4 py-3 pr-12 bg-gray-50 focus:bg-white transition-all group-hover:bg-white"
                autoComplete={id}
                placeholder={placeholder}
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-rakit-600 transition"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );

    return (
        <section className={className}>
            <header className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Lock className="text-orange-500" /> Keamanan Akun
                </h2>
                <p className="mt-2 text-gray-500">
                    Pastikan akun Anda menggunakan password yang panjang dan
                    acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="max-w-2xl">
                <div className="space-y-6">
                    <div>
                        <InputLabel
                            htmlFor="current_password"
                            value="Password Saat Ini"
                        />
                        <PasswordInput
                            id="current_password"
                            refProp={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            show={showCurrent}
                            setShow={setShowCurrent}
                            placeholder="••••••••"
                        />
                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-6">
                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password Baru"
                            />
                            <PasswordInput
                                id="password"
                                refProp={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                show={showNew}
                                setShow={setShowNew}
                                placeholder="Minimal 8 karakter"
                            />
                            {/* Strength Indicator */}
                            <div className="mt-3 flex gap-2 h-1.5">
                                <div
                                    className={`flex-1 rounded-full transition-all duration-500 ${
                                        strength >= 1
                                            ? "bg-red-400"
                                            : "bg-gray-200"
                                    }`}
                                ></div>
                                <div
                                    className={`flex-1 rounded-full transition-all duration-500 ${
                                        strength >= 2
                                            ? "bg-yellow-400"
                                            : "bg-gray-200"
                                    }`}
                                ></div>
                                <div
                                    className={`flex-1 rounded-full transition-all duration-500 ${
                                        strength >= 3
                                            ? "bg-green-400"
                                            : "bg-gray-200"
                                    }`}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-right">
                                {strength === 0
                                    ? ""
                                    : strength === 1
                                    ? "Lemah"
                                    : strength === 2
                                    ? "Sedang"
                                    : "Kuat"}
                            </p>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Konfirmasi Password"
                            />
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                type="password"
                                className="mt-1 block w-full rounded-xl border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 px-4 py-3 bg-white"
                                placeholder="Ulangi password baru"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <PrimaryButton
                        disabled={processing}
                        className="rounded-xl px-8 py-3 bg-rakit-900 hover:bg-rakit-800 shadow-lg shadow-rakit-900/20"
                    >
                        Update Password
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
