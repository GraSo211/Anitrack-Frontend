"use server";

import { AnimeCard } from "@/types/AnimeCard";

export const getAnimesByGenre = async (genre: string) => {
     const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/byGenre?genre=${genre}`, {
         method: "GET",
         headers: {
             "Content-Type": "application/json",
         },
         
     });
     const data: AnimeCard[] = await response.json();
 
     return data;
};
