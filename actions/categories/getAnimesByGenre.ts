"use server";

import { AnimeCard } from "@/types/AnimeCard";

export const getAnimesByGenre = async (genre: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/byGenre?genre=${genre}`, {
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
