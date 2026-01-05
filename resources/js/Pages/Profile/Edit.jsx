import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Trash2, ChevronRight, Camera } from "lucide-react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Toaster } from "react-hot-toast";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const [activeTab, setActiveTab] = useState("profile");

    const menuItems = [
        {
            id: "profile",
            label: "Profil Saya",
            icon: User,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            id: "security",
            label: "Keamanan",
            icon: Lock,
            color: "text-orange-600",
            bg: "bg-orange-50",
        },
        {
            id: "danger",
            label: "Hapus Akun",
            icon: Trash2,
            color: "text-red-600",
            bg: "bg-red-50",
        },
    ];

    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
        <GuestLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Pengaturan Akun
                </h2>
            }
        >
            <Head title="Pengaturan Akun" />
            <Toaster position="top-right" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN: Sidebar Navigation */}
                        <div className="w-full lg:w-1/4 space-y-6">
                            {/* User Mini Card */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-rakit-900 text-white flex items-center justify-center text-xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="font-bold text-gray-900 truncate">
                                        {user.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="bg-white p-3 rounded-3xl shadow-sm border border-gray-100 space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                setActiveTab(item.id)
                                            }
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                                                isActive
                                                    ? "bg-rakit-50 shadow-sm ring-1 ring-rakit-200"
                                                    : "hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`p-2 rounded-xl ${
                                                        isActive
                                                            ? "bg-white text-rakit-800 shadow-sm"
                                                            : `${item.bg} ${item.color}`
                                                    }`}
                                                >
                                                    <Icon size={20} />
                                                </div>
                                                <span
                                                    className={`font-medium ${
                                                        isActive
                                                            ? "text-rakit-900"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                            {isActive && (
                                                <ChevronRight
                                                    size={16}
                                                    className="text-rakit-400"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* RIGHT COLUMN: Content Area */}
                        <div className="w-full lg:w-3/4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden min-h-[500px]"
                                >
                                    {activeTab === "profile" && (
                                        <div className="p-8 lg:p-12">
                                            <UpdateProfileInformationForm
                                                mustVerifyEmail={
                                                    mustVerifyEmail
                                                }
                                                status={status}
                                            />
                                        </div>
                                    )}

                                    {activeTab === "security" && (
                                        <div className="p-8 lg:p-12">
                                            <UpdatePasswordForm />
                                        </div>
                                    )}

                                    {activeTab === "danger" && (
                                        <div className="p-8 lg:p-12">
                                            <DeleteUserForm />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
