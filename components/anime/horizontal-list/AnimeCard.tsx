"use client";
import { Anime } from "@/types/Anime";
import Link from "next/dist/client/link";
import Image from "next/image";
import React from "react";

interface Props {
    anime: Anime;
}

export default function AnimeCard({ anime }: Props) {
    return (
        <li key={anime.id} className="w-40 p-1  rounded-md flex flex-col gap-2 ">
            <Link href={`/anime/${anime.id}`}>
                <div className="relative w-full h-60">
                    <Image src={anime.coverImage.large} alt={anime.title.romaji} fill className="object-cover rounded-md" />
                </div>
            </Link>
            <Link href={`/anime/${anime.id}`}>
                <h4 className="text-xs font-semibold text-pretty">{anime.title.romaji}</h4>
            </Link>
        </li>
    );
}
