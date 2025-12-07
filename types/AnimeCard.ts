export type AnimeCard = {
    id: number;
    malId?: number;
    title:{romaji?: string, english?: string};
    coverImage: {extraLarge?: string, large?: string, medium?: string, color?: string };

}