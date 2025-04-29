"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsGoogle, BsFacebook } from "react-icons/bs";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch {
            alert("Login failed. Check your credentials.");
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch {
            alert("Google login failed.");
        }
    };

    const loginWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
            router.push("/");
        } catch {
            alert("Facebook login failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={login} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary w-full">Sign In</button>

                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={loginWithGoogle}
                        className="rounded-full cursor-pointer bg-red-500 p-2 text-white flex items-center justify-center"
                    >
                        <BsGoogle className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={loginWithFacebook}
                        className="rounded-full cursor-pointer bg-blue-600 p-2 text-white flex items-center justify-center"
                    >
                        <BsFacebook className="h-5 w-5" />
                    </button>
                </div>

                <p className="text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
