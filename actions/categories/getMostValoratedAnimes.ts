"use server";

import { AnimesResponse } from "@/types/AnimesResponse";


export const getMostValoratedAnimes = async (cantidad: number) => {
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
                        sort: SCORE_DESC
                        format_in: [TV, MOVIE]
                        ) {
                        id
                        title {
                            romaji
                            english
                        }
                        meanScore
                        popularity
                        bannerImage
                        coverImage {
                            extraLarge
                        }
                        episodes
                        status
                        description
                        }
                    }
                    }

            `,
        }),
    });
    const data: AnimesResponse = await response.json();

    return data.data.Page.media;
};
