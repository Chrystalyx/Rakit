import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Configurator from "./Configurator";
import Visualizer from "./Visualizer";
import Summary from "./Summary";
import { X, ArrowLeft } from "lucide-react";

const BASE_OPTIONS = [
    {
        id: "alb",
        name: "Multiplek Albasia",
        type: "Basic Plywood",
        variants: [
            { thickness: "3 mm", price: 63000 },
            { thickness: "9 mm", price: 147000 },
            { thickness: "12 mm", price: 183000 },
            { thickness: "15 mm", price: 222000 },
            { thickness: "18 mm", price: 261000 },
        ],
    },
    {
        id: "mer",
        name: "Multiplek Meranti",
        type: "Premium Plywood",
        variants: [
            { thickness: "9 mm", price: 131000 },
            { thickness: "12 mm", price: 171000 },
            { thickness: "15 mm", price: 202000 },
            { thickness: "18 mm", price: 233000 },
        ],
    },
    {
        id: "block",
        name: "Blockboard Melamine",
        type: "Core Board",
        variants: [
            { thickness: "15 mm SF Doff", price: 255000 },
            { thickness: "18 mm SF Glos", price: 255000 },
            { thickness: "18 mm DF Glos", price: 293000 },
            { thickness: "18 mm DF Doff", price: 302000 },
        ],
    },
];

const FINISH_OPTIONS = [
    {
        id: "hpl-solid-1",
        name: "Deep Night",
        type: "Special HPL",
        price: 1500000,
        texture: "/storage/materials/BMSFcDRQDiQEQJ36dUeq10p1lAJ0zBuF6MeffdkC.jpg",
    },
    {
        id: "hpl-solid-2",
        name: "Pure White",
        type: "Special HPL",
        price: 1450000,
        texture: "/storage/materials/HFK1lgqSwfZPSckzrsRkL7fxR00tcQ6cvAmZXO9V.jpg",
    },
];

