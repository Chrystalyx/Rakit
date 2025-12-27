import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Star,
    ShieldCheck,
    MessageSquare,
    CheckCircle2,
    Clock,
    Hammer,
    Share2,
    Heart,
    UserCheck,
    X,
    ChevronLeft,
    ChevronRight,
    Award, // <--- SUDAH DIPERBAIKI: Import Award ditambahkan
} from "lucide-react";

// --- COMPONENT: IMAGE SLIDER MODAL (POPUP) ---
const ImageSliderModal = ({ isOpen, onClose, portfolio }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 1 = kanan, -1 = kiri

    if (!isOpen || !portfolio) return null;

    const images = portfolio.images || [portfolio.image]; // Fallback jika cuma 1 gambar

    const paginate = (newDirection) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    // Variasi animasi slide
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
                    >
                        <X size={24} />
                    </button>

                    {/* Content Container */}
                    <div className="relative w-full max-w-5xl h-full md:h-[85vh] flex flex-col items-center justify-center p-4">
                        {/* Image Viewer */}
                        <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden rounded-lg">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex]}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        },
                                        opacity: { duration: 0.2 },
                                    }}
                                    className="absolute w-full h-full object-contain"
                                    alt={`Slide ${currentIndex}`}
                                />
                            </AnimatePresence>

                            {/* Nav Buttons (Hanya muncul jika gambar > 1) */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition backdrop-blur-sm z-20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            paginate(-1);
                                        }}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        className="absolute right-2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition backdrop-blur-sm z-20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            paginate(1);
                                        }}
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Caption & Indicators */}
                        <div className="mt-6 text-center text-white z-20">
                            <h3 className="text-xl font-bold">
                                {portfolio.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                {portfolio.category} • {portfolio.duration}
                            </p>

                            {/* Dots Indicator */}
                            {images.length > 1 && (
                                <div className="flex gap-2 justify-center mt-4">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setDirection(
                                                    idx > currentIndex ? 1 : -1
                                                );
                                                setCurrentIndex(idx);
                                            }}
                                            className={`w-2 h-2 rounded-full transition-all ${
                                                idx === currentIndex
                                                    ? "bg-white w-6"
                                                    : "bg-white/40"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- TAB CONTENT: PORTFOLIO GRID ---
const PortfolioTab = ({ portfolios, onSelect }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
    >
        {portfolios.map((item) => (
            <div
                key={item.id}
                onClick={() => onSelect(item)} // Trigger Modal
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    {/* Tampilkan gambar pertama sebagai thumbnail */}
                    <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay Icon Zoom */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                            Lihat {item.images.length} Foto
                        </span>
                    </div>
                </div>

                {/* Content (Tanpa Harga) */}
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-rakit-800 transition">
                                {item.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                                {item.category}
                            </p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-200 uppercase tracking-wide">
                            Selesai
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </motion.div>
);

// --- TAB CONTENT: ABOUT ---
const AboutTab = ({ crafter }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
    >
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <UserCheck size={24} />
                </div>
                Tentang Pengrajin
            </h3>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {crafter.bio}
            </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Hammer size={24} />
                </div>
                Keahlian & Spesialisasi
            </h3>
            <div className="flex flex-wrap gap-3">
                {crafter.skills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:border-rakit-300 hover:text-rakit-800 transition-colors shadow-sm"
                    >
                        <CheckCircle2 size={14} className="text-green-500" />
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

// --- TAB CONTENT: REVIEWS ---
const ReviewsTab = ({ reviews }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
    >
        {reviews.map((review) => (
            <div
                key={review.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex items-start gap-4">
                    <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <h5 className="font-bold text-gray-900">
                                    {review.user}
                                </h5>
                                <p className="text-xs text-gray-500">
                                    {review.project}
                                </p>
                            </div>
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                {review.date}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mb-3 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={
                                        i < review.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-200"
                                    }
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50/50 p-3 rounded-xl rounded-tl-none italic">
                            "{review.comment}"
                        </p>
                    </div>
                </div>
            </div>
        ))}
        <button className="w-full py-4 text-sm font-bold text-gray-500 hover:text-rakit-800 hover:bg-gray-50 rounded-xl transition border border-dashed border-gray-300 hover:border-rakit-300">
            Lihat Semua Ulasan
        </button>
    </motion.div>
);

export default function CrafterDetail() {
    const [activeTab, setActiveTab] = useState("portfolio");
    const [selectedPortfolio, setSelectedPortfolio] = useState(null); // State untuk Modal

    // --- DATA DUMMY (UPDATED: MULTIPLE IMAGES PER PORTFOLIO) ---
    const crafter = {
        id: 1,
        name: "Pak Joko Susilo",
        role: "Master Pengrajin Kayu",
        level: "Ahli",
        address: "Jepara, Jawa Tengah",
        joinDate: "2023",
        isVerified: true,
        rating: 4.9,
        reviewCount: 124,
        projectsCompleted: 42,
        responseTime: "< 30 Menit",
        bio: "Selamat datang di workshop saya! \n\nSaya adalah pengrajin kayu generasi kedua yang tumbuh di Jepara. Dengan pengalaman lebih dari 15 tahun, saya telah mengerjakan ratusan proyek.\n\nFilosofi kerja saya sederhana: 'Kualitas adalah janji'. Saya hanya menggunakan kayu legal berkualitas dan bahan finishing premium.",
        skills: [
            "Kayu Jati Solid",
            "Kitchen Set Custom",
            "Lemari Tanam (Built-in)",
            "Finishing Melamic & Duco",
            "Restorasi Furnitur Antik",
            "Desain Minimalis Modern",
        ],

        // Perhatikan struktur 'images' (Array)
        portfolios: [
            {
                id: 1,
                title: "Kitchen Set Scandinavian",
                category: "Interior Dapur",
                duration: "3 Minggu",
                images: [
                    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1200&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop",
                ],
            },
            {
                id: 2,
                title: "Lemari Wardrobe Full Plafond",
                category: "Kamar Tidur",
                duration: "2 Minggu",
                images: [
                    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1200&auto=format&fit=crop",
                ],
            },
            {
                id: 3,
                title: "Meja Makan Solid Wood",
                category: "Ruang Makan",
                duration: "10 Hari",
                images: [
                    "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1200&auto=format&fit=crop",
                ],
            },
            {
                id: 4,
                title: "Rak TV Wall-Mounted Industrial",
                category: "Ruang Keluarga",
                duration: "1 Minggu",
                images: [
                    "https://images.unsplash.com/photo-1595515106968-b4277af7888e?q=80&w=1200&auto=format&fit=crop",
                ],
            },
        ],
        reviews: [
            {
                id: 1,
                user: "Budi Santoso",
                avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
                project: "Kitchen Set Custom",
                rating: 5,
                comment:
                    "Hasil aslinya jauh lebih bagus dari desain 3D. Finishing haluss banget.",
                date: "2 hari yang lalu",
            },
            {
                id: 2,
                user: "Siti Aminah",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                project: "Lemari Pakaian",
                rating: 4,
                comment:
                    "Pengerjaan rapi dan kokoh. Sedikit terlambat tapi komunikasi lancar.",
                date: "1 minggu yang lalu",
            },
        ],
    };

    const tabs = [
        {
            id: "portfolio",
            label: "Portofolio",
            count: crafter.portfolios.length,
        },
        { id: "about", label: "Tentang", count: null },
        { id: "reviews", label: "Ulasan", count: crafter.reviewCount },
    ];

    return (
        <GuestLayout>
            <Head title={`${crafter.name} - Portofolio`} />

            <div className="min-h-screen bg-[#FAFAFA] pb-20">
                {/* --- HEADER PROFILE --- */}
                <div className="relative bg-white">
                    <div className="h-64 md:h-80 w-full relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                            alt="Cover"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-6 right-6 flex gap-3 z-20">
                            <button className="p-2.5 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-gray-900 transition-all shadow-lg">
                                <Share2 size={20} />
                            </button>
                            <button className="p-2.5 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="flex flex-col md:flex-row items-end gap-6 -mt-20 pb-8 relative z-10">
                            <div className="relative group">
                                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[5px] border-white bg-white shadow-2xl overflow-hidden relative z-10">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                                        alt={crafter.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {crafter.isVerified && (
                                    <div className="absolute bottom-3 right-3 z-20 bg-blue-500 text-white p-1.5 rounded-full border-[3px] border-white shadow-md">
                                        <ShieldCheck
                                            size={22}
                                            fill="currentColor"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 w-full md:mb-4 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 drop-shadow-sm md:drop-shadow-none text-white md:text-gray-900">
                                            {crafter.name}
                                        </h1>
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-200 md:text-gray-500 font-medium">
                                            <span>{crafter.role}</span>
                                            <span className="hidden md:inline">
                                                •
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin size={14} />{" "}
                                                {crafter.address}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-6 bg-white/90 backdrop-blur md:bg-white px-6 py-3 rounded-2xl shadow-lg md:shadow-sm border border-gray-100 mt-4 md:mt-0 mx-auto md:mx-0 max-w-fit">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 font-extrabold text-gray-900 text-xl">
                                                <Star
                                                    size={20}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                                {crafter.rating}
                                            </div>
                                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                                Rating
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-gray-200"></div>
                                        <div className="text-center">
                                            <div className="font-extrabold text-gray-900 text-xl">
                                                {crafter.projectsCompleted}
                                            </div>
                                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                                Proyek
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT & SIDEBAR --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                        {/* LEFT COLUMN (Tabs & Content) */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-20 bg-[#FAFAFA]/95 backdrop-blur z-30 py-2 mb-6">
                                <div className="flex gap-8 border-b border-gray-200">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`relative pb-4 text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                                                activeTab === tab.id
                                                    ? "text-rakit-800"
                                                    : "text-gray-400 hover:text-gray-600"
                                            }`}
                                        >
                                            {tab.label}
                                            {tab.count && (
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                                        activeTab === tab.id
                                                            ? "bg-rakit-100 text-rakit-700"
                                                            : "bg-gray-200 text-gray-500"
                                                    }`}
                                                >
                                                    {tab.count}
                                                </span>
                                            )}
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-rakit-800 rounded-t-full"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    {activeTab === "portfolio" && (
                                        <PortfolioTab
                                            key="portfolio"
                                            portfolios={crafter.portfolios}
                                            onSelect={(item) =>
                                                setSelectedPortfolio(item)
                                            } // Pass handler
                                        />
                                    )}
                                    {activeTab === "about" && (
                                        <AboutTab
                                            key="about"
                                            crafter={crafter}
                                        />
                                    )}
                                    {activeTab === "reviews" && (
                                        <ReviewsTab
                                            key="reviews"
                                            reviews={crafter.reviews}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* RIGHT COLUMN (Sticky CTA) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-rakit-900/5">
                                    <h4 className="font-bold text-gray-900 mb-2 text-lg">
                                        Tertarik bekerja sama?
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        Diskusikan ide Anda langsung dengan{" "}
                                        {crafter.name}. Konsultasi gratis &
                                        penawaran transparan.
                                    </p>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                                            <span className="text-gray-500 flex items-center gap-2">
                                                <Clock
                                                    size={16}
                                                    className="text-rakit-400"
                                                />{" "}
                                                Respon Chat
                                            </span>
                                            <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                                {crafter.responseTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                                            <span className="text-gray-500 flex items-center gap-2">
                                                <CheckCircle2
                                                    size={16}
                                                    className="text-rakit-400"
                                                />{" "}
                                                Status
                                            </span>
                                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                                Tersedia
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/chat"
                                        className="group w-full flex items-center justify-center gap-2 py-4 bg-rakit-800 text-white font-bold rounded-xl hover:bg-rakit-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <MessageSquare
                                            size={18}
                                            className="group-hover:animate-bounce"
                                        />{" "}
                                        Chat & Minta Penawaran
                                    </Link>
                                    <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-400">
                                        <ShieldCheck size={14} /> Pembayaran
                                        aman via RAKIT Escrow
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-2xl border border-purple-100 flex items-start gap-4">
                                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl shrink-0">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-sm mb-1">
                                            Level: {crafter.level}
                                        </h5>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Pengrajin ini telah diverifikasi
                                            memiliki skill tingkat tinggi dan
                                            pengalaman mumpuni.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE FLOATING CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden z-50 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">
                            Mulai diskusi dengan
                        </p>
                        <p className="font-bold text-gray-900 truncate">
                            {crafter.name}
                        </p>
                    </div>
                    <Link
                        href="/chat"
                        className="px-6 py-3 bg-rakit-800 text-white font-bold rounded-xl shadow-lg hover:bg-rakit-900 flex items-center gap-2"
                    >
                        <MessageSquare size={18} /> Chat
                    </Link>
                </div>
            </div>

            {/* --- IMAGE SLIDER MODAL --- */}
            <ImageSliderModal
                isOpen={!!selectedPortfolio}
                onClose={() => setSelectedPortfolio(null)}
                portfolio={selectedPortfolio}
            />
        </GuestLayout>
    );
}
