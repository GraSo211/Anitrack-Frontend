
export const getBannerImageFromAnimeOfSeason = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/bannerImageAnimeOfSeason`);

    const data = await response.json();
    return data.link;
    
};
