"use server";

import { Tag } from "@/types/Tag";

export const getAllTags = async (): Promise<Tag[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/allTags`, {
            method: "GET",
            next: {
                revalidate: 86400 * 7 * 4 , // 1 día * 7 días * 4 semanas = 1 mes
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data = await response.json();


        return data as Tag[];
    } catch (error) {
        console.error("Fallo de fetch getAllTags:", error);
        return null;
    }
};
