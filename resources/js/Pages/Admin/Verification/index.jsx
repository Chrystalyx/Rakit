import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Detail from "./verificationDetail";

export default function VerificationIndex({ auth, crafters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrafter, setSelectedCrafter] = useState(null);

    const openDetail = (crafter) => {
        setSelectedCrafter(crafter);
        setIsModalOpen(true);
    };

    const closeDetail = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedCrafter(null), 300);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Verification Requests
                </h2>
            }
        >
            <Head title="Admin - Verification" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Daftar Pending Crafter
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-4 font-bold tracking-wider">
                                                Nama Crafter
                                            </th>
                                            <th className="px-6 py-4 font-bold tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-4 font-bold tracking-wider">
                                                Tanggal Request
                                            </th>
                                            <th className="px-6 py-4 font-bold tracking-wider text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {/* Pengecekan data: Jika crafters ada isinya maka map, jika tidak tampilkan pesan kosong */}
                                        {crafters &&
                                        crafters.data &&
                                        crafters.data.length > 0 ? (
                                            crafters.data.map((crafter) => (
                                                <tr
                                                    key={crafter.id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        {crafter.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {crafter.email}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {crafter.created_at}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() =>
                                                                openDetail(
                                                                    crafter
                                                                )
                                                            }
                                                            className="inline-flex items-center px-4 py-2 bg-black border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-800 transition ease-in-out duration-150"
                                                        >
                                                            Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="px-6 py-12 text-center text-gray-400"
                                                >
                                                    Tidak ada permintaan
                                                    verifikasi saat ini.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Area Pagination (Jika diperlukan nanti) */}
                            {crafters && crafters.links && (
                                <div className="mt-6">
                                    {/* Component Pagination bisa diletakkan di sini */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail */}
            <Detail
                show={isModalOpen}
                onClose={closeDetail}
                crafter={selectedCrafter}
            />
        </AdminLayout>
    );
}
