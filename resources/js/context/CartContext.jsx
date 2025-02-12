import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
    const userKey = userId ? `cart_${userId}` : "cart_guest";

    const getCartFromStorage = () => {
        try {
            const storedCarts = JSON.parse(localStorage.getItem("cartData")) || {};
            return storedCarts[userKey] || [];
        } catch (error) {
            console.error("Gagal memuat keranjang:", error);
            return [];
        }
    };

    const [cart, setCart] = useState(getCartFromStorage);

    useEffect(() => {
        const storedCarts = JSON.parse(localStorage.getItem("cartData")) || {};
        storedCarts[userKey] = cart;
        localStorage.setItem("cartData", JSON.stringify(storedCarts));
    }, [cart, userKey]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                const discountedPrice = product.price - (product.price * product.discount) / 100;
                return [...prevCart, { ...product, quantity: 1, finalPrice: discountedPrice, userId }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => useContext(CartContext);
