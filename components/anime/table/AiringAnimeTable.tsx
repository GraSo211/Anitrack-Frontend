import React from "react";

import "./Scrollbar.css";

import { getReleasingAnimes } from "@/actions/getReleasingAnimes";



import AnimeWeek from "./AnimeWeek";
import { AnimeReleasing } from "@/types/AnimeReleasing";


const convertTodayEmision = (animes: AnimeReleasing[] ) => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    if (animes)
        animes.forEach((anime: AnimeReleasing) => {
                if(anime.nextAiringEpisode){
                    const airingDate = new Date(anime.nextAiringEpisode.airingAt! * 1000); // Convert UNIX timestamp to Date
                    const airingDay = airingDate.getDay(); // Get the day of the week (0-6)
                    anime.schedule = daysOfWeek[airingDay] || "Desconocido";
                }
                

              
            
        });

    return animes;
};

export default async function AiringAnimeTable() {
    let animes: AnimeReleasing[]  = await getReleasingAnimes();

    animes = convertTodayEmision(animes);



    return (
        <div className="w-full relative  rounded-lg shadow-lg p-6  flex flex-col items-center ">
            <h2 className="font-bold text-3xl mb-2  text-[#e0e1dd]">Animes En Emisión</h2>
            <p className="mb-8 font-semibold">Sigue los estrenos semanales de tus series favoritas</p>
            <AnimeWeek animes={animes}></AnimeWeek>
        </div>
    );
}
