import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ products }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            Inertia.delete(`/products/${id}`);
        }
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Product List
                </h2>
            }
        >
            <Head title="Product List" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between mb-4">
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-2 pl-10 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            </div>
                            <a 
                                href="/products/create" 
                                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                <FiPlus size={18} /> Add Product
                            </a>
                        </div>
                        <div className="overflow-x-auto rounded-lg shadow-sm">
                            <table className="w-full border-collapse border border-gray-200 bg-white rounded-lg">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="border border-gray-200 px-4 py-3">#</th>
                                        <th className="border border-gray-200 px-4 py-3">Name</th>
                                        <th className="border border-gray-200 px-4 py-3">Description</th>
                                        <th className="border border-gray-200 px-4 py-3">Price</th>
                                        <th className="border border-gray-200 px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, index) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="border border-gray-200 px-4 py-3 text-center">{index + 1}</td>
                                            <td className="border border-gray-200 px-4 py-3">{product.name}</td>
                                            <td className="border border-gray-200 px-4 py-3">{product.description}</td>
                                            <td className="border border-gray-200 px-4 py-3 text-green-600 font-semibold">${product.price}</td>
                                            <td className="border border-gray-200 px-4 py-3 flex justify-center gap-2">
                                                <a 
                                                    href={`/products/${product.id}/edit`} 
                                                    className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                                                >
                                                    <FiEdit size={16} /> Edit
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(product.id)} 
                                                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                                >
                                                    <FiTrash2 size={16} /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