export default function CustomizeIndex() {
    const [activeSection, setActiveSection] = useState("dimensions");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultBaseCat = BASE_OPTIONS[0];
    const defaultBaseVar = defaultBaseCat.variants[4];
    const defaultFinish = FINISH_OPTIONS[0];

    const [config, setConfig] = useState({
        width: 120,
        height: 200,
        depth: 60,
        plinth: 10,
        backPanel: true,
        partitions: 1,
        shelves: 4,
        ledStrip: false,
        doorType: "swing",
        handleType: "standard",
        lock: false,

        baseMaterial: {
            id: defaultBaseCat.id,
            name: defaultBaseCat.name,
            thickness: defaultBaseVar.thickness,
            price: defaultBaseVar.price,
        },
        finishingLayer: {
            id: defaultFinish.id,
            name: defaultFinish.name,
            texture: defaultFinish.texture,
            price: defaultFinish.price,
        },
    });

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const volume = (config.width * config.height * config.depth) / 10000;
        let basePrice = volume * 15000;

        if (config.backPanel) basePrice += config.width * config.height * 50;
        basePrice += config.partitions * 150000;
        basePrice += config.shelves * 75000;
        if (config.ledStrip) basePrice += 350000;
        if (config.doorType !== "none")
            basePrice += config.width * config.height * 100;
        if (config.lock) basePrice += 120000;

        basePrice += config.baseMaterial.price;
        basePrice += config.finishingLayer.price;

        setTotalPrice(basePrice);
    }, [config]);

    const handleChange = (key, value) =>
        setConfig((prev) => ({ ...prev, [key]: value }));
    const toggleSection = (section) =>
        setActiveSection(activeSection === section ? null : section);

    const handleNextStep = () => {
        setIsSubmitting(true);

        const features = [];

        const volume = (config.width * config.height * config.depth) / 10000;
        const constructionCost = volume * 15000;
        features.push({
            name: `Jasa Konstruksi & Rakit (Vol: ${volume.toFixed(2)}m³)`,
            price: constructionCost
        });

        if (config.partitions > 0) {
            features.push({
                name: `${config.partitions}x Sekat Vertikal`,
                price: config.partitions * 150000
            });
        }
        if (config.shelves > 0) {
            features.push({
                name: `${config.shelves}x Ambalan`,
                price: config.shelves * 75000
            });
        }

        if (config.doorType !== 'none') {
            const doorPrice = config.width * config.height * 100;
            features.push({
                name: `Pintu ${config.doorType === 'swing' ? 'Swing' : 'Sliding'} (${config.width}x${config.height}cm)`,
                price: doorPrice
            });
        }

        if (config.lock) {
            features.push({ name: "Kunci Pengaman", price: 120000 });
        }

        if (config.ledStrip) {
            features.push({ name: "Instalasi LED Strip", price: 350000 });
        }

        if (config.backPanel) {
            const backPanelPrice = config.width * config.height * 50;
            features.push({
                name: "Penutup Belakang (Backpanel)",
                price: backPanelPrice
            });
        }

        const productData = {
            name: `Lemari Custom ${config.width}x${config.height}cm`,
            price: totalPrice,

            width: config.width,
            height: config.height,
            depth: config.depth,
            plinth: config.plinth,
            backPanel: config.backPanel,
            partitions: config.partitions,
            shelves: config.shelves,
            ledStrip: config.ledStrip,
            doorType: config.doorType,
            lock: config.lock,

            components: {
                base: {
                    name: `${config.baseMaterial.name} (${config.baseMaterial.thickness})`,
                    price: config.baseMaterial.price
                },
                finish: {
                    name: config.finishingLayer.name,
                    price: config.finishingLayer.price
                },
                features: features
            },

            finishingLayer: {
                id: config.finishingLayer.id,
                texture: config.finishingLayer.texture
            }
        };

        router.post(route('customize.store'), productData, {
            onError: (errors) => {
                console.error("Gagal menyimpan konfigurasi:", errors);
                setIsSubmitting(false);
                alert("Terjadi kesalahan saat menyimpan desain. Periksa koneksi Anda.");
            },
            onFinish: () => setIsSubmitting(false)
        });
    };

    return (
        <GuestLayout hideFooter={true}>
            <Head title="Studio Kustomisasi - Rakit" />

            <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-rakit-50 overflow-hidden font-sans text-gray-900">
                {/* 1. KOLOM KIRI */}
                <div className="w-full lg:w-[320px] xl:w-[360px] bg-white border-r border-rakit-200 flex flex-col h-full z-20 shadow-xl relative">
                    <div className="p-6 border-b border-rakit-100 bg-white z-10 flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h2 className="text-xl font-bold text-rakit-800">
                                Konfigurasi
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Sesuaikan dimensi & fitur lemari.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                        <Configurator
                            config={config}
                            handleChange={handleChange}
                            activeSection={activeSection}
                            toggleSection={toggleSection}
                        />
                    </div>
                </div>

                {/* 2. KOLOM TENGAH: VISUALIZER */}
                <div className="flex-1 bg-rakit-100 relative flex items-center justify-center p-8 lg:p-16 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(#602d0d 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    ></div>

                    <Visualizer config={config} />
                </div>

                {/* 3. KOLOM KANAN: SUMMARY */}
                <div className="w-full lg:w-[340px] xl:w-[380px] bg-white border-l border-rakit-200 flex flex-col h-full z-20 shadow-xl">
                    <div className="p-6 border-b border-rakit-100">
                        <h2 className="text-xl font-bold text-rakit-800">
                            Pilih Material
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Tentukan bahan dasar & finishing HPL.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <Summary
                            config={config}
                            handleChange={handleChange}
                            baseOptions={BASE_OPTIONS}
                            finishOptions={FINISH_OPTIONS}
                        />
                    </div>

                    <div className="p-6 border-t border-rakit-200 bg-rakit-50">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-sm text-gray-500">
                                Total Estimasi
                            </span>
                            <span className="text-2xl font-bold text-rakit-800">
                                Rp{" "}
                                {new Intl.NumberFormat("id-ID").format(
                                    totalPrice
                                )}
                            </span>
                        </div>

                        <button
                            onClick={handleNextStep}
                            disabled={isSubmitting}
                            className="w-full py-4 bg-rakit-800 hover:bg-rakit-900 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg shadow-rakit-800/20 transition-all active:scale-[0.98] flex items-center justify-center text-center"
                        >
                            {isSubmitting ? "Menyimpan..." : "Pilih Pengrajin"}
                        </button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}