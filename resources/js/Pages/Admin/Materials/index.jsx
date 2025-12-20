import AdminLayout from "@/Layouts/AdminLayout";
import TextInput from "@/Components/TextInput"; // Pastikan komponen ini ada
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

// Komponen Ikon Sort Kecil
const SortIcon = ({ direction }) => {
    return direction === "asc" ? (
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
};

export default function MaterialIndex({ auth, materials, filters }) {
    // State untuk Search & Sort (Default value dari props controller)
    const [queryParams, setQueryParams] = useState({
        search: filters?.search || "",
        sort: filters?.sort || "id",
        direction: filters?.direction || "asc",
    });

    // Effect: Trigger reload saat queryParams berubah (Debounce Search)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(route("admin.materials.index"), queryParams, {
                preserveState: true, // Jangan refresh full page
                preserveScroll: true, // Jangan scroll ke atas
                replace: true, // Jangan penuhi history browser
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [queryParams]);

    // Handler saat Header diklik
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

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus material ini?")) {
            router.delete(route("admin.materials.destroy", id));
        }
    };

    const handleToggle = (material) => {
        router.patch(
            route("admin.materials.toggle", material.id),
            {},
            { preserveScroll: true }
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kelola Material
                </h2>
            }
        >
            <Head title="Admin - Materials" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* ACTION & SEARCH BAR */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                                Daftar Material
                            </h3>

                            {/* Input Search */}
                            <div className="relative w-full md:w-64">
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
                                    className="block w-full pl-10 pr-4 py-2 text-sm rounded-full border-gray-300"
                                    placeholder="Cari material..."
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

                        <Link
                            href={route("admin.materials.create")}
                            className="px-4 py-2 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition"
                        >
                            + Tambah Material
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-4">Gambar</th>

                                        {/* SORTABLE: Nama */}
                                        <th
                                            className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition select-none"
                                            onClick={() => onSort("name")}
                                        >
                                            <div className="flex items-center">
                                                Nama & Spesifikasi
                                                {queryParams.sort ===
                                                    "name" && (
                                                    <SortIcon
                                                        direction={
                                                            queryParams.direction
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </th>

                                        {/* SORTABLE: Kategori */}
                                        <th
                                            className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition select-none"
                                            onClick={() => onSort("category")}
                                        >
                                            <div className="flex items-center">
                                                Kategori
                                                {queryParams.sort ===
                                                    "category" && (
                                                    <SortIcon
                                                        direction={
                                                            queryParams.direction
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </th>

                                        {/* SORTABLE: Harga */}
                                        <th
                                            className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition select-none"
                                            onClick={() => onSort("price")}
                                        >
                                            <div className="flex items-center">
                                                Harga
                                                {queryParams.sort ===
                                                    "price" && (
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
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {materials.data.length > 0 ? (
                                        materials.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate max-w-xs">
                                                        {item.specification}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-bold uppercase
                                                        ${
                                                            item.category ===
                                                            "plywood"
                                                                ? "bg-orange-100 text-orange-800"
                                                                : item.category ===
                                                                  "hpl"
                                                                ? "bg-purple-100 text-purple-800"
                                                                : "bg-blue-100 text-blue-800"
                                                        }`}
                                                    >
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">
                                                        {formatCurrency(
                                                            item.price
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        per {item.unit}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() =>
                                                            handleToggle(item)
                                                        }
                                                        className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${
                                                            item.is_active
                                                                ? "bg-green-500"
                                                                : "bg-gray-200"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 mt-0.5 ml-0.5 ${
                                                                item.is_active
                                                                    ? "translate-x-5"
                                                                    : "translate-x-0"
                                                            }`}
                                                        />
                                                    </button>
                                                    <p className="text-[10px] mt-1 text-gray-400 font-medium">
                                                        {item.is_active
                                                            ? "Aktif"
                                                            : "Non-Aktif"}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Link
                                                            href={route(
                                                                "admin.materials.edit",
                                                                item.id
                                                            )}
                                                            className="text-blue-600 hover:text-blue-900 font-medium text-sm border border-blue-200 px-3 py-1 rounded hover:bg-blue-50 transition"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 font-medium text-sm border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-12 text-center text-gray-400"
                                            >
                                                Data tidak ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
