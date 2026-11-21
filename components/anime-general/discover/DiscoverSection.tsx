import { getMostPopularAnimes } from "@/actions/animes/categories/getMostPopularAnimes";
import { getMostValoratedAnimes } from "@/actions/animes/categories/getMostValoratedAnimes";
import { AnimeCard } from "@/types/anime/Anime";
import DiscoverBoard from "./DiscoverBoard";

export default async function DiscoverSection() {
    const popular: AnimeCard[] | null = await getMostPopularAnimes(10);
    const topRated: AnimeCard[] | null = await getMostValoratedAnimes(10);

    if (!popular?.length && !topRated?.length) {
        return null;
    }

    return <DiscoverBoard popular={popular ?? []} topRated={topRated ?? []} />;
}
