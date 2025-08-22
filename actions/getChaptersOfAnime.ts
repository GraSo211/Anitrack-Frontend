'use server';

export const getChaptersOfAnime = async (id: number) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        
    });

    const data = await response.json();

    return data.data;
};
