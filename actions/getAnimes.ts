"use server";

import { AnimesResponse } from "@/types/AnimesResponse";

type Anime = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
};
const getActualSeason=()=>{
  const month = new Date().getMonth()+1;
  if(month>=3&&month<=5)return "SPRING";
  if(month>=6&&month<=8)return "SUMMER";
  if(month>=9&&month<=11)return "FALL";
  return "WINTER";
}


export const getAnimes = async () => {
    const url = "https://graphql.anilist.co";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query {
                      Page(page: 1, perPage: 100) {
                        media(
                          type: ANIME,
                          status: RELEASING,
                          
                          season: ${getActualSeason()},   # Temporada actual (SUMMER, SPRING, FALL, WINTER)
                          seasonYear: ${new Date().getFullYear()}  # Año actual
                        ) {
                          id
                          title {
                            romaji
                          }
                          
                          description
                          coverImage {
                            large
                          }
                          airingSchedule(notYetAired: true, perPage: 1) {
                            nodes {
                              episode
                              airingAt
                            }
      }
                        }
                      }
                    }
    `,
            }),
        });
        const data: AnimesResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching animes:", error);
    }
};
