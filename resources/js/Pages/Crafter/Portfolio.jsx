import React, { useState, useRef } from "react";
import { Head, Link, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
    MapPin, Camera, Plus, Edit2, Trash2, X,
    CheckCircle2, UserCheck, Layers, Palette, Package,
    Image as ImageIcon, Award, Clock, ThumbsUp, Star
} from "lucide-react";

import Visualizer from "../Customize/Visualizer";

const PortfolioFormModal = ({ isOpen, onClose, portfolio, onSave }) => {
    const safePortfolio = portfolio || {};
    const safeSpecs = safePortfolio.specs || {};
    const safeConfig = safePortfolio.config || {};
    const safeImages = safePortfolio.images || safePortfolio.realPhotos || [];

    const [formData, setFormData] = useState({
        title: safePortfolio.title || "",
        category: safePortfolio.category || "Kitchen Set",
        date: safePortfolio.date || "Baru Selesai",
        description: safePortfolio.description || "",
        config: {
            width: safeConfig.width || 180,
            height: safeConfig.height || 200,
            depth: safeConfig.depth || 60,
            plinth: safeConfig.plinth || 10,
            backPanel: safeConfig.backPanel ?? true,
            partitions: safeConfig.partitions || 2,
            shelves: safeConfig.shelves || 4,
            ledStrip: safeConfig.ledStrip ?? true,
            doorType: safeConfig.doorType || "swing",
            lock: safeConfig.lock ?? true,
            finishingLayer: safeConfig.finishingLayer || {
                id: "hpl-wood",
                texture: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=200",
            },
        },
        specs: {
            material: safeSpecs.material || "Multiplek 18mm",
            finish: safeSpecs.finish || "HPL Taco",
        },
        realPhotos: safeImages,
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalPhotos = formData.realPhotos.length > 0 ? formData.realPhotos : [
            { view: "Tampak Depan", url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80" },
            { view: "Detail", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80" }
        ];
        onSave({ ...formData, realPhotos: finalPhotos });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <h3 className="text-lg font-bold text-gray-900">{portfolio ? "Edit Proyek" : "Tambah Proyek Baru"}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar bg-gray-50/50">
                    <form id="portfolio-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Informasi Dasar</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Judul Proyek</label>
                                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Kategori</label>
                                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 text-sm">
                                        <option>Kitchen Set</option>
                                        <option>Wardrobe</option>
                                        <option>Living Room</option>
                                        <option>Office</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Deskripsi</label>
                                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-rakit-500 focus:ring-rakit-500 text-sm"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3 z-10">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100">Batal</button>
                    <button type="submit" form="portfolio-form" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-rakit-800 hover:bg-rakit-900 shadow-lg">Simpan</button>
                </div>
            </motion.div>
        </div>
    );
};

const CMSPortfolioCard = ({ project, onEdit, onDelete }) => {
    const specs = project.specs || {};
    const rawConfig = project.config || {};
    const safeConfig = {
        width: 150, height: 200, depth: 60, plinth: 10, partitions: 2, shelves: 3,
        backPanel: true, ledStrip: false, doorType: 'none', lock: false,
        ...rawConfig,
        finishingLayer: rawConfig.finishingLayer || { id: "default", texture: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=200" }
    };
    const gallery = project.images || project.realPhotos || [];

    return (
        <div className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative group">
            <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button onClick={() => onEdit(project)} className="p-2.5 bg-white text-gray-700 hover:text-blue-600 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition"><Edit2 size={18} /></button>
                <button onClick={() => onDelete(project.id)} className="p-2.5 bg-white text-gray-700 hover:text-red-600 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition"><Trash2 size={18} /></button>
            </div>
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="px-3 py-1 bg-rakit-50 text-rakit-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-rakit-100">{project.category || 'Umum'}</span>
                        <span className="text-xs text-gray-400 font-medium">{project.date || '-'}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                </div>
                <div className="flex gap-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><Layers size={14} /> {specs.material || '-'}</div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><Palette size={14} /> {specs.finish || '-'}</div>
                </div>
            </div>
            <div className="flex flex-col xl:flex-row">
                <div className="w-full xl:w-5/12 bg-gradient-to-br from-gray-50 to-gray-100 border-b xl:border-b-0 xl:border-r border-gray-200 relative min-h-[300px] flex flex-col">
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-rakit-600 shadow-sm border border-gray-100 flex items-center gap-1.5">
                        <Package size={12} /> Desain 3D
                    </div>
                    <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                        <div className="w-full h-full scale-90">
                            <Visualizer config={safeConfig} />
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-7/12 p-6 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-green-50 text-green-600 rounded-md"><ImageIcon size={16} /></div>
                        <h4 className="font-bold text-gray-800 text-sm">Dokumentasi Hasil</h4>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {gallery.length > 0 ? gallery.map((photo, idx) => (
                            <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-gray-100 relative group/img">
                                <img src={photo.url} alt={photo.view} className="w-full h-full object-cover" onError={(e) => e.target.src = "https://placehold.co/400?text=No+Image"} />
                                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1 text-center"><p className="text-[9px] text-white font-bold">{photo.view}</p></div>
                            </div>
                        )) : (<p className="text-xs text-gray-400 col-span-4 italic">Belum ada foto.</p>)}
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-xs text-gray-600 italic line-clamp-2">"{project.description || 'Tidak ada deskripsi'}"</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Portfolio({ crafter }) {
    const profileData = crafter || {};
    const portfolios = crafter.portfolios || [];
    const reviews = crafter.reviews || [];

    const [imageHash, setImageHash] = useState(Date.now());

    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioText, setBioText] = useState(crafter.bio || "");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const handleUpdateBio = () => {
        router.post(route('crafter.profile.bio'), { bio: bioText }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditingBio(false);
                toast.success("Bio diperbarui");
            }
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('avatar', file);
        router.post(route('crafter.profile.avatar'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Foto profil diupdate");
                setImageHash(Date.now());
            },
        });
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('cover', file);
        router.post(route('crafter.profile.cover'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Foto sampul diupdate");
                setImageHash(Date.now());
            },
        });
    };

    const handleSavePortfolio = (newData) => {
        if (editingItem) {
            router.post(route('crafter.portfolio.update', editingItem.id), newData, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingItem(null);
                    setIsFormOpen(false);
                    toast.success("Proyek berhasil diupdate");
                }
            });
        } else {
            router.post(route('crafter.portfolio.store'), newData, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success("Proyek berhasil ditambahkan");
                }
            });
        }
    };

    const handleDeletePortfolio = (id) => {
        if (confirm("Hapus proyek ini secara permanen?")) {
            router.delete(route('crafter.portfolio.delete', id), {
                preserveScroll: true,
                onSuccess: () => toast.success("Proyek dihapus"),
            });
        }
    };

    const safeCoverImage = profileData.cover_image && !profileData.cover_image.includes('default.jpg')
        ? `${profileData.cover_image}?v=${imageHash}`
        : "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80";

    const safeAvatar = profileData.avatar
        ? `${profileData.avatar}?v=${imageHash}`
        : `https://ui-avatars.com/api/?name=${profileData.name || 'User'}`;

    return (
        <GuestLayout>
            <Head title="CMS Profil & Portofolio" />
            <Toaster position="top-center" />
            <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900">
                {/* Header (Editable) */}
                <div className="bg-white border-b border-gray-200 group/header">
                    <div className="h-64 w-full relative overflow-hidden bg-gray-200">
                        {/* COVER IMAGE */}
                        <img
                            src={safeCoverImage}
                            className="w-full h-full object-cover transition-opacity duration-300"
                            alt="Cover"
                            key={imageHash}
                            onError={(e) => e.target.src = "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80"}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover/header:bg-black/50 transition duration-500"></div>
                        <button
                            onClick={() => coverInputRef.current.click()}
                            className="absolute top-6 right-6 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm opacity-0 group-hover/header:opacity-100 transition transform translate-y-[-10px] group-hover/header:translate-y-0"
                        >
                            <Camera size={14} /> Ubah Sampul
                        </button>
                        <input type="file" ref={coverInputRef} className="hidden" onChange={handleCoverChange} />
                    </div>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 mb-8">
                        <div className="flex flex-col md:flex-row items-end gap-6">
                            <div className="relative group/avatar">
                                <div className="w-40 h-40 rounded-full border-4 border-white bg-white shadow-2xl overflow-hidden relative z-10">
                                    {/* AVATAR IMAGE */}
                                    <img
                                        src={safeAvatar}
                                        className="w-full h-full object-cover"
                                        alt="Avatar"
                                        key={imageHash}
                                        onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${profileData.name}`}
                                    />
                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition cursor-pointer z-20"
                                    >
                                        <Camera size={24} />
                                        <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">Ubah</span>
                                    </div>
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleAvatarChange} />
                            </div>
                            <div className="flex-1 pb-2 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white md:text-gray-900 mb-1">
                                    {profileData.name}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90 md:text-gray-500 font-medium text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <UserCheck size={16} /> {profileData.role || 'Crafter'}
                                    </span>
                                    <span className="hidden md:inline">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={16} /> {profileData.address || '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
                    {/* Bio (Editable) & Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative group">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-3 text-lg">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <UserCheck size={20} />
                                        </div>
                                        Tentang Pengrajin
                                    </h3>
                                    {!isEditingBio && (
                                        <button
                                            onClick={() => setIsEditingBio(true)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    )}
                                </div>
                                {isEditingBio ? (
                                    <div className="space-y-4">
                                        <textarea
                                            value={bioText}
                                            onChange={(e) => setBioText(e.target.value)}
                                            rows="6"
                                            className="w-full p-4 rounded-xl border-gray-300 focus:border-rakit-500 text-sm leading-relaxed"
                                        ></textarea>
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setIsEditingBio(false)} className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg">
                                                Batal
                                            </button>
                                            <button onClick={handleUpdateBio} className="px-4 py-2 text-xs font-bold text-white bg-rakit-800 hover:bg-rakit-900 rounded-lg shadow-sm">
                                                Simpan
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                                        {profileData.bio || "Belum ada deskripsi."}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Stats Card */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <Award size={20} className="text-orange-500" /> Performa Anda
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                            <CheckCircle2 size={14} /> Sukses Rate
                                        </span>
                                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                            {profileData.stats?.completionRate || '100%'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                            <Clock size={14} /> Respon Chat
                                        </span>
                                        <span className="text-sm font-bold text-gray-800">
                                            {profileData.stats?.responseTime || '< 1 Jam'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-2">
                                            <ThumbsUp size={14} /> Total Proyek
                                        </span>
                                        <span className="text-sm font-bold text-gray-800">
                                            {profileData.stats?.totalProjects || portfolios.length}+
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                                <Link href="/crafter/view/1" className="block w-full py-3 text-center bg-gray-50 border border-gray-200 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-100 transition">
                                    Lihat Tampilan Publik
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Portofolio (CRUD) */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-rakit-800 rounded-full"></span> Kelola Portofolio
                            </h2>
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setIsFormOpen(true);
                                }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-rakit-800 text-white rounded-xl text-sm font-bold hover:bg-rakit-900 transition shadow-lg"
                            >
                                <Plus size={18} /> Tambah Proyek
                            </button>
                        </div>
                        <div className="space-y-12">
                            {portfolios.length > 0 ? portfolios.map((project) => (
                                <CMSPortfolioCard
                                    key={project.id}
                                    project={project}
                                    onEdit={(item) => {
                                        setEditingItem(item);
                                        setIsFormOpen(true);
                                    }}
                                    onDelete={handleDeletePortfolio}
                                />
                            )) : (
                                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
                                    <p className="text-gray-500">Belum ada portofolio. Tambahkan sekarang!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Review (Read Only) */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-yellow-400 rounded-full"></span>
                            <h2 className="text-2xl font-extrabold text-gray-900">
                                Ulasan Pelanggan
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.length > 0 ? reviews.map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-500 text-sm">
                                                {review.user?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-900 text-sm">{review.user}</h5>
                                                <span className="text-xs text-gray-400">{review.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < review.rating ? "#FBBF24" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed italic">"{review.content}"</p>
                                </div>
                            )) : (
                                <p className="text-gray-500 col-span-3 text-center italic">Belum ada ulasan.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isFormOpen && (
                    <PortfolioFormModal
                        isOpen={isFormOpen}
                        onClose={() => setIsFormOpen(false)}
                        portfolio={editingItem}
                        onSave={handleSavePortfolio}
                    />
                )}
            </AnimatePresence>
        </GuestLayout>
    );
}