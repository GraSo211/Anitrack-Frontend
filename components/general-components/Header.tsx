import Link from "next/dist/client/link";
import React from "react";

export default function Header() {
    return (
        <header className="z-50 h-14 flex items-center w-full  sticky top-0 mb-1 backdrop-blur-md ">
            <div className=" w-full font-bold flex gap-4 items-center justify-center">
                <h1 className="text-2xl">
                    <Link href={"/"}>ANITRACK</Link>
                </h1>
                <input type="text" placeholder="Buscar..." className="w-1/2 h-8 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <nav className="w-1/4">
                <ul className="w-full flex justify-around items-center px-3">
                    <li>Animes</li>
                    <li></li>
                    <li className="">
                        <button className="p-2 rounded-md bg-[#3282B8] cursor-pointer select-none">Iniciar Sesion</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
