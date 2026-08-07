import { AnimeItem, AnimeList } from "@/types/anime/Anime";

export const buildWatchingMap = (
    userAnimeList: AnimeList | null | undefined,
): Map<number, AnimeItem> => {
    const map = new Map<number, AnimeItem>();
    for (const item of userAnimeList?.animeList ?? []) {
        map.set(item.id, item);
    }
    return map;
};
