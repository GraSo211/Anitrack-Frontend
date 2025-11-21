import React from "react";

import "./Scrollbar.css";

import { getReleasingAnimes } from "@/actions/getReleasingAnimes";

import { Anime } from "@/types/Anime";

import AnimeWeek from "./AnimeWeek";


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



    return (
        <div className="w-[100%] relative  rounded-lg shadow-lg p-6  flex flex-col items-center ">
            <h2 className="font-bold text-3xl mb-2  text-[#e0e1dd]">Animes En Emisión</h2>
            <p className="mb-8 font-semibold">Sigue los estrenos semanales de tus series favoritas</p>
            <AnimeWeek animes={animes}></AnimeWeek>
        </div>
    );
}
