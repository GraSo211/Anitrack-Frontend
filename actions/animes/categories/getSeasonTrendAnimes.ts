"use server";

import { AnimeCard } from "@/types/anime/Anime";

export const getSeasonTrendAnimes = async (): Promise<AnimeCard[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/seasonTrendAnimes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 86400, // 1 day in seconds
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }



        const data: AnimeCard[] = await response.json();

        return data;
    } catch (error) {
        console.error("Fallo de fetch getSeasonTrendAnimes:", error);
        return null;
    }
};
