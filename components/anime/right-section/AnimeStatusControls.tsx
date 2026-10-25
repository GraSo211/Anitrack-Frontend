"use client";
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
                <select
                    value={numEpisodes}
                    onChange={(e) => {
                        const newEpisodes = Number(e.target.value);
                        sync(status, score, newEpisodes);
                    }}
                    aria-label="Episodios vistos"
                    className={selectBase}
                >
                    {[...Array(total + 1)].map((_, i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
