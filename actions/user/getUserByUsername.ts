"use server";

import {UserJikan} from "@/types/user/User";



export const getUserByUsername = async (username: string): Promise<UserJikan | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    const url = `${process.env.BACKEND_URL}/api/v1/users/${username}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data: UserJikan = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
