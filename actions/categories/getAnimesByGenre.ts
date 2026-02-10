"use server";

import { AnimeCard } from "@/types/AnimeCard";

export const getAnimesByGenre = async (genre: string): Promise<AnimeCard[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/byGenre?genre=${genre}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 604800, // 1 week in seconds
            },
        });

        if (!response.ok) {
            console.error(`Error al obtener animes por género ${genre}, status: ${response.status}`);
            return null;
        }

        const data: AnimeCard[] = await response.json();

        return data;
    } catch (error) {
        console.error("Fallo de fetch getAnimesByGenre:", error);
        return null;
    }
};
