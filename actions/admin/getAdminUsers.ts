"use server";

import { AdminUser } from "@/types/admin/AdminUser";
import { cookies } from "next/headers";

export const getAdminUsers = async (): Promise<AdminUser[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) {
            console.error("No hay access_token para listar administradores");
            return null;
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/users`, {
            method: "GET",
            headers: {
                "Cookie": `access_token=${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: AdminUser[] = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo de fetch getAdminUsers:", error);
        return null;
    }
};
