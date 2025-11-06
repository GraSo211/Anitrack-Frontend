import React from "react";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-800 bg-black/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm text-gray-400">
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
