import { buildWatchingMap } from "@/utils/animeWatchingMap";
import { AnimeList } from "@/types/anime/Anime";

const makeList = (ids: number[]): AnimeList => ({
    animeList: ids.map((id) => ({
        id,
        title: `Anime ${id}`,
        mainPicture: { medium: "", large: "" },
        status: "watching" as const,
        score: 7,
        episodesWatched: 3,
        isRewatching: false,
    })),
});

describe("buildWatchingMap", () => {
    it("maps MAL ids to list items", () => {
        const map = buildWatchingMap(makeList([100, 200]));

        expect(map.get(100)?.episodesWatched).toBe(3);
        expect(map.get(200)?.title).toBe("Anime 200");
        expect(map.has(300)).toBe(false);
    });

    it("returns an empty map for null, undefined and empty lists", () => {
        expect(buildWatchingMap(null).size).toBe(0);
        expect(buildWatchingMap(undefined).size).toBe(0);
        expect(buildWatchingMap(makeList([])).size).toBe(0);
    });
});
