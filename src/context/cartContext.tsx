/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                loadCartFromFirestore(user.uid);
            } else {
                setUser(null);
                loadCartFromLocalStorage();
            }
        });
        return () => unsubscribe();
    }, []);

    const loadCartFromLocalStorage = () => {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    };

    const loadCartFromFirestore = async (userId: string) => {
        const cartRef = doc(db, "users", userId);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
            setCart(cartDoc.data()?.cart || []);
        }
    };

    const saveCartToLocalStorage = (cartItems: CartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    const saveCartToFirestore = async (userId: string, cartItems: CartItem[]) => {
        const cartRef = doc(db, "users", userId);
        await updateDoc(cartRef, { cart: cartItems });
    };

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const newCart = [...prev];
            const existingItem = newCart.find((p) => p.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                newCart.push(item);
            }
            if (user) {
                saveCartToFirestore(user.uid, newCart);
            } else {
                saveCartToLocalStorage(newCart);
            }
            return newCart;
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => {
            const newCart = prev.filter((item) => item.id !== id);
            if (user) {
                saveCartToFirestore(user.uid, newCart);
            } else {
                saveCartToLocalStorage(newCart);
            }
            return newCart;
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prev) => {
            const newCart = prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );
            if (user) {
                saveCartToFirestore(user.uid, newCart);
            } else {
                saveCartToLocalStorage(newCart);
            }
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        if (user) {
            saveCartToFirestore(user.uid, []);
        } else {
            saveCartToLocalStorage([]);
        }
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}
