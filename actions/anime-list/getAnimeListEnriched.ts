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

const CHUNK_SIZE = 50;

export const getAnimeListEnriched = async (token: string, status?: string): Promise<EnrichedAnimeList | null> => {
  const baseList = await getAnimeList(token, status);
  if (!baseList) return null;

  const enriched = await enrichItems(baseList.animeList);

  return { animeList: enriched };
};

async function enrichItems(items: AnimeItem[]): Promise<EnrichedAnimeItem[]> {
  const details = new Map<number, Anime>();

  if (process.env.BACKEND_URL) {
    for (let i = 0; i < items.length; i += CHUNK_SIZE) {
      const chunk = items.slice(i, i + CHUNK_SIZE);
      const params = new URLSearchParams();
      chunk.forEach((item) => params.append("ids", String(item.id)));

      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/v1/anime/batch?${params.toString()}`,
          { method: "GET" }
        );

        if (response.ok) {
          const animeList: Anime[] = await response.json();
          animeList.forEach((detail) => {
            if (detail.malId != null) details.set(detail.malId, detail);
          });
        } else {
          console.error(`Failed to enrich anime batch: ${response.status}`);
        }
      } catch {
        console.error("Failed to enrich anime batch");
      }
    }
  }

  return items.map((item) => {
    const detail = details.get(item.id);
    return {
      ...item,
      genres: detail?.genres ?? [],
      season: detail?.season ?? "",
      seasonYear: detail?.seasonYear ?? null,
      animeStatus: detail?.status ?? "",
    };
  });
}
