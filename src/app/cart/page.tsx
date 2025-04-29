"use client";

import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleQuantityChange = (id: number, quantity: number) => {
        updateQuantity(id, quantity);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg">Your cart is empty!</p>
                    <Link href="/" className="text-blue-600 hover:underline mt-4 block">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                            <Image src={item.image} alt={item.title} width={80} height={80} />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p>${item.price}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    className="btn btn-sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(item.id, Number(e.target.value))
                                    }
                                    className="w-12 text-center"
                                />
                                <button
                                    className="btn btn-sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 text-right">
                        <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                        <Link
                            href="/checkout"
                            className="inline-block bg-black text-white px-6 py-3 rounded-lg mt-4 hover:bg-gray-700 transition"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
