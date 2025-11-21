import { getActualSeason } from "@/utils/getActualSeason";

export const getAnimePopularScoreSeason = async () => {
    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query{
                topScored: Page(perPage: 5) {
                    media(
                    season: ${getActualSeason()}
                    seasonYear: ${new Date().getFullYear()}
                    type: ANIME
                    sort: SCORE_DESC
                    ) {
                    id
                    title {
                        romaji
                        english
                    }
                    bannerImage
                    meanScore
                    popularity
                    }
                }

                topPopular: Page(perPage: 5) {
                    media(
                    season: ${getActualSeason()}
                    seasonYear: ${new Date().getFullYear()}
                    type: ANIME
                    sort: POPULARITY_DESC
                    ) {
                    id
                    title {
                        romaji
                        english
                    }
                    bannerImage
                    meanScore
                    popularity
                    }
                }

                }
        `,
        }),
    });

    const data = await response.json();
    const scored = data.data.topScored.media;
    const popular = data.data.topPopular.media;
    const combined = [...scored, ...popular]
    .filter(a => a.bannerImage)
    .sort((a, b) => b.meanScore - a.meanScore || b.popularity - a.popularity);
    return combined[0] || null;
};
