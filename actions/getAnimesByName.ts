"use server";

import { AnimesByName } from "@/types/AnimesByName";

export const getAnimesByName = async (name: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/search?name=${name}`,
      {method: "GET"}
    )

    const data: AnimesByName[] = await response.json();
    return data;
};
