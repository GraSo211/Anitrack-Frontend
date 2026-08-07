"use server";

import { cookies } from "next/headers";

export const removeAdminUser = async (username: string): Promise<boolean | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }

    try {
        const token = (await cookies()).get("access_token")?.value;
        if (!token) {
            console.error("No hay access_token para eliminar administrador");
            return null;
        }

        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/users/${encodeURIComponent(username)}`, {
            method: "DELETE",
            headers: {
                "Cookie": `access_token=${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Fallo de fetch removeAdminUser:", error);
        return null;
    }
};
