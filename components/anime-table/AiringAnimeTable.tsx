import React from "react";
import "./Scrollbar.css";

import { getAnimes } from "@/actions/getAnimes";
import AnimeLi from "./AnimeLi";
import { Anime } from "@/types/Anime";
import { AnimesResponse } from "@/types/AnimesResponse";

const convertTodayEmision = (animes: AnimesResponse | undefined) => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    // Initialize an empty schedule for each anime

    // Populate the schedule based on airingAt
    if (animes)
        animes.data.Page.media.forEach((anime: Anime) => {
            anime.airingSchedule.nodes.forEach((schedule) => {
                const airingDate = new Date(schedule.airingAt * 1000); // Convert UNIX timestamp to Date
                const airingDay = airingDate.getDay(); // Get the day of the week (0-6)

                anime.schedule = daysOfWeek[airingDay] || "Desconocido";
            });
        });

    return animes;
};

export default async function AiringAnimeTable() {
    let animes: AnimesResponse | undefined = await getAnimes();
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
        <div className="w-[90%]  rounded-lg shadow-lg p-6 bg-gray-700 flex flex-col items-center">
            <h2 className="font-bold text-3xl mb-4  text-white">Animes En Emision</h2>
            <div className="grid grid-cols-7 gap-4 w-full">
                {daysOfWeek.map((day) => (
                    <div
                        key={day.key}
                        className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-xl p-1  flex flex-col items-center max-h-[400px] 2xl:max-h-[850px] overflow-hidden shadow-lg border border-gray-600 transition-transform hover:scale-105"
                    >
                        <h3 className="text-lg font-bold text-blue-400 mb-2 tracking-wide uppercase">{day.spanishLabel}</h3>
                        <ul className="space-y-3 w-full scrollbar overflow-y-auto m-2 ">
                            {animes&&animes.data.Page.media
                                .filter((anime) => anime.schedule === day.key)
                                .map((anime) => (
                                    <AnimeLi key={anime.id} coverImage={anime.coverImage.large} title={anime.title.romaji} />
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
