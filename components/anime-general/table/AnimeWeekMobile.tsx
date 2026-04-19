import { AnimeReleasing } from '@/types/anime/Anime'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    animes: AnimeReleasing[]
}

export default function AnimeWeekMobile({ animes }: Props) {
    const animesChecked: AnimeReleasing[] = Array.isArray(animes) ? animes : [];
    const hasError = animes !== undefined && !Array.isArray(animes);

    const daysOfWeek = [
        { key: "monday", label: "Monday", spanishLabel: "Lunes" },
        { key: "tuesday", label: "Tuesday", spanishLabel: "Martes" },
        { key: "wednesday", label: "Wednesday", spanishLabel: "Miercoles" },
        { key: "thursday", label: "Thursday", spanishLabel: "Jueves" },
        { key: "friday", label: "Friday", spanishLabel: "Viernes" },
        { key: "saturday", label: "Saturday", spanishLabel: "Sabado" },
        { key: "sunday", label: "Sunday", spanishLabel: "Domingo" },
    ];

    return (
        <div className='flex w-full flex-col gap-3 '>
            {
                daysOfWeek.map((day) => (
                    <div key={day.key} className='w-full flex flex-col '>
                        <h3 className="text-lg font-bold px-2 text-text-primary mb-2 tracking-wide uppercase w-full rounded-sm bg-bg-tertiary border border-border-default">
                            {day.spanishLabel}
                        </h3>
                        <div className=" relative space-y-2 w-full ">
                            {
                                animesChecked
                                    .filter((anime) => anime.schedule === day.key)
                                    .slice(0, 2)
                                    .map((anime) => (
                                        <div
                                            key={anime.id}
                                            className="
                                                    flex items-center gap-3
                                                    p-2 w-full
                                                    rounded-md
                                                   
                                                    transition-colors
                                                "
                                        >


                                            <Image
                                                src={
                                                    anime.coverImage?.large ||
                                                    anime.coverImage?.medium ||
                                                    "/default-anime-cover.jpg"
                                                }
                                                alt={
                                                    anime.title.romaji ||
                                                    anime.title.english ||
                                                    "Título Desconocido"
                                                }
                                                width={90}
                                                height={40}
                                                className="rounded-sm  object-cover shrink-0 aspect-video"
                                            />


                                            <div className="flex flex-col justify-center  ">
                                                <span className="text-xs font-semibold text-text-primary">
                                                    {anime.title.romaji || anime.title.english}
                                                </span>

                                                <span className="text-xs text-text-tertiary">
                                                    EP {anime.nextAiringEpisode?.episode || "?"}
                                                </span>
                                            </div>
                                            
                                        </div>

                                    ))
                            }
                            <Link href={`/airingAnimes?day=${day.spanishLabel.toLowerCase()}`} className="absolute bottom-0 right-0 text-xs text-text-primary border border-border-default py-1 px-2 rounded-md bg-bg-tertiary hover:text-accent-primary cursor-pointer">Ver todos →</Link>
                        </div>


                    </div>
                ))
            }
        </div>
    )
}
