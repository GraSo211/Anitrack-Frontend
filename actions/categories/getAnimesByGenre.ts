"use server";

import { AnimesResponse } from "@/types/AnimesResponse";

export const getAnimesByGenre = async (cantidad: number, genre: string) => {
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
                        genre_in: "${genre}"
                        sort: POPULARITY_DESC
                        ) {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            extraLarge
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
    const data: AnimesResponse = await response.json();

    return data.data.Page.media;
};
