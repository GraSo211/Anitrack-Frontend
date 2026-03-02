"use client";
import React, { useEffect, useRef } from "react";
import { getAnimesByName } from "@/actions/getAnimesByName";
import Image from "next/image";
import Link from "next/link";
import { AnimesByName } from "@/types/AnimesByName";
import { CiSearch } from "react-icons/ci";

export default function Search() {
    const [animes, setAnimes] = React.useState<AnimesByName[] | null>(null);
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
            const result: AnimesByName[] | null = await getAnimesByName(value);
            setAnimes(result);
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
        <div ref={wrapperRef} className="relative w-full ">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 h-10 backdrop-blur-md transition-all focus-within:ring-2 focus-within:ring-blue-500">
                <input type="text" value={query} className="w-full bg-transparent text-sm focus:outline-none placeholder-white/50" placeholder="Buscar..." onChange={searchAnime} />
                <CiSearch width={22} height={22} stroke="#ffffff" />
            </div>

            {animes && (
                <div className="absolute top-12 left-0 w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    <ul className="divide-y divide-white/10">
                        {animes.map((anime) => (
                            <li key={anime.id + anime.title.romaji!} className="flex items-center gap-3 p-3 hover:bg-white/10 transition" onClick={closeDropdown}>
                                <Link href={`/anime/${anime.id}`} className="flex items-center gap-3 w-full">
                                    <div className="relative w-14  aspect-2/3 shrink-0">
                                        <Image
                                            src={anime.coverImage?.extraLarge || "/coverImagePlaceholder.png"}
                                            alt={anime.title.romaji || anime.title.english || "Anime"}
                                            fill
                                            sizes="112px"
                                            className="rounded-md object-cover"
                                        />
                                    </div>

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
