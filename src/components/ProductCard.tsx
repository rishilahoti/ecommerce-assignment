/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";
import Image from "next/image";

type ProductCardProps = {
    id: number;
    title: string;
    image: string;
    price: number;
    product: any;
};


export default function ProductCard({ id, product, title, image, price }: ProductCardProps) {
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();
    const isInWishlist = wishlist.some(item => item.id === id);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col">
            <Image src={product.image} alt={product.title} width={192} height={192} className="w-full h-48 object-contain" />
            <h3 className="mt-4 text-lg font-semibold min-h-[3rem] text-center">{product.title}</h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">${product.price}</p>
            <div className="mt-auto pt-4">
                <button
                    onClick={() =>
                        addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 })
                    }
                    className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-700"
                >
                    Add to Cart
                </button>
                <button
                    onClick={() => toggleWishlist({ id, title, image, price })}
                    className={`mt-4 w-full text-white py-2 rounded hover:bg-gray-700 ${isInWishlist ? 'bg-red-500' : 'bg-black'}`}
                >
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
            </div>
        </div>
    );
}
