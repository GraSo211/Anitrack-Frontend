import { Episode } from "./Episode";

export type EpisodePage = {
    items: Episode[];
    lastPage: number;
    hasNext: boolean;
}