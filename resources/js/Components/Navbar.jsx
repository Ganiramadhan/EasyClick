import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const { cart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Deals", path: "/deals" },
        { name: "Categories", path: "/categories" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-white shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="text-2xl font-extrabold text-green-700 tracking-wide">Kian'Store</div>

                    {/* Menu (Desktop) */}
                    <div className="hidden lg:flex space-x-8">
                        {menuItems.map((item) => (
                            <a key={item.name} href={item.path} className="text-gray-800 text-lg font-medium transition duration-300 px-3 py-2 rounded-md hover:text-green-600">
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Ikon Keranjang & User */}
                    <div className="hidden lg:flex space-x-6 relative">
                        <a href="/cart" className="relative">
                            <HiOutlineShoppingCart className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </a>
                        <a href="/profile">
                            <HiOutlineUser className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" />
                        </a>
                    </div>

                    {/* Menu Button (Mobile) */}
                    <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-800">
                        {open ? <HiOutlineX className="w-8 h-8" /> : <HiOutlineMenu className="w-8 h-8" />}
                    </button>
                </div>

                {/* Menu (Mobile) */}
                <div className={`lg:hidden fixed top-0 left-0 w-72 h-full bg-white shadow-xl transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}> 
                    <div className="flex flex-col py-6 px-6 space-y-6">
                        <button onClick={() => setOpen(false)} className="self-end text-gray-800">
                            <HiOutlineX className="w-8 h-8" />
                        </button>
                        {menuItems.map((item) => (
                            <a key={item.name} href={item.path} onClick={() => setOpen(false)} className="block text-lg font-medium py-3 px-4 rounded-md transition duration-300 hover:bg-gray-100 text-gray-800">
                                {item.name}
                            </a>
                        ))}
                        <div className="flex space-x-6 mt-6 border-t pt-4 relative">
                            <a href="/products" onClick={() => setOpen(false)} className="relative">
                                <HiOutlineShoppingCart className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </a>
                            <a href="/profile">
                                <HiOutlineUser className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
