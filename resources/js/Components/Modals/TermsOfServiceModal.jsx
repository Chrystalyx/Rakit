import React from "react";
import BaseLegalModal from "./BaseLegalModal";
import { ScrollText } from "lucide-react";

export default function TermsOfServiceModal({ isOpen, onClose }) {
    return (
        <BaseLegalModal
            isOpen={isOpen}
            onClose={onClose}
            title="Syarat & Ketentuan Layanan"
            icon={ScrollText}
        >
            <p>
                Selamat datang di RAKIT Indonesia. Dengan mengakses website dan
                menggunakan fitur "Studio Kustomisasi", Anda menyetujui syarat
                dan ketentuan berikut:
            </p>

            <h4 className="font-bold text-gray-900 mt-4">
                1. Definisi Layanan
            </h4>
            <p>
                RAKIT menyediakan platform bagi pengguna untuk mendesain,
                mengonfigurasi, dan memesan furnitur secara custom. Kami
                bertindak sebagai penyedia platform dan produsen (manufacture).
            </p>

            <h4 className="font-bold text-gray-900 mt-4">
                2. Pesanan Kustom (Custom Orders)
            </h4>
            <ul className="list-disc pl-5 space-y-1">
                <li>
                    <strong>Finalisasi Desain:</strong> Pengguna bertanggung
                    jawab penuh atas dimensi (panjang x lebar x tinggi) yang
                    dimasukkan. Kami akan memproduksi sesuai data yang Anda
                    input.
                </li>
                <li>
                    <strong>Pembatalan:</strong> Pesanan yang sudah masuk tahap
                    "Produksi" tidak dapat dibatalkan atau diubah speknya.
                </li>
                <li>
                    <strong>Toleransi Ukuran:</strong> Karena sifat material
                    kayu/plywood, mohon maklumi toleransi ukuran manufaktur
                    sebesar ± 2-5mm.
                </li>
            </ul>

            <h4 className="font-bold text-gray-900 mt-4">
                3. Harga dan Pembayaran
            </h4>
            <p>
                Harga yang ditampilkan di "Total Estimasi" adalah harga final
                untuk spesifikasi tersebut saat itu. Harga dapat berubah
                sewaktu-waktu mengikuti harga pasar material (HPL/Plywood) namun
                tidak akan mempengaruhi pesanan yang sudah dibayar (lunas).
            </p>

            <h4 className="font-bold text-gray-900 mt-4">
                4. Pengiriman dan Garansi
            </h4>
            <p>
                Kami menjamin barang sampai dalam kondisi baik. Klaim kerusakan
                fisik (lecet/patah) wajib menyertakan video <em>unboxing</em>{" "}
                tanpa jeda maksimal 1x24 jam setelah barang diterima. Kerusakan
                struktural akibat cacat produksi digaransi selama 6 bulan.
            </p>

            <h4 className="font-bold text-gray-900 mt-4">
                5. Hak Kekayaan Intelektual
            </h4>
            <p>
                Seluruh antarmuka, logo, dan kode sumber "Visualizer" RAKIT
                adalah hak cipta milik RAKIT Indonesia. Dilarang keras meniru
                atau menggunakan aset digital kami tanpa izin tertulis.
            </p>
        </BaseLegalModal>
    );
}
