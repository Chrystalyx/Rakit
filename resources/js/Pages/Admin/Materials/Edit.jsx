import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function EditMaterial({ auth, material }) {
    // Inisialisasi form dengan data yang diterima dari Controller (props material)
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT", // Penting untuk update data dengan file upload di Inertia
        name: material.name,
        category: material.category,
        specification: material.specification,
        price: material.price,
        unit: material.unit,
        image: null, // Reset image input
    });

    const submit = (e) => {
        e.preventDefault();
        // Menggunakan post dengan _method: PUT adalah cara standar menangani file upload saat update
        post(route("admin.materials.update", material.id));
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="category"
                                        value="Kategori"
                                    />
                                    <select
                                        id="category"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                    >
                                        <option value="plywood">Plywood</option>
                                        <option value="hpl">HPL</option>
                                        <option value="finishing">
                                            Finishing
                                        </option>
                                    </select>
                                </div>

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
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="price"
                                        value="Harga (IDR)"
                                    />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="image"
                                        value="Update Gambar (Opsional)"
                                    />
                                    <input
                                        type="file"
                                        id="image"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                    {/* Preview gambar lama */}
                                    {material.image && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            Gambar saat ini:{" "}
                                            <span className="font-medium text-gray-700">
                                                {material.image}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <InputLabel
                                        htmlFor="specification"
                                        value="Spesifikasi & Detail"
                                    />
                                    <textarea
                                        id="specification"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        value={data.specification}
                                        onChange={(e) =>
                                            setData(
                                                "specification",
                                                e.target.value
                                            )
                                        }
                                    ></textarea>
                                </div>
                            </div>

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
                                    Update Material
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
