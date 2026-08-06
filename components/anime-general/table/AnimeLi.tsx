import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiClock2 } from "react-icons/ci";

interface Props {
    coverImage: string;
    title: string;
    id: number;
    episode: number;
}

export default function AnimeLi({ coverImage, title, id, episode }: Props) {
    return (
        <li className="group relative flex flex-col items-center m-2 bg-bg-secondary text-text-primary text-pretty h-42.5 2xl:h-56 overflow-hidden rounded-lg border border-border-default card-hover">
            <Link
                href={`/anime/a-${id}`}
                className="flex flex-col w-full h-full justify-end items-start"
            >
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/90 z-20" />
                <span className="absolute top-1.5 left-1.5 z-20 inline-flex items-center gap-1 rounded-md bg-bg-primary/85 px-1.5 py-0.5 text-caption font-semibold text-text-primary backdrop-blur-sm">
                    <CiClock2 aria-hidden="true" />
                    EP {episode}
                </span>
                <p className="text-caption 2xl:text-body-sm font-semibold z-20 text-left pl-2 pr-1 w-full mb-1.5 line-clamp-2">
                    {title}
                </p>
                <Image
                    src={coverImage}
                    alt={title}
                    width={2560}
                    height={1440}
                    loading="lazy"
                    className="absolute top-0 left-0 z-10 rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>
        </li>
    );
}
