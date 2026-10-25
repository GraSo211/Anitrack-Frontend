"use client";
import React from "react";
import Episodes from "@/components/anime-general/info/Episodes";
import { useAnimeStatus } from "./AnimeStatusContext";

export default function EpisodesPanel() {
    const { total, watched, consecutive, toggleEpisode, toggleConsecutive } = useAnimeStatus();

    if (total <= 0) return null;

    return (
        <section className="mt-6 w-full">
            <div className="flex items-center justify-between gap-4 mb-2">
                <h2 className="text-2xl font-bold text-text-primary">Episodios</h2>

                <button
                    onClick={toggleConsecutive}
                    aria-pressed={consecutive}
                    aria-label={consecutive ? "Modo consecutivo activo" : "Modo consecutivo inactivo"}
                    className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 rounded-full"
                >
                    <span className={`w-10 h-5 rounded-full relative transition ${consecutive ? "bg-accent-primary" : "bg-bg-tertiary"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-text-primary transition ${consecutive ? "left-5" : "left-0.5"}`} />
                    </span>
                    <span className="text-xs text-text-secondary">Modo consecutivo</span>
                </button>
            </div>

            <ul>
                {Array.from({ length: total }, (_, i) => (
                    <Episodes
                        key={i + 1}
                        episodeNumber={i + 1}
                        watched={watched[i] ?? false}
                        onToggle={() => toggleEpisode(i + 1)}
                    />
                ))}
            </ul>
        </section>
    );
}
