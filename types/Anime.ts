export type Anime = {
    id: number;
    idMal: number;
    title: {
        romaji?: string;
        english?: string;
    };
    status?: string;
    description?: string;
    startDate?: {
        year?: number;
        month?: number;
        day?: number;
    };
    endDate?: {
        year?: number;
        month?: number;
        day?: number;
    };
    season?: string;
    seasonYear?: number;
    episodes?: number;
    duration?: number;
    countryOfOrigin?: string;
    source?: string;
    trailer?: {
        id?: number;
        site?: string;
        thumbnail?: string;
    };
    coverImage?: {
        extraLarge?: string;
        large?: string;
        medium?: string;
        color?: string;
    };
    bannerImage?: string;
    genres: string[];
    synonyms: string[];
    averageScore?: number;
    popularity?: number;
    relations?: {
        items: {
            relatedMediaId: number;
            relatedTitle: string;
            relatedImage: string;
        }[];
        empty: boolean;
    };
    studio?: string;
    isAdult?: boolean;
    nextAiringEpisode?: {
        id?: number;
        airingAt?: number;
        timeUntilAiring?: number;
        episode?: number;
        mediaId?: number;
    };
};
