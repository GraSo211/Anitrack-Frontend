"use server";
export const getAnimeById = async (id: number) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/${id}`, {
        method: "GET",
    });

    const data = await response.json();

    return data; 
};
