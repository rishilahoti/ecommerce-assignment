"use client";
import { useState } from "react";
import { useCart } from "@/context/cartContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const [step, setStep] = useState(1);

    const handleNextStep = () => setStep((prev) => prev + 1);
    const router = useRouter();

    const completeOrder = () => {
        if (!user) return;

        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            items: cart.map(({ title, quantity }) => ({ title, quantity })),
        };

        const storedOrders = JSON.parse(localStorage.getItem(`orders-${user.email}`) || "[]");
        localStorage.setItem(`orders-${user.email}`, JSON.stringify([newOrder, ...storedOrders]));

        clearCart();
        router.push("/profile");
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-6">
            {step === 1 && (
                <div>
                    <h2 className="text-2xl font-semibold">Billing Information</h2>
                    <form>
                        <div className="mt-4">
                            <label className="block">Full Name</label>
                            <input type="text" className="w-full border p-2 mt-2" />
                        </div>
                        <div className="mt-4">
                            <label className="block">Email</label>
                            <input type="email" className="w-full border p-2 mt-2" />
                        </div>
                        <button
                            type="button"
                            onClick={handleNextStep}
                            className="bg-black text-white mt-4 p-2 rounded"
                        >
                            Next
                        </button>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2 className="text-2xl font-semibold">Payment Information</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-4">
                            <label className="block">Credit Card</label>
                            <input type="text" className="w-full border p-2 mt-2" />
                        </div>
                        <button
                            type="button"
                            onClick={completeOrder}
                            className="bg-black text-white mt-4 p-2 rounded"
                        >
                            Complete Order
                        </button>
                    </form>
                </div>
            )}

            <div className="mt-8">
                <h3 className="text-xl">Order Summary</h3>
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            {item.title} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
                <h3 className="font-semibold mt-4">Total: ${totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );
}
