"use server";

import { AnimeCard } from "@/types/AnimeCard";


export const getMostValoratedAnimes = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/mostValoratedAnimes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            revalidate: 604800, // 1 week in seconds
        },
        
    });
    const data: AnimeCard[] = await response.json();

    return data;
};
