"use server";

import { Anime, AnimeItem } from "@/types/anime/Anime";
import { getAnimeList } from "./getAnimeList";

export type EnrichedAnimeItem = AnimeItem & {
  genres: string[];
  season: string;
  seasonYear: number | null;
  animeStatus: string;
};

export type EnrichedAnimeList = {
  animeList: EnrichedAnimeItem[];
};

export const getAnimeListEnriched = async (token: string, status?: string): Promise<EnrichedAnimeList | null> => {
  const baseList = await getAnimeList(token, status);
  if (!baseList) return null;

  const enriched = await enrichItems(baseList.animeList);

  return { animeList: enriched };
};

async function enrichItems(items: AnimeItem[]): Promise<EnrichedAnimeItem[]> {
  const result: EnrichedAnimeItem[] = [];
  const concurrency = 10;

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const enriched = await Promise.all(
      batch.map(async (item) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/anime/mal/${item.id}`,
            { method: "GET" }
          );
          if (response.ok) {
            const detail: Anime = await response.json();
            return {
              ...item,
              genres: detail.genres ?? [],
              season: detail.season ?? "",
              seasonYear: detail.seasonYear ?? null,
              animeStatus: detail.status ?? "",
            };
          }
        } catch {
          console.error(`Failed to enrich anime ${item.id}`);
        }
        return {
          ...item,
          genres: [],
          season: "",
          seasonYear: null,
          animeStatus: "",
        };
      })
    );
    result.push(...enriched);
  }

  return result;
}
