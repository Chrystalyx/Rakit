import React from "react";
import Chart from "react-apexcharts";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Analytics({
    auth,
    // Data Lama
    revenueSeries = [],
    revenueCategories = [],
    projectStatusSeries = [],
    projectStatusLabels = [],
    topCraftSeries = [],
    topCraftCategories = [],

    // Data Baru (Pastikan dikirim dari Controller)
    projectVolumeSeries = [],
    crafterLevelSeries = [],
    crafterLevelLabels = [],
}) {
    // 1. Chart Revenue (Area) - Menunjukkan Uang Masuk
    const revenueOptions = {
        chart: {
            type: "area",
            height: 350,
            toolbar: { show: false },
            fontFamily: "Inter, sans-serif",
        },
        colors: ["#4F46E5"], // Indigo
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 90, 100],
            },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2 },
        xaxis: {
            categories: revenueCategories,
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                formatter: (val) => {
                    if (val >= 1000000)
                        return (val / 1000000).toFixed(1) + "jt";
                    return val;
                },
            },
        },
        tooltip: {
            y: {
                formatter: (val) =>
                    "Rp " + new Intl.NumberFormat("id-ID").format(val),
            },
        },
        title: {
            text: "Tren Pendapatan Bersih",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
    };

    // 2. Chart Volume Proyek (Bar) - BARU: Menunjukkan Kesibukan/Traffic
    const volumeOptions = {
        chart: {
            type: "bar",
            height: 350,
            toolbar: { show: false },
            fontFamily: "Inter, sans-serif",
        },
        colors: ["#8B5CF6"], // Violet
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: "50%",
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: revenueCategories, // Menggunakan label bulan yang sama
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        title: {
            text: "Volume Proyek Baru (Traffic)",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
        tooltip: {
            y: { formatter: (val) => val + " Proyek" },
        },
    };

    // 3. Chart Status Proyek (Donut) - Menunjukkan Kesehatan Pipeline
    const projectStatusOptions = {
        chart: { type: "donut", fontFamily: "Inter, sans-serif" },
        labels: projectStatusLabels,
        colors: ["#F59E0B", "#3B82F6", "#10B981"], // Kuning, Biru, Hijau
        plotOptions: {
            pie: {
                donut: {
                    size: "65%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total Proyek",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#6B7280",
                        },
                        value: {
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#111827",
                        },
                    },
                },
            },
        },
        dataLabels: { enabled: false },
        legend: { position: "bottom" },
        title: {
            text: "Distribusi Status Pesanan",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
    };

    // 4. Chart Level Crafter (Pie) - BARU: Menunjukkan Kualitas Supply
    const crafterLevelOptions = {
        chart: { type: "pie", fontFamily: "Inter, sans-serif" },
        labels: crafterLevelLabels,
        colors: ["#9CA3AF", "#60A5FA", "#7C3AED"], // Abu (Pemula), Biru (Menengah), Ungu (Ahli)
        legend: { position: "bottom" },
        dataLabels: { enabled: true },
        title: {
            text: "Komposisi Keahlian Mitra",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
    };

    // 5. Chart Top Crafter (Bar Horizontal) - Menunjukkan Performa Individu
    const topCraftOptions = {
        chart: { type: "bar", height: 350, fontFamily: "Inter, sans-serif" },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                barHeight: "50%",
                distributed: true,
            },
        },
        colors: ["#0EA5E9", "#22C55E", "#EAB308", "#F97316", "#EF4444"],
        dataLabels: {
            enabled: true,
            textAnchor: "start",
            style: { colors: ["#fff"] },
            formatter: (val, opt) => val + " ★",
            offsetX: 0,
        },
        xaxis: {
            categories: topCraftCategories,
            max: 5,
        },
        legend: { show: false },
        tooltip: {
            y: { formatter: (val) => val + " Bintang" },
        },
        title: {
            text: "Top 5 Mitra Terbaik",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
    };

    return (
        <AdminLayout user={auth?.user}>
            <Head title="Admin Analytics - Rakit" />

            <div className="space-y-6 pb-12">
                {/* Grid Container Utama */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 1. REVENUE (Area Chart) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Chart
                            options={revenueOptions}
                            series={revenueSeries}
                            type="area"
                            height={300}
                        />
                    </div>

                    {/* 2. PROJECT VOLUME (Bar Chart) - BARU */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Chart
                            options={volumeOptions}
                            series={projectVolumeSeries}
                            type="bar"
                            height={300}
                        />
                        <div className="mt-4 p-3 bg-violet-50 rounded-lg text-sm text-violet-700 flex gap-2 border border-violet-100">
                            <svg
                                className="w-5 h-5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <span>
                                <strong>Insight:</strong> Bandingkan grafik ini
                                dengan Revenue. Jika Volume naik tapi Revenue
                                turun, berarti banyak proyek kecil yang masuk.
                            </span>
                        </div>
                    </div>

                    {/* 3. STATUS DISTRIBUTION (Donut) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Chart
                            options={projectStatusOptions}
                            series={projectStatusSeries}
                            type="donut"
                            height={350}
                        />
                    </div>

                    {/* 4. CRAFTER LEVEL (Pie) - BARU */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Chart
                            options={crafterLevelOptions}
                            series={crafterLevelSeries}
                            type="pie"
                            height={350}
                        />
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                            <strong>Analisa Supply Mitra:</strong>
                            <ul className="list-disc list-inside mt-1 ml-1 text-xs space-y-1">
                                <li>
                                    Dominasi <b>Ahli</b> bagus untuk kualitas
                                    tinggi & harga premium.
                                </li>
                                <li>
                                    Dominasi <b>Pemula</b> bagus untuk volume
                                    proyek sederhana & murah.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 5. TOP CRAFTER (Full Width di bawah) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 hover:shadow-md transition-shadow">
                        <Chart
                            options={topCraftOptions}
                            series={topCraftSeries}
                            type="bar"
                            height={350}
                        />
                        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                            <span>
                                *Rating berdasarkan rata-rata ulasan pelanggan.
                            </span>
                            <button className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                                Lihat Semua Mitra &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
