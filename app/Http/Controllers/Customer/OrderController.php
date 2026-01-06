<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $orders = Project::where('customer_id', $user->id)
            ->with(['crafter', 'crafter.crafterProfile'])
            ->latest()
            ->get()
            ->map(function ($project) {
                $config = [];
                if ($project->specifications) {
                    $config = is_string($project->specifications)
                        ? json_decode($project->specifications, true)
                        : $project->specifications;
                }

                return [
                    'id' => 'INV-' . $project->created_at->format('ym') . '-' . str_pad($project->id, 4, '0', STR_PAD_LEFT),
                    'original_id' => $project->id,
                    'productName' => $project->title,
                    'crafter' => $project->crafter->name ?? 'Menunggu Konfirmasi',
                    'date' => $project->created_at->format('d M Y'),
                    'price' => (int) $project->total_amount,
                    'status' => $this->mapStatus($project->status),
                    'progress' => $project->progress ?? 0,
                    'reject_reason' => $project->reject_reason,
                    'config' => [
                        'width' => $config['width'] ?? 0,
                        'height' => $config['height'] ?? 0,
                        'depth' => $config['depth'] ?? 0,
                        'plinth' => $config['plinth'] ?? 0,
                        'backPanel' => $config['backPanel'] ?? false,
                        'partitions' => $config['partitions'] ?? 0,
                        'shelves' => $config['shelves'] ?? 0,
                        'ledStrip' => $config['ledStrip'] ?? false,
                        'doorType' => $config['doorType'] ?? 'none',
                        'lock' => $config['lock'] ?? false,
                        'finishingLayer' => [
                            'id' => 'custom',
                            'texture' => '/storage/materials/default_wood.jpg'
                        ]
                    ],
                    'specs' => [
                        'material' => $config['components']['base']['name'] ?? ($config['base_material'] ?? '-'),
                        'finish' => $config['components']['finish']['name'] ?? ($config['finish_material'] ?? '-'),
                    ]
                ];
            });

        return Inertia::render('Customer/OrderList', [
            'orders' => $orders
        ]);
    }

    public function show($id)
    {
        $project = Project::where('id', $id)
            ->where('customer_id', Auth::id())
            ->with(['crafter.crafterProfile'])
            ->firstOrFail();

        $config = [];
        if ($project->specifications) {
            $config = is_string($project->specifications)
                ? json_decode($project->specifications, true)
                : $project->specifications;
        }

        $statusLabel = $this->mapStatus($project->status);

        $timeline = [
            [
                'stage' => "Pesanan Dikonfirmasi",
                'date' => $project->created_at->format('d M Y'),
                'status' => 'completed',
                'updates' => []
            ],
            [
                'stage' => "Pengerjaan (Produksi)",
                'date' => $project->status === 'on_progress' ? 'Sedang Berjalan' : '-',
                'status' => $project->status === 'on_progress' ? 'current' : ($project->status === 'completed' ? 'completed' : 'upcoming'),
                'updates' => [
                    [
                        'date' => $project->updated_at->format('d M, H:i'),
                        'note' => "Status proyek saat ini: " . $statusLabel,
                        'photo' => null
                    ]
                ]
            ],
            [
                'stage' => "Pengiriman",
                'date' => "-",
                'status' => 'upcoming',
                'updates' => []
            ],
            [
                'stage' => "Selesai",
                'date' => "-",
                'status' => $project->status === 'completed' ? 'completed' : 'upcoming',
                'updates' => []
            ]
        ];

        if ($project->status === 'rejected') {
            $timeline = [
                [
                    'stage' => "Pesanan Dibuat",
                    'date' => $project->created_at->format('d M Y'),
                    'status' => 'completed',
                    'updates' => []
                ],
                [
                    'stage' => "Ditolak oleh Pengrajin",
                    'date' => $project->updated_at->format('d M Y'),
                    'status' => 'rejected',
                    'updates' => [
                        [
                            'date' => $project->updated_at->format('H:i'),
                            'note' => "Alasan: " . ($project->reject_reason ?? '-'),
                            'photo' => null
                        ]
                    ]
                ]
            ];
        }

        $orderData = [
            'id' => 'INV-' . $project->created_at->format('ym') . '-' . str_pad($project->id, 4, '0', STR_PAD_LEFT),
            'original_id' => $project->id,
            'status' => $statusLabel,
            'purchaseDate' => $project->created_at->format('d M Y'),
            'totalPrice' => (int) $project->total_amount,
            'progress' => $project->progress ?? 0,
            'reject_reason' => $project->reject_reason,

            'crafter' => [
                'name' => $project->crafter->name ?? 'Menunggu Konfirmasi',
                'location' => $project->crafter->crafterProfile->address ?? '-',
                'avatar' => $project->crafter->avatar ?? "https://ui-avatars.com/api/?name=" . urlencode($project->crafter->name ?? 'C'),
                'verified' => (bool) ($project->crafter->crafterProfile->is_verified ?? false),
            ],

            'product' => [
                'name' => $project->title,
                'width' => $config['width'] ?? 0,
                'height' => $config['height'] ?? 0,
                'depth' => $config['depth'] ?? 0,
                'plinth' => $config['plinth'] ?? 0,
                'backPanel' => $config['backPanel'] ?? false,
                'partitions' => $config['partitions'] ?? 0,
                'shelves' => $config['shelves'] ?? 0,
                'ledStrip' => $config['ledStrip'] ?? false,
                'doorType' => $config['doorType'] ?? 'none',
                'lock' => $config['lock'] ?? false,
                'components' => [
                    'base' => ['name' => $config['components']['base']['name'] ?? ($config['base_material'] ?? '-')],
                    'finish' => ['name' => $config['components']['finish']['name'] ?? ($config['finish_material'] ?? '-')],
                ],
                'finishingLayer' => [
                    'id' => 'custom',
                    'texture' => '/storage/materials/default_wood.jpg'
                ],
            ],

            'specs' => [
                'width' => $config['width'] ?? 0,
                'height' => $config['height'] ?? 0,
                'depth' => $config['depth'] ?? 0,
                'plinth' => $config['plinth'] ?? 0,
                'backPanel' => $config['backPanel'] ?? false,
                'partitions' => $config['partitions'] ?? 0,
                'shelves' => $config['shelves'] ?? 0,
                'doorType' => $config['doorType'] ?? 'none',
                'lock' => $config['lock'] ?? false,
                'ledStrip' => $config['ledStrip'] ?? false,
                'materialName' => $config['components']['base']['name'] ?? ($config['base_material'] ?? '-'),
                'finishing' => $config['components']['finish']['name'] ?? ($config['finish_material'] ?? '-'),
            ],

            'timeline' => $timeline
        ];

        return Inertia::render('Customer/TrackProgress', [
            'order' => $orderData
        ]);
    }

    private function mapStatus($status)
    {
        return match ($status) {
            'pending' => 'Menunggu',
            'on_progress' => 'Produksi',
            'shipping' => 'Pengiriman',
            'completed' => 'Selesai',
            'cancelled' => 'Dibatalkan',
            'rejected' => 'Ditolak',
            default => ucfirst($status),
        };
    }
}
