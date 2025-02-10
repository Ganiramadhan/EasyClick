import { useState, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { HiShoppingCart, HiOutlineEye, HiSearch, HiStar } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi2";
import Swal from 'sweetalert2';


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
        // console.log('PRODUCT DATA:', product);
        try {
            const response = await axios.post('/checkout', {
                order_id: `order-${Date.now()}`,
                product_id: product.id, 
                description: product.description, 
                customer_name: "Gani Ramadhan", 
                customer_email: "guest@example.com",
            });
    
            // console.log('Response Data:', response.data);
            const data = response.data; 
    
            if (data.snap_token) {
                window.snap.pay(data.snap_token, {
                    onSuccess: function (result) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful',
                            text: 'Your payment was successful!',
                        });
                        // console.log(result); 
                    },
                    onPending: function (result) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Payment Pending',
                            text: 'Your payment is pending!',
                        });
                        // console.log(result); 
                    },
                    onError: function (result) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Payment Failed',
                            text: 'There was an error processing your payment.',
                        });
                        // console.log(result); 
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
                    text: 'Token pembayaran tidak ditemukan!',
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan saat memproses pembayaran.',
            });
        }
    };
    
    

    const filteredProducts = products
        .map((product, index) => ({
            ...product,
            discount: [15, 25, 30, 50][index % 4], // Dummy diskon
            rating: (Math.random() * (5 - 4.5) + 4.5).toFixed(1), // Dummy rating antara 4.5 - 5
            sold: Math.floor(Math.random() * 500) + 50, // Dummy terjual antara 50 - 550
        }))
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <UserLayout>
            <Head title="Pakaian Anak" />
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Pakaian Anak</h1>

                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{successMessage}</div>
                )}

                <div className="relative w-full mb-4">
                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari pakaian anak..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md outline-none shadow-md"
                    />
                </div>

                {filteredProducts.length === 0 && (
                    <p className="text-gray-600 text-center mt-4">Produk tidak ditemukan</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => {
                        const fullStars = Math.floor(product.rating);
                        const halfStar = product.rating - fullStars >= 0.5;
                        return (
                            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                <div className="w-full h-48 relative">
                                    <img
                                        src={product.image ? `/storage/${product.image}` : "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-2 right-2 bg-red-400 bg-opacity-90 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
                                        Diskon {product.discount}%
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h2>
                                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">{product.description}</p>
                                    <p className="text-gray-500 line-through text-xs mt-1">
                                        Rp {Number(product.price * (100 / (100 - product.discount))).toLocaleString()}
                                    </p>
                                    <p className="text-indigo-600 font-bold text-sm">Rp {Number(product.price).toLocaleString()}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
                                        <div className="flex items-center">
                                            {[...Array(fullStars)].map((_, i) => (
                                                <HiStar key={i} className="text-yellow-500 w-4 h-4" />
                                            ))}
                                            {halfStar && <HiStar className="text-yellow-500 w-4 h-4" style={{ opacity: 0.5 }} />}
                                            {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
                                                <HiOutlineStar key={i} className="text-gray-400 w-4 h-4" />
                                            ))}
                                            <span className="ml-2">{product.rating}</span>
                                        </div>
                                        <span className="ml-auto text-gray-600 text-xs">{product.sold}+ Terjual</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <button
                                            onClick={() => paymentCheckout(product)}
                                            className="flex items-center gap-1 text-xs sm:text-sm bg-green-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-green-600 transition"
                                        >
                                            <HiShoppingCart className="w-4 h-4" /> Beli
                                        </button>
                                        <button className="flex items-center gap-1 text-xs sm:text-sm bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-md hover:bg-gray-300 transition">
                                            <HiOutlineEye className="w-4 h-4" /> Detail
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
