import {
    CalendarFilterMode,
    filterAnimesByUserList,
} from "@/components/airingAnime/filterAnimesByUserList";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";

const makeAnime = (id: number, idMal: number | null = null): AnimeReleasing => ({
    id,
    idMal,
    title: { romaji: `Anime ${id}`, english: null },
    coverImage: { extraLarge: null, large: null, medium: null, color: null },
    nextAiringEpisode: null,
});

const makeUserList = (ids: number[]): AnimeList => ({
    animeList: ids.map((id) => ({
        id,
        title: `Anime ${id}`,
        mainPicture: { medium: "", large: "" },
        status: "watching",
        score: 0,
        episodesWatched: 0,
        isRewatching: false,
    })),
});

describe("filterAnimesByUserList", () => {
    const animes: AnimeReleasing[] = [
        makeAnime(1, 100),
        makeAnime(2, 200),
        makeAnime(3, 300),
        makeAnime(4, null),
    ];

    it("returns the full list when mode is 'all'", () => {
        const userList = makeUserList([100, 200]);
        const result = filterAnimesByUserList(animes, userList, "all" as CalendarFilterMode);
        expect(result).toHaveLength(4);
        expect(result.map((a) => a.id)).toEqual([1, 2, 3, 4]);
    });

    it("returns the full list when userList is null", () => {
        const result = filterAnimesByUserList(animes, null, "mine");
        expect(result).toHaveLength(4);
    });

    it("returns the full list when userList is undefined", () => {
        const result = filterAnimesByUserList(animes, undefined, "mine");
        expect(result).toHaveLength(4);
    });

    it("returns the full list when userList is empty", () => {
        const userList = makeUserList([]);
        const result = filterAnimesByUserList(animes, userList, "mine");
        expect(result).toHaveLength(4);
    });

    it("filters animes by MAL id when mode is 'mine'", () => {
        const userList = makeUserList([100, 300]);
        const result = filterAnimesByUserList(animes, userList, "mine");
        expect(result.map((a) => a.id)).toEqual([1, 3]);
    });

    it("skips animes with null idMal even if no overlap is possible", () => {
        const userList = makeUserList([100]);
        const result = filterAnimesByUserList(animes, userList, "mine");
        expect(result.map((a) => a.id)).toEqual([1]);
    });

    it("returns an empty array when there is no overlap", () => {
        const userList = makeUserList([999]);
        const result = filterAnimesByUserList(animes, userList, "mine");
        expect(result).toEqual([]);
    });
});
