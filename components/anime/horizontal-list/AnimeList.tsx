import React from "react";
import AnimeCard from "./AnimeCard";
import { AnimeCard as AnimeCardType } from "@/types/AnimeCard";

interface Props{
    category: AnimeCardType[],
    title: string
}
export default async function AnimeList({ category, title }: Props) {

    return (
        <div className="my-2  flex flex-col  items-center">
            <h2 className="text-xl 2xl:text-2xl self-start  font-bold mb-2">{title}</h2>
            <ul className="flex justify-around gap-2 ">
                {category.map((anime:AnimeCardType) => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </ul>
        </div>
    );
}
