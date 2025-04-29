import "./globals.css";

import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import { WishlistProvider } from "@/context/wishlistContext";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
    title: "E-commerce App",
    description: "Premium shopping experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <Navbar />
                                <main className="min-h-screen">{children}</main>
                            </WishlistProvider>
                        </CartProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html >
    );
}
