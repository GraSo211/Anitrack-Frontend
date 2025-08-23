import { Anime } from "./Anime";
import { Episode } from "./Episode";

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
    Episodes: Array<Episode>;
};
