import { Episode } from "./Episode";

export type Anime = {
    id: number;
    malId: number;
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

export type AnimeCard = {
    id: number;
    malId?: number;
    title: { romaji?: string; english?: string };
    coverImage: { extraLarge?: string; large?: string; medium?: string; color?: string };
};

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
    nextAiringEpisode: {
        id: number;
        airingAt: number;
        timeUntilAiring: number;
        episode: number;
        mediaId: number;
    } | null;
    schedule?: string;
};

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

export type AnimesByName = {
    id: number;
    idMal: number;
    title: {
        romaji?: string;
        english?: string;
    };
    coverImage?: {
        extraLarge?: string;
        large?: string;
        medium?: string;
        color?: string;
    };
};

export type AnimeList = {
  animeList: AnimeItem[];
};

export type AnimeItem = {
  id: number;
  title: string;
  mainPicture: Picture;
  status: Status;
  score: number;
  episodesWatched: number | null;
  isRewatching: boolean;
};

export type Picture = {
  medium: string;
  large: string;
};

export type Status =
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch";



export type AnimeStatus = {
  status: Status|null;
  score: number;
  numEpisodes: number;
  rewatching: boolean;
};

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