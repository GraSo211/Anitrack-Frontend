import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiClock2 } from "react-icons/ci";
interface Props {
    coverImage: string;
    title: string;
    id: number;
    episode: number;
}
export default function AnimeLi({ coverImage, title, id, episode }: Props) {
    return (
        <li className="text-center relative flex flex-col items-center gap-1  m-2 bg-[#0d1b2a] text-pretty  h-42.5 2xl:h-[230] overflow-hidden rounded-lg hover:scale-105 transition-transform shadow-lg shadow-black/30 duration-500 ">
            <Link href={`/anime/${id}`} className="flex flex-col w-full h-full justify-end  items-start ">
                <div className="absolute inset-0 bg-linear-to-b from-transparent  via-black/30 to-black/90 z-20" />
                <span className="text-xs 2xl:text-xs  z-20  flex  text-left ml-1 rounded-sm px-2 py-0.5 items-center bg-[#12161F] gap-1 ">
                    <CiClock2 width={15} height={15}></CiClock2>EP {episode}
                </span>
                <p className="text-xs 2xl:text-sm font-semibold z-20  text-left pl-2 w-full mb-1  ">{title}</p>
                <Image src={coverImage} alt={title} width={2560} height={1440} loading="eager" className="absolute top-0 left-0  z-10  rounded-lg object-fill" />
            </Link>
        </li>
    );
}
