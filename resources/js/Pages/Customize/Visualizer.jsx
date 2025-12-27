import React from "react";

export default function Visualizer({ config }) {
    const viewBoxW = Math.max(config.width + 100, 300);
    const viewBoxH = Math.max(config.height + 100, 300);

    // MENGGUNAKAN TEKSTUR DARI FINISHING LAYER
    const textureUrl = config.finishingLayer.texture;
    const textureId = `texture-${config.finishingLayer.id}`;

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
                <defs>
                    <pattern
                        id={textureId}
                        patternUnits="userSpaceOnUse"
                        width="150"
                        height="150"
                    >
                        <image
                            href={textureUrl}
                            x="0"
                            y="0"
                            width="150"
                            height="150"
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </pattern>
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
                        opacity="0.2"
                        filter="blur(8px)"
                    />

                    {/* Sisi Belakang */}
                    <rect
                        x="0"
                        y="0"
                        width={config.width}
                        height={config.height}
                        fill={`url(#${textureId})`}
                    />
                    <rect
                        x="0"
                        y="0"
                        width={config.width}
                        height={config.height}
                        fill="black"
                        opacity="0.5"
                    />

                    {/* Sisi Kiri */}
                    <rect
                        x="-4"
                        y="0"
                        width="4"
                        height={config.height}
                        fill={`url(#${textureId})`}
                    />
                    <rect
                        x="-4"
                        y="0"
                        width="4"
                        height={config.height}
                        fill="black"
                        opacity="0.3"
                    />

                    {/* Sisi Kanan */}
                    <rect
                        x={config.width}
                        y="0"
                        width="4"
                        height={config.height}
                        fill={`url(#${textureId})`}
                    />
                    <rect
                        x={config.width}
                        y="0"
                        width="4"
                        height={config.height}
                        fill="black"
                        opacity="0.3"
                    />

                    {/* Sisi Atas */}
                    <rect
                        x="-4"
                        y="-4"
                        width={config.width + 8}
                        height="4"
                        fill={`url(#${textureId})`}
                    />
                    <rect
                        x="-4"
                        y="-4"
                        width={config.width + 8}
                        height="4"
                        fill="white"
                        opacity="0.2"
                    />

                    {/* Sisi Bawah */}
                    <rect
                        x="-4"
                        y={config.height}
                        width={config.width + 8}
                        height="4"
                        fill={`url(#${textureId})`}
                    />
                    <rect
                        x="-4"
                        y={config.height}
                        width={config.width + 8}
                        height="4"
                        fill="black"
                        opacity="0.5"
                    />

                    {/* Plint */}
                    {config.plinth > 0 && (
                        <>
                            <rect
                                x="2"
                                y={config.height - config.plinth}
                                width={config.width - 4}
                                height={config.plinth}
                                fill={`url(#${textureId})`}
                            />
                            <rect
                                x="2"
                                y={config.height - config.plinth}
                                width={config.width - 4}
                                height={config.plinth}
                                fill="black"
                                opacity="0.3"
                            />
                        </>
                    )}

                    {/* Interior */}
                    {Array.from({ length: config.partitions }).map((_, i) => {
                        const spacing = config.width / (config.partitions + 1);
                        return (
                            <g key={`part-${i}`}>
                                <rect
                                    x={spacing * (i + 1) - 1}
                                    y="0"
                                    width="2"
                                    height={config.height - config.plinth}
                                    fill={`url(#${textureId})`}
                                />
                                <rect
                                    x={spacing * (i + 1) - 1}
                                    y="0"
                                    width="2"
                                    height={config.height - config.plinth}
                                    fill="black"
                                    opacity="0.2"
                                />
                            </g>
                        );
                    })}

                    {Array.from({ length: config.shelves }).map((_, i) => {
                        const spacing =
                            (config.height - config.plinth) /
                            (config.shelves + 1);
                        return (
                            <g key={`shelf-${i}`}>
                                <rect
                                    x="0"
                                    y={spacing * (i + 1)}
                                    width={config.width}
                                    height="4"
                                    fill={`url(#${textureId})`}
                                />
                                <rect
                                    x="0"
                                    y={spacing * (i + 1)}
                                    width={config.width}
                                    height="4"
                                    fill="black"
                                    opacity="0.2"
                                />
                                <rect
                                    x="0"
                                    y={spacing * (i + 1) + 4}
                                    width={config.width}
                                    height="15"
                                    fill="black"
                                    opacity="0.1"
                                />
                            </g>
                        );
                    })}

                    {/* LED */}
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

                    {/* Pintu */}
                    {config.doorType !== "none" && (
                        <g>
                            <rect
                                x="0"
                                y="0"
                                width={config.width / 2 - 0.5}
                                height={config.height}
                                fill={`url(#${textureId})`}
                                stroke="rgba(0,0,0,0.1)"
                                strokeWidth="1"
                            />
                            <rect
                                x={config.width / 2 + 0.5}
                                y="0"
                                width={config.width / 2 - 0.5}
                                height={config.height}
                                fill={`url(#${textureId})`}
                                stroke="rgba(0,0,0,0.1)"
                                strokeWidth="1"
                            />
                            <rect
                                x={config.width / 2 - 12}
                                y={config.height / 2}
                                width="4"
                                height="40"
                                rx="2"
                                fill="#d1d5db"
                                filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
                            />
                            <rect
                                x={config.width / 2 + 8}
                                y={config.height / 2}
                                width="4"
                                height="40"
                                rx="2"
                                fill="#d1d5db"
                                filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
                            />
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

                    {/* Dimensi */}
                    <path
                        d={`M 0 ${config.height + 30} L ${config.width} ${
                            config.height + 30
                        }`}
                        stroke="#9ca3af"
                        strokeWidth="1"
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
