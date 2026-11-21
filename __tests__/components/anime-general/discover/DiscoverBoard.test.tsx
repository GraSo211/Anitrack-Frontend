import { fireEvent, render, screen } from "@testing-library/react";
import DiscoverBoard from "@/components/anime-general/discover/DiscoverBoard";
import { AnimeCard } from "@/types/anime/Anime";

const makeCard = (id: number, title: string, averageScore: number): AnimeCard => ({
    id,
    title: { romaji: title, english: title },
    coverImage: {},
    format: "TV",
    averageScore,
    genres: ["Action"],
    description: `Sinopsis de ${title}`,
    bannerImage: null,
});

const popular = [
    makeCard(1, "Popular Uno", 90),
    makeCard(2, "Popular Dos", 85),
    makeCard(3, "Popular Tres", 80),
];

const topRated = [makeCard(4, "Mejor Uno", 95), makeCard(5, "Mejor Dos", 94)];

describe("DiscoverBoard", () => {
    it("cambia el hero al seleccionar una fila del ranking", () => {
        render(<DiscoverBoard popular={popular} topRated={topRated} />);

        expect(screen.getByRole("heading", { level: 3, name: "Popular Uno" })).toBeInTheDocument();
        expect(screen.getByText("#1 Destacado")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /Popular Tres/ }));

        expect(screen.getByRole("heading", { level: 3, name: "Popular Tres" })).toBeInTheDocument();
        expect(screen.getByText("#3 Destacado")).toBeInTheDocument();
        expect(screen.getByText("Sinopsis de Popular Tres")).toBeInTheDocument();
    });

    it("vuelve al primer anime al cambiar de tab", () => {
        render(<DiscoverBoard popular={popular} topRated={topRated} />);

        fireEvent.click(screen.getByRole("button", { name: /Popular Dos/ }));
        fireEvent.click(screen.getByRole("tab", { name: /Mejores Valorados/ }));

        expect(screen.getByRole("heading", { level: 3, name: "Mejor Uno" })).toBeInTheDocument();
        expect(screen.getByText("#1 Destacado")).toBeInTheDocument();
        expect(screen.queryByText("Popular Dos")).not.toBeInTheDocument();
    });

    it("usa el tab con datos si la lista popular está vacía", () => {
        render(<DiscoverBoard popular={[]} topRated={topRated} />);

        expect(screen.getByRole("heading", { level: 3, name: "Mejor Uno" })).toBeInTheDocument();
    });
});
