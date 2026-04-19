import { Anime } from '@/types/anime/Anime'


import Link from 'next/link'
import React from 'react'

import { FaFireAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import buildTrailerUrl from '@/utils/buildTrailerUrl'

import { EpisodePage } from '@/types/anime/Episode'
import AnimeStatus from '../anime-general/info/AnimeStatus';
import Genres from '../anime-general/info/Genres';
import Episodes from '../anime-general/info/Episodes';


interface Props {
    anime: Anime
    episodePage: EpisodePage | null
}

const formatDate = (d?: { day?: number; month?: number; year?: number }) => {
    if (!d?.day || !d?.month || !d?.year) return "Desconocido";
    return `${d.day}/${d.month}/${d.year}`;
};

const formatAiringDate = (unix?: number) => {
    if (!unix) return null;
    return new Date(unix * 1000).toLocaleString("es-AR", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

export default function MobileSection({ anime, episodePage }: Props) {
    return (
        <div className="mt-4 flex flex-col  justify-center items-center col-span-1">
            {anime.coverImage && anime.coverImage.extraLarge && <img src={anime.coverImage.extraLarge} alt={anime.title.romaji || "Desconocido"} width={300} height={500} className="rounded-xl shadow-xl border border-border-default" />}


            <div>
                <h1 className="mt-2 text-xl font-extrabold text-center text-text-primary">{anime.title?.romaji ?? anime.title?.english ?? "Título desconocido"}</h1>

                {anime.synonyms && anime.synonyms.length > 0 && <p className="text-xs my-1 text-text-tertiary">{anime.synonyms.join(", ")}</p>}

                <div className="flex flex-wrap gap-3 items-center text-text-secondary">
                    {anime.averageScore && <span className='flex gap-1 justify-center items-center'><FaStar /> {anime.averageScore}</span>}
                    {anime.popularity && <span className='flex gap-1 justify-center items-center'><FaFireAlt></FaFireAlt> {anime.popularity}</span>}
                    {anime.status && <AnimeStatus status={anime.status} />}
                </div>
            </div>

            <Genres genres={anime.genres} />

            <div className="bg-bg-secondary rounded-xl p-4 shadow-md border border-border-default space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                    {anime.season && anime.seasonYear && (
                        <span className="px-2 py-1 rounded bg-accent-primary-subtle text-accent-primary">
                            {anime.season} {anime.seasonYear}
                        </span>
                    )}
                    {anime.countryOfOrigin && <span className="px-2 py-1 rounded bg-bg-quaternary text-text-secondary">{anime.countryOfOrigin}</span>}
                    {anime.isAdult && <span className="px-2 py-1 rounded bg-status-error-subtle text-status-error font-semibold">+18 Adulto</span>}
                </div>


                {/* Metadata */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-text-secondary">
                    <div>
                        <span className="font-semibold text-text-primary">Estudio</span>
                        <p>{anime.studio?.toUpperCase() || "Desconocido"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-text-primary">Fuente</span>
                        <p>{anime.source || "Desconocida"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-text-primary">Episodios</span>
                        <p>{anime.episodes ?? "—"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-text-primary">Duración</span>
                        <p>{anime.duration ? `${anime.duration} min` : "—"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-text-primary">Inicio</span>
                        <p>{formatDate(anime.startDate)}</p>
                    </div>

                    {anime.endDate && (
                        <div>
                            <span className="font-semibold text-text-primary">Fin</span>
                            <p>{formatDate(anime.endDate)}</p>
                        </div>
                    )}
                </div>

                {/* Next episode */}
                {anime.nextAiringEpisode?.airingAt && (
                    <div className="rounded-lg bg-accent-primary-subtle border border-accent-primary/30 p-3 text-sm">
                        <span className="font-semibold text-accent-primary">Próximo episodio</span>
                        <p className="text-text-primary">
                            <span className="font-semibold">Episodio {anime.nextAiringEpisode.episode} </span>· {formatAiringDate(anime.nextAiringEpisode.airingAt)}
                        </p>
                    </div>
                )}
            </div>

            {anime.trailer?.thumbnail && (
                <section>
                    <Link href={buildTrailerUrl(anime.trailer)!} target="_blank">
                        <div className="relative w-full max-w-120 aspect-video">
                            <img
                                alt={anime.title?.romaji ?? "Trailer"}
                                src={anime.trailer.thumbnail}
                                height={400}
                                width={600}

                                className="rounded-lg object-cover hover:brightness-90 transition"
                            />

                        </div>
                    </Link>
                </section>
            )}

            {anime.description && (
                <section className="bg-bg-secondary border border-border-default rounded-xl p-4 my-2">
                    <div className="text-text-primary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: anime.description }}></div>
                </section>
            )}



            <section className="mt-2">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Episodios</h2>

                {episodePage !== null && episodePage.items?.map((episode) => <Episodes key={episode.malId} episode={episode} watched={false} />)}
            </section>



            {/* Related anime */}
            {anime.relations && !anime.relations.empty && anime.relations.items.length > 0 && (
                <section className="mt-2 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Animes relacionados</h2>

                    <div className="grid grid-cols-2 gap-4 place-content-center w-full max-w-sm">

                        {anime.relations.items.map((anime) => (
                            <Link key={anime.relatedMediaId} href={`/anime/${anime.relatedMediaId}`} className="group">
                                <div className="flex flex-col gap-2">
                                    <div className="relative aspect-2/3 overflow-hidden rounded-lg border border-border-default bg-bg-tertiary">
                                        <img src={anime.relatedImage} alt={anime.relatedTitle} sizes="60px 30px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-bg-primary/10 transition" />
                                    </div>

                                    <p className="text-sm text-center text-text-secondary leading-tight line-clamp-2 group-hover:text-text-primary transition">{anime.relatedTitle}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
