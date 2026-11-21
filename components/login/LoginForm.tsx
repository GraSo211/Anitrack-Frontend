"use client";

import React, { useState } from "react";
import Button from "@/components/general-components/Button";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMALLogin = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/mal/url`, {
                credentials: "include"
            });

            if (!response.ok) throw new Error(`MAL auth url failed: ${response.status}`);

            const data = await response.json();
            if (!data?.url) throw new Error("MAL auth url missing");

            window.location.href = data.url;
        } catch (err) {
            console.error("Login error:", err);
            setError("No pudimos iniciar sesión. Intentá de nuevo.");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">

            {/* Login MAL */}
            <div className="flex flex-col items-center gap-2 w-full max-w-sm">

                <p className="text-sm text-text-secondary text-center">
                    Inicia sesión con tu cuenta de MyAnimeList
                </p>

                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    isLoading={isLoading}
                    onClick={handleMALLogin}
                    leftIcon={
                        <img
                            src="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                            height={256}
                            width={256}
                            alt="MyAnimeList"
                            className="w-5 h-5 rounded-sm"
                        />
                    }
                >
                    Iniciar sesión con MyAnimeList
                </Button>

                {error && (
                    <p role="alert" className="text-sm text-status-error text-center">
                        {error}
                    </p>
                )}

            </div>

        </div>

    );
}
