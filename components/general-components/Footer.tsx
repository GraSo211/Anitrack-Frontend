import React from "react";

export default function Footer() {
    return (
        <footer className="mt-3 lg:mt-6 border-t border-border-default bg-bg-secondary/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm text-text-tertiary">
                {/* Left */}
                <span>
                    © {new Date().getFullYear()} AniTrack
                </span>

                {/* Right */}
                <span className="hidden sm:block">
                    Datos provistos por MyAnimeList y AniList
                </span>
            </div>
        </footer>
    );
}
