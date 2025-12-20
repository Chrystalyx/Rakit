import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

export default function OrderDetail({ show, onClose, order }) {
    if (!order) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6 border-b pb-4 border-gray-100">
                    <div>
                        <span className="text-xs font-mono text-gray-400 uppercase">
                            Order ID: #{order.id} / Project ID: #
                            {order.project_id}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">
                            {order.title}
                        </h2>
                    </div>
                    <div
                        className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide border 
                        ${
                            order.status === "completed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : order.status === "on progress"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                    >
                        {order.status}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Section 1: Financials (Card Style) */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                            Financial Details
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    Total Amount (Paid by Cust)
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    {formatCurrency(order.total_amount)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">
                                    Platform Fee (Revenue)
                                </p>
                                <p className="text-xl font-bold text-green-600">
                                    {formatCurrency(order.platform_fee)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Timeline & People */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Timeline */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                                Timeline
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">
                                        Start Date
                                    </span>
                                    <span className="font-medium text-gray-900 text-sm">
                                        {formatDate(order.start_date)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">
                                        End Date
                                    </span>
                                    <span className="font-medium text-gray-900 text-sm">
                                        {formatDate(order.end_date)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Involved Parties */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                                Involved Parties
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm">
                                    <span className="text-xs text-gray-500">
                                        Customer
                                    </span>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-gray-900">
                                            {order.customer_name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            ID: {order.customer_id}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 shadow-sm">
                                    <span className="text-xs text-gray-500">
                                        Crafter
                                    </span>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-gray-900">
                                            {order.crafter_name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            ID: {order.crafter_id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                    <SecondaryButton onClick={onClose}>
                        Close Detail
                    </SecondaryButton>
                </div>
            </div>
        </Modal>
    );
}
