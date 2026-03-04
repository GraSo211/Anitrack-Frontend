"use client";
import React from 'react'
import Search from './Header/Search'
import Link from 'next/link'
import { IoMenu } from 'react-icons/io5'
import { RxCross1 } from "react-icons/rx";
import { useSidebarStore } from "@/stores/sidebar";
export default function Sidebar() {
    const isOpen = useSidebarStore((state) => state.isOpen);
    const toggle = useSidebarStore((state) => state.toggle);
    if (!isOpen) return null;
    return (


        <nav className={"flex flex-col backdrop-blur-md fixed inset-0 z-100 gap-3 justify-center  items-center   bg-black/50  top-0 left-0 w-screen h-screen "}>
            <div className={"absolute top-0  flex  mt-3   justify-center "}>
                <Search />
            </div>
            <RxCross1 size={40} className='absolute bottom-2 rounded-full border p-1' onClick={toggle}></RxCross1>



            <Link href={"/login"} onClick={() => console.log("hola")} className="   
                    hover:text-blue-400 transition-colors">
                Iniciar Sesion
            </Link>

            <Link href="/animes" className=" hover:text-blue-400 transition-colors">
                Animes
            </Link>


        </nav>

    )
}
