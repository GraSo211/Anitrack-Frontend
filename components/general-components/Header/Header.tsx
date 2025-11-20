import Link from "next/link";
import React from "react";
import Lupa from "../icons/Lupa";
import Search from "./Search";

export default function Header() {
    return (
        <header className="z-50 h-16 w-full sticky top-0 backdrop-blur-xl bg-black/30 flex items-center px-6 border-b border-white/10">
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-2xl font-extrabold tracking-tight">
                    <Link href="/" className="hover:text-blue-400 transition-colors">
                        ANITRACK
                    </Link>
                </h1>
            </div>

            <div className="flex-1 flex justify-center">
                <Search />
            </div>

            <nav className="flex-1 flex justify-end items-center gap-6">
                <Link href="/animes" className="text-sm hover:text-blue-400 transition-colors">
                    Animes
                </Link>

                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-900/30 text-sm font-medium">
                    Iniciar Sesion
                </button>
            </nav>
        </header>
    );
}
