import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ShieldCheck, MessageSquare, CheckCircle2, Clock, Hammer, Share2, Heart, UserCheck, X, ChevronLeft, ChevronRight, Award } from "lucide-react";

const ImageSliderModal = ({ isOpen, onClose, portfolio }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    if (!isOpen || !portfolio) return null;
    const images = portfolio.images || [portfolio.image];

    const paginate = (newDirection) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition"><X size={24} /></button>
                    <div className="relative w-full max-w-5xl h-full md:h-[85vh] flex flex-col items-center justify-center p-4">
                        <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden rounded-lg">
                            <motion.img
                                key={currentIndex}
                                src={images[currentIndex]}
                                initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute w-full h-full object-contain"
                                alt={`Slide ${currentIndex}`}
                            />
                            {images.length > 1 && (
                                <>
                                    <button className="absolute left-2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full z-20" onClick={(e) => { e.stopPropagation(); paginate(-1); }}><ChevronLeft size={24} /></button>
                                    <button className="absolute right-2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full z-20" onClick={(e) => { e.stopPropagation(); paginate(1); }}><ChevronRight size={24} /></button>
                                </>
                            )}
                        </div>
                        <div className="mt-6 text-center text-white z-20">
                            <h3 className="text-xl font-bold">{portfolio.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{portfolio.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

const PortfolioTab = ({ portfolios, onSelect }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {portfolios.length > 0 ? (
            portfolios.map((item) => (
                <div key={item.id} onClick={() => onSelect(item)} className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium border border-white/30">Lihat Foto</span>
                        </div>
                    </div>
                    <div className="p-5">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-rakit-800 transition">{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    </div>
                </div>
            ))
        ) : (
            <div className="col-span-full text-center text-gray-500 py-10">Belum ada portofolio.</div>
        )}
    </motion.div>
);

const AboutTab = ({ crafter }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><UserCheck size={24} /></div>
                Tentang Pengrajin
            </h3>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">{crafter.bio}</div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Hammer size={24} /></div>
                Keahlian & Spesialisasi
            </h3>
            <div className="flex flex-wrap gap-3">
                {crafter.skills.length > 0 ? crafter.skills.map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 shadow-sm">
                        <CheckCircle2 size={14} className="text-green-500" /> {skill}
                    </span>
                )) : <span className="text-gray-500">Belum ada keahlian spesifik yang ditambahkan.</span>}
            </div>
        </div>
    </motion.div>
);

const ReviewsTab = ({ reviews }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {reviews.length > 0 ? reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-600 text-sm">Review content...</p>
            </div>
        )) : (
            <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100">Belum ada ulasan untuk pengrajin ini.</div>
        )}
    </motion.div>
);

export default function CrafterDetail({ crafter }) {
    const [activeTab, setActiveTab] = useState("portfolio");
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    const tabs = [
        { id: "portfolio", label: "Portofolio", count: crafter.portfolios.length },
        { id: "about", label: "Tentang", count: null },
        { id: "reviews", label: "Ulasan", count: crafter.reviewCount },
    ];

    return (
        <GuestLayout>
            <Head title={`${crafter.name} - Profil Pengrajin`} />
            <div className="min-h-screen bg-[#FAFAFA] pb-20">
                {/* Header Profile */}
                <div className="relative bg-white">
                    <div className="h-64 md:h-80 w-full relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="flex flex-col md:flex-row items-end gap-6 -mt-20 pb-8 relative z-10">
                            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[5px] border-white bg-white shadow-2xl overflow-hidden">
                                {crafter.avatar ? <img src={crafter.avatar} alt={crafter.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-rakit-100 flex items-center justify-center text-4xl font-bold text-rakit-700">{crafter.name.charAt(0)}</div>}
                            </div>
                            <div className="flex-1 w-full text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">{crafter.name}</h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
                                    <span>{crafter.role}</span> • <span className="flex items-center gap-1"><MapPin size={14} /> {crafter.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex gap-8 border-b border-gray-200 mb-6">
                                {tabs.map((tab) => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-4 text-sm font-bold flex gap-2 ${activeTab === tab.id ? "text-rakit-800 border-b-2 border-rakit-800" : "text-gray-400"}`}>
                                        {tab.label} {tab.count && <span className="bg-gray-100 text-gray-600 px-2 rounded-full text-xs">{tab.count}</span>}
                                    </button>
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                {activeTab === "portfolio" && <PortfolioTab key="p" portfolios={crafter.portfolios} onSelect={setSelectedPortfolio} />}
                                {activeTab === "about" && <AboutTab key="a" crafter={crafter} />}
                                {activeTab === "reviews" && <ReviewsTab key="r" reviews={crafter.reviews} />}
                            </AnimatePresence>
                        </div>

                        {/* Sidebar CTA */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-rakit-900/5 sticky top-24">
                                <h4 className="font-bold text-gray-900 mb-2 text-lg">Tertarik bekerja sama?</h4>
                                <p className="text-sm text-gray-500 mb-6">Diskusikan ide Anda langsung dengan {crafter.name}.</p>
                                <Link href="/chat" className="w-full flex items-center justify-center gap-2 py-4 bg-rakit-800 text-white font-bold rounded-xl hover:bg-rakit-900 transition-all">
                                    <MessageSquare size={18} /> Chat & Minta Penawaran
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ImageSliderModal isOpen={!!selectedPortfolio} onClose={() => setSelectedPortfolio(null)} portfolio={selectedPortfolio} />
        </GuestLayout>
    );
}