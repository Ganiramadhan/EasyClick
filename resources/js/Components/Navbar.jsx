import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart, HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { useCart } from '@/context/CartContext';
import { Link, usePage, router } from '@inertiajs/react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const { cart } = useCart();
    const { url, props } = usePage();
    const user = props.auth.user;

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        router.post('/logout');
    };

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
                    <div className="text-2xl font-extrabold text-green-700 tracking-wide">Ganipedia</div>

                    {/* Menu (Desktop) */}
                    <div className="hidden lg:flex space-x-8">
                        {menuItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.path} 
                                className={`text-gray-800 text-lg font-medium transition duration-300 px-3 py-2 rounded-md hover:text-green-600 ${
                                    url === item.path ? "text-green-600 font-bold" : ""
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Ikon Keranjang, User & Logout */}
                    <div className="hidden lg:flex space-x-6 relative items-center">
                        <Link 
                            href={user ? "/cart" : "#"} 
                            className={`relative ${!user ? "cursor-not-allowed pointer-events-none" : ""}`} 
                            title={user ? "Go to Cart" : "Please log in to view your cart"}
                        >
                            <HiOutlineShoppingCart className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" />
                            {cart.length > 0 && user && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-300" />
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white text-lg font-semibold rounded-full">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </div>
                                )}
                                <button onClick={handleLogout} className="text-gray-800 hover:text-red-600 transition duration-300" title="Logout">
                                    <HiOutlineLogout className="w-7 h-7" />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="text-gray-800 hover:text-green-600 transition duration-300" title="Login">
                                <HiOutlineLogin className="w-7 h-7" />
                            </Link>
                        )}
                    </div>

                    {/* Menu Button (Mobile) */}
                    <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-800">
                        {open ? <HiOutlineX className="w-8 h-8" /> : <HiOutlineMenu className="w-8 h-8" />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
