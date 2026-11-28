"use server";

import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { ImportJobView } from "@/types/import";

export const cancelImport = async (jobId: string): Promise<ImportJobView | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) {
            console.error("No hay access_token para cancelar importación");
            return null;
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/import/${jobId}/cancel`, {
            method: "POST",
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

        const data: ImportJobView = await response.json();
        return data;
    } catch (error) {
        unstable_rethrow(error);
        console.error("Fallo de fetch cancelImport:", error);
        return null;
    }
};
