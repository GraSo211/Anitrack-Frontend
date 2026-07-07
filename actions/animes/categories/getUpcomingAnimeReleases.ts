"use server";

import { AnimeCard } from "@/types/anime/Anime";

export const getUpcomingAnimeReleases = async (cant: number = 10): Promise<AnimeCard[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/upcomingAnimeReleases?cant=${cant}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 604800, // 1 week in seconds
            },
        });
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data: AnimeCard[] = await response.json();

        return data;
    } catch (error) {
        console.error("Fallo de fetch getUpcomingAnimeReleases:", error);
        return null;
    }
};
