import { useState, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { HiShoppingCart, HiOutlineStar, HiSearch, HiStar } from "react-icons/hi";
import { useCart } from '@/context/CartContext';
import Swal from 'sweetalert2';
import Carousel from "./Carousel";

export default function KidsClothing({ products, successMessage, isAuthenticated }) {
    const [searchTerm, setSearchTerm] = useState("");
    const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    const [loading, setLoading] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You need to log in to add items to your cart.',
                confirmButtonText: 'Login',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login"; 
                }
            });
            return;
        }

        setLoading(product.id);
        setTimeout(() => {
            addToCart(product);
            setLoading(null);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Item has been added to the cart!',
                showConfirmButton: false, 
                timer: 2000, 
            });
        }, 1000);
    };

    const images = [
        "https://i.pinimg.com/736x/b0/28/a7/b028a75bf20580b796617d11bd7bb915.jpg",
        "https://i.pinimg.com/736x/be/ba/c5/bebac52b6e52ced9b7080d7d00aa981c.jpg",
        "https://i.pinimg.com/736x/8a/b6/1d/8ab61d9fd080705516c3bbc248fd021b.jpg",
    ];

    return (
        <UserLayout>
            <Head title="Kids Clothing" />
            <Carousel images={images} />
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Kids Clothing</h1>
                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{successMessage}</div>
                )}
                <div className="relative w-full mb-4">
                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search kids clothing..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md outline-none shadow-md text-sm md:text-base"
                    />
                </div>
                {filteredProducts.length === 0 && (
                    <p className="text-gray-600 text-center mt-4">No products found</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => {
                        const hasDiscount = product.discount > 0;
                        const discountPercent = hasDiscount ? `Discount ${product.discount}%` : "";
                        const discountedPrice = hasDiscount ? product.price - (product.price * (product.discount / 100)) : product.price;
                        const formattedRating = parseFloat(product.rating).toFixed(1);
                        return (
                            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between transform hover:scale-105 transition-transform">
                                <div>
                                    <div className="w-full h-40 sm:h-48 relative">
                                        <img
                                            src={product.image ? `/storage/${product.image}` : "/placeholder.png"}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {hasDiscount && (
                                            <span className="absolute top-2 right-2 bg-red-400 bg-opacity-90 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                                                {discountPercent}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-3 sm:p-4 flex-grow">
                                        <h2 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{product.name}</h2>
                                        <p className="text-gray-600 text-xs mt-1 line-clamp-2">{product.description}</p>
                                        {hasDiscount && (
                                            <p className="text-gray-500 line-through text-xs mt-1">
                                                Rp {Number(product.price).toLocaleString()}
                                            </p>
                                        )}
                                        <p className="text-indigo-600 font-bold text-sm sm:text-base">
                                            Rp {Number(discountedPrice).toLocaleString()}
                                        </p>
                                        <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
                                            <div className="flex items-center">
                                                {[...Array(Math.floor(product.rating))].map((_, i) => (
                                                    <HiStar key={i} className="text-yellow-500 w-4 h-4" />
                                                ))}
                                                {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                                                    <HiOutlineStar key={i} className="text-gray-400 w-4 h-4" />
                                                ))}
                                                <span className="ml-2">{formattedRating}</span>
                                            </div>
                                            <span className="ml-auto text-gray-600 text-xs">{product.sold}+ terjual</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 border-t flex justify-between items-center mt-auto">
                                    <span className="text-xs sm:text-sm font-semibold text-gray-700">Stock: {product.stock || Math.floor(Math.random() * 50)}</span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="px-3 py-1 flex items-center justify-center bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-xs sm:text-sm font-semibold disabled:opacity-50"
                                        disabled={loading === product.id}
                                    >
                                        {loading === product.id ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                </svg>
                                                Loading...
                                            </span>
                                        ) : (
                                            <><HiShoppingCart className="w-4 h-4 mr-1" /> Add to cart</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </UserLayout>
    );
}
