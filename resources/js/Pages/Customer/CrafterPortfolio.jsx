import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Star,
    CheckCircle2,
    UserCheck,
    Palette,
    Package,
    Maximize2,
    X,
    Image as ImageIcon,
    Layers,
    Award,
    ShieldCheck,
    Clock,
    ThumbsUp,
    MessageSquare,
} from "lucide-react";

import Visualizer from "../Customize/Visualizer";

// --- DATA DUMMY STATIS ---
const CRAFTER_DATA = {
    id: 1,
    name: "Workshop Kayu Sejahtera",
    role: "Spesialis Interior & Furniture",
    address: "Jl. Soekarno Hatta No. 123, Bandung",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    cover_image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
    bio: "Halo! Saya Budi, pendiri Workshop Kayu Sejahtera. Kami telah beroperasi sejak 2015.\n\nKami percaya bahwa setiap ruangan memiliki cerita, dan tugas kami adalah menghidupkan cerita tersebut melalui desain furnitur yang fungsional dan estetis. Kepuasan pelanggan adalah prioritas utama kami.",

    stats: {
        completionRate: "98%",
        responseTime: "± 1 Jam",
        totalProjects: 124,
        joinedYear: "2015",
    },

    portfolios: [
        {
            id: 1,
            title: "Kitchen Set Modern Minimalis",
            category: "Kitchen Set",
            date: "Selesai Oktober 2023",
            description:
                "Kitchen set letter L dengan finishing HPL Taco motif marmer putih. Dilengkapi dengan rak piring stainless dan lighting LED strip warm white.",
            specs: {
                material: "Blockboard 18mm",
                finish: "HPL Taco White Marble",
            },
            config: {
                width: 240,
                height: 85,
                depth: 60,
                plinth: 10,
                backPanel: true,
                partitions: 4,
                shelves: 2,
                ledStrip: true,
                doorType: "swing",
                lock: false,
                finishingLayer: {
                    id: "hpl-marble",
                    texture:
                        "/storage/materials/HFK1lgqSwfZPSckzrsRkL7fxR00tcQ6cvAmZXO9V.jpg",
                },
            },
            realPhotos: [
                {
                    view: "Tampak Depan",
                    url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
                },
                {
                    view: "Detail Laci",
                    url: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
                },
                {
                    view: "Sisi Samping",
                    url: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80",
                },
                {
                    view: "Lighting",
                    url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
                },
            ],
        },
        {
            id: 2,
            title: "Lemari Pakaian Full Plafon",
            category: "Wardrobe",
            date: "Selesai Agustus 2023",
            description:
                "Lemari pakaian tinggi 3 meter dengan pintu sliding cermin untuk kesan ruangan lebih luas. Material blockboard 18mm.",
            specs: {
                material: "Multiplek Meranti 18mm",
                finish: "HPL Wood Grain",
            },
            config: {
                width: 180,
                height: 240,
                depth: 60,
                plinth: 10,
                backPanel: true,
                partitions: 3,
                shelves: 5,
                ledStrip: false,
                doorType: "sliding",
                lock: true,
                finishingLayer: {
                    id: "hpl-wood",
                    texture:
                        "/storage/materials/BMSFcDRQDiQEQJ36dUeq10p1lAJ0zBuF6MeffdkC.jpg",
                },
            },
            realPhotos: [
                {
                    view: "Full Body",
                    url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
                },
                {
                    view: "Interior",
                    url: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
                },
            ],
        },
    ],

    reviews: [
        {
            id: 101,
            user: "Siti Aminah",
            rating: 5,
            date: "2 Hari yang lalu",
            content:
                "Pengerjaan sangat rapi, tukangnya ramah dan bisa diskusi desain sampai pas. Recommended banget!",
        },
        {
            id: 102,
            user: "Ahmad Dhani",
            rating: 4,
            date: "1 Minggu yang lalu",
            content:
                "Hasil bagus sesuai ekspektasi, cuma pengiriman agak telat dikit karena hujan. Tapi overall oke.",
        },
        {
            id: 103,
            user: "Rina Nose",
            rating: 5,
            date: "1 Bulan yang lalu",
            content:
                "Suka banget sama kitchen set nya! Bahannya tebal dan kokoh.",
        },
    ],
};

// --- COMPONENT: LIGHTBOX ---
const Lightbox = ({ src, onClose }) => (
    <AnimatePresence>
        {src && (
            <div
                className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <button className="absolute top-6 right-6 text-white/70 hover:text-white transition">
                    <X size={32} />
                </button>
                <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={src}
                    className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
                />
            </div>
        )}
    </AnimatePresence>
);

