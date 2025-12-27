import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { Plus, Trash2, X, Image as ImageIcon } from "lucide-react";

export default function CreateMaterial({ auth }) {
    // State untuk preview gambar HPL
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        category: "plywood", // Default Plywood
        specification: "",
        unit: "Lembar",
        is_active: true,

        // Field Khusus HPL
        hpl_code: "",
        image: null,

        // Field Khusus Plywood (Dynamic Variants)
        variants: [{ name: "", price: "0" }],
    });

    const submit = (e) => {
        e.preventDefault();
        // Logika submit, pastikan backend bisa menangani array variants atau hpl_code
        post(route("admin.materials.store"));
    };

    // --- LOGIKA IMAGE PREVIEW (HPL) ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData("image", null);
        setImagePreview(null);
        // Reset input file value agar bisa upload file yang sama jika perlu
        document.getElementById("imageInput").value = "";
    };

    // --- LOGIKA DYNAMIC VARIANTS (PLYWOOD) ---
    const addVariant = () => {
        setData("variants", [...data.variants, { name: "", price: "0" }]);
    };

    const removeVariant = (index) => {
        const list = [...data.variants];
        list.splice(index, 1);
        setData("variants", list);
    };

    const handleVariantChange = (index, field, value) => {
        const list = [...data.variants];
        list[index][field] = value;
        setData("variants", list);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Material Baru
                </h2>
            }
        >
            <Head title="Admin - Tambah Material" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* --- GLOBAL FIELDS --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nama Material */}
                                <div className="col-span-2">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Nama Material"
                                    />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        isFocused
                                        placeholder="Contoh: Multiplek Meranti / HPL Taco Wood"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Kategori (Dropdown 2 Pilihan) */}
                                <div>
                                    <InputLabel
                                        htmlFor="category"
                                        value="Kategori Material"
                                    />
                                    <select
                                        id="category"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                    >
                                        <option value="plywood">
                                            Plywood (Bahan Dasar)
                                        </option>
                                        <option value="hpl">
                                            HPL (Finishing)
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.category}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Satuan */}
                                <div>
                                    <InputLabel
                                        htmlFor="unit"
                                        value="Satuan (Unit)"
                                    />
                                    <TextInput
                                        id="unit"
                                        className="mt-1 block w-full"
                                        value={data.unit}
                                        onChange={(e) =>
                                            setData("unit", e.target.value)
                                        }
                                        placeholder="Contoh: Lembar / Pcs"
                                        required
                                    />
                                    <InputError
                                        message={errors.unit}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-6"></div>

                            {/* --- CONDITIONAL UI: PLYWOOD (DYNAMIC VARIANTS) --- */}
                            {data.category === "plywood" && (
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                Varian Ketebalan
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Tambahkan opsi ketebalan yang
                                                akan menjadi pilihan radio
                                                button.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addVariant}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-bold"
                                        >
                                            <Plus size={16} /> Tambah Varian
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.variants.map((variant, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 items-start"
                                            >
                                                <div className="flex-1">
                                                    <InputLabel
                                                        value={`Opsi ${
                                                            index + 1
                                                        } (Label)`}
                                                    />
                                                    <TextInput
                                                        value={variant.name}
                                                        onChange={(e) =>
                                                            handleVariantChange(
                                                                index,
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Contoh: 9mm, 12mm"
                                                        className="w-full mt-1"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <InputLabel value="Harga (Rp)" />
                                                    <TextInput
                                                        type="number"
                                                        value={variant.price}
                                                        onChange={(e) =>
                                                            handleVariantChange(
                                                                index,
                                                                "price",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="0"
                                                        className="w-full mt-1"
                                                        required
                                                    />
                                                </div>
                                                <div className="pt-7">
                                                    {data.variants.length >
                                                        1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeVariant(
                                                                    index
                                                                )
                                                            }
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                                                            title="Hapus opsi ini"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* --- CONDITIONAL UI: HPL (CODE & IMAGE) --- */}
                            {data.category === "hpl" && (
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Detail HPL
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Input Code HPL */}
                                        <div>
                                            <InputLabel
                                                htmlFor="hpl_code"
                                                value="Kode HPL"
                                            />
                                            <TextInput
                                                id="hpl_code"
                                                className="mt-1 block w-full"
                                                value={data.hpl_code}
                                                onChange={(e) =>
                                                    setData(
                                                        "hpl_code",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: TH-123-AA"
                                                required
                                            />
                                            <InputError
                                                message={errors.hpl_code}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Harga HPL (Single Price) */}
                                        {/* Kita gunakan variants[0].price agar konsisten di backend, atau buat field price terpisah */}
                                        <div>
                                            <InputLabel
                                                htmlFor="hpl_price"
                                                value="Harga Lembaran (Rp)"
                                            />
                                            <TextInput
                                                id="hpl_price"
                                                type="number"
                                                className="mt-1 block w-full"
                                                // Disini saya simpan ke variants index 0 agar format data mirip,
                                                // atau Anda bisa buat state 'price' terpisah.
                                                // Saya pakai 'price' langsung di variants[0] untuk simplifikasi.
                                                value={
                                                    data.variants[0]?.price ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        0,
                                                        "price",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>

                                        {/* Upload Gambar dengan Preview */}
                                        <div className="col-span-2">
                                            <InputLabel
                                                htmlFor="image"
                                                value="Gambar Tekstur / Katalog"
                                            />

                                            {!imagePreview ? (
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 transition">
                                                    <div className="space-y-1 text-center">
                                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="imageInput"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <span>
                                                                    Upload file
                                                                </span>
                                                                <input
                                                                    id="imageInput"
                                                                    name="image"
                                                                    type="file"
                                                                    className="sr-only"
                                                                    accept="image/*"
                                                                    onChange={
                                                                        handleImageChange
                                                                    }
                                                                />
                                                            </label>
                                                            <p className="pl-1">
                                                                atau drag and
                                                                drop
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            PNG, JPG, GIF up to
                                                            16MB
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-2 relative w-fit">
                                                    <div className="relative group">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="h-48 w-48 object-cover rounded-lg border shadow-md"
                                                        />
                                                        {/* Tombol Hapus Gambar */}
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                removeImage
                                                            }
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                                        ✓ Gambar berhasil
                                                        dipilih
                                                    </p>
                                                </div>
                                            )}
                                            <InputError
                                                message={errors.image}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-4 border-t pt-6">
                                <Link
                                    href={route("admin.materials.index")}
                                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton
                                    className="bg-black hover:bg-gray-800"
                                    disabled={processing}
                                >
                                    Simpan Material
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
