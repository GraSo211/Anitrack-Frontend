import { AnimeResponse } from "@/types/AnimeResponse";
import { getChaptersOfAnime } from "./getChaptersOfAnime";

export const getAnimeById = async (id: number) => {
    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        query {
          Media(id: ${id}) {
            idMal
            title {
              romaji
            }
            coverImage {
              extraLarge
              large
            }
            description
            bannerImage
            episodes
            startDate {
              year
              month
              day
            }
            duration
            isAdult
            genres
            averageScore
            popularity
            source
            status
            nextAiringEpisode {
              airingAt
              id
              episode
            }
          }
        }
              `,
        }),
    });

    const data = await response.json();

    const episodes = await getChaptersOfAnime(data.data.Media.idMal);
    
    data.data.Episodes = episodes;
    console.log(data.data.Episodes)
    return data.data;
};
