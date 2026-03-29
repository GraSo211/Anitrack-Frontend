export type Episode ={
        malId: number;
        title: string;
        filler: boolean;
        recap: boolean;
}

export type EpisodePage = {
    items: Episode[];
    lastPage: number;
    hasNext: boolean;
}