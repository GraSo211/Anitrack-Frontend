"use server";

import { cookies } from "next/headers";

export const postImagesHero = async (images: File[]): Promise<string[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) {
            console.error("No hay access_token para subir imágenes del hero");
            return null;
        }

        const formData = new FormData();
        images.forEach((image) => {
            formData.append("images", image);
        });

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/hero-images`, {
            method: "POST",
            body: formData,
            headers: {
                "Cookie": `access_token=${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: { images: string[] } = await response.json();
        return data.images;
    } catch (error) {
        console.error("Fallo de fetch postImagesHero:", error);
        return null;
    }
};
