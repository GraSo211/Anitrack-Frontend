"use server";

import { AnimeCard } from "@/types/AnimeCard";

interface FilterParams {
    cant:number
    genre?: string[];
    tag?: string[];
    season?: string;
    year?: string;
    status?: string;
}

export const getFilteredAnimes = async (filters: FilterParams): Promise<AnimeCard[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const params = new URLSearchParams();
        params.append("cant",filters.cant.toString()); 
        filters.genre?.forEach((g) => params.append("genre", g));
        filters.tag?.forEach((t) => params.append("tag", t));
        if (filters.season) params.append("season", filters.season);
        if (filters.year) params.append("year", filters.year.toString());
        if (filters.status) params.append("status", filters.status);

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/filtered?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: AnimeCard[] = await response.json();

        return data;
    } catch (error) {
        console.error("Fallo de fetch getFilteredAnimes:", error);
        return null;
    }
};
