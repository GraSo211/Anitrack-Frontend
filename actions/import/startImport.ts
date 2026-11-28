"use server";

import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { ImportJobView } from "@/types/import";

export const startImport = async (jobId: string, overwriteMalIds: number[], excludedMalIds: number[] = []): Promise<ImportJobView | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) {
            console.error("No hay access_token para iniciar importación");
            return null;
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/import/${jobId}/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `access_token=${token}`,
            },
            body: JSON.stringify({ overwriteMalIds, excludedMalIds }),
        });

        if (response.status === 401) {
            redirect("/iniciar-sesion");
        }

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: ImportJobView = await response.json();
        return data;
    } catch (error) {
        unstable_rethrow(error);
        console.error("Fallo de fetch startImport:", error);
        return null;
    }
};
