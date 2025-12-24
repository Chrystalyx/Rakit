import React from "react";

export default function Visualizer({ config }) {
    // Menghitung skala viewbox agar gambar selalu pas di tengah
    const viewBoxW = Math.max(config.width + 100, 300);
    const viewBoxH = Math.max(config.height + 100, 300);

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <svg
                width="100%"
                height="100%"
                viewBox={`-${viewBoxW / 2} -${
                    viewBoxH / 2
                } ${viewBoxW} ${viewBoxH}`}
                className="drop-shadow-2xl transition-all duration-500 ease-spring"
                style={{ overflow: "visible" }}
            >
                {/* --- DEFS (GRADIENTS & SHADOWS) --- */}
                <defs>
                    <linearGradient
                        id="woodGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop offset="0%" stopColor={config.material.color} />
                        <stop
                            offset="100%"
                            stopColor={adjustColor(config.material.color, -20)}
                        />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur
                            stdDeviation="4.5"
                            result="coloredBlur"
                        />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Group Utama dipusatkan */}
                <g
                    transform={`translate(-${config.width / 2}, -${
                        config.height / 2
                    })`}
                >
                    {/* Bayangan Lantai */}
                    <ellipse
                        cx={config.width / 2}
                        cy={config.height + 10}
                        rx={config.width / 1.8}
                        ry="15"
                        fill="black"
                        opacity="0.15"
                        filter="blur(8px)"
                    />

                    {/* --- STRUKTUR UTAMA --- */}

                    {/* Sisi Belakang (Back Panel) */}
                    <rect
                        x="0"
                        y="0"
                        width={config.width}
                        height={config.height}
                        fill={adjustColor(config.material.color, -40)}
                    />

                    {/* Sisi Kiri (Tebal) */}
                    <rect
                        x="-4"
                        y="0"
                        width="4"
                        height={config.height}
                        fill={adjustColor(config.material.color, -10)}
                    />
                    {/* Sisi Kanan (Tebal) */}
                    <rect
                        x={config.width}
                        y="0"
                        width="4"
                        height={config.height}
                        fill={adjustColor(config.material.color, -10)}
                    />
                    {/* Sisi Atas (Tebal) */}
                    <rect
                        x="-4"
                        y="-4"
                        width={config.width + 8}
                        height="4"
                        fill={adjustColor(config.material.color, 20)}
                    />
                    {/* Sisi Bawah (Plint/Dasar) */}
                    <rect
                        x="-4"
                        y={config.height}
                        width={config.width + 8}
                        height="4"
                        fill={adjustColor(config.material.color, -30)}
                    />

                    {/* Plint Depan (Kickplate) */}
                    {config.plinth > 0 && (
                        <rect
                            x="2"
                            y={config.height - config.plinth}
                            width={config.width - 4}
                            height={config.plinth}
                            fill="black"
                            opacity="0.2"
                        />
                    )}

                    {/* --- INTERIOR --- */}

                    {/* Sekat Vertikal */}
                    {Array.from({ length: config.partitions }).map((_, i) => {
                        const spacing = config.width / (config.partitions + 1);
                        return (
                            <rect
                                key={`part-${i}`}
                                x={spacing * (i + 1) - 1}
                                y="0"
                                width="2"
                                height={config.height - config.plinth}
                                fill={adjustColor(config.material.color, -15)}
                            />
                        );
                    })}

                    {/* Ambalan (Rak) */}
                    {Array.from({ length: config.shelves }).map((_, i) => {
                        const spacing =
                            (config.height - config.plinth) /
                            (config.shelves + 1);
                        return (
                            <g key={`shelf-${i}`}>
                                {/* Permukaan Rak */}
                                <rect
                                    x="0"
                                    y={spacing * (i + 1)}
                                    width={config.width}
                                    height="4"
                                    fill={adjustColor(
                                        config.material.color,
                                        -10
                                    )}
                                />
                                {/* Bayangan di bawah rak */}
                                <rect
                                    x="0"
                                    y={spacing * (i + 1) + 4}
                                    width={config.width}
                                    height="10"
                                    fill="black"
                                    opacity="0.05"
                                />
                            </g>
                        );
                    })}

                    {/* LED Strip Effect */}
                    {config.ledStrip && (
                        <rect
                            x="2"
                            y="2"
                            width={config.width - 4}
                            height={config.height - config.plinth - 4}
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="3"
                            opacity="0.7"
                            filter="url(#glow)"
                        />
                    )}

                    {/* --- PINTU (OVERLAY) --- */}
                    {config.doorType !== "none" && (
                        <g>
                            {/* Pintu Kiri */}
                            <rect
                                x="0"
                                y="0"
                                width={config.width / 2 - 0.5}
                                height={config.height}
                                fill={config.material.color}
                                opacity="0.9"
                                stroke="rgba(0,0,0,0.1)"
                                strokeWidth="1"
                            />
                            {/* Handle Kiri */}
                            <rect
                                x={config.width / 2 - 12}
                                y={config.height / 2}
                                width="4"
                                height="40"
                                rx="2"
                                fill="#d1d5db"
                                filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
                            />

                            {/* Pintu Kanan */}
                            <rect
                                x={config.width / 2 + 0.5}
                                y="0"
                                width={config.width / 2 - 0.5}
                                height={config.height}
                                fill={config.material.color}
                                opacity="0.85"
                                stroke="rgba(0,0,0,0.1)"
                                strokeWidth="1"
                            />
                            {/* Handle Kanan */}
                            <rect
                                x={config.width / 2 + 8}
                                y={config.height / 2}
                                width="4"
                                height="40"
                                rx="2"
                                fill="#d1d5db"
                                filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
                            />

                            {/* Kunci */}
                            {config.lock && (
                                <circle
                                    cx={config.width / 2}
                                    cy={config.height / 2 + 50}
                                    r="6"
                                    fill="#fbbf24"
                                    stroke="#b45309"
                                    strokeWidth="1"
                                />
                            )}
                        </g>
                    )}

                    {/* --- DIMENSI LABELS (Diluar Lemari) --- */}
                    {/* Lebar */}
                    <path
                        d={`M 0 ${config.height + 30} L ${config.width} ${
                            config.height + 30
                        }`}
                        stroke="#9ca3af"
                        strokeWidth="1"
                        markerStart="url(#arrow)"
                        markerEnd="url(#arrow)"
                    />
                    <text
                        x={config.width / 2}
                        y={config.height + 50}
                        textAnchor="middle"
                        fill="#4b5563"
                        fontSize="14"
                        fontWeight="600"
                    >
                        {config.width} cm
                    </text>

                    {/* Tinggi */}
                    <path
                        d={`M ${config.width + 30} 0 L ${config.width + 30} ${
                            config.height
                        }`}
                        stroke="#9ca3af"
                        strokeWidth="1"
                    />
                    <text
                        x={config.width + 50}
                        y={config.height / 2}
                        textAnchor="middle"
                        fill="#4b5563"
                        fontSize="14"
                        fontWeight="600"
                        transform={`rotate(90, ${config.width + 50}, ${
                            config.height / 2
                        })`}
                    >
                        {config.height} cm
                    </text>
                </g>
            </svg>
        </div>
    );
}

// Helper untuk menggelapkan/mencerahkan warna HEX (untuk efek 3D sederhana)
function adjustColor(color, amount) {
    return (
        "#" +
        color
            .replace(/^#/, "")
            .replace(/../g, (color) =>
                (
                    "0" +
                    Math.min(
                        255,
                        Math.max(0, parseInt(color, 16) + amount)
                    ).toString(16)
                ).substr(-2)
            )
    );
}
