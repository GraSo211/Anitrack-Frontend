"use server";

import { AnimeStatus } from "@/types/AnimeStatus";

export const addAnimeToList = async (token:string, id: number) => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/animeList/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie":`access_token=${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: AnimeStatus = await response.json();

        return data;
    } catch (error) {
        console.error("Fallo de fetch addToAnimeList:", error);
        return null;
    }
};
