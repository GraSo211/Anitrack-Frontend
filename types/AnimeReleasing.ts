export type AnimeReleasing = {
    id: number;
    idMal?: number | null;
    title: {
        romaji?: string | null;
        english?: string | null;
    };
    coverImage: {
        extraLarge?: string | null;
        large?: string | null;
        medium?: string | null;
        color?: string | null;
    };
    nextAiringEpisode:{
        id: number;
        airingAt: number;
        timeUntilAiring: number;
        episode: number;
        mediaId: number;
    } | null;
    schedule?: string;
}