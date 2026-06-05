import { render, screen, fireEvent, within } from "@testing-library/react";
import AiringAnimeDay from "@/components/airingAnime/AiringAnimeDay";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
    useSearchParams: jest.fn(),
}));

const useSearchParamsMock = useSearchParams as jest.Mock;

const MONDAY_TIMESTAMP = (() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }
    return Math.floor(d.getTime() / 1000);
})();

const makeAnime = (id: number, idMal: number | null, title: string): AnimeReleasing => ({
    id,
    idMal,
    title: { romaji: title, english: null },
    coverImage: { extraLarge: null, large: null, medium: null, color: null },
    nextAiringEpisode: {
        id,
        airingAt: MONDAY_TIMESTAMP,
        timeUntilAiring: 86400,
        episode: 1,
        mediaId: id,
    },
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

describe("AiringAnimeDay", () => {
    beforeEach(() => {
        useSearchParamsMock.mockReturnValue({ get: jest.fn().mockReturnValue(null) });
    });

    it("renders all releasing animes by default (no user list)", () => {
        const animes = [
            makeAnime(1, 100, "Naruto"),
            makeAnime(2, 200, "Bleach"),
        ];
        render(<AiringAnimeDay animes={animes} />);

        expect(screen.getByText("Naruto")).toBeInTheDocument();
        expect(screen.getByText("Bleach")).toBeInTheDocument();
        expect(screen.queryByText("Todos los animes")).not.toBeInTheDocument();
    });

    it("hides the toggle when userAnimeList is null", () => {
        const animes = [makeAnime(1, 100, "Naruto")];
        render(<AiringAnimeDay animes={animes} userAnimeList={null} />);

        expect(screen.queryByText("Todos los animes")).not.toBeInTheDocument();
        expect(screen.queryByText("Animes que sigo")).not.toBeInTheDocument();
    });

    it("hides the toggle when userAnimeList is empty", () => {
        const animes = [makeAnime(1, 100, "Naruto")];
        render(<AiringAnimeDay animes={animes} userAnimeList={makeUserList([])} />);

        expect(screen.queryByText("Todos los animes")).not.toBeInTheDocument();
    });

    it("shows the toggle when userAnimeList has entries", () => {
        const animes = [makeAnime(1, 100, "Naruto")];
        render(<AiringAnimeDay animes={animes} userAnimeList={makeUserList([100])} />);

        expect(screen.getByText("Todos los animes")).toBeInTheDocument();
        expect(screen.getByText("Animes que sigo")).toBeInTheDocument();
    });

    it("filters the list to only the user's watching animes when 'mine' is selected", () => {
        const animes = [
            makeAnime(1, 100, "Naruto"),
            makeAnime(2, 200, "Bleach"),
            makeAnime(3, 300, "One Piece"),
        ];
        render(
            <AiringAnimeDay
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
            makeAnime(1, 100, "Naruto"),
            makeAnime(2, 200, "Bleach"),
        ];
        render(
            <AiringAnimeDay
                animes={animes}
                userAnimeList={makeUserList([100])}
            />,
        );

        fireEvent.click(screen.getByText("Animes que sigo"));
        expect(screen.queryByText("Bleach")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Todos los animes"));
        expect(screen.getByText("Bleach")).toBeInTheDocument();
    });

    it("shows the empty state with a 'mine' specific message when in mine mode and no matches", () => {
        const animes = [makeAnime(1, 100, "Naruto")];
        render(
            <AiringAnimeDay
                animes={animes}
                userAnimeList={makeUserList([999])}
            />,
        );

        fireEvent.click(screen.getByText("Animes que sigo"));

        expect(
            screen.getByText(/no tenés animes en emisión en tu lista/i),
        ).toBeInTheDocument();
    });

    it("renders the day pills at the top", () => {
        const animes = [makeAnime(1, 100, "Naruto")];
        render(<AiringAnimeDay animes={animes} />);

        const nav = screen.getAllByRole("link").find((link) =>
            within(link).queryByText("LUNES"),
        );
        expect(nav).toBeInTheDocument();
    });
});
