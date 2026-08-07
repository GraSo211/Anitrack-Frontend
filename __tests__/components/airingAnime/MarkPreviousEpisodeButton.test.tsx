import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MarkPreviousEpisodeButton from "@/components/airingAnime/MarkPreviousEpisodeButton";
import { addAnimeToList } from "@/actions/anime-list/addAnimeToList";
import { modifyAnimeToList } from "@/actions/anime-list/modifyAnimeToList";

jest.mock("@/actions/anime-list/addAnimeToList");
jest.mock("@/actions/anime-list/modifyAnimeToList");

const mockedAdd = addAnimeToList as jest.MockedFunction<typeof addAnimeToList>;
const mockedModify =
    modifyAnimeToList as jest.MockedFunction<typeof modifyAnimeToList>;

describe("MarkPreviousEpisodeButton", () => {
    beforeEach(() => {
        jest.clearAllMocks();
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
    });

    it("renders nothing without a token", () => {
        render(
            <MarkPreviousEpisodeButton
                idMal={100}
                inList={false}
                status="watching"
                score={0}
                nextEpisode={6}
            />,
        );

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders nothing when there is no previous episode", () => {
        render(
            <MarkPreviousEpisodeButton
                token="token"
                idMal={100}
                inList={false}
                status="watching"
                score={0}
                nextEpisode={1}
            />,
        );

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders nothing when idMal is missing", () => {
        render(
            <MarkPreviousEpisodeButton
                token="token"
                idMal={null}
                inList={false}
                status="watching"
                score={0}
                nextEpisode={6}
            />,
        );

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("marks the previous episode for an anime already in the list", async () => {
        render(
            <MarkPreviousEpisodeButton
                token="token"
                idMal={100}
                inList
                episodesWatched={3}
                status="watching"
                score={7}
                nextEpisode={6}
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Marcar episodio 5 como visto",
            }),
        );

        await waitFor(() =>
            expect(mockedModify).toHaveBeenCalledWith(
                "token",
                100,
                "watching",
                7,
                5,
            ),
        );
        expect(mockedAdd).not.toHaveBeenCalled();
        expect(
            screen.getByRole("button", {
                name: "Al día con el episodio 5",
            }),
        ).toBeDisabled();
    });

    it("adds to the list first when the anime is not followed", async () => {
        render(
            <MarkPreviousEpisodeButton
                token="token"
                idMal={200}
                inList={false}
                status="watching"
                score={0}
                nextEpisode={6}
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Marcar episodio 5 como visto",
            }),
        );

        await waitFor(() =>
            expect(mockedAdd).toHaveBeenCalledWith("token", 200),
        );
        expect(mockedModify).toHaveBeenCalledWith("token", 200, "watching", 0, 5);
    });

    it("is disabled when already up to date", () => {
        render(
            <MarkPreviousEpisodeButton
                token="token"
                idMal={100}
                inList
                episodesWatched={5}
                status="watching"
                score={0}
                nextEpisode={6}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: "Al día con el episodio 5",
            }),
        ).toBeDisabled();
    });
});
