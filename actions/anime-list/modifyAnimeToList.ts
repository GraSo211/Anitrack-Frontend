"use server";

import { AnimeStatus } from "@/types/AnimeStatus";
import { SiCoolermaster } from "react-icons/si";

export const modifyAnimeToList = async (token:string, id: number, status:string|null,score:number, numEpisodes:number) => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    const body={
        "status":status,
        "score":score,
        "numEpisodes": numEpisodes
    }
    console.log("staus score y num ep", status,score,numEpisodes)
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/animeList/${id}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Cookie":`access_token=${token}`
            },
            body: JSON.stringify(body)
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
