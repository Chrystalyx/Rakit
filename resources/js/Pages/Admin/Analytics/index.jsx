import React from "react";
import Chart from "react-apexcharts";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Analytics({
    auth,
    revenueSeries = [],
    revenueCategories = [],
    projectStatusSeries = [],
    projectStatusLabels = [],
    topCraftSeries = [],
    topCraftCategories = [],
}) {
    const revenueOptions = {
        chart: {
            type: "area",
            height: 350,
            toolbar: { show: false },
            fontFamily: "Inter, sans-serif",
        },
        colors: ["#4F46E5"],
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
                    if (val >= 1000000) return (val / 1000000).toFixed(1) + "jt";
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
            text: "Pertumbuhan Pendapatan Bersih (6 Bulan Terakhir)",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
        grid: {
            borderColor: "#F3F4F6",
            strokeDashArray: 4,
        },
    };

    const projectStatusOptions = {
        chart: { type: "donut", fontFamily: "Inter, sans-serif" },
        labels: projectStatusLabels,
        colors: ["#F59E0B", "#3B82F6", "#10B981"],
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
            text: "Distribusi Status Proyek",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
    };

    const topCraftOptions = {
        chart: { type: "bar", height: 350, fontFamily: "Inter, sans-serif" },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                barHeight: "40%",
                distributed: true,
            },
        },
        colors: ["#0EA5E9", "#22C55E", "#EAB308", "#F97316", "#EF4444"],
        dataLabels: {
            enabled: true,
            textAnchor: "start",
            style: { colors: ["#fff"] },
            formatter: (val, opt) => {
                return val + " ★";
            },
            offsetX: 0,
        },
        xaxis: {
            categories: topCraftCategories,
            max: 5,
        },
        legend: { show: false },
        tooltip: {
            y: {
                formatter: (val) => val + " Bintang",
            },
        },
        title: {
            text: "Top 5 Mitra Teknisi Terbaik",
            style: { fontSize: "16px", fontWeight: "600", color: "#111827" },
        },
    };

    return (
        <AdminLayout user={auth?.user}>
            <Head title="Admin Analytics - Rakit" />

            <div className="space-y-6">
                {/* Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* CHART 1: Pendapatan (Area Chart) - Full Width di Mobile, Span 2 di Desktop */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 hover:shadow-md transition-shadow">
                        <Chart
                            options={revenueOptions}
                            series={revenueSeries}
                            type="area"
                            height={350}
                        />
                    </div>

                    {/* CHART 2: Status Proyek (Donut) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Chart
                            options={projectStatusOptions}
                            series={projectStatusSeries}
                            type="donut"
                            height={350}
                        />
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700 flex gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>
                                <strong>Insight:</strong> Pantau proporsi
                                'Menunggu Review' agar tidak terjadi penumpukan
                                antrean pesanan.
                            </span>
                        </div>
                    </div>

                    {/* CHART 3: Top Mitra (Bar) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Chart
                            options={topCraftOptions}
                            series={topCraftSeries}
                            type="bar"
                            height={350}
                        />
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-700 flex gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>
                                <strong>Tips:</strong> Berikan insentif khusus
                                kepada mitra di posisi #1 untuk meningkatkan
                                retensi.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
