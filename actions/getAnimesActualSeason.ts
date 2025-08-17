"use server";

import { AnimesResponse } from "@/types/AnimesResponse";
import { getActualSeason } from "@/utils/getActualSeason";




export const getAnimesActualSeason = async () => {
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
