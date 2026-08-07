"use server";

import { cookies } from "next/headers";

export const addAdminUser = async (username: string): Promise<boolean | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) {
            console.error("No hay access_token para agregar administrador");
            return null;
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `access_token=${token}`,
            },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Fallo de fetch addAdminUser:", error);
        return null;
    }
};
