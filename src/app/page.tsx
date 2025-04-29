/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/components/ProductCard";

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
}

export default async function Home() {
    const products = await getProducts();

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {products.map((product: any) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    product={product}
                />
            ))}
        </main>
    );
}
