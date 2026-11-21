import React from "react";

export default function Footer() {
    return (
        <footer className="mt-3 lg:mt-6 border-t border-border-default bg-bg-secondary/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-tertiary">
                    <span>
                        © {new Date().getFullYear()} AniTrack
                    </span>

                    <nav aria-label="Créditos y atribuciones">
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                            <span>Parte de: GraSo EcoSystem</span>
                            <span>Hecho por GraSo Studios</span>
                        </div>
                    </nav>

                    <span className="hidden sm:block">
                        Datos provistos por MyAnimeList y AniList
                    </span>
                </div>
            </div>
        </footer>
    );
}
