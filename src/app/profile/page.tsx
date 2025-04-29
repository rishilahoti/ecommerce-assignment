"use client";

import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Order {
    id: number;
    date: string;
    total: number;
    items: { title: string; quantity: number }[];
}

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
    if (!user) {
        router.push("/login");
    } else {
        const storedOrders = JSON.parse(localStorage.getItem(`orders-${user.email}`) || "[]");
        setOrders(storedOrders);
    }
}, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Profile</h1>
                <button onClick={logout} className="btn btn-error">
                    Logout
                </button>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold">User Details</h2>
                <p>Email: {user.email}</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold">Order History</h2>
                {orders.map((order) => (
                    <div key={order.id} className="border border-gray-300 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
                        <p className="font-bold text-lg">
                            Order #{order.id} <span className="text-sm text-gray-500">({order.date})</span>
                        </p>
                        <ul className="ml-4 mt-2 list-disc text-sm">
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.title} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p className="font-semibold mt-3">Total: ${order.total.toFixed(2)}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}
