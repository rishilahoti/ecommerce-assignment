'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useCart } from '@/context/cartContext';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { BsMoon, BsSun } from 'react-icons/bs';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const { cart } = useCart();

    return (
        <nav className="w-full px-4 md:px-10 py-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow">
            <Link href="/" className="text-xl font-bold text-primary">
                🛒 PremiumShop
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/wishlist" className="hover:underline">
                    Wishlist
                </Link>
                <Link href="/profile" className="hover:underline">
                    Profile
                </Link>
                <Link href="/cart" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    )}
                </Link>

                <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    {theme === 'light' ? <BsMoon/> : <BsSun/>}
                </Button>
            </div>
        </nav>
    );
}
