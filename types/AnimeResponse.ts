import { Anime } from "./Anime";

export type AnimeResponse = {
    Media: Anime;
    Page: {
        airingSchedules: Array<{
            episode: number;
            airingAt: number;
            media: {
                id: number;
                title: {
                    romaji: string;
                    english: string;
                };
            };
        }>;
    };
    Episodes: Array<{
        mal_id: number;
        title: string;
        aired: string;
        score: number;
        duration: number;
    }>;
};
