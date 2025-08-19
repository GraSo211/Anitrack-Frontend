import { getAnimeById } from "@/actions/getAnimeById";
import { Anime } from "@/types/Anime";
import { AnimeResponse } from "@/types/AnimeResponse";
import React from "react";

import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { postTranslateText } from "@/actions/postTranslateText";
import AnimeStatus from "@/components/anime/info/AnimeStatus";

interface Props {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const anime: AnimeResponse = await getAnimeById(id);
  const animeRes: Anime = anime.data.Media;
  //const spanishDescription = await postTranslateText(animeRes.description);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-1/2 z-10">
        <Image
          src={animeRes.bannerImage}
          alt={animeRes.title.romaji}
          fill
          className="object-cover w-full h-full opacity-60 "
          priority
        />
        
      </div>

      <div className="relative z-10 w-full max-w-3/4 flex gap-8 p-8  rounded-xl shadow-lg mt-32 ">
        <div className="flex flex-col">
          <Image
            src={animeRes.coverImage.large}
            alt={animeRes.title.romaji}
            width={320}
            height={480}
            className="rounded-lg shadow-lg border-4 object-cover border-gray-800"
            priority
          />
          <div className="bg-gray-900 bg-opacity-80 rounded-lg p-2  flex flex-col shadow-md border border-gray-700">
            <h3 className="text-xl font-bold text-white text-center mb-4 tracking-wide">Info Extra</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold text-gray-200">Total de Capítulos:</span>{" "}
                {animeRes.episodes || <span className="italic text-gray-400">Desconocido</span>}
              </p>
              <p>
                <span className="font-semibold text-gray-200">Inicio de Emisión:</span>{" "}
                {`${animeRes.startDate.day.toString().padStart(2, "0")}/${animeRes.startDate.month.toString().padStart(2, "0")}/${animeRes.startDate.year}`}
              </p>
              {animeRes.isAdult && (
                <p>
                  <span className="font-semibold text-red-400">Clasificación:</span> Adulto
                </p>
              )}
              {animeRes.nextAiringEpisode && (
                <p>
                  <span className="font-semibold text-blue-400">Próximo episodio:</span>{"Capitulo "}
                  {animeRes.nextAiringEpisode.episode} -{" "}
                  <span className="text-gray-200">
                    {new Date(animeRes.nextAiringEpisode.airingAt * 1000).toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-full ">
          <h1 className="text-4xl font-extrabold text-white mb-8">{animeRes.title.romaji}</h1>
          <AnimeStatus status={animeRes.status} />
          <p
            className="text-lg text-gray-200 mb-6"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(animeRes.description) }}
          />

          
          {animeRes.duration}
          
          {animeRes.genres.join(", ")}
          {animeRes.averageScore}
          {animeRes.popularity}
          {animeRes.source}
          {animeRes.status}
          {animeRes.nextAiringEpisode?.airingAt}
          {animeRes.nextAiringEpisode?.episode}

          {animeRes.episodes}
          
        </div>
      </div>
    </div>
  );
}
