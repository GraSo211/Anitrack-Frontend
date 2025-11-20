import Link from "next/dist/client/link";
import React from "react";
import Lupa from "./icons/Lupa";

export default function Header() {
    return (
        <header className="z-50 h-14 flex items-center w-full  sticky top-0 mb-1 backdrop-blur-md ">
            <div className=" w-1/3 font-bold flex gap-4  items-center justify-center">
                <h1 className="text-2xl">
                    <Link href={"/"}>ANITRACK</Link>
                </h1>
            </div>
            <div className=" w-1/3   font-bold flex gap-4  items-center justify-center">
                <span className=" w-full flex justify-between items-center h-8 px-2 rounded-md border border-gray-300 focus-within:outline focus-within:outline-blue-500 ">
                    <input type="text" className="w-full focus:outline-none" placeholder="Buscar..."/>
                    <Lupa width={24} height={24} stroke="#FFFFFF"></Lupa>
                </span>
                
            </div>
            <nav className="w-1/3 ">
                <ul className="w-full flex justify-end gap-5 items-center px-3">
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
