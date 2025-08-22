"use server";

import { Anime } from "@/types/Anime";
import { AnimeResponse } from "@/types/AnimeResponse";

export const getReleasingAnimes = async () => {
    const url = "https://graphql.anilist.co";
    let allAnime: Anime[] = [];
    let page = 1;
    let lastPage = 1;

    const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          lastPage
        }
        media(type: ANIME, status: RELEASING, isAdult: false) {
          id
          title {
            romaji
          }
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
  `;

    try {
        do {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query,
                    variables: { page, perPage: 50 },
                }),
                cache: "force-cache",
                next: {
                    revalidate: 86400, // 24 hours
                }
            });

            const res = await response.json();

            const data = res.data.Page;

            allAnime = allAnime.concat(data.media);
            lastPage = data.pageInfo.lastPage;
            page++;
        } while (page <= lastPage);

        return allAnime;
    } catch (error) {
        console.error("Error fetching animes:", error);
        return [];
    }
};
