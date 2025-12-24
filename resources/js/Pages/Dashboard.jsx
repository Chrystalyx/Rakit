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
} from "lucide-react";

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-rakit-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-6 text-left focus:outline-none"
            >
                <span
                    className={`text-lg font-medium ${
                        isOpen ? "text-rakit-500" : "text-rakit-800"
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

export default function Dashboard() {
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

    return (
        <GuestLayout>
            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[800px] h-[800px] fill-rakit-500"
                    >
                        <path
                            d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-7.1C81.5,6.2,70.2,18.5,59.6,29C49,39.5,39.1,48.1,28.3,55.6C17.5,63.1,5.8,69.5,-5.4,78.9C-16.6,88.3,-27.3,100.7,-37.1,97.7C-46.9,94.7,-55.8,76.3,-63.3,61.3C-70.8,46.3,-76.9,34.7,-80.1,22.2C-83.3,9.7,-83.6,-3.7,-79.6,-16.4C-75.6,-29.1,-67.3,-41.1,-56.3,-49.4C-45.3,-57.7,-31.6,-62.3,-18.3,-64.7C-5,-67.1,8.3,-67.3,22.3,-67.3"
                            transform="translate(100 100)"
                        />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rakit-300 text-rakit-800 text-sm font-semibold mb-6 shadow-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rakit-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rakit-500"></span>
                            </span>
                            Platform Interior No. 1 di Indonesia
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-rakit-800 leading-[1.1] mb-6">
                            Furnitur Custom <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rakit-500 to-rakit-600">
                                Tanpa Cemas.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                            Wujudkan interior impian dengan transparansi RAB,
                            pengrajin terverifikasi, dan jaminan keamanan
                            transaksi dalam satu platform.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#"
                                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-rakit-800 text-white font-semibold hover:bg-rakit-900 transition shadow-xl shadow-rakit-800/20 hover:-translate-y-1"
                            >
                                Mulai Proyek
                                <ArrowRight size={20} />
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-rakit-400 text-rakit-800 font-semibold hover:bg-rakit-50 transition"
                            >
                                Lihat Portofolio
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Image Container */}
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop"
                                alt="Modern Interior"
                                className="w-full h-[500px] object-cover"
                            />

                            {/* Floating Stats Card */}
                            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur p-5 rounded-2xl shadow-lg border border-white max-w-xs">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
                                            >
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=User+${i}&background=random`}
                                                    alt="User"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-rakit-800">
                                        500+ Mitra
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 italic">
                                    "Rakit membuat renovasi rumah jadi mudah &
                                    transparan."
                                </p>
                            </div>
                        </div>

                        {/* Decorative Blob Behind (bg-rakit-300/50) */}
                        <div className="absolute -bottom-10 -right-10 w-full h-full bg-rakit-300/50 rounded-full blur-3xl -z-10"></div>
                    </motion.div>
                </div>
            </section>

            {/* ================= STATS BAR ================= */}
            <section className="bg-rakit-800 py-12 text-white relative overflow-hidden">
                {/* SVG Pattern */}
                <div className="absolute inset-0 opacity-5">
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

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                    {[
                        { label: "Proyek Selesai", value: "150+" },
                        { label: "Mitra Terverifikasi", value: "50+" },
                        { label: "Kepuasan Klien", value: "4.9/5" },
                        { label: "Kota Cakupan", value: "12" },
                    ].map((stat, idx) => (
                        <div key={idx} className="p-4">
                            <h4 className="text-4xl font-bold text-rakit-500 mb-2">
                                {stat.value}
                            </h4>
                            <p className="text-gray-300 font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= VALUE PROPOSITION ================= */}
            <section className="py-24 max-w-7xl mx-auto px-6">
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

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
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
                            className="group p-8 rounded-3xl bg-white border border-rakit-300 hover:border-rakit-500 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-rakit-100 text-rakit-800 flex items-center justify-center mb-6 group-hover:bg-rakit-800 group-hover:text-white transition-colors">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-rakit-800 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="bg-white py-24 relative border-y border-rakit-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-rakit-800">
                            Cara Kerja Mudah
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-rakit-300 -z-10"></div>

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
                            <div
                                key={i}
                                className="bg-rakit-100 p-6 rounded-2xl border border-rakit-300 text-center relative hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className="w-10 h-10 mx-auto bg-rakit-800 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4 border-4 border-white shadow-md absolute -top-5 left-1/2 -translate-x-1/2">
                                    {item.step}
                                </div>
                                <div className="mt-6 mb-3 text-rakit-500 flex justify-center">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg text-rakit-800 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-rakit-800 text-center mb-12">
                    Kata Mereka Tentang RAKIT
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            name: "Sarah Wijaya",
                            role: "Pemilik Rumah Baru",
                            quote: "Awalnya ragu bikin kitchen set custom karena takut di-markup. Tapi di Rakit, RAB-nya detail banget. Puas!",
                        },
                        {
                            name: "Budi Santoso",
                            role: "Arsitek",
                            quote: "Platform ini sangat membantu saya mencari vendor kayu yang spesifikasinya jelas. Kualitas pengerjaan mitranya grade A.",
                        },
                    ].map((testi, i) => (
                        <div
                            key={i}
                            className="bg-white p-8 rounded-3xl border border-rakit-300 shadow-sm relative"
                        >
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        size={16}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-6 leading-relaxed">
                                "{testi.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-rakit-300 flex items-center justify-center font-bold text-rakit-800">
                                    {testi.name.charAt(0)}
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
                </div>
            </section>

            {/* ================= FAQ SECTION ================= */}
            {/* border-rakit-300 */}
            <section className="bg-white py-24 border-y border-rakit-300">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-rakit-800 mb-4">
                            Pertanyaan Umum
                        </h2>
                        <p className="text-gray-600">
                            Jawaban untuk pertanyaan yang sering diajukan
                            seputar layanan kami.
                        </p>
                    </div>

                    <div className="space-y-2">
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
            </section>

            {/* ================= CTA FINAL ================= */}
            <section className="relative py-24 mx-6 mb-12 mt-12 rounded-[3rem] overflow-hidden text-center bg-rakit-800 shadow-2xl shadow-rakit-800/30">
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%">
                        <pattern
                            id="dots"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="2" cy="2" r="2" fill="white" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Sudah Siap Membangun?
                    </h2>
                    <p className="text-rakit-200 mb-10 text-lg">
                        Konsultasikan ide Anda sekarang. Gratis biaya konsultasi
                        dan perhitungan RAB awal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#"
                            className="px-8 py-4 rounded-xl bg-white text-rakit-800 font-bold hover:bg-rakit-200 transition shadow-lg"
                        >
                            Daftar Sekarang
                        </a>
                        <a
                            href="#"
                            className="px-8 py-4 rounded-xl border border-white/30 text-white font-bold hover:bg-white/10 transition"
                        >
                            Hubungi Sales
                        </a>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
