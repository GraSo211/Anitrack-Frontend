"use server";


import { AnimeReleasing } from "@/types/AnimeReleasing";

export const getReleasingAnimes = async () => {
    const url = `${process.env.BACKEND_URL}/api/v1/anime/releasingAnimes`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "force-cache",
            next: {
                revalidate: 3600, // 1 hour 
            },
        });

        const data: AnimeReleasing[] = await response.json();

        return data;
        
        
    } catch (error) {
        console.error("Error fetching animes:", error);
        return [];
    }
};
