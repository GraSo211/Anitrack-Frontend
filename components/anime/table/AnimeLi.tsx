import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props{
    coverImage:string,
    title:string,
    id:number
}
export default function AnimeLi({coverImage, title, id}:Props) {
    return (
        <li  className="text-center flex flex-col items-center gap-1 p-2 m-2 bg-[#0d1b2a] text-pretty h-auto overflow-hidden rounded-lg ">
            <Link href={`/anime/${id}`}>
                <Image src={coverImage} alt={title} width={2560} height={1440} className="object-contain   rounded-lg" />
                <p className="text-xs 2xl:text-sm font-semibold">{title}</p>
            </Link>
        </li>
    );
}
