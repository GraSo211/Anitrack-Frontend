import React from "react";
import "./Scrollbar.css";

import { getReleasingAnimes } from "@/actions/getReleasingAnimes";
import AnimeLi from "./AnimeLi";
import { Anime } from "@/types/Anime";
import { AnimesResponse } from "@/types/AnimesResponse";

const convertTodayEmision = (animes: Anime[] | undefined) => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


    if (animes)
        animes.forEach((anime: Anime) => {
            anime.airingSchedule.nodes.forEach((schedule) => {
                const airingDate = new Date(schedule.airingAt * 1000); // Convert UNIX timestamp to Date
                const airingDay = airingDate.getDay(); // Get the day of the week (0-6)

                anime.schedule = daysOfWeek[airingDay] || "Desconocido";
            });
        });

    return animes;
};

export default async function AiringAnimeTable() {
    let animes: Anime[] | undefined = await getReleasingAnimes();
    
    animes = convertTodayEmision(animes);
    
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
        <div className="w-[90%]  rounded-lg shadow-lg p-6 bg-[#1b263b] flex flex-col items-center">
            <h2 className="font-bold text-3xl mb-4  text-[#e0e1dd]">Animes En Emision</h2>
            <div className="grid grid-cols-7 gap-4 w-full">
                {daysOfWeek.map((day) => (
                    <div
                        key={day.key}
                        className="bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a] rounded-xl p-1  flex flex-col items-center max-h-[400px] 2xl:max-h-[850px] overflow-hidden shadow-lg border border-gray-600 transition-transform hover:scale-105"
                    >
                        <h3 className="text-lg font-bold text-[#e0e1dd] mb-2 tracking-wide uppercase">{day.spanishLabel}</h3>
                        <ul className="space-y-3 w-full scrollbar overflow-y-auto m-2 ">
                            {animes&&animes
                                .filter((anime) => anime.schedule === day.key)
                                .map((anime) => (
                                    <AnimeLi key={anime.id} id={anime.id} coverImage={anime.coverImage.large} title={anime.title.romaji} />
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
