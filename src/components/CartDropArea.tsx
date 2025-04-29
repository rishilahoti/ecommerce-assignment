"use client";

import { useDrop } from "react-dnd";
import { useCart } from "@/context/cartContext";
import { Product } from "@/types";

export default function CartDropArea() {
    const { addToCart } = useCart();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "PRODUCT",
        drop: (item: Product) => addToCart(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`border-4 rounded-lg p-6 text-center transition ${isOver ? "border-green-500 bg-green-100" : "border-dashed border-gray-400"
                }`}
        >
            {isOver ? "Drop to add to cart!" : "Drag product here to add to cart"}
        </div>
    );
}
