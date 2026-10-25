"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import MarkPreviousEpisodeButton from "@/components/airingAnime/MarkPreviousEpisodeButton";

interface Props {
    coverImage: string;
    title: string;
    id: number;
    episode: number;
    isAuthenticated?: boolean;
    idMal?: number | null;
    inList?: boolean;
    episodesWatched?: number | null;
    status?: string;
    score?: number;
    nextEpisode?: number;
}

export default function AnimeLi({
    coverImage,
    title,
    id,
    episode,
    isAuthenticated,
    idMal,
    inList = false,
    episodesWatched,
    status = "watching",
    score = 0,
    nextEpisode,
}: Props) {
    return (
        <li className="group relative flex flex-col items-center m-2 bg-bg-secondary text-text-primary text-pretty min-h-32 aspect-[3/4] overflow-hidden rounded-lg border border-border-default card-hover">
            <Link
                href={`/anime/a-${id}`}
                aria-label={title}
                title={title}
                className="relative flex flex-col w-full h-full justify-end items-start"
            >
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/90 z-20" />
                <span className="absolute top-1.5 left-1.5 z-20 inline-flex items-center gap-1 rounded-md bg-bg-primary/85 px-1.5 py-0.5 text-caption font-semibold text-text-primary backdrop-blur-sm">
                    <CiClock2 aria-hidden="true" />
                    EP {episode}
                </span>
                <p
                    className="text-caption 2xl:text-body-sm font-semibold z-20 text-left pl-2 pr-1 w-full mb-1.5 line-clamp-2"
                    title={title}
                >
                    {title}
                </p>
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    sizes="(max-width: 1280px) 14vw, 11vw"
                    loading="lazy"
                    className="absolute inset-0 z-10 rounded-lg object-cover transition-transform duration-500 group-hover:scale-105 bg-bg-tertiary"
                />
            </Link>
            {nextEpisode && (
                <MarkPreviousEpisodeButton
                    isAuthenticated={isAuthenticated}
                    idMal={idMal}
                    inList={inList}
                    episodesWatched={episodesWatched}
                    status={status}
                    score={score}
                    nextEpisode={nextEpisode}
                    className="absolute bottom-2 right-2 z-30"
                />
            )}
        </li>
    );
}
