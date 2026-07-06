import React from "react";
import { AnimeCard as AnimeCardType } from "@/types/anime/Anime";
import AnimeListCarousel from "./AnimeListCarousel";


interface Props{
    category: AnimeCardType[],
    title: string
}
export default function AnimeList({ category, title }: Props) {

    return (
        <div className="my-2 flex flex-col w-full items-center">
            <h2 className="text-xl 2xl:text-2xl self-start font-bold mb-2">{title}</h2>
            <div className="w-full ">
                <AnimeListCarousel animes={category} />
            </div>
        </div>
    );
}
