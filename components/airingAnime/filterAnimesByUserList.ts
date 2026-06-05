import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";

export type CalendarFilterMode = "all" | "mine";

export const filterAnimesByUserList = (
  animes: AnimeReleasing[],
  userList: AnimeList | null | undefined,
  mode: CalendarFilterMode,
): AnimeReleasing[] => {
    if (mode === "all" || !userList || userList.animeList.length === 0) {
        return animes;
    }

    const watchingIds = new Set(userList.animeList.map((item) => item.id));
    return animes.filter(
        (anime) => anime.idMal != null && watchingIds.has(anime.idMal),
    );
};
