"use server";

import { Anime } from "@/types/anime/Anime";

export const getAnimeByMalId = async (id: number): Promise<Anime | null> => {
    console.log("buscamos en myanimelist id")
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/mal/${id}`, {
            method: "GET",

        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data = await response.json();


        return data as Anime;
    } catch (error) {
        console.error("Fallo de fetch getAnimeByMalId:", error);
        return null;
    }
};
