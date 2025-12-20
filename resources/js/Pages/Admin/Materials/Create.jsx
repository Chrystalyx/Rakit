import AdminLayout from "@/Layouts/AdminLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateMaterial({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        category: "plywood", // Default value
        specification: "",
        price: "",
        unit: "Lembar",
        image: null,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("materials.store"));
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
                            {/* Grid Layout 2 Kolom */}
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
                                        placeholder="Contoh: Lembar, Kg, Liter"
                                        required
                                    />
                                    <InputError
                                        message={errors.unit}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Harga */}
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
                                    <InputError
                                        message={errors.price}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Gambar */}
                                <div>
                                    <InputLabel
                                        htmlFor="image"
                                        value="Gambar Material"
                                    />
                                    <input
                                        type="file"
                                        id="image"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Spesifikasi (Full Width) */}
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
                                    <InputError
                                        message={errors.specification}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-4 border-t pt-6">
                                <Link
                                    href={route("materials.index")}
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
