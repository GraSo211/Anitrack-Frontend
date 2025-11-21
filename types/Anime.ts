export type Anime = {
    id: number;
    idMal: number;
    title: {
        romaji: string;
        english?: string;
        native?: string;
    };
    description: string;
    coverImage: {
        large: string;
        extraLarge: string;
    };
    bannerImage: string;
    meanScore: number;
    airingSchedule: {
        nodes: {
            episode: number;
            airingAt: number;
        }[];
    };
    schedule?: string;
    episodes: number;
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    duration: number;
    isAdult: boolean;
    genres: string[];
    averageScore: number;
    popularity: number;
    source: string;
    status: string;
    nextAiringEpisode: {
        airingAt: number;
        id: number;
        episode: number;
    };
};
