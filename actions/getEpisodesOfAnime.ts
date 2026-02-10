'use server';


import { EpisodePage } from '@/types/EpisodePage';



export const getEpisodesOfAnime = async (id: number) : Promise<EpisodePage | null> => {
    
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/${id}/episodes`, {
            method: "GET",
            
        });

        if (!response.ok) {
            console.error(`Error al obtener los episodios del anime con id ${id}, status: ${response.status}`);
            return null;
        }

        const data: EpisodePage = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo de fetch getEpisodesOfAnime:", error);
        return null;
    }
};
