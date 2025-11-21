"use server";

import { AnimesResponse } from "@/types/AnimesResponse";


export const getUpcomingAnimeReleases = async (cantidad: number) => {
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
                        type: ANIME
                        status: NOT_YET_RELEASED
                        sort: POPULARITY_DESC
                        ) {
                        id
                        title {
                            romaji
                            english
                        }
                        bannerImage
                        coverImage {
                            extraLarge
                            large
                        }
                        season
                        seasonYear
                        format
                        episodes
                        description
                        popularity
                        }
                    }
                }
            `,
        }),
    });
    const data: AnimesResponse = await response.json();

    return data.data.Page.media;
};
