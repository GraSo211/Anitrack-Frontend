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
    return (
        <div className="min-h-[calc(100dvh-var(--header-height))] w-full flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-border-default bg-bg-secondary p-8 shadow-xl">
                <LoginForm />
            </div>
        </div>
    );
}
