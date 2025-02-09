import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [active, setActive] = useState("Products");

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = ["Home", "Products", "Deals", "Categories", "Contact"];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? "bg-white shadow-md" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center py-3">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-green-600">Ganipedia</div>

                    {/* Menu (Desktop) */}
                    <div className="hidden lg:flex space-x-8">
                        {menuItems.map((item) => (
                            <a 
                                key={item} 
                                href="#" 
                                onClick={() => setActive(item)}
                                className={`text-gray-700 transition duration-300 ${active === item ? "text-green-600 font-semibold border-b-2 border-green-600" : "hover:text-green-500"}`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden lg:flex space-x-6">
                        <HiOutlineShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600 transition duration-300" />
                        <HiOutlineUser className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600 transition duration-300" />
                    </div>

                    {/* Menu Button (Mobile) */}
                    <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-700">
                        {open ? <HiOutlineX className="w-7 h-7" /> : <HiOutlineMenu className="w-7 h-7" />}
                    </button>
                </div>

                {/* Menu (Mobile) */}
                <div className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-md transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
                    <div className="flex flex-col space-y-4 py-6 px-6">
                        <button onClick={() => setOpen(false)} className="self-end text-gray-700">
                            <HiOutlineX className="w-7 h-7" />
                        </button>
                        {menuItems.map((item) => (
                            <a 
                                key={item} 
                                href="#" 
                                onClick={() => { setActive(item); setOpen(false); }}
                                className={`block py-2 text-gray-700 rounded-md transition duration-300 ${active === item ? "bg-green-100 text-green-600 font-semibold" : "hover:bg-gray-100"}`}
                            >
                                {item}
                            </a>
                        ))}
                        <div className="flex space-x-4 mt-4">
                            <HiOutlineShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600 transition duration-300" />
                            <HiOutlineUser className="w-6 h-6 text-gray-700 cursor-pointer hover:text-green-600 transition duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
