"use server";
export const getTopSeasonAnime = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/topSeasonAnime`,
        {
            next: {
            revalidate: 604800, // 1 week in seconds
        },
        }
        
    );

    const data = await response.json();
    return data;
};
