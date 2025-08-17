export type Anime = {
    id: number;
    title: {
        romaji: string;
    };
    description: string;
    coverImage: {
        extraLarge?: string;
        large: string;
    };
    bannerImage: string;
    airingSchedule?: {
        nodes?: {
            episode: number;
            airingAt: number;
        }[];
    };
    schedule?: string;
};
