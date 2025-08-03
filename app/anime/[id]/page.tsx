import { getAnimeById } from "@/actions/getAnimeById";

import { AnimeResponse } from "@/types/AnimeResponse";
import React from "react";

import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

import AnimeStatus from "@/components/anime/info/AnimeStatus";
import Genres from "@/components/anime/info/Genres";
import formatDate from "@/utils/formatDate";


interface Props {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
    const { id } = await params;
    const anime: AnimeResponse = await getAnimeById(id);
    const xd = true;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full lg:h-[400px] 2xl:h-[500px] z-10">
                {anime.Media.bannerImage && <Image src={anime.Media.bannerImage} alt={anime.Media.title.romaji} fill className="object-cover w-full h-full opacity-60 " priority />}
            </div>

            <div className="relative z-10 w-full max-w-3/4 flex gap-8 p-8  rounded-xl shadow-lg mt-32 ">
                {/** Anime Information - LEFT SIDE */}
                <div className="flex flex-col relative">
                    {anime.Media.coverImage && (
                        <div className="flex w-full">
                            <Image
                                src={anime.Media.coverImage.large}
                                alt={anime.Media.title.romaji}
                                width={400}
                                height={600}
                                quality={100}
                                loading="eager"
                                className="rounded-lg  shadow-lg border-4 border-gray-800"
                                priority
                            />
                        </div>
                    )}
                    <div className="bg-gray-900 w-full bg-opacity-80 rounded-lg p-2  flex flex-col shadow-md border border-gray-700">
                        <div className="space-y-2 text-gray-300">
                            <p className="">
                                <span className="font-semibold text-gray-200">Fuente:</span> {anime.Media.source}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-200">Total de Capítulos:</span> {anime.Media.episodes || <span className="italic text-gray-400">Desconocido</span>}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-200">Inicio de Emisión:</span>{" "}
                                {`${anime.Media.startDate.day.toString().padStart(2, "0")}/${anime.Media.startDate.month.toString().padStart(2, "0")}/${anime.Media.startDate.year}`}
                            </p>
                            {anime.Media.isAdult && (
                                <p>
                                    <span className="font-semibold text-red-400">Clasificación: </span> Adulto
                                </p>
                            )}
                            {anime.Media.nextAiringEpisode && (
                                <p>
                                    <span className="font-semibold text-blue-400">Próximo episodio: </span>
                                    {"Capitulo "}
                                    {anime.Media.nextAiringEpisode.episode} -{" "}
                                    <span className="text-gray-200">{new Date(anime.Media.nextAiringEpisode.airingAt * 1000).toISOString().replace("T", " ").slice(0, 16)}</span>
                                </p>
                            )}
                            {anime.Media.duration && (
                                <p>
                                    <span className="font-semibold text-gray-200">Duración Promedio de los Capitulos:</span> {anime.Media.duration} min
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Anime Information - RIGHT SIDE */}
                <div className="flex flex-col  w-full  ">
                    <h1 className="text-4xl font-extrabold  text-white mb-8">{anime.Media.title.romaji}</h1>
                    <span className="font-bold absolute right-3 text-2xl">⭐{anime.Media.averageScore}</span>
                    <AnimeStatus status={anime.Media.status} />
                    <Genres genres={anime.Media.genres} />
                    <p className="text-lg text-gray-200 mb-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(anime.Media.description) }} />
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Episodios</h2>
                        <ul className="space-y-2">
                            {anime.Episodes.map((episode) => (
                                <li key={episode.mal_id} className="border-b w-full flex p-1 gap-2 items-center border-gray-700 ">
                                    <span className="font-semibold  text-gray-200">Capítulo {episode.mal_id}:</span> <span className="text-gray-400 max-w-4/6">{episode.title || "Desconocido"}</span>
                                    <span className="text-gray-400 px-0 ml-auto rounded">{episode.aired ? formatDate(episode.aired) : "Desconocido"}</span>
                                    <span className="text-yellow-300 flex justify-center items-center gap-1 ">
                                        {episode.score}

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="#ffdf20"
                                            stroke="#ffdf20"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                        </svg>
                                    </span>
                                    {xd ? (
                                        <button className="hover:scale-x-105 cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#CCCCCC"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button className="hover:scale-x-105 cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#CCCCCC"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                                <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                                <path d="M3 3l18 18" />
                                            </svg>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
