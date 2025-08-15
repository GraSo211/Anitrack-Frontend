"use server";
type Anime = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
};

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
                          
                          season: SUMMER,   # Temporada actual (SUMMER, SPRING, FALL, WINTER)
                          seasonYear: 2025  # Año actual
                        ) {
                          id
                          title {
                            romaji
                          }
                          startDate {
                            year
                            month
                            day
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
        const data = await response.json();
        console.log(data);
        console.log("gollaa");
        return data;
    } catch (error) {
        console.error("Error fetching animes:", error);
    }
};
