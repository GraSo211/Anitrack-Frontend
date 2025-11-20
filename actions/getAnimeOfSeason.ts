import { getActualSeason } from "@/utils/getActualSeason";


export const getAnimeOfSeason = async () => {
    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        query{
            Page(perPage: 10) {
                media(
                type: ANIME
                season: ${getActualSeason()}
                seasonYear: ${new Date().getFullYear()}
                sort: POPULARITY_DESC
                ) {
                title {
                    romaji
                    english
                }
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                bannerImage
                popularity
                averageScore
                siteUrl
                }
            }
            }
        `,
        }),
    });

    const data = await response.json();
    const animes = data.data.Page.media;
    for(const anime of animes){
        if(anime.bannerImage !== null){
            return anime;
        }
    }
    
};
