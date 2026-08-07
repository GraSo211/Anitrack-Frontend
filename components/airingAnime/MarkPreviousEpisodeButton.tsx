"use client";

import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { addAnimeToList } from "@/actions/anime-list/addAnimeToList";
import { modifyAnimeToList } from "@/actions/anime-list/modifyAnimeToList";

interface Props {
    token?: string;
    idMal?: number | null;
    inList: boolean;
    episodesWatched?: number | null;
    status: string;
    score: number;
    nextEpisode: number;
    className?: string;
}

export default function MarkPreviousEpisodeButton({
    token,
    idMal,
    inList,
    episodesWatched,
    status,
    score,
    nextEpisode,
    className,
}: Props) {
    const target = nextEpisode - 1;
    const [marking, setMarking] = useState(false);
    const [watchedUpTo, setWatchedUpTo] = useState<number | null>(
        inList ? (episodesWatched ?? 0) : null,
    );

    if (!token || !idMal || target < 1) return null;

    const upToDate = watchedUpTo != null && watchedUpTo >= target;

    const handleMark = async () => {
        if (marking || upToDate || !token || !idMal) return;
        setMarking(true);
        try {
            if (!inList) {
                const added = await addAnimeToList(token, idMal);
                if (!added) throw new Error("add failed");
            }
            const newNum = Math.max(watchedUpTo ?? 0, target);
            const res = await modifyAnimeToList(
                token,
                idMal,
                inList ? status : "watching",
                inList ? score : 0,
                newNum,
            );
            if (!res) throw new Error("modify failed");
            setWatchedUpTo(newNum);
        } catch (error) {
            console.error("Fallo al marcar episodio:", error);
        } finally {
            setMarking(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleMark}
            disabled={marking || upToDate}
            aria-label={
                upToDate
                    ? `Al día con el episodio ${target}`
                    : `Marcar episodio ${target} como visto`
            }
            className={`reveal-on-hover inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-semibold backdrop-blur-sm transition-all ${
                upToDate
                    ? "bg-status-success/90 text-white cursor-default"
                    : "bg-accent-primary/90 text-white hover:bg-accent-primary-hover cursor-pointer active:scale-95"
            } ${marking ? "opacity-60" : ""} ${className ?? ""}`}
        >
            {marking ? (
                <svg
                    className="animate-spin w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <CiCircleCheck className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            {upToDate ? `EP ${target} visto` : `Marcar EP ${target}`}
        </button>
    );
}
