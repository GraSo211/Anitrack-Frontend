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
        <div className="w-[100%]  rounded-lg shadow-lg p-6  flex flex-col items-center ">
            <h2 className="font-bold text-3xl mb-2  text-[#e0e1dd]">Animes En Emisión</h2>
            <p className="mb-8 font-semibold">Sigue los estrenos semanales de tus series favoritas</p>
            <div className="grid grid-cols-7 gap-4 w-full">
                {daysOfWeek.map((day) => (
                    <div
                        key={day.key}
                        className="bg-gradient-to-br  rounded-xl p-1  flex flex-col items-center w-[150px] 2xl:w-[200px] max-h-[400px] 2xl:max-h-[600px] overflow-hidden shadow-lg transition-transform hover:scale-105"
                    >
                        <h3 className="text-lg font-bold text-[#e0e1dd] mb-2 tracking-wide uppercase border-[0.2px] border-blue-400/20 w-full text-center rounded-sm bg-blue-500/10 ">{day.spanishLabel}</h3>
                        <ul className="space-y-3 w-full scrollbar overflow-y-auto m-2 ">
                            {animes&&animes
                                .filter((anime) => anime.schedule === day.key)
                                .map((anime) => (
                                    <AnimeLi key={anime.id} id={anime.id} episode={anime.nextAiringEpisode?.episode} coverImage={anime.coverImage.extraLarge || anime.coverImage.large} title={anime.title.romaji} />
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
