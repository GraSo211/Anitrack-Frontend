"use client";
import { useEffect, useState } from "react";
import { useAnimeStatus } from "./AnimeStatusContext";
import { Status } from "@/types/anime/Anime";
import { FaStar } from "react-icons/fa";
import Button from "@/components/general-components/Button";

const STATUS_LABELS: Record<Status, string> = {
    watching: "Viendo",
    completed: "Completado",
    on_hold: "En pausa",
    dropped: "Abandonado",
    plan_to_watch: "Pendiente",
};

const selectBase =
    "bg-bg-tertiary border border-border-default text-text-primary text-sm rounded px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 cursor-pointer";

export default function AnimeStatusControls() {
    const { status, score, numEpisodes, loading, total, handleAdd, sync } = useAnimeStatus();
    const [episodeDraft, setEpisodeDraft] = useState(String(numEpisodes));

    useEffect(() => {
        setEpisodeDraft(String(numEpisodes));
    }, [numEpisodes]);

    const commitEpisodes = () => {
        const parsed = parseInt(episodeDraft, 10);
        let clamped = Number.isNaN(parsed) ? 0 : parsed;
        clamped = Math.max(clamped, 0);
        if (total > 0) clamped = Math.min(clamped, total);

        setEpisodeDraft(String(clamped));
        if (status && clamped !== numEpisodes) sync(status, score, clamped);
    };

    if (!status) {
        return (
            <div className="flex items-center gap-3 bg-bg-secondary border border-border-default rounded-xl px-4 py-3 w-fit">
                <Button variant="primary" size="sm" onClick={handleAdd} disabled={loading}>
                    Agregar a la lista
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-3 bg-bg-secondary border border-border-default rounded-xl px-4 py-3 w-fit">
            <div className="flex items-center gap-2 bg-bg-tertiary border border-border-default px-3 py-1.5 rounded-lg">
                <span className="text-sm text-text-secondary">Estado</span>
                <select
                    value={status}
                    onChange={(e) => {
                        const newStatus = e.target.value as Status;
                        sync(newStatus, score, numEpisodes);
                    }}
                    aria-label="Estado del anime"
                    className={selectBase}
                >
                    {(Object.keys(STATUS_LABELS) as Status[]).map((s) => (
                        <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2 bg-bg-tertiary border border-border-default px-3 py-1.5 rounded-lg">
                <FaStar className="text-text-secondary" aria-hidden="true" />
                <select
                    value={score}
                    onChange={(e) => {
                        const newScore = Number(e.target.value);
                        sync(status, newScore, numEpisodes);
                    }}
                    aria-label="Puntuación"
                    className={selectBase}
                >
                    <option value={0}></option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2 bg-bg-tertiary border border-border-default px-3 py-1.5 rounded-lg">
                <span className="text-sm text-text-secondary">Episodios Vistos</span>
                <input
                    type="number"
                    value={episodeDraft}
                    onChange={(e) => setEpisodeDraft(e.target.value)}
                    onBlur={commitEpisodes}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") commitEpisodes();
                    }}
                    min={0}
                    max={total > 0 ? total : undefined}
                    step={1}
                    inputMode="numeric"
                    aria-label="Episodios vistos"
                    className={`${selectBase} w-20`}
                />
            </div>
        </div>
    );
}
