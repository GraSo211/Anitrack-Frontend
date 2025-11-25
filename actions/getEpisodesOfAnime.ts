'use server';


import { EpisodePage } from '@/types/EpisodePage';



export const getEpisodesOfAnime = async (id: number) => {
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/${id}/episodes`, {
        method: "GET",
        
    });

    const data: EpisodePage = await response.json();
    console.log(data)
    return data
};
