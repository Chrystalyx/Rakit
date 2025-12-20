import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import OrderDetail from "./OrderDetail";
import { Link } from "@inertiajs/react";

export default function OrderIndex({ auth, orders }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openDetail = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeDetail = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedOrder(null), 300);
    };

    // Helper untuk warna status
    const getStatusBadge = (status) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            "on progress": "bg-blue-100 text-blue-800 border-blue-200",
            completed: "bg-green-100 text-green-800 border-green-200",
            cancelled: "bg-red-100 text-red-800 border-red-200",
        };
        return styles[status.toLowerCase()] || "bg-gray-100 text-gray-800";
    };

    // Helper format mata uang
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
                    Order Management
                </h2>
            }
        >
            <Head title="Admin - Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Daftar Pesanan Masuk
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-4">
                                                Order ID
                                            </th>
                                            <th className="px-6 py-4">
                                                Project Title
                                            </th>
                                            <th className="px-6 py-4">
                                                Involved Parties
                                            </th>
                                            <th className="px-6 py-4">
                                                Total Amount
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
                                        {orders && orders.data.length > 0 ? (
                                            orders.data.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                                        #{order.id}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        {order.title}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col text-xs">
                                                            <span className="text-gray-900 font-semibold">
                                                                Cust:{" "}
                                                                {
                                                                    order.customer_name
                                                                }
                                                            </span>
                                                            <span className="text-gray-500">
                                                                Craft:{" "}
                                                                {
                                                                    order.crafter_name
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        {formatCurrency(
                                                            order.total_amount
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                                                                order.status
                                                            )} uppercase tracking-wider`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() =>
                                                                openDetail(
                                                                    order
                                                                )
                                                            }
                                                            className="text-indigo-600 hover:text-indigo-900 font-medium text-sm underline decoration-indigo-200 underline-offset-4 hover:decoration-indigo-600 transition-all"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-6 py-12 text-center text-gray-400"
                                                >
                                                    Belum ada pesanan data.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* BAGIAN PAGINATION YANG SUDAH DIPERBAIKI */}
                            <div className="mt-6 flex justify-center">
                                {orders.links.map((link, key) => {
                                    if (link.url === null) {
                                        return (
                                            <span
                                                key={key}
                                                className="px-3 py-1 border rounded mx-1 text-sm text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }

                                    return (
                                        <Link
                                            key={key}
                                            href={link.url}
                                            className={`px-3 py-1 border rounded mx-1 text-sm transition-colors ${link.active
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OrderDetail
                show={isModalOpen}
                onClose={closeDetail}
                order={selectedOrder}
            />
        </AdminLayout>
    );
}
