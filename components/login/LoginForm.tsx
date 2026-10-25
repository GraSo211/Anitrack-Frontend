"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleMALLogin = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/mal/url`, {
                credentials: "include"
            });

            const data = await response.json();

            window.location.href = data.url;
        } finally {
            // Keep loading state while redirecting; no need to reset.
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">

            {/* Login MAL */}
            <div className="flex flex-col items-center gap-2 w-full max-w-sm">

                <p className="text-sm text-text-secondary text-center">
                    Inicia sesión con tu cuenta de MyAnimeList
                </p>

                <button
                    type="button"
                    disabled={isLoading}
                    className={clsx(
                        "w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md",
                        "bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold",
                        "transition shadow-md",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50",
                        "disabled:opacity-60 disabled:cursor-not-allowed"
                    )}
                    onClick={handleMALLogin}
                >

                    <img
                        src="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                        height={256}
                        width={256}
                        alt="MyAnimeList"
                        className="w-5 h-5 rounded-sm"
                    />

                    {isLoading ? "Cargando..." : "Iniciar sesión con MyAnimeList"}
                </button>

            </div>

        </div>

    );
}
