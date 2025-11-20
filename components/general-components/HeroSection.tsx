import { getAnimeOfSeason } from "@/actions/getAnimeOfSeason";
import Image from "next/image";
import React from "react";

export default async function HeroSection() {
    const anime = await getAnimeOfSeason();
    return (
        <div className="w-full h-[600px] relative flex flex-col justify-center first:gap-3 p-40  ">
            <h1 className="text-5xl font-bold">ANITRACK</h1>
            <h2 className="text-3xl font-semibold">DESCUBRE TU PROXIMO ANIME FAVORITO</h2>
            <p className="text-xl max-w-1/2">Sigue tus series, descubre nuevos animes y mantente al día con las últimas tendencias en el mundo del anime.</p>
            <span className="flex gap-10">
                <button className="border p-3 rounded-xl">Empezar a Ver</button>
                <button  className="border p-3 rounded-xl">Explorar Catalogo</button>
            </span>

            <Image src={anime.bannerImage} className="absolute top-0 left-0 -z-10 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] saturate-200" alt="Hero Image" layout="fill" objectFit="cover" />
        </div>
    );
}
