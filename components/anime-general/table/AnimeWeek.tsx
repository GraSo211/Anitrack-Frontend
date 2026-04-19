"use client";
import React from "react";
import AiringSwitch from "./AiringSwitch";
import AnimeLi from "./AnimeLi";
import { AnimeReleasing } from "@/types/anime/Anime";
import Link from "next/link";

export default function AnimeWeek({ animes }: { animes: AnimeReleasing[] | undefined }) {
    const animesChecked: AnimeReleasing[] = Array.isArray(animes) ? animes : [];
    const hasError = animes !== undefined && !Array.isArray(animes);

    const daysOfWeek = [
        { key: "monday", label: "Monday", spanishLabel: "Lunes" },
        { key: "tuesday", label: "Tuesday", spanishLabel: "Martes" },
        { key: "wednesday", label: "Wednesday", spanishLabel: "Miércoles" },
        { key: "thursday", label: "Thursday", spanishLabel: "Jueves" },
        { key: "friday", label: "Friday", spanishLabel: "Viernes" },
        { key: "saturday", label: "Saturday", spanishLabel: "Sábado" },
        { key: "sunday", label: "Sunday", spanishLabel: "Domingo" },
    ];
 
    return (
        <div>
            <div className=" flex mb-1 font-semibold ">
                <AiringSwitch onChange={(value) => console.log(value)} />
            </div>
            <div className="grid grid-cols-7 gap-4 w-full">
                {hasError && <div className="col-span-7 text-center text-red-400 text-sm mt-4">Ocurrió un problema al cargar los animes. Intentá nuevamente más tarde.</div>}

                {daysOfWeek.map((day) => (
                    <div
                        key={day.key}
                        className="bg-bg-secondary rounded-xl p-1 flex flex-col items-center w-37.5 2xl:w-50 max-h-100 2xl:max-h-150 overflow-hidden shadow-lg transition-transform hover:scale-105 border border-border-default"
                    >
                        <Link href={`/airingAnimes?day=${day.spanishLabel.toLowerCase()}`} className="w-full">
                            <h3 className="text-lg font-bold text-text-primary mb-2 tracking-wide uppercase border border-border-default w-full text-center rounded-sm bg-bg-tertiary hover:bg-accent-primary-subtle transition-colors hover:animate-pulse hover:cursor-pointer">
                            {day.spanishLabel}
                        </h3>
                        </Link>
                        
                        <ul className="space-y-3 w-full scrollbar overflow-y-auto m-2 ">
                            {animesChecked 
                                    .filter((anime) => anime.schedule === day.key)
                                    .map((anime) => (
                                        <AnimeLi
                                            key={anime.id}
                                            id={anime.id}
                                            episode={anime.nextAiringEpisode?.episode ?? 0}
                                            coverImage={anime.coverImage.extraLarge || anime.coverImage.large || "/placeholder_cover.png"}
                                            title={anime.title.romaji || anime.title.english || "Título Desconocido"}
                                        />
                                    ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
