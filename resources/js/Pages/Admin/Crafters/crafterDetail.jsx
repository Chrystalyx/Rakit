import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

export default function CrafterDetail({ show, onClose, crafter }) {
    if (!crafter) return null;

    // Helper warna level
    const getLevelBadgeColor = (level) => {
        switch (level) {
            case "ahli":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "menengah":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header Background */}
                <div className="h-32 bg-gray-900 rounded-t-lg relative">
                    <div className="absolute top-4 right-4">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/20 text-white backdrop-blur-sm border border-white/30`}
                        >
                            {crafter.is_verified ? "Verified" : "Unverified"}
                        </span>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    {/* Avatar & Identitas */}
                    <div className="relative flex justify-between items-end -mt-12 mb-8">
                        <div className="flex items-end gap-5">
                            <img
                                src={crafter.avatar}
                                alt={crafter.name}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white object-cover"
                            />
                            <div className="mb-1">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {crafter.name}
                                </h2>
                                <p className="text-gray-500 text-sm flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {crafter.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Kolom Kiri: Info Personal */}
                        <div className="space-y-6">
                            <div className="border-b border-gray-100 pb-2 mb-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                    Personal Data
                                </h3>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">
                                        No. Telepon
                                    </label>
                                    <p className="font-medium text-gray-800 mt-1">
                                        {crafter.phone}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">
                                        No. KTP (NIK)
                                    </label>
                                    <p className="font-mono font-medium text-gray-800 mt-1">
                                        {crafter.ktp_number}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase">
                                        Alamat Lengkap
                                    </label>
                                    <p className="text-gray-600 mt-1 leading-relaxed">
                                        {crafter.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Skill & Level */}
                        <div className="space-y-6">
                            <div className="border-b border-gray-100 pb-2 mb-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                    Skills & Performance
                                </h3>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                                            Rating Skill
                                        </p>
                                        <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                                            {crafter.rating_skill}
                                            <svg
                                                className="w-5 h-5 text-yellow-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-gray-300"></div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                                            Level
                                        </p>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getLevelBadgeColor(
                                                crafter.level
                                            )}`}
                                        >
                                            {crafter.level}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">
                                        Badges & Achievements
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {crafter.badges &&
                                            crafter.badges.map(
                                                (badge, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                                                    >
                                                        <svg
                                                            className="mr-1.5 h-2 w-2 text-indigo-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 8 8"
                                                        >
                                                            <circle
                                                                cx="4"
                                                                cy="4"
                                                                r="3"
                                                            />
                                                        </svg>
                                                        {badge}
                                                    </span>
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <SecondaryButton onClick={onClose}>
                            Close
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
