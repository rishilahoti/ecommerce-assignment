"use client";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import {
    auth,
    googleProvider,
    facebookProvider,
} from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch {
            alert("Signup failed. Try again.");
        }
    };

    const signupWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch {
            alert("Google signup failed.");
        }
    };

    const signupWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
            router.push("/");
        } catch {
            alert("Facebook signup failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={signup}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6"
            >
                <h1 className="text-2xl font-bold text-center">Create Account</h1>
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
                <button type="submit" className="btn btn-primary w-full">
                    Sign Up
                </button>

                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={signupWithGoogle}
                        className="rounded-full bg-red-500 p-2 text-white flex cursor-pointer items-center justify-center"
                    >
                        <BsGoogle className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={signupWithFacebook}
                        className="rounded-full bg-blue-600 p-2 text-white flex cursor-pointer items-center justify-center"
                    >
                        <BsFacebook className="h-5 w-5" />
                    </button>
                </div>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
