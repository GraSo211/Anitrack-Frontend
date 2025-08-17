import { getSeasonTrendAnimes } from "@/actions/getSeasonTrendAnimes";
import { AnimesResponse } from "@/types/AnimesResponse";
import Image from "next/image";
import React from "react";
import AnimeCard from "./AnimeCard";

export default async function AnimeList() {
    const seasonTrendAnimes: AnimesResponse = await getSeasonTrendAnimes(5);
    return (
        <div className="my-2 w-full">
            <h2 className="text-xl font-bold mb-2">Lo mejor de la Temporada</h2>
            <ul className="flex justify-around gap-2 ">
                {seasonTrendAnimes?.data?.Page?.media?.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </ul>
        </div>
    );
}

   