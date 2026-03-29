"use server";

import { Anime } from "@/types/anime/Anime";

export const getAnimeById = async (id: number): Promise<Anime | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/${id}`, {
            method: "GET",
            next: {
                revalidate: 86400, // 1 día
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data = await response.json();


        return data as Anime;
    } catch (error) {
        console.error("Fallo de fetch getAnimeById:", error);
        return null;
    }
};
