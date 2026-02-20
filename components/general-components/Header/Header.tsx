import Link from "next/link";
import React from "react";
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

            <div className={"hidden bg-blue-200"+"flex-1 justify-center lg:flex"}>
                <Search />
            </div>

            <nav className={"flex-1  justify-end items-center gap-6 hidden lg:flex " + ""}>
                <Link href="/animes" className="text-sm hover:text-blue-400 transition-colors">
                    Animes
                </Link>

                <Link href={"/login"} className="px-3 py-1.5 rounded-xl  bg-white/10 backdrop-blur-md border border-white/20 
                    hover:bg-white/20 transition-all shadow-lg shadow-black/30">
                    Iniciar Sesion
                </Link>
            </nav>
        </header>
    );
}
