import LoginForm from "@/components/login/LoginForm";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Iniciar sesión",
    description: "Iniciá sesión con tu cuenta de MyAnimeList y sincronizá tu lista de animes con Anitrack para seguir tu progreso desde cualquier dispositivo.",
    alternates: { canonical: "/iniciar-sesion" },
    robots: { index: false, follow: true },
};

export default function page() {
    return <div className="w-full flex justify-center items-center py-10">
        <LoginForm></LoginForm>
    </div>;
}
