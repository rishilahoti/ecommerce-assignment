"use client";
import { useWishlist } from "@/context/wishlistContext";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

            {wishlist.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg">No products in your wishlist yet ❤️</p>
                    <Link href="/" className="text-blue-600 hover:underline mt-4 block">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border">
                            <Image src={item.image} width={80} height={80} className="object-contain" alt={item.title} />
                            <div className="flex-1">
                                <h2 className="font-semibold">{item.title}</h2>
                                <p>${item.price}</p>
                            </div>
                            <button onClick={() => removeFromWishlist(item.id)} className="text-red-500 font-semibold">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
