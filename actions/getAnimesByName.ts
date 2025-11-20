import { getChaptersOfAnime } from "./getChaptersOfAnime";
import { Episode } from "@/types/Episode";

export const getAnimesByName = async (name: string) => {
    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
       query {
        Page(perPage: 5) {
          media(search: "${name}", type: ANIME) {
            id
            idMal
            title {
              romaji
              english
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
      }

              `,
        }),
    });

    const data = await response.json();

    return data.data;
};
