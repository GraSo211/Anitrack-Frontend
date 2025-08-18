import { AnimeResponse } from "@/types/AnimeResponse";

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
            id
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

  const data: AnimeResponse = await response.json();
  return data;
};
