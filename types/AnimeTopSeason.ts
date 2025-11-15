export type AnimeTopSeason = {
    id: number;
    title: {
        romaji: string;
        english: string | null;
    }
    bannerImage: string | null;
    averageScore: number | null;
    popularity: number;
}