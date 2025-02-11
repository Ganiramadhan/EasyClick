import { useState, useEffect } from "react";
import { useCart } from '@/context/CartContext';
import { FaTrash } from "react-icons/fa";
import UserLayout from "@/Layouts/UserLayout";
import Swal from "sweetalert2";
import axios from "axios";
import { Head } from '@inertiajs/react';


const CartPage = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);
    const [isRemovingMultiple, setIsRemovingMultiple] = useState(false);
    const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    // Midtrans Config 
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

    // Handle Select All
    const selectAllItem = () => {
        if (selectedItems.length === cart.length) {
            setSelectedItems([]); 
        } else {
            setSelectedItems(cart.map(item => item.id));
        }
    };

    const selectItem = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const sortedCart = [...cart].sort((a, b) => b.id - a.id);

    const selectedProducts = sortedCart.filter(item => selectedItems.includes(item.id));

    const totalHarga = selectedProducts.reduce((total, item) => total + item.finalPrice * item.quantity, 0);

    const handleRemoveSelected = () => {
        if (selectedItems.length === 0) return;

        setIsRemovingMultiple(true);
        setTimeout(() => {
            selectedItems.forEach(id => removeFromCart(id));
            setSelectedItems([]);
            setIsRemovingMultiple(false);
        }, 1000);
    };

    // Proses pembayaran
    const paymentCheckout = async () => {
        if (selectedProducts.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Pilih Produk',
                text: 'Silakan pilih produk yang ingin di-checkout!'
            });
            return;
        }

        const orderItems = selectedProducts.map(item => ({
            id: item.id,
            price: item.finalPrice,
            quantity: item.quantity,
            name: item.name
        }));

        try {
            const response = await axios.post('/checkout', {
                order_id: `order-${Date.now()}`,
                total_price: totalHarga,
                customer_name: "Gani Ramadhan",
                customer_email: "guest@example.com",
                items: orderItems
            });

            const data = response.data;

            if (data.snap_token) {
                window.snap.pay(data.snap_token, {
                    onSuccess: () => Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: 'Pembayaran berhasil!'
                    }),
                    onPending: () => Swal.fire({
                        icon: 'warning',
                        title: 'Payment Pending',
                        text: 'Pembayaran tertunda!'
                    }),
                    onError: () => Swal.fire({
                        icon: 'error',
                        title: 'Payment Failed',
                        text: 'Terjadi kesalahan dalam pembayaran.'
                    }),
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.error || 'Terjadi kesalahan saat memproses checkout!'
            });
        }
    };

    return (
        <>
        <Head title="Keranjang Belanja | Toko Online">            
        </Head>
        <UserLayout>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">🛒 Keranjang Belanja</h1>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center">Keranjang masih kosong.</p>
                    ) : (
                        <div>
                            {/* Checkbox Select All */}
                            <div className="mb-4 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === cart.length}
                                    onChange={selectAllItem}
                                    className="w-5 h-5 accent-green-500"
                                />
                                <label className="ml-2 text-gray-700">Pilih Semua</label>
                            </div>

                            <ul className="space-y-4">
                                {sortedCart.map((item) => (
                                    <li key={item.id} className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50 relative">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => selectItem(item.id)}
                                            className="mr-4 w-5 h-5 accent-green-500"
                                        />
                                        <img src={`/storage/${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                        <div className="flex-1 ml-4">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <div className="flex items-center space-x-2">
                                            {item.discount > 0 && (
                                                <p className="text-red-500 line-through text-sm">
                                                    Rp {parseInt(item.price).toLocaleString("id-ID")}
                                                </p>
                                                )}
                                                <p className="text-sm">Rp {item.finalPrice.toLocaleString("id-ID")}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition">-</button>
                                            <span className="text-lg font-semibold">{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item.id)} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition">+</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 flex justify-between items-center border-t pt-4">
                                <h2 className="text-xl font-bold">Total: Rp {totalHarga.toLocaleString("id-ID")}</h2>
                                <div className="flex space-x-4">
                                    <button onClick={handleRemoveSelected} className="text-red-500 hover:text-red-700 transition" disabled={isRemovingMultiple || selectedItems.length === 0}>
                                        <FaTrash size={24} />
                                    </button>
                                    <button onClick={paymentCheckout} className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50" disabled={selectedItems.length === 0}>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
        </>

    );
};

export default CartPage;
