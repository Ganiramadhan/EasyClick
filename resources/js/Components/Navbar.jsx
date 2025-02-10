import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import Cart from "../Components/Cart";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [active, setActive] = useState("Products");
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = ["Home", "Products", "Deals", "Categories", "Contact"];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-white shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="text-2xl font-extrabold text-green-700 tracking-wide">Kian'Store</div>

                    {/* Menu (Desktop) */}
                    <div className="hidden lg:flex space-x-8">
                        {menuItems.map((item) => (
                            <a 
                                key={item} 
                                href="#" 
                                onClick={() => setActive(item)}
                                className={`text-gray-800 text-lg font-medium transition duration-300 px-3 py-2 rounded-md ${active === item ? "text-green-700 font-semibold border-b-2 border-green-600" : "hover:text-green-600"}`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden lg:flex space-x-6">
                        <HiOutlineShoppingCart className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" onClick={() => setCartOpen(true)} />
                        <HiOutlineUser className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" />
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
                            <a 
                                key={item} 
                                href="#" 
                                onClick={() => { setActive(item); setOpen(false); }}
                                className={`block text-lg font-medium py-3 px-4 rounded-md transition duration-300 ${active === item ? "bg-green-100 text-green-700 font-semibold" : "hover:bg-gray-100 text-gray-800"}`}
                            >
                                {item}
                            </a>
                        ))}
                        <div className="flex space-x-6 mt-6 border-t pt-4">
                            <HiOutlineShoppingCart className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" onClick={() => setCartOpen(true)} />
                            <HiOutlineUser className="w-7 h-7 text-gray-800 cursor-pointer hover:text-green-700 transition duration-300" />
                        </div>
                    </div>
                </div>
            </div>
            {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
        </nav>
    );
}
