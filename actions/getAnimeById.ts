"use server";
export const getAnimeById = async (id: number) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/${id}`, {
        method: "GET",
        next: {
            revalidate: 86400, // 1 día
        },
    });

    const data = await response.json();

    return data;
};
