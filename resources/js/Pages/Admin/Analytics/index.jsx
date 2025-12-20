import React from "react";
import Chart from "react-apexcharts";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout"; // 1. Import AdminLayout

export default function Analytics({ auth }) {
    // 2. Pastikan prop 'auth' diterima

    // --- MOCK DATA (Nantinya data ini dikirim dari Laravel Controller via Props) ---

    // 1. Data Pendapatan (Komisi 10% dari nilai proyek)
    const revenueSeries = [
        {
            name: "Komisi Rakit (10%)",
            data: [1500000, 2100000, 1800000, 3500000, 4200000, 5500000],
        },
    ];
    const revenueOptions = {
        chart: { type: "area", height: 350, toolbar: { show: false } },
        colors: ["#4F46E5"], // Indigo
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2 },
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"] },
        tooltip: {
            y: {
                formatter: (val) =>
                    "Rp " + new Intl.NumberFormat("id-ID").format(val),
            },
        },
        title: {
            text: "Pertumbuhan Pendapatan Bersih",
            style: { fontSize: "16px" },
        },
    };

    // 2. Data Status Proyek
    const projectStatusSeries = [12, 8, 5, 24];
    const projectStatusOptions = {
        chart: { type: "donut" },
        labels: [
            "Menunggu Survei",
            "Pengerjaan (Workshop)",
            "Instalasi",
            "Selesai",
        ],
        colors: ["#F59E0B", "#3B82F6", "#6366F1", "#10B981"],
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: { show: true, label: "Total Proyek" },
                    },
                },
            },
        },
        title: {
            text: "Distribusi Status Proyek",
            style: { fontSize: "16px" },
        },
    };

    // 3. Top 5 Mitra Teknisi
    const topTechSeries = [
        {
            name: "Rating Rata-rata",
            data: [4.9, 4.8, 4.8, 4.7, 4.5],
        },
    ];
    const topTechOptions = {
        chart: { type: "bar", height: 350 },
        plotOptions: {
            bar: { borderRadius: 4, horizontal: true, barHeight: "50%" },
        },
        colors: ["#0EA5E9"],
        dataLabels: { enabled: true, formatter: (val) => val + " ★" },
        xaxis: {
            categories: [
                "Budi Woodworks",
                "Jaya Interior",
                "Asep Mebel",
                "Garut Kreasi",
                "Sinar Jati",
            ],
            max: 5,
        },
        title: {
            text: "Top 5 Mitra Teknisi Terbaik",
            style: { fontSize: "16px" },
        },
    };

    return (
        // 3. Bungkus konten dengan AdminLayout dan kirim user data
        <AdminLayout user={auth?.user}>
            <Head title="Admin Analytics - Rakit" />

            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CHART 1: Pendapatan (Area Chart) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <Chart
                        options={revenueOptions}
                        series={revenueSeries}
                        type="area"
                        height={350}
                    />
                </div>

                {/* CHART 2: Status Proyek (Donut) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <Chart
                        options={projectStatusOptions}
                        series={projectStatusSeries}
                        type="donut"
                        height={350}
                    />
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        Memantau bottleneck pada tahap produksi furnitur.
                    </div>
                </div>

                {/* CHART 3: Top Mitra (Bar) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <Chart
                        options={topTechOptions}
                        series={topTechSeries}
                        type="bar"
                        height={350}
                    />
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        Digunakan untuk program insentif mitra berprestasi.
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
