"use server";

import { HeroImage } from "@/types/admin/HeroImage";

export const getHeroImages = async (): Promise<HeroImage[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/hero-images`, {
            method: "GET",
            next: {
                revalidate: 60,
            },
        });
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data: HeroImage[] = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo de fetch getHeroImages:", error);
        return null;
    }
};
