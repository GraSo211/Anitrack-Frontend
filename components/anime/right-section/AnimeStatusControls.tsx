"use client";
import { useAnimeStatus } from "./AnimeStatusContext";
import { Status } from "@/types/anime/Anime";
import { FaStar } from "react-icons/fa";

export default function AnimeStatusControls() {
    const { status, score, numEpisodes, loading, total, handleAdd, sync } = useAnimeStatus();

    if (!status) {
        return (
            <div className="flex items-center gap-3 bg-blue-900/10 border border-zinc-800 rounded-xl px-4 py-2 w-fit">
                <button
                    onClick={handleAdd}
                    className="text-sm font-medium text-white cursor-pointer"
                    disabled={loading}
                >
                    Agregar a la lista
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 bg-blue-900/10 border border-zinc-800 rounded-xl px-4 py-2 w-fit">

            {/* Status */}
            <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                <span className="text-sm text-zinc-400">Estado</span>

                <select
                    value={status}
                    onChange={(e) => {
                        const newStatus = e.target.value as Status;
                        sync(newStatus, score, numEpisodes);
                    }}
                >
                    <option value="watching">Watching</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                    <option value="dropped">Dropped</option>
                    <option value="plan_to_watch">Plan to Watch</option>
                </select>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                <FaStar />

                <select
                    value={score}
                    onChange={(e) => {
                        const newScore = Number(e.target.value);
                        sync(status, newScore, numEpisodes);
                    }}
                >
                    <option value={0}></option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Episodes */}
            <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                <span className="text-sm text-zinc-400">Episodios Vistos</span>

                <select
                    value={numEpisodes}
                    onChange={(e) => {
                        const newEpisodes = Number(e.target.value);
                        sync(status, score, newEpisodes);
                    }}
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
