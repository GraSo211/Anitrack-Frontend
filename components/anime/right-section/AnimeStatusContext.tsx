"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { addAnimeToList } from "@/actions/anime-list/addAnimeToList";
import { modifyAnimeToList } from "@/actions/anime-list/modifyAnimeToList";
import { AnimeStatus, Status } from "@/types/anime/Anime";

interface Props {
    animeStatus: AnimeStatus | null;
    token?: string;
    id: number;
    episodes?: number;
    nextEpisode?: number;
    children: ReactNode;
}

interface ContextValue {
    status: Status | null;
    score: number;
    numEpisodes: number;
    watched: boolean[];
    consecutive: boolean;
    loading: boolean;
    total: number;
    handleAdd: () => Promise<void>;
    sync: (newStatus: Status, newScore: number, newEpisodes: number) => Promise<void>;
    toggleEpisode: (episodeNumber: number) => void;
    toggleConsecutive: () => void;
}

const AnimeStatusContext = createContext<ContextValue | null>(null);

export function AnimeStatusProvider({ animeStatus, token, id, episodes, nextEpisode, children }: Props) {
    const [status, setStatus] = useState<Status | null>(null);
    const [score, setScore] = useState<number>(0);
    const [numEpisodes, setNumEpisodes] = useState<number>(0);
    const [watched, setWatched] = useState<boolean[]>([]);
    const [consecutive, setConsecutive] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    const total = Math.max(episodes ?? 0, animeStatus?.numEpisodes ?? 0, nextEpisode ?? 0);

    useEffect(() => {
        if (animeStatus) {
            setStatus(animeStatus.status);
            setScore(animeStatus.score);
            setNumEpisodes(animeStatus.numEpisodes);
            const len = Math.max(episodes ?? 0, animeStatus.numEpisodes, nextEpisode ?? 0);
            if (len > 0) setWatched(Array.from({ length: len }, (_, i) => i < animeStatus.numEpisodes));
        } else {
            setStatus(null);
            setWatched([]);
        }
    }, [animeStatus, episodes, nextEpisode]);

    const sync = async (newStatus: Status, newScore: number, newEpisodes: number) => {
        if (!token) return;
        setLoading(true);
        setStatus(newStatus);
        let ne = newEpisodes;
        if (newStatus === "completed" && total > 0) ne = total;
        await modifyAnimeToList(token, id, newStatus, newScore, ne);
        setNumEpisodes(ne);
        if (total > 0) setWatched(Array.from({ length: total }, (_, i) => i < ne));
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!token) return;
        setLoading(true);
        const res = await addAnimeToList(token, id);
        if (res) {
            setStatus(res.status);
            setScore(res.score);
            setNumEpisodes(res.numEpisodes);
            const len = Math.max(episodes ?? 0, res.numEpisodes, nextEpisode ?? 0);
            if (len > 0) setWatched(Array.from({ length: len }, (_, i) => i < res.numEpisodes));
        }
        setLoading(false);
    };

    const toggleEpisode = (k: number) => {
        const idx = k - 1;
        const next = [...watched];
        let count: number;
        if (consecutive) {
            if (watched[idx]) {
                for (let i = idx; i < next.length; i++) next[i] = false;
                count = idx;
            } else {
                for (let i = 0; i <= idx; i++) next[i] = true;
                count = idx + 1;
            }
        } else {
            next[idx] = !watched[idx];
            count = next.filter(Boolean).length;
        }
        setWatched(next);
        setNumEpisodes(count);
        if (status) sync(status, score, count);
    };

    const toggleConsecutive = () => {
        const nxt = !consecutive;
        if (nxt) {
            const count = watched.filter(Boolean).length;
            const len = Math.max(total, watched.length);
            setWatched(Array.from({ length: len }, (_, i) => i < count));
        }
        setConsecutive(nxt);
    };

    return (
        <AnimeStatusContext.Provider
            value={{ status, score, numEpisodes, watched, consecutive, loading, total, handleAdd, sync, toggleEpisode, toggleConsecutive }}
        >
            {children}
        </AnimeStatusContext.Provider>
    );
}

export function useAnimeStatus() {
    const ctx = useContext(AnimeStatusContext);
    if (!ctx) throw new Error("useAnimeStatus debe usarse dentro de AnimeStatusProvider");
    return ctx;
}
