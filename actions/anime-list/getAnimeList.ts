"use server";

import { AnimeCard } from "@/types/AnimeCard";
import { AnimeList } from "@/types/anime/AnimeList";

export const getAnimeList = async (token:string, status?: string): Promise<AnimeList | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const params = new URLSearchParams();
        if(status)params.append("status",status)

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/animeList?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie":`access_token=${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: AnimeList = await response.json();

        return data;
    } catch (error) {
        console.error("Fallo de fetch getAnimeList:", error);
        return null;
    }
};
