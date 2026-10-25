"use client";


import React from "react";

export default function LoginForm() {

    const handleMALLogin = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/mal/url`, {
            credentials: "include"
        });

        const data = await response.json();

        window.location.href = data.url;
    };

    return (
        <div className="flex flex-col items-center gap-6">


            {/* Login MAL */}
            <div className="flex flex-col items-center gap-2 w-full max-w-sm">

                <p className="text-sm text-text-secondary text-center">
                    Inicia sesión con tu cuenta de MyAnimeList
                </p>

                <button
                    className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md
      bg-[#2e51a2] hover:bg-[#1f3f8a] text-white font-semibold transition shadow-md"
                    onClick={handleMALLogin}
                >

                    <img
                        src="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
                        height={256}
                        width={256}
                        alt="MyAnimeList"
                        className="w-5 h-5 rounded-sm"
                    />

                    Iniciar sesión con MyAnimeList
                </button>

            </div>

        </div>

    );
}
