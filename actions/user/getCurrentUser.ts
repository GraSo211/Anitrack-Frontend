"use server";

import { redirect, unstable_rethrow } from "next/navigation";
import { User } from "@/types/user/User";

export const getCurrentUser = async (token: string): Promise<User | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `access_token=${token}`,
            },
            cache: "no-store",
        });

        if (response.status === 401) {
            redirect("/iniciar-sesion");
        }

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data: User = await response.json();

        return data;
    } catch (error) {
        unstable_rethrow(error);
        console.error("Fallo de fetch getCurrentUser:", error);
        return null;
    }
};
