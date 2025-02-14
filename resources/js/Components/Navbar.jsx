import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart, HiOutlineLogout, HiOutlineLogin, HiUserCircle } from "react-icons/hi";
import { useCart } from '@/context/CartContext';
import { Link, usePage, router } from '@inertiajs/react';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { cart } = useCart();
    const { url, props } = usePage();
    const user = props.auth.user;

    useEffect(() => {
        const handleScroll = () => setScrolling(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => router.post('/logout');
    
    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Deals", path: "/deals" },
        { name: "Categories", path: "/categories" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-white shadow-md" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center py-4">
                {/* Logo */}
                <div className="text-2xl font-extrabold text-green-700 tracking-wide">Ganipedia</div>

                {/* Menu (Desktop) */}
                <div className="hidden lg:flex space-x-8">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.path} 
                            className={`text-gray-800 text-lg font-medium px-3 py-2 rounded-md hover:text-green-600 transition ${url === item.path ? "text-green-600 font-bold" : ""}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* User & Cart */}
                <div className="hidden lg:flex space-x-6 items-center relative">
                    <Link href={user ? "/cart" : "#"} className={`relative ${!user ? "cursor-not-allowed pointer-events-none" : ""}`}>
                        <HiOutlineShoppingCart className="w-7 h-7 text-gray-800 hover:text-green-700 transition" />
                        {cart.length > 0 && user && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-300" />
                                ) : (
                                    <HiUserCircle className="w-10 h-10 text-gray-800" />
                                )}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="text-gray-800 hover:text-green-600 transition">
                            <HiOutlineLogin className="w-7 h-7" />
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-800">
                    {open ? <HiOutlineX className="w-8 h-8" /> : <HiOutlineMenu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden bg-white shadow-md p-4 space-y-4">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.path} 
                            className={`block text-gray-800 text-lg font-medium px-3 py-2 rounded-md hover:bg-gray-100 transition ${url === item.path ? "text-green-600 font-bold" : ""}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="border-t pt-4">
                        <Link href={user ? "/cart" : "#"} className="flex items-center space-x-2">
                            <HiOutlineShoppingCart className="w-7 h-7 text-gray-800" />
                            <span className="text-lg">Cart ({cart.length})</span>
                        </Link>
                        {user ? (
                            <>
                                <Link href="/profile" className="block text-gray-800 text-lg font-medium py-2 hover:bg-gray-100 rounded-md">Profile</Link>
                                <button onClick={handleLogout} className="w-full text-left text-red-600 py-2 hover:bg-gray-100 rounded-md">Logout</button>
                            </>
                        ) : (
                            <Link href="/login" className="block text-gray-800 text-lg font-medium py-2 hover:bg-gray-100 rounded-md">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
