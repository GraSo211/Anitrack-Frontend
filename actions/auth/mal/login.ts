"use client";
import { MALLogin } from "@/types/MALLogin";

export const loginWithMAL = async () => {
       if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/mal/url`, {
            method: "GET",
            credentials: "include"
        });
        const data: MALLogin = await response.json();
        return data;
    }
    catch (error) {
        throw new Error("Error al iniciar sesión con MAL: " + error);
    }
};
