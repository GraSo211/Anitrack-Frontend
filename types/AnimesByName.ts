export type AnimesByName={
    id: number;
    idMal: number;
    title:{
        romaji?: string;
        english?: string;
    }
    coverImage?:{
        extraLarge?: string;
        large?: string;
        medium?: string;
        color?: string;
    };
    
}