"use server";

import { AnimeTopSeason } from "@/types/AnimeTopSeason";

export const getTopSeasonAnime = async (): Promise<AnimeTopSeason | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/topSeasonAnime`, {
            next: {
                revalidate: 604800, // 1 week in seconds
            },
        });

        if (!response.ok) {
            console.error(`Error al obtener los animes principales de la temporada, status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo de fetch getTopSeasonAnime:", error);
        return null;
    }
};
