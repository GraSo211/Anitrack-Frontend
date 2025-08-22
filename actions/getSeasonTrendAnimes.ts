"use server";

import { AnimesResponse } from "@/types/AnimesResponse";
import { getActualSeason } from "@/utils/getActualSeason";


export const getSeasonTrendAnimes = async (cantidad: number) => {
    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query {
                    Page(perPage: ${cantidad}) {
                        media(
                        season: ${getActualSeason()}
                        seasonYear: ${new Date().getFullYear()}
                        type: ANIME
                        sort: POPULARITY_DESC
                        ) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                        
                        }
                    }
                }

            `,
        }),
    });
    const data: AnimesResponse = await response.json();
    
    return data.data.Page.media;
};
