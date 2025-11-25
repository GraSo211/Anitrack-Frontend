export const getTopSeasonAnime = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/topSeasonAnime`);

    const data = await response.json();
    return data;
};
