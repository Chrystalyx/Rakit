import React from "react";
import {
    Instagram,
    Twitter,
    Facebook,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-rakit-50 border-t border-rakit-200 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Kolom 1: Brand & Desc */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-rakit-800 text-white font-bold flex items-center justify-center text-sm">
                                R
                            </div>
                            <span className="text-xl font-bold text-rakit-800">
                                RAKIT.
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Platform managed marketplace furnitur custom pertama
                            di Indonesia dengan transparansi total, pengrajin
                            terkurasi, dan jaminan keamanan.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-rakit-200 flex items-center justify-center text-rakit-800 hover:bg-rakit-800 hover:text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Kolom 2: Layanan */}
                    <div>
                        <h4 className="font-bold text-rakit-800 mb-6">
                            Layanan
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            {[
                                "Kitchen Set",
                                "Lemari Custom",
                                "Meja Kerja",
                                "Renovasi Kamar",
                                "Komersial",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="hover:text-rakit-500 transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 3: Perusahaan */}
                    <div>
                        <h4 className="font-bold text-rakit-800 mb-6">
                            Perusahaan
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            {[
                                "Tentang Kami",
                                "Karir",
                                "Blog",
                                "Pusat Bantuan",
                                "Syarat & Ketentuan",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="hover:text-rakit-500 transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kolom 4: Kontak */}
                    <div>
                        <h4 className="font-bold text-rakit-800 mb-6">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="text-rakit-500 shrink-0 mt-0.5"
                                />
                                <span>
                                    Jl. Furniture No. 88, Bandung, Jawa Barat
                                    40132
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail
                                    size={18}
                                    className="text-rakit-500 shrink-0"
                                />
                                <a
                                    href="mailto:support@rakit.id"
                                    className="hover:text-rakit-800"
                                >
                                    support@rakit.id
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone
                                    size={18}
                                    className="text-rakit-500 shrink-0"
                                />
                                <span>+62 812-3456-7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-rakit-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} RAKIT Indonesia. All
                        rights reserved.
                    </p>
                    <p className="flex gap-6">
                        <a href="#" className="hover:text-rakit-800">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-rakit-800">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
