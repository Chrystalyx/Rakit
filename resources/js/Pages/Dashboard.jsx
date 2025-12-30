import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuestLayout from "../Layouts/GuestLayout";
import {
    Hammer,
    ShieldCheck,
    FileSearch,
    ArrowRight,
    Star,
    Users,
    MessageSquare,
    CheckCircle2,
    Plus,
    Minus,
    MapPin,
    Briefcase,
    ChevronRight,
    Quote,
    PenTool,
} from "lucide-react";

// --- Komponen FAQ Item ---
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-rakit-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-6 text-left focus:outline-none"
            >
                <span
                    className={`text-lg font-medium ${isOpen ? "text-rakit-500" : "text-rakit-800"
                        } transition-colors`}
                >
                    {question}
                </span>
                {isOpen ? (
                    <Minus size={20} className="text-rakit-500" />
                ) : (
                    <Plus size={20} className="text-rakit-800" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-600 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Dashboard({ reviews }) {
    // --- Variabel Animasi Hero ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const floatingAnimation = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    // --- Variabel Animasi Section Lain ---
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const testimonialData = reviews && reviews.length > 0 ? reviews : [];

    const marqueeData = testimonialData.length > 0
        ? [...testimonialData, ...testimonialData]
        : [];

    return (
        <GuestLayout>
            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden pt-24 pb-24 lg:pt-36 lg:pb-32 bg-gradient-to-b from-white to-rakit-50/50">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-rakit-200/30 rounded-full blur-[100px]" />
                    <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-rakit-300/20 rounded-full blur-[80px]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#171717 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    ></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* LEFT COLUMN: Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-xl"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rakit-200 text-rakit-800 text-sm font-semibold mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rakit-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rakit-500"></span>
                                </span>
                                Platform Interior No. 1 di Indonesia
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl lg:text-7xl font-bold text-rakit-800 leading-[1.1] mb-6 tracking-tight"
                        >
                            Furnitur Custom <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-rakit-600 to-rakit-400">
                                    Tanpa Cemas.
                                </span>
                                {/* Underline decoration animation */}
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="absolute -bottom-2 left-0 w-full h-3 text-rakit-300 -z-10"
                                    viewBox="0 0 200 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.00025 7.00003C52.0003 3.50003 151.001 -1.49997 198.001 3.00003"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </motion.svg>
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-600 mb-10 leading-relaxed"
                        >
                            Wujudkan interior impian dengan transparansi RAB,
                            pengrajin terverifikasi, dan jaminan keamanan
                            transaksi dalam satu platform modern.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="Customize/Index"
                                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-rakit-800 text-white font-semibold hover:bg-rakit-900 transition-all shadow-xl shadow-rakit-800/20 hover:-translate-y-1"
                            >
                                Mulai Proyek
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-rakit-200 text-rakit-800 font-semibold hover:bg-gray-50 hover:border-rakit-300 transition-all shadow-sm"
                            >
                                Lihat Portofolio
                            </a>
                        </motion.div>

                        {/* Trust Indicator (Option 2: Material Brands) */}
                        <motion.div variants={itemVariants} className="mt-12">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                Didukung Material Terbaik
                            </p>

                            <div className="flex items-center">
                                {/* Link ke Website TACO */}
                                <a
                                    href="https://taco.co.id/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-transform duration-300 hover:scale-110 inline-block" // Animasi ditaruh di sini
                                >
                                    <img
                                        src="/images/taco_logo.svg"
                                        alt="TACO"
                                        className="h-10 w-auto object-contain"
                                    />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN: Layered Images & Floating Cards */}
                    <div className="relative h-[600px] w-full hidden lg:block">
                        {/* Main Image (Tall) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 right-0 w-[80%] h-[90%] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white z-10"
                        >
                            <img
                                src="/images/HeroSection.jpg"
                                alt="Modern Interior Main"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </motion.div>

                        {/* Secondary Image (Small, overlapped) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute bottom-10 left-4 w-[45%] h-[40%] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-20"
                        >
                            {/* Placeholder: Gunakan gambar detail furnitur di sini */}
                            <img
                                src="/images/SmallHeroimg.jpg"
                                alt="Detail Furniture"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Floating Card 1: Verified Partner */}
                        <motion.div
                            variants={floatingAnimation}
                            animate="animate"
                            className="absolute top-12 left-0 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-xl border border-white/50 z-30 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">
                                    Mitra Terverifikasi
                                </p>
                                <p className="text-lg font-bold text-rakit-800">
                                    100% Aman
                                </p>
                            </div>
                        </motion.div>

                        {/* Floating Card 2: Satisfaction */}
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-24 -right-6 bg-rakit-800 text-white p-5 rounded-2xl shadow-2xl shadow-rakit-800/30 z-30 max-w-[180px]"
                        >
                            <div className="flex gap-1 text-yellow-400 mb-2">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <p className="text-sm font-medium leading-tight">
                                "Hasil rapi dan sesuai ekspektasi!"
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= STATS BAR ================= */}
            <section className="bg-rakit-800 py-16 text-white relative overflow-hidden">
                {/* Background Pattern - Sedikit dibuat lebih redup */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Container */}
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
                        {[
                            {
                                label: "Proyek Selesai",
                                value: "150+",
                                icon: <Briefcase className="w-6 h-6" />,
                                color: "text-blue-400",
                            },
                            {
                                label: "Mitra Terverifikasi",
                                value: "50+",
                                icon: <Users className="w-6 h-6" />,
                                color: "text-green-400",
                            },
                            {
                                label: "Kepuasan Klien",
                                value: "4.9/5",
                                icon: <Star className="w-6 h-6" />,
                                color: "text-yellow-400",
                            },
                            {
                                label: "Kota Cakupan",
                                value: "12",
                                icon: <MapPin className="w-6 h-6" />,
                                color: "text-red-400",
                            },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group text-center md:text-left flex flex-col md:items-center"
                            >
                                {/* Vertical Divider (Hanya muncul di Desktop & bukan di elemen terakhir) */}
                                {idx !== 3 && (
                                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10 -mr-4"></div>
                                )}

                                {/* Icon Wrapper with Glow Effect */}
                                <div
                                    className={`mx-auto md:mx-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${stat.color
                                        } group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 ring-1 ring-white/10 group-hover:ring-${stat.color.split("-")[1]
                                        }-500/50`}
                                >
                                    {stat.icon}
                                </div>

                                {/* Value Number */}
                                <h4 className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                                    {stat.value}
                                </h4>

                                {/* Label */}
                                <p className="text-rakit-200 text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= VALUE PROPOSITION ================= */}
            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                {/* Header Section */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-rakit-500 font-bold tracking-wider uppercase text-xs">
                        Kenapa Rakit?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-rakit-800 mt-3 mb-4">
                        Standar Baru Furnitur Custom
                    </h2>
                    <p className="text-gray-600">
                        Kami menghilangkan kekhawatiran Anda terhadap kontraktor
                        nakal dengan sistem yang transparan dan aman.
                    </p>
                </div>

                {/* Cards Container */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            title: "Transparansi RAB",
                            desc: "Rincian biaya material dan jasa terbuka. Tidak ada hidden cost yang tiba-tiba muncul.",
                            icon: <FileSearch size={32} />,
                        },
                        {
                            title: "Mitra Terkurasi",
                            desc: "Setiap pengrajin melewati uji kompetensi, cek portofolio, dan verifikasi identitas.",
                            icon: <Users size={32} />,
                        },
                        {
                            title: "Garansi & Keamanan",
                            desc: "Pembayaran Anda ditahan di sistem (Escrow) dan baru cair setelah pekerjaan selesai.",
                            icon: <ShieldCheck size={32} />,
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -10 }} // Efek naik sedikit saat hover
                            className="group p-8 rounded-3xl bg-white border border-rakit-200 hover:border-rakit-400 hover:shadow-2xl hover:shadow-rakit-200/50 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Decorative Background Number (01, 02, 03) */}
                            <div className="absolute -right-4 -top-4 text-9xl font-black text-rakit-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none z-0">
                                0{i + 1}
                            </div>

                            {/* Subtle Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-rakit-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                            {/* Content Wrapper */}
                            <div className="relative z-10">
                                {/* Icon with Wiggle Animation */}
                                <div className="w-16 h-16 rounded-2xl bg-rakit-50 text-rakit-600 flex items-center justify-center mb-6 group-hover:bg-rakit-800 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-md">
                                    <motion.div
                                        whileHover={{
                                            rotate: [0, -10, 10, -5, 5, 0],
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                </div>

                                <h3 className="text-xl font-bold text-rakit-800 mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="bg-white py-24 relative border-y border-rakit-300 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-rakit-500 font-bold tracking-wider uppercase text-xs">
                            Proses Kami
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-rakit-800 mt-2">
                            Cara Kerja Mudah
                        </h2>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.2 } },
                        }}
                        className="grid md:grid-cols-4 gap-8 relative"
                    >
                        {/* 1. Connecting Dashed Line (Blueprint Style) - Desktop Only */}
                        <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-0.5 border-t-2 border-dashed border-rakit-300 -z-10"></div>

                        {[
                            {
                                step: "01",
                                title: "Konsultasi",
                                desc: "Ceritakan kebutuhan dan preferensi gaya Anda.",
                                icon: <MessageSquare />,
                            },
                            {
                                step: "02",
                                title: "Terima RAB",
                                desc: "Dapatkan estimasi biaya transparan dari mitra.",
                                icon: <FileSearch />,
                            },
                            {
                                step: "03",
                                title: "Pengerjaan",
                                desc: "Pantau progress harian lewat dashboard.",
                                icon: <Hammer />,
                            },
                            {
                                step: "04",
                                title: "Serah Terima",
                                desc: "Furnitur selesai dan garansi aktif.",
                                icon: <CheckCircle2 />,
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.5 },
                                    },
                                }}
                                className="relative group"
                            >
                                {/* Arrow Indicator between steps (Desktop Only) */}
                                {i !== 3 && (
                                    <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-rakit-200 z-0">
                                        <ChevronRight size={24} />
                                    </div>
                                )}

                                <div className="bg-rakit-50 p-6 rounded-3xl border border-rakit-200 text-center relative hover:-translate-y-2 hover:shadow-lg hover:border-rakit-400 transition-all duration-300 h-full z-10">
                                    {/* Step Number Bubble */}
                                    <div className="w-12 h-12 mx-auto bg-rakit-800 text-white rounded-full flex items-center justify-center font-bold text-sm mb-6 border-[4px] border-white shadow-md absolute -top-6 left-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-300 ring-4 ring-rakit-50">
                                        {item.step}
                                    </div>

                                    {/* Icon */}
                                    <div className="mt-8 mb-4 text-rakit-600 flex justify-center group-hover:text-rakit-800 transition-colors">
                                        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-bold text-lg text-rakit-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= TESTIMONIALS (UPDATED) ================= */}
            <section className="py-24 bg-rakit-50 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                    <span className="text-rakit-500 font-bold tracking-wider uppercase text-xs">
                        Social Proof
                    </span>
                    <h2 className="text-3xl font-bold text-rakit-800 mt-2">
                        Kata Mereka Tentang RAKIT
                    </h2>
                </div>

                {/* Gradient Mask */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-rakit-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-rakit-50 to-transparent z-10 pointer-events-none"></div>

                {/* Kondisi jika belum ada review */}
                {testimonialData.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <p>Belum ada ulasan saat ini. Jadilah yang pertama!</p>
                    </div>
                ) : (
                    /* Moving Container */
                    <div className="flex">
                        <motion.div
                            className="flex gap-6 px-6"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                ease: "linear",
                                duration: 40,
                                repeat: Infinity,
                            }}
                        >
                            {marqueeData.map((testi, i) => (
                                <div
                                    key={`${testi.id}-${i}`}
                                    className="flex-shrink-0 w-[400px] bg-white p-8 rounded-3xl border border-rakit-200 shadow-sm relative group hover:border-rakit-400 transition-colors"
                                >
                                    {/* Quote Icon */}
                                    <div className="absolute top-6 right-8 text-rakit-100 group-hover:text-rakit-200 transition-colors">
                                        <Quote size={48} fill="currentColor" className="opacity-50" />
                                    </div>

                                    {/* Rating Stars Dinamis */}
                                    <div className="flex gap-1 text-yellow-400 mb-6 relative z-10">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star
                                                key={idx}
                                                size={16}
                                                fill={idx < testi.rating ? "currentColor" : "none"} // Fill bintang sesuai rating
                                                className={idx < testi.rating ? "text-yellow-400" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>

                                    {/* Comment Text */}
                                    <p className="text-gray-700 italic mb-8 leading-relaxed relative z-10 h-24 line-clamp-3">
                                        "{testi.comment}"
                                    </p>

                                    {/* User Info */}
                                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                        <div className="w-10 h-10 rounded-full bg-rakit-800 text-white flex items-center justify-center font-bold">
                                            {testi.avatar_initial}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-rakit-800">
                                                {testi.name}
                                            </h5>
                                            <span className="text-xs text-gray-500">
                                                {testi.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </section>

            {/* ================= FAQ SECTION ================= */}
            <section className="bg-white py-24 border-y border-rakit-300 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute -left-20 top-20 text-rakit-50 pointer-events-none select-none">
                    <svg
                        width="400"
                        height="400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
                        {/* Kolom Kiri: Judul & CTA */}
                        <div className="md:col-span-4 lg:col-span-4 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-rakit-800 mb-4">
                                    Pertanyaan Umum
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Jawaban untuk pertanyaan yang sering
                                    diajukan seputar layanan, pembayaran, dan
                                    garansi kami.
                                </p>
                            </div>

                            {/* Kotak 'Masih Bingung' */}
                            <div className="p-6 bg-rakit-50 rounded-2xl border border-rakit-200">
                                <h4 className="font-bold text-rakit-800 mb-2">
                                    Masih bingung?
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Jika pertanyaan Anda tidak ada di sini, tim
                                    kami siap membantu.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-rakit-600 hover:text-rakit-800 transition-colors"
                                >
                                    Hubungi WhatsApp Admin{" "}
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Kolom Kanan: Daftar FAQ */}
                        <div className="md:col-span-8 lg:col-span-8">
                            <div className="divide-y divide-rakit-200 border-y border-rakit-200">
                                <FaqItem
                                    question="Apakah ada biaya untuk konsultasi awal?"
                                    answer="Tidak, konsultasi awal dan pembuatan estimasi RAB di RAKIT sepenuhnya gratis tanpa ikatan."
                                />
                                <FaqItem
                                    question="Bagaimana sistem pembayarannya?"
                                    answer="Kami menggunakan sistem termin (Down Payment) yang aman. Dana Anda disimpan di rekening penampung RAKIT dan baru diteruskan ke pengrajin sesuai progres pekerjaan."
                                />
                                <FaqItem
                                    question="Apakah ada garansi jika hasil tidak sesuai?"
                                    answer="Ya, kami memberikan garansi retensi selama 30-90 hari setelah serah terima untuk memastikan kualitas pengerjaan."
                                />
                                <FaqItem
                                    question="Berapa lama proses pengerjaan furnitur?"
                                    answer="Waktu pengerjaan bervariasi tergantung kerumitan desain, namun rata-rata memakan waktu 2-4 minggu setelah desain disepakati."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CTA FINAL ================= */}
            <section className="relative mx-6 mb-12 mt-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative py-24 rounded-[3rem] overflow-hidden text-center bg-rakit-900 shadow-2xl shadow-rakit-900/50"
                >
                    {/* 1. Spotlight Gradient Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rakit-700 via-rakit-900 to-rakit-950 z-0"></div>

                    {/* 2. Animated Pattern Overlay */}
                    <motion.div
                        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0 opacity-20 z-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(#ffffff 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    ></motion.div>

                    {/* 3. Content */}
                    <div className="relative z-10 max-w-3xl mx-auto px-6">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Wujudkan Kabinet <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-rakit-200">
                                Sesuai Karaktermu
                            </span>
                        </h2>

                        <p className="text-rakit-200 mb-10 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Desain sendiri Kabinet impian dengan fitur
                            kustomisasi kami, atau cari pengrajin ahli untuk
                            mengerjakannya.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            {/* Tombol Primary: Ke Halaman Customize */}
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/customize" // Sesuaikan link ini
                                className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-rakit-900 font-bold hover:bg-rakit-50 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3"
                            >
                                <PenTool
                                    size={20}
                                    className="text-rakit-600 group-hover:text-rakit-900"
                                />
                                Mulai Custom
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100"
                                />
                            </motion.a>

                            {/* Tombol Secondary: Ke Daftar Pengrajin */}
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/pengrajin" // Sesuaikan link ini
                                className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/10 transition flex items-center justify-center gap-3 backdrop-blur-sm"
                            >
                                <Users size={20} />
                                Lihat Pengrajin
                            </motion.a>
                        </div>

                        <p className="mt-8 text-sm text-white/40">
                            *Ribuan kombinasi desain & mitra terverifikasi
                            menanti.
                        </p>
                    </div>
                </motion.div>
            </section>
        </GuestLayout>
    );
}
