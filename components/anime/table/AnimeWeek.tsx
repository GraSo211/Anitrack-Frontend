"use client";
import React from "react";
import AiringSwitch from "./AiringSwitch";
import AnimeLi from "./AnimeLi";
import { AnimeReleasing } from "@/types/AnimeReleasing";

export default function AnimeWeek({ animes }: { animes: AnimeReleasing[] | undefined }) {

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
            <div className="absolute flex  ml-8 mt-10 top-0 left-0">
                <AiringSwitch onChange={(value) => console.log(value)} />
                
            </div>
            <div className="grid grid-cols-7 gap-4 w-full">
                {daysOfWeek.map((day) => (
                    <div
                        key={day.key}
                        className="bg-linear-to-br  rounded-xl p-1  flex flex-col items-center w-37.5 2xl:w-50 max-h-100 2xl:max-h-150 overflow-hidden shadow-lg transition-transform hover:scale-105"
                    >
                        <h3 className="text-lg font-bold text-[#e0e1dd] mb-2 tracking-wide uppercase border-[0.2px] border-blue-400/20 w-full text-center rounded-sm bg-blue-500/10 ">
                            {day.spanishLabel}
                        </h3>
                        <ul className="space-y-3 w-full scrollbar overflow-y-auto m-2 ">
                            {animes &&
                                animes
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
