"use server";

import { AnimeCard } from "@/types/AnimeCard";

export const getSeasonTrendAnimes = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/seasonTrendAnimes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 86400, // 1 day in seconds
        },
        
    });
    const data: AnimeCard[] = await response.json();

    return data;
};
