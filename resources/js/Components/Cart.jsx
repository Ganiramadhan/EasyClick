import { HiOutlineX } from "react-icons/hi";

const dummyItems = [
    { id: 1, name: "Sepatu Sneakers", price: 350000, quantity: 1 },
    { id: 2, name: "Jaket Hoodie", price: 250000, quantity: 3 },
    { id: 3, name: "Jam Tangan", price: 500000, quantity: 2 },
];

export default function Cart({ onClose }) {
    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col rounded-l-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-gray-100 to-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Keranjang Belanja</h2>
                <button onClick={onClose} className="text-gray-700 hover:text-red-600 transition">
                    <HiOutlineX className="w-6 h-6" />
                </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                {dummyItems.length > 0 ? (
                    <ul className="space-y-3">
                        {dummyItems.map((item) => (
                            <li key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm border">
                                <input type="checkbox" className="mr-3 w-4 h-4" />
                                <div className="flex-1">
                                    <p className="text-gray-900 font-medium text-sm">{item.name}</p>
                                    <p className="text-gray-600 text-xs">Rp {item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <button className="px-2 text-gray-700 hover:text-gray-900">-</button>
                                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                    <button className="px-2 text-gray-700 hover:text-gray-900">+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center text-sm">Keranjang masih kosong.</p>
                )}
            </div>
            <div className="p-4 border-t bg-gray-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">Total: Rp {dummyItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</span>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-md">
                    Checkout
                </button>
            </div>
        </div>
    );
}
