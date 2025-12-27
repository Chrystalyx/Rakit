import React from "react";
import BaseLegalModal from "./BaseLegalModal";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
    return (
        <BaseLegalModal
            isOpen={isOpen}
            onClose={onClose}
            title="Kebijakan Privasi"
            icon={ShieldCheck}
        >
            <p className="font-semibold text-gray-900">
                Terakhir Diperbarui:{" "}
                {new Date().toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                })}
            </p>

            <p>
                Di RAKIT Indonesia, privasi Anda adalah prioritas kami.
                Kebijakan ini menjelaskan bagaimana kami mengumpulkan,
                menggunakan, dan melindungi data pribadi Anda saat menggunakan
                platform konfigurator furnitur kami.
            </p>

            <h4 className="font-bold text-gray-900 mt-4">
                1. Informasi yang Kami Kumpulkan
            </h4>
            <ul className="list-disc pl-5 space-y-1">
                <li>
                    <strong>Data Akun:</strong> Nama, alamat email, dan nomor
                    telepon saat Anda mendaftar.
                </li>
                <li>
                    <strong>Data Pesanan:</strong> Detail alamat pengiriman dan
                    spesifikasi furnitur custom yang Anda buat (ukuran,
                    material, fitur).
                </li>
                <li>
                    <strong>Data Desain:</strong> Konfigurasi visual yang Anda
                    simpan di "Studio Kustomisasi" kami.
                </li>
            </ul>

            <h4 className="font-bold text-gray-900 mt-4">
                2. Penggunaan Informasi
            </h4>
            <p>Kami menggunakan data Anda semata-mata untuk:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>
                    Memproses dan memproduksi pesanan furnitur sesuai
                    spesifikasi Anda.
                </li>
                <li>
                    Menghubungi Anda untuk konfirmasi teknis atau pengiriman.
                </li>
                <li>Meningkatkan algoritma estimasi harga kami.</li>
            </ul>

            <h4 className="font-bold text-gray-900 mt-4">
                3. Keamanan Pembayaran
            </h4>
            <p>
                Kami <strong>tidak menyimpan</strong> informasi kartu kredit
                atau rekening bank Anda. Semua transaksi diproses melalui
                gateway pembayaran pihak ketiga (Midtrans/Xendit) yang
                terenkripsi dan berlisensi resmi oleh Bank Indonesia.
            </p>

            <h4 className="font-bold text-gray-900 mt-4">
                4. Berbagi Data dengan Pihak Ketiga
            </h4>
            <p>
                Data Anda tidak akan dijual. Kami hanya membagikan data alamat
                dan kontak kepada mitra logistik/ekspedisi untuk keperluan
                pengiriman barang fisik.
            </p>

            <h4 className="font-bold text-gray-900 mt-4">5. Hak Anda</h4>
            <p>
                Anda berhak meminta salinan data yang kami simpan atau meminta
                penghapusan akun beserta seluruh riwayat desain Anda dengan
                menghubungi layanan pelanggan kami.
            </p>
        </BaseLegalModal>
    );
}
