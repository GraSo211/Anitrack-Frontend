"use client";
import { addAnimeToList } from '@/actions/anime-list/addAnimeToList';
import { modifyAnimeToList } from '@/actions/anime-list/modifyAnimeToList';
import { AnimeStatus, Status } from '@/types/anime/Anime';
import React, { useEffect, useState } from 'react'


interface Props {
    animeStatus: AnimeStatus | null
    token: string
    id: number
    episodes: number | undefined
}

export default function AnimeUserStatus({ animeStatus, token, id, episodes }: Props) {

    const [status, setStatus] = useState<Status | null>(null);
    const [score, setScore] = useState<number>(0);
    const [numEpisodes, setNumEpisodes] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(animeStatus?.status)
        if (animeStatus) {
            setStatus(animeStatus.status);
            setScore(animeStatus.score);
            setNumEpisodes(animeStatus.numEpisodes);
        } else {
            setStatus(null);
        }
    }, [animeStatus]);



    const handleAdd = async () => {
        setLoading(true);
        const res = await addAnimeToList(token, id);
        if (res) {
            setStatus(res.status);
            setScore(res.score);
            setNumEpisodes(res.numEpisodes);
        }

        setLoading(false);
    };


    const handleUpdate = async (
        newStatus: Status,
        newScore: number,
        newEpisodes: number
    ) => {
        setLoading(true);
        if (newStatus == "completed") {
            if (episodes) {
                setNumEpisodes(episodes)
                newEpisodes = episodes
            };

        }


        await modifyAnimeToList(token, id, newStatus, newScore, newEpisodes);
        setLoading(false);
    };

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
                        setStatus(newStatus);
                        handleUpdate(newStatus, score, numEpisodes);
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
            {

                <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                    <span className="text-yellow-400">⭐</span>

                    <select
                        value={score}
                        onChange={(e) => {
                            const newScore = Number(e.target.value);
                            setScore(newScore);
                            handleUpdate(status, newScore, numEpisodes);
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
            }


            {/* Episodes */}
            {

                <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                    <span className="text-sm text-zinc-400">Episodios Vistos</span>

                    <select
                        value={numEpisodes}
                        onChange={(e) => {
                            const newEpisodes = Number(e.target.value);
                            setNumEpisodes(newEpisodes);
                            handleUpdate(status, score, newEpisodes);
                        }}
                    >
                        {[...Array((episodes || 0) + 1)].map((_, i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>
            }

        </div>
    )
}
