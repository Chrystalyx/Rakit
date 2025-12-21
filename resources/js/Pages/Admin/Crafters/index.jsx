import AdminLayout from "@/Layouts/AdminLayout";
import TextInput from "@/Components/TextInput";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import CrafterDetail from "./crafterDetail"; // Import sesuai nama file baru

// Komponen Ikon Sort
const SortIcon = ({ direction }) =>
    direction === "asc" ? (
        <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
            />
        </svg>
    ) : (
        <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

export default function CrafterIndex({ auth, crafters, filters }) {
    // State Query Params
    const [queryParams, setQueryParams] = useState({
        search: filters?.search || "",
        sort: filters?.sort || "join_date",
        direction: filters?.direction || "desc",
    });

    // State Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrafter, setSelectedCrafter] = useState(null);

    // Modal Actions
    const openDetail = (crafter) => {
        setSelectedCrafter(crafter);
        setIsModalOpen(true);
    };

    const closeDetail = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedCrafter(null), 300);
    };

    // Debounce Search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(route("admin.crafters.index"), queryParams, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [queryParams]);

    // Handle Sort
    const onSort = (field) => {
        setQueryParams((prev) => ({
            ...prev,
            sort: field,
            direction:
                prev.sort === field && prev.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    // Helper Warna Level
    const getLevelColor = (level) => {
        if (level === "ahli")
            return "bg-purple-100 text-purple-800 border-purple-200";
        if (level === "menengah")
            return "bg-blue-100 text-blue-800 border-blue-200";
        return "bg-gray-100 text-gray-800 border-gray-200";
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Crafter Profiles
                </h2>
            }
        >
            <Head title="Admin - Crafters" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header: Title & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                                Daftar Teknisi/Crafter
                            </h3>
                            <div className="relative w-full md:w-72">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <TextInput
                                    type="text"
                                    className="block w-full pl-10 pr-4 py-2 text-sm rounded-full border-gray-300 focus:ring-black focus:border-black"
                                    placeholder="Cari nama atau email..."
                                    value={queryParams.search}
                                    onChange={(e) =>
                                        setQueryParams({
                                            ...queryParams,
                                            search: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4">Crafter</th>

                                        <th
                                            className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition select-none"
                                            onClick={() => onSort("level")}
                                        >
                                            <div className="flex items-center">
                                                Level
                                                {queryParams.sort ===
                                                    "level" && (
                                                    <SortIcon
                                                        direction={
                                                            queryParams.direction
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </th>

                                        <th
                                            className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition select-none"
                                            onClick={() =>
                                                onSort("rating_skill")
                                            }
                                        >
                                            <div className="flex items-center">
                                                Rating Skill
                                                {queryParams.sort ===
                                                    "rating_skill" && (
                                                    <SortIcon
                                                        direction={
                                                            queryParams.direction
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </th>

                                        <th className="px-6 py-4 text-center">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {crafters.data.length > 0 ? (
                                        crafters.data.map((crafter) => (
                                            <tr
                                                key={crafter.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                {/* Profile */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                                                            src={crafter.avatar}
                                                            alt={crafter.name}
                                                        />
                                                        <div>
                                                            <div className="font-bold text-gray-900">
                                                                {crafter.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {crafter.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Level */}
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getLevelColor(
                                                            crafter.level
                                                        )}`}
                                                    >
                                                        {crafter.level}
                                                    </span>
                                                </td>

                                                {/* Rating Skill */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <span className="text-gray-900 font-bold mr-1">
                                                            {
                                                                crafter.rating_skill
                                                            }
                                                        </span>
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className={`w-4 h-4 ${
                                                                            i <
                                                                            Math.round(
                                                                                crafter.rating_skill
                                                                            )
                                                                                ? "fill-current"
                                                                                : "text-gray-300 fill-current"
                                                                        }`}
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                                    </svg>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4 text-center">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border 
                                                        ${
                                                            crafter.is_verified
                                                                ? "bg-green-50 text-green-700 border-green-200"
                                                                : "bg-gray-50 text-gray-600 border-gray-200"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${
                                                                crafter.is_verified
                                                                    ? "bg-green-600"
                                                                    : "bg-gray-400"
                                                            }`}
                                                        ></span>
                                                        {crafter.is_verified
                                                            ? "Verified"
                                                            : "Unverified"}
                                                    </span>
                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() =>
                                                            openDetail(crafter)
                                                        }
                                                        className="text-gray-900 hover:text-indigo-600 font-medium text-sm underline decoration-gray-300 underline-offset-4 hover:decoration-indigo-600 transition-all"
                                                    >
                                                        Lihat Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-12 text-center text-gray-400"
                                            >
                                                Tidak ada data crafter
                                                ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail */}
            <CrafterDetail
                show={isModalOpen}
                onClose={closeDetail}
                crafter={selectedCrafter}
            />
        </AdminLayout>
    );
}
