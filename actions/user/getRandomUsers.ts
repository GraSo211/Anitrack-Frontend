"use server";

import { UserRandom } from "@/types/user/User";



export const getRandomUsers = async (): Promise<UserRandom[] | null> => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    const url = `${process.env.BACKEND_URL}/api/v1/users/random`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data: UserRandom[] = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
