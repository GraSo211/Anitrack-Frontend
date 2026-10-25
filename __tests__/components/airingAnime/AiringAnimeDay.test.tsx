import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import AiringAnimeDay from "@/components/airingAnime/AiringAnimeDay";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import { useRouter, useSearchParams } from "next/navigation";
import { AIRING_DAYS, todayKey } from "@/utils/airingDays";
import { addAnimeToList } from "@/actions/anime-list/addAnimeToList";
import { modifyAnimeToList } from "@/actions/anime-list/modifyAnimeToList";

jest.mock("next/navigation", () => ({
    useSearchParams: jest.fn(),
    useRouter: jest.fn(),
}));

jest.mock("@/actions/anime-list/addAnimeToList");
jest.mock("@/actions/anime-list/modifyAnimeToList");

const mockedAdd = addAnimeToList as jest.MockedFunction<typeof addAnimeToList>;
const mockedModify =
    modifyAnimeToList as jest.MockedFunction<typeof modifyAnimeToList>;

const useSearchParamsMock = useSearchParams as jest.Mock;
const useRouterMock = useRouter as jest.Mock;

const MONDAY_TIMESTAMP = (() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }
    return Math.floor(d.getTime() / 1000);
})();

const makeAnime = (
    id: number,
    idMal: number | null,
    title: string,
    episode = 1,
): AnimeReleasing => ({
    id,
    idMal,
    title: { romaji: title, english: null },
    coverImage: { extraLarge: null, large: null, medium: null, color: null },
    nextAiringEpisode: {
        id,
        airingAt: MONDAY_TIMESTAMP,
        timeUntilAiring: 86400,
        episode,
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

const setDayParam = (value: string | null) => {
    useSearchParamsMock.mockReturnValue({
        get: jest.fn().mockReturnValue(value),
    });
};

const getActiveDayPill = () =>
    screen.getAllByRole("link").find((link) =>
        link.getAttribute("aria-current") === "page"
    );

describe("AiringAnimeDay", () => {
    beforeEach(() => {
        useRouterMock.mockReturnValue({ push: jest.fn() });
        setDayParam("lunes");
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

    it("marks the day matching the day param as active", () => {
        const animes = [makeAnime(1, 100, "Naruto")];
        render(<AiringAnimeDay animes={animes} />);

        const active = getActiveDayPill();
        expect(active).toBeInTheDocument();
        expect(within(active!).getByText("Lun")).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "Lunes" }),
        ).toBeInTheDocument();
    });

    it("defaults to today when no day param is provided", () => {
        setDayParam(null);
        const animes = [makeAnime(1, 100, "Naruto")];
        render(<AiringAnimeDay animes={animes} />);

        const active = getActiveDayPill();
        const todayShort =
            AIRING_DAYS.find((day) => day.key === todayKey())?.short ?? "";
        expect(active).toBeInTheDocument();
        expect(within(active!).getByText(todayShort)).toBeInTheDocument();
    });

    it("resolves accented and non-accented day slugs to the same day", () => {
        const animes = [makeAnime(1, 100, "Naruto")];

        setDayParam("miércoles");
        const { unmount } = render(<AiringAnimeDay animes={animes} />);
        expect(
            screen.getByRole("heading", { name: "Miércoles" }),
        ).toBeInTheDocument();
        const activeAccented = getActiveDayPill();
        expect(within(activeAccented!).getByText("Mié")).toBeInTheDocument();
        unmount();

        setDayParam("miercoles");
        render(<AiringAnimeDay animes={animes} />);
        expect(
            screen.getByRole("heading", { name: "Miércoles" }),
        ).toBeInTheDocument();
        const activePlain = getActiveDayPill();
        expect(within(activePlain!).getByText("Mié")).toBeInTheDocument();
    });

    it("navigates to the previous and next day with the arrow buttons", () => {
        const push = jest.fn();
        useRouterMock.mockReturnValue({ push });
        const animes = [makeAnime(1, 100, "Naruto")];
        render(<AiringAnimeDay animes={animes} />);

        fireEvent.click(screen.getByRole("button", { name: "Día anterior" }));
        expect(push).toHaveBeenCalledWith("/en-emision?day=domingo");

        fireEvent.click(screen.getByRole("button", { name: "Día siguiente" }));
        expect(push).toHaveBeenCalledWith("/en-emision?day=martes");
    });

    it("marks the previous episode for a followed anime without leaving the page", async () => {
        mockedAdd.mockResolvedValue({
            status: "watching",
            score: 0,
            numEpisodes: 0,
            rewatching: false,
        });
        mockedModify.mockResolvedValue({
            status: "watching",
            score: 0,
            numEpisodes: 5,
            rewatching: false,
        });
        const animes = [makeAnime(1, 100, "Naruto", 6)];
        render(
            <AiringAnimeDay
                animes={animes}
                userAnimeList={makeUserList([100])}
                isAuthenticated
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Marcar episodio 5 como visto",
            }),
        );

        await waitFor(() =>
            expect(mockedModify).toHaveBeenCalledWith(
                100,
                "watching",
                0,
                5,
            ),
        );
    });
});
