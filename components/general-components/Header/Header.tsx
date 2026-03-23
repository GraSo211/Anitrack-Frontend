"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Search from "./Search";
import { IoMenu } from "react-icons/io5";
import clsx from "clsx";
import { useSidebarStore } from "@/stores/sidebar";
import { useUserStore } from "@/stores/user";

interface Props{
    isAuthenticated: boolean
}

export default function Header({isAuthenticated}:Props) {
    const toggle = useSidebarStore((state) => state.toggle);

    return (
        <header className="z-50 h-16 w-full  sticky top-0 backdrop-blur-xl bg-black/30 flex  items-center px-6 border-b border-white/10">
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-2xl font-extrabold tracking-tight">
                    <Link href="/" className="hover:text-blue-400 transition-colors">
                        ANITRACK
                    </Link>
                </h1>
            </div>


           <div className=" lg:hidden absolute top-4 z-100 right-1" onClick={toggle}><IoMenu size={40}></IoMenu></div>



            <div className={"hidden w-1/3  justify-center lg:flex"}>
                <Search />
            </div>

            <nav className={"hidden lg:static flex-1  justify-end items-center gap-6  lg:flex "}>
                <Link href="/animes" className="text-sm hover:text-blue-400 transition-colors">
                    Animes
                </Link>

                <Link href="/usuarios" className="text-sm hover:text-blue-400 transition-colors">
                    Usuarios
                </Link>

                {
                    isAuthenticated?   
                    <Link href={"/perfil"} className="text-sm hover:text-blue-400 transition-colors">
                    Perfil
                    </Link>
                    :
                   <Link href={"/login"} className="text-sm hover:text-blue-400 transition-colors">
                    Iniciar Sesion
                    </Link>
                }
             
            </nav>



        </header>
    );
}
