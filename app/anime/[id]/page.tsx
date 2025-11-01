import { getAnimeById } from "@/actions/getAnimeById";

import { AnimeResponse } from "@/types/AnimeResponse";
import React from "react";

import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

import AnimeStatus from "@/components/anime/info/AnimeStatus";
import Genres from "@/components/anime/info/Genres";

import Episodes from "@/components/anime/info/Episodes";
import { Anime } from "@/types/Anime";


interface Props {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
    const { id } = await params;
    const anime: Anime = await getAnimeById(id);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full lg:h-[400px] 2xl:h-[500px] z-10">
                {anime.bannerImage && <Image src={anime.bannerImage} alt={anime.title.romaji || "Desconocido"} fill className="object-cover w-full h-full opacity-60  [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]" priority />}
            </div>

            <div className="relative z-10 w-full max-w-3/4 flex gap-8 p-8  rounded-xl shadow-lg mt-32 ">
                
                <div className="flex flex-col relative">
                    {anime.image && (
                        <div className="flex w-full">
                            <Image
                                src={anime.image}
                                alt={anime.name}
                                width={400}
                                height={600}
                                quality={100}
                                loading="eager"
                                className="rounded-lg  shadow-lg border-4 border-gray-800  "
                                priority
                            />
                        </div>
                    )}
                    <div className="bg-gray-900 w-full bg-opacity-80 rounded-lg p-2  flex flex-col shadow-md border border-gray-700">
                        <div className="space-y-2 text-gray-300">
                            <p className="">
                                <span className="font-semibold text-gray-200">Fuente:</span> {anime.source}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-200">Total de Capítulos:</span> {anime.episodes || <span className="italic text-gray-400">Desconocido</span>}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-200">Inicio de Emisión:</span>{" "}
                                {`${anime.startDate}/${anime.startDate}/${anime.startDate}`}
                            </p>
                            {anime.isAdult && (
                                <p>
                                    <span className="font-semibold text-red-400">Clasificación: </span> Adulto
                                </p>
                            )}
                            {anime.nextAiringEpisode && (
                                <p>
                                    <span className="font-semibold text-blue-400">Próximo episodio: </span>
                                    {"Capitulo "}
                                    {anime.nextAiringEpisode.episode} -{" "}
                                    <span className="text-gray-200">{new Date(anime.nextAiringEpisode.airingAt * 1000).toISOString().replace("T", " ").slice(0, 16)}</span>
                                </p>
                            )}
                            {anime.duration && (
                                <p>
                                    <span className="font-semibold text-gray-200">Duración Promedio de los Capitulos:</span> {anime.duration} min
                                </p>
                            )}
                        </div>
                    </div>
                </div>

        
                <div className="flex flex-col  w-full  ">
                    <h1 className="text-4xl font-extrabold  text-white mb-8">{anime.title.romaji}</h1>
                    <span className="font-bold absolute right-3 text-2xl">⭐{anime.averageScore}</span>
                    <AnimeStatus status={anime.status} />
                    <Genres genres={anime.genres} />
                    <p className="text-lg text-gray-200 mb-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(anime.description) }} />
                    {
                        anime.Episodes && anime.Episodes.length > 0 &&
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Episodios</h2>
                            <ul className="space-y-2">
                                {anime.Episodes.map((episode) => (
                                    <Episodes key={episode.mal_id} episode={episode} xd={true} />
                                ))}
                            </ul>
                        </section>
                    }
                        
                </div>
            </div>
        </div>
    );
}
