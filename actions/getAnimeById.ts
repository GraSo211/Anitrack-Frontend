import { AnimeResponse } from "@/types/AnimeResponse";
import { getChaptersOfAnime } from "./getChaptersOfAnime";
import { Episode } from "@/types/Episode";

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

    const episodes: Episode[] = await getChaptersOfAnime(data.data.Media.idMal);
    const cantEpisodes = data.data.Media.nextAiringEpisode.episode-1;
    console.log(data.data.Media.nextAiringEpisode.episode-1, episodes.length);
    for (let i = episodes.length+1; i <= cantEpisodes; i++) {
        episodes.push({
          mal_id: i,
          title: "Desconocido",
          aired: "",
          score: "N.NN",
          duration: 0
        })
    }
    data.data.Episodes = episodes;
    
    return data.data;
};
