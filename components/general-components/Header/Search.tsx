"use client";
import React, { useEffect, useRef } from "react";
import Lupa from "../icons/Lupa";
import { getAnimesByName } from "@/actions/getAnimesByName";
import { Anime } from "@/types/Anime";
import Image from "next/image";
import Link from "next/link";

export default function Search() {
    const [animes, setAnimes] = React.useState<Anime[] | null>(null);
    const [query, setQuery] = React.useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const searchAnime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            if (!value.trim()) {
                setAnimes(null);
                return;
            }
            const result = await getAnimesByName(value);
            console.log(result);
            setAnimes(result.Page.media);
        }, 600);
    };

    const closeDropdown = () => {
        setQuery("");
        setAnimes(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 h-10 backdrop-blur-md transition-all focus-within:ring-2 focus-within:ring-blue-500">
                <input type="text" value={query} className="w-full bg-transparent text-sm focus:outline-none placeholder-white/50" placeholder="Buscar..." onChange={searchAnime} />
                <Lupa width={22} height={22} stroke="#ffffff" />
            </div>

            {animes && (
                <div className="absolute top-12 left-0 w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    <ul className="divide-y divide-white/10">
                        {animes.map((anime) => (
                            <li key={anime.id + anime.title.romaji} className="flex items-center gap-3 p-3 hover:bg-white/10 transition" onClick={closeDropdown}>
                                <Link href={`/anime/${anime.id}`} className="flex items-center gap-3 w-full">
                                    <Image src={anime.coverImage.extraLarge} alt={anime.title.romaji} width={60} height={90} className="rounded-md object-cover" />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm">{anime.title.romaji}</span>
                                        {anime.title.english && <span className="text-xs text-white/60">{anime.title.english}</span>}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
