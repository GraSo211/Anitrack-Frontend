"use server";

import { AnimeCard } from "@/types/AnimeCard";

export const getSeasonTrendAnimes = async (cantidad: number) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/upcomingAnimeReleases`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        
    });
    const data: AnimeCard[] = await response.json();

    return data;
};
