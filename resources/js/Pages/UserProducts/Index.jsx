import { useState, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { HiShoppingCart, HiOutlineStar, HiSearch, HiStar } from "react-icons/hi";
import Swal from 'sweetalert2';
import axios from "axios";

export default function KidsClothing({ products, successMessage }) {
    const [searchTerm, setSearchTerm] = useState("");
    const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

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

    const paymentCheckout = async (product) => {
        try {
            const discountedPrice = product.price - (product.price * (product.discount / 100)); 
    
            const response = await axios.post('/checkout', {
                order_id: `order-${Date.now()}`,
                product_id: product.id,
                description: product.description,
                customer_name: "Gani Ramadhan",
                customer_email: "guest@example.com",
                discounted_price: discountedPrice, 
            });
    
            const data = response.data;
    
            if (data.snap_token) {
                window.snap.pay(data.snap_token, {
                    onSuccess: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful',
                            text: 'Your payment was successful!',
                        });
                    },
                    onPending: function () {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Payment Pending',
                            text: 'Your payment is pending!',
                        });
                    },
                    onError: function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Payment Failed',
                            text: 'There was an error processing your payment.',
                        });
                    },
                    onClose: function () {
                        Swal.fire({
                            icon: 'info',
                            title: 'Payment Incomplete',
                            text: 'You have not completed the payment.',
                        });
                    },
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Token Not Found',
                    text: 'Payment token not found!',
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while processing the payment.',
            });
        }
    };
    

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <UserLayout>
            <Head title="Kids Clothing" />
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
                        className="w-full pl-10 pr-4 py-2 border rounded-md outline-none shadow-md"
                    />
                </div>
                {filteredProducts.length === 0 && (
                    <p className="text-gray-600 text-center mt-4">No products found</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => {
                        const discountPercent = `Discount ${product.discount}%`;
                        const discountedPrice = product.price - (product.price * (product.discount / 100));
                        const formattedRating = parseFloat(product.rating).toFixed(1); // Batas 2 huruf saja
                        return (
                            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                <div className="w-full h-48 relative">
                                    <img
                                        src={product.image ? `/storage/${product.image}` : "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-2 right-2 bg-red-400 bg-opacity-90 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
                                        {discountPercent}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h2>
                                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">{product.description}</p>
                                    <p className="text-gray-500 line-through text-xs mt-1">
                                        Rp {Number(product.price).toLocaleString()}
                                    </p>
                                    <p className="text-indigo-600 font-bold text-sm">
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
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-xs font-semibold text-gray-700">Stock: {product.stock || Math.floor(Math.random() * 50)}</span>
                                        <button
                                            onClick={() => paymentCheckout(product)}
                                            className="flex items-center gap-1 text-xs sm:text-sm bg-green-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition"
                                        >
                                            <HiShoppingCart className="w-4 h-4" /> Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </UserLayout>
    );
}
