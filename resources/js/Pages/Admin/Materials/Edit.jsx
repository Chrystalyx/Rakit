import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { Plus, Trash2, X, Image as ImageIcon } from "lucide-react";

export default function EditMaterial({ auth, material }) {
    // State untuk preview gambar (isi default dengan gambar lama jika ada)
    // Pastikan backend mengirim full URL di property 'image_url' atau sesuaikan path-nya
    const [imagePreview, setImagePreview] = useState(
        material.image_url || null
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT", // Wajib untuk update dengan file upload
        name: material.name,
        category: material.category,
        specification: material.specification || "",
        unit: material.unit,
        is_active: material.is_active,

        // Field Khusus HPL
        hpl_code: material.hpl_code || "",
        image: null, // Mulai null karena kita hanya kirim jika ada perubahan

        // Field Khusus Plywood/HPL Price
        // Jika variants kosong (data lama/rusak), buat array default
        variants:
            material.variants && material.variants.length > 0
                ? material.variants
                : [{ name: "", price: "0" }],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.materials.update", material.id));
    };

    // --- LOGIKA IMAGE PREVIEW ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeNewImage = () => {
        setData("image", null);
        // Kembalikan ke gambar lama jika ada, atau kosongkan
        setImagePreview(material.image_url || null);
        // Reset input file value
        const input = document.getElementById("imageInput");
        if (input) input.value = "";
    };

    // --- LOGIKA DYNAMIC VARIANTS ---
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
                    Edit Material: {material.name}
                </h2>
            }
        >
            <Head title="Admin - Edit Material" />

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
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Kategori */}
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
                                                Atur opsi ketebalan dan harga
                                                masing-masing.
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
                                                        placeholder="Contoh: 9mm"
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

                                        {/* Harga HPL */}
                                        <div>
                                            <InputLabel
                                                htmlFor="hpl_price"
                                                value="Harga Lembaran (Rp)"
                                            />
                                            <TextInput
                                                id="hpl_price"
                                                type="number"
                                                className="mt-1 block w-full"
                                                // Mengakses variants[0] untuk harga HPL
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
                                                // Tampilan Placeholder jika tidak ada gambar sama sekali
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
                                                                    baru
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
                                                // Tampilan Preview (Gambar Lama atau Baru)
                                                <div className="mt-2 relative w-fit">
                                                    <div className="relative group">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="h-48 w-48 object-cover rounded-lg border shadow-md"
                                                        />
                                                        {/* Tombol Ganti/Hapus Gambar Baru */}
                                                        <div className="absolute -top-2 -right-2 flex gap-1">
                                                            <label
                                                                htmlFor="imageInput"
                                                                className="bg-white text-gray-600 rounded-full p-1 shadow border cursor-pointer hover:bg-gray-100"
                                                                title="Ganti Gambar"
                                                            >
                                                                <ImageIcon
                                                                    size={14}
                                                                />
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

                                                            {/* Tombol Reset (hanya jika ada gambar baru yg dipilih) */}
                                                            {data.image && (
                                                                <button
                                                                    type="button"
                                                                    onClick={
                                                                        removeNewImage
                                                                    }
                                                                    className="bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                                                                    title="Batal Ganti Gambar"
                                                                >
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        {data.image
                                                            ? "✓ Gambar baru terpilih"
                                                            : "Gambar saat ini"}
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
                                    Simpan Perubahan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
