"use server";

import { AnimeCard } from "@/types/AnimeCard";

export const getMostValoratedAnimes = async (): Promise<AnimeCard[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/mostValoratedAnimes`, {
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
        console.error("Fallo de fetch getMostValoratedAnimes:", error);
        return null;
    }
};
