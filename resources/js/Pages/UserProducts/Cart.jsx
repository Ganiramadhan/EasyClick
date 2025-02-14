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

    const selectAllItem = () => {
        setSelectedItems(selectedItems.length === cart.length ? [] : cart.map(item => item.id));
    };

    const selectItem = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const sortedCart = [...cart].sort((a, b) => b.id - a.id);
    const selectedProducts = sortedCart.filter(item => selectedItems.includes(item.id));
    const totalHarga = selectedProducts.reduce((total, item) => total + item.finalPrice * item.quantity, 0);

    return (
        <>
            <Head title="Keranjang Belanja | Toko Online" />
            <UserLayout>
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-6">🛒 Keranjang Belanja</h1>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center">Keranjang masih kosong.</p>
                        ) : (
                            <div>
                                <div className="mb-4 flex items-center">
                                    <input type="checkbox" checked={selectedItems.length === cart.length} onChange={selectAllItem} className="w-5 h-5 accent-green-500" />
                                    <label className="ml-2 text-gray-700">Pilih Semua</label>
                                </div>
                                <ul className="space-y-4">
                                    {sortedCart.map((item) => (
                                        <li key={item.id} className="flex flex-col sm:flex-row items-center p-4 border rounded-lg shadow-sm bg-gray-50 relative gap-4">
                                            <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => selectItem(item.id)} className="w-5 h-5 accent-green-500" />
                                            <img src={`/storage/${item.image}`} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md" />
                                            <div className="flex-1 text-center sm:text-left">
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <div className="flex items-center justify-center sm:justify-start space-x-2">
                                                    {item.discount > 0 && <p className="text-red-500 line-through text-sm">Rp {parseInt(item.price).toLocaleString("id-ID")}</p>}
                                                    <p className="text-sm">Rp {item.finalPrice.toLocaleString("id-ID")}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition">-</button>
                                                <span className="text-lg font-semibold">{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id)} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition">+</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-4">
                                    <h2 className="text-xl font-bold">Total: Rp {totalHarga.toLocaleString("id-ID")}</h2>
                                    <div className="flex space-x-4">
                                        <button className="text-red-500 hover:text-red-700 transition" disabled={isRemovingMultiple || selectedItems.length === 0}><FaTrash size={24} /></button>
                                        <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50" disabled={selectedItems.length === 0}>Checkout</button>
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
