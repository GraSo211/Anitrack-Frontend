import { render, screen, fireEvent } from "@testing-library/react";
import AnimeWeek from "@/components/anime-general/table/AnimeWeek";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";

const FRIDAY_TIMESTAMP = (() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    while (d.getDay() !== 5) {
        d.setDate(d.getDate() + 1);
    }
    return Math.floor(d.getTime() / 1000);
})();

const makeAnime = (
    id: number,
    idMal: number | null,
    title: string,
    schedule: string,
): AnimeReleasing => ({
    id,
    idMal,
    title: { romaji: title, english: null },
    coverImage: { extraLarge: null, large: null, medium: null, color: null },
    nextAiringEpisode: {
        id,
        airingAt: FRIDAY_TIMESTAMP,
        timeUntilAiring: 86400,
        episode: 1,
        mediaId: id,
    },
    schedule,
});

const makeUserList = (ids: number[]): AnimeList => ({
    animeList: ids.map((id) => ({
        id,
        title: `Anime ${id}`,
        mainPicture: { medium: "", large: "" },
        status: "watching" as const,
        score: 0,
        episodesWatched: 0,
        isRewatching: false,
    })),
});

describe("AnimeWeek", () => {
    it("renders all animes grouped by day", () => {
        const animes = [
            makeAnime(1, 100, "Naruto", "friday"),
            makeAnime(2, 200, "Bleach", "monday"),
        ];
        render(<AnimeWeek animes={animes} />);

        expect(screen.getByText("Naruto")).toBeInTheDocument();
        expect(screen.getByText("Bleach")).toBeInTheDocument();
    });

    it("hides the toggle when userAnimeList is null", () => {
        const animes = [makeAnime(1, 100, "Naruto", "friday")];
        render(<AnimeWeek animes={animes} userAnimeList={null} />);

        expect(screen.queryByText("Todos los animes")).not.toBeInTheDocument();
        expect(screen.queryByText("Animes que sigo")).not.toBeInTheDocument();
    });

    it("hides the toggle when userAnimeList is empty", () => {
        const animes = [makeAnime(1, 100, "Naruto", "friday")];
        render(<AnimeWeek animes={animes} userAnimeList={makeUserList([])} />);

        expect(screen.queryByText("Todos los animes")).not.toBeInTheDocument();
    });

    it("shows the toggle when userAnimeList has entries", () => {
        const animes = [makeAnime(1, 100, "Naruto", "friday")];
        render(<AnimeWeek animes={animes} userAnimeList={makeUserList([100])} />);

        expect(screen.getByText("Todos los animes")).toBeInTheDocument();
        expect(screen.getByText("Animes que sigo")).toBeInTheDocument();
    });

    it("filters the animes list to only the user's watching animes in mine mode", () => {
        const animes = [
            makeAnime(1, 100, "Naruto", "friday"),
            makeAnime(2, 200, "Bleach", "friday"),
            makeAnime(3, 300, "One Piece", "monday"),
        ];
        render(
            <AnimeWeek
                animes={animes}
                userAnimeList={makeUserList([100, 300])}
            />,
        );

        expect(screen.getByText("Naruto")).toBeInTheDocument();
        expect(screen.getByText("Bleach")).toBeInTheDocument();
        expect(screen.getByText("One Piece")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Animes que sigo"));

        expect(screen.getByText("Naruto")).toBeInTheDocument();
        expect(screen.queryByText("Bleach")).not.toBeInTheDocument();
        expect(screen.getByText("One Piece")).toBeInTheDocument();
    });

    it("returns to the full list when 'all' is selected again", () => {
        const animes = [
            makeAnime(1, 100, "Naruto", "friday"),
            makeAnime(2, 200, "Bleach", "friday"),
        ];
        render(
            <AnimeWeek
                animes={animes}
                userAnimeList={makeUserList([100])}
            />,
        );

        fireEvent.click(screen.getByText("Animes que sigo"));
        expect(screen.queryByText("Bleach")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Todos los animes"));
        expect(screen.getByText("Bleach")).toBeInTheDocument();
    });
});
