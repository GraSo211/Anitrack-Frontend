"use server";
export const getBannerImageFromAnimeOfSeason = async (): Promise<string | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/bannerImageAnimeOfSeason`, {
            next: {
                revalidate: 604800, // 1 week in seconds
            },
        });
        if (response.status === 204) return null;
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data = await response.json();
        return data.link ?? null;
    } catch (error) {
        console.error("Fallo de fetch getBannerImageFromAnimeOfSeason:", error);
        return null;
    }
};
