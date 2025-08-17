"use server";

import { AnimesResponse } from "@/types/AnimesResponse";


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
                        season: SUMMER
                        seasonYear: 2025
                        type: ANIME
                        sort: TRENDING_DESC
                        ) {
                        id
                        title {
                            romaji
                        }
                        coverImage {
                            large
                        }
                        trending
                        }
                    }
                }

            `,
        }),
    });
    const data: AnimesResponse = await response.json();
    
    return data;
};
