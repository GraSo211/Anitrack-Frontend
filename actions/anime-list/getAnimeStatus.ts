"use server";


import { AnimeStatus } from "@/types/AnimeStatus";

export const getAnimeStatus = async (token:string| undefined, id:number) => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        if(!token)return;
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/animeList/${id}/status `, {
            method: "GET",
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
        console.error("Fallo de fetch getAnimeStatus:", error);
        return null;
    }
};
