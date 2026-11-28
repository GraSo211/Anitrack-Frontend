"use server";

import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { Candidate } from "@/types/import";

export const searchMalAnime = async (query: string): Promise<Candidate[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) {
            console.error("No hay access_token para buscar anime");
            return null;
        }

        const params = new URLSearchParams();
        if (query) params.append("q", query);

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/import/search?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `access_token=${token}`,
            },
        });

        if (response.status === 401) {
            redirect("/iniciar-sesion");
        }

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: { results: Candidate[] } = await response.json();
        return data.results;
    } catch (error) {
        unstable_rethrow(error);
        console.error("Fallo de fetch searchMalAnime:", error);
        return null;
    }
};