// --- COMPONENT: PORTFOLIO CARD ---
const PortfolioCard = ({ project }) => {
    const [zoomImage, setZoomImage] = useState(null);

    return (
        <div className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="px-3 py-1 bg-rakit-50 text-rakit-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-rakit-100">
                            {project.category}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                            {project.date}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {project.title}
                    </h3>
                </div>
                <div className="flex gap-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Layers size={14} /> {project.specs.material}
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Palette size={14} /> {project.specs.finish}
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row">
                <div className="w-full xl:w-5/12 bg-gradient-to-br from-gray-50 to-gray-100 border-b xl:border-b-0 xl:border-r border-gray-200 relative min-h-[350px] flex flex-col">
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-rakit-600 shadow-sm border border-gray-100 flex items-center gap-1.5">
                        <Package size={12} /> Desain 3D
                    </div>
                    <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                        <div className="w-full h-full scale-90 hover:scale-100 transition-transform duration-500 ease-out origin-center">
                            <Visualizer config={project.config} />
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur text-center">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                            Dimensi Real
                        </p>
                        <p className="text-sm font-bold text-gray-700">
                            {project.config.width} x {project.config.depth} x{" "}
                            {project.config.height} cm
                        </p>
                    </div>
                </div>

                <div className="w-full xl:w-7/12 p-6 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-green-50 text-green-600 rounded-md">
                            <ImageIcon size={16} />
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">
                            Dokumentasi Hasil Pengerjaan
                        </h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.realPhotos.map((photo, idx) => (
                            <div
                                key={idx}
                                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-100 border border-gray-100"
                                onClick={() => setZoomImage(photo.url)}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.view}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                    <Maximize2
                                        size={20}
                                        className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition"
                                    />
                                </div>
                                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-[2px] p-1.5 text-center">
                                    <span className="text-[9px] font-bold text-white uppercase tracking-wide">
                                        {photo.view}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h5 className="text-xs font-bold text-gray-900 mb-2">
                            Catatan Pengrajin:
                        </h5>
                        <p className="text-sm text-gray-600 leading-relaxed italic">
                            "{project.description}"
                        </p>
                    </div>
                </div>
            </div>
            <Lightbox src={zoomImage} onClose={() => setZoomImage(null)} />
        </div>
    );
};

// --- MAIN PAGE ---
export default function CrafterPortfolio() {
    // Menggunakan Data Dummy Lokal
    const crafter = CRAFTER_DATA;

    return (
        <GuestLayout>
            <Head title={`${crafter.name} - Profil Pengrajin`} />
            <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="h-64 w-full relative overflow-hidden group">
                        <img
                            src={crafter.cover_image}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 mb-8">
                        <div className="flex flex-col md:flex-row items-end gap-6">
                            <div className="w-40 h-40 rounded-full border-4 border-white bg-white shadow-2xl overflow-hidden relative z-10">
                                <img
                                    src={crafter.avatar}
                                    alt={crafter.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 pb-2 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white md:text-gray-900 mb-1 drop-shadow-md md:drop-shadow-none">
                                    {crafter.name}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90 md:text-gray-500 font-medium text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <UserCheck size={16} /> {crafter.role}
                                    </span>
                                    <span className="hidden md:inline">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={16} /> {crafter.address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
                    {/* Stats & Bio */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <UserCheck size={20} />
                                    </div>{" "}
                                    Tentang Pengrajin
                                </h3>
                                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                                    {crafter.bio}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <Award
                                        size={20}
                                        className="text-orange-500"
                                    />{" "}
                                    Performa Mitra
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                            <CheckCircle2 size={14} /> Sukses
                                            Rate
                                        </span>
                                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                            {crafter.stats.completionRate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                            <Clock size={14} /> Respon Chat
                                        </span>
                                        <span className="text-sm font-bold text-gray-800">
                                            {crafter.stats.responseTime}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                            <ThumbsUp size={14} /> Total Proyek
                                        </span>
                                        <span className="text-sm font-bold text-gray-800">
                                            {crafter.stats.totalProjects}+
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-rakit-800 rounded-full"></span>{" "}
                                Portofolio Pengerjaan
                            </h2>
                            <span className="text-sm text-gray-500 font-medium">
                                {crafter.portfolios.length} Proyek Selesai
                            </span>
                        </div>
                        <div className="space-y-12">
                            {crafter.portfolios.map((project) => (
                                <PortfolioCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-yellow-400 rounded-full"></span>
                            <h2 className="text-2xl font-extrabold text-gray-900">
                                Ulasan Pelanggan
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {crafter.reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-rakit-300 transition"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-500 text-sm">
                                                {review.user.charAt(0)}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-900 text-sm">
                                                    {review.user}
                                                </h5>
                                                <span className="text-xs text-gray-400">
                                                    {review.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    fill={
                                                        i < review.rating
                                                            ? "#FBBF24"
                                                            : "none"
                                                    }
                                                    className={
                                                        i < review.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed italic">
                                        "{review.content}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
