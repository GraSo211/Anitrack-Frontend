export type Anime = {
    id: number;
    title: {
        romaji: string;
    };
    description: string;
    coverImage: {
        large: string;
    };
    airingSchedule: {
        nodes: {
            episode: number;
            airingAt: number;
        }[];
    };
    schedule: string;
};
