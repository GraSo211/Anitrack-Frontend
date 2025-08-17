import { getAnimeById } from "@/actions/getAnimeById";
import { Anime } from "@/types/Anime";
import { AnimeResponse } from "@/types/AnimeResponse";
import React from "react";

import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { postTranslateText } from "@/actions/postTranslateText";

interface Props {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const anime: AnimeResponse = await getAnimeById(id);
  const animeRes: Anime = anime.data.Media;
  const spanishDescription = await postTranslateText(animeRes.description);

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
        <div className="">
          <Image
            src={animeRes.coverImage.large}
            alt={animeRes.title.romaji}
            width={320}
            height={480}
            className="rounded-lg shadow-lg border-4 border-gray-800"
            priority
          />
        </div>
        <div className="flex flex-col justify-between w-full ">
          <h1 className="text-4xl font-extrabold text-white mb-4">{animeRes.title.romaji}</h1>
          <p
            className="text-lg text-gray-200 mb-6"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(animeRes.description) }}
          />
          
        </div>
      </div>
    </div>
  );
}
