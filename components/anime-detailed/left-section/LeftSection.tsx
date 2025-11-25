import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
    coverImage: string | undefined;
    title: string | undefined;
    studio: string | undefined;
    source: string | undefined;
    episodes: number | undefined;
    startDate?:
        | {
              day?: number | undefined;
              month?: number | undefined;
              year?: number | undefined;
          }
        | undefined;
    endDate?:
        | {
              day?: number | undefined;
              month?: number | undefined;
              year?: number | undefined;
          }
        | undefined;
    season: string | undefined;
    seasonYear: number | undefined;
    countryOfOrigin: string | undefined;
    isAdult?: boolean;
    nextAiringEpisode?:
        | {
              id?: number | undefined;
              airingAt?: number | undefined;
              timeUntilAiring?: number | undefined;
              episode?: number | undefined;
              mediaId?: number | undefined;
          }
        | undefined;
    duration?: number | undefined;
    relations?: {
        items: {
            relatedMediaId: number;
            relatedTitle: string;
            relatedImage: string;
        }[];
        empty: boolean;
    };
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

export default function LeftSection({ coverImage, title, studio, source, episodes, startDate, endDate, season, seasonYear, countryOfOrigin, isAdult, nextAiringEpisode, duration,relations }: Props) {
    if(relations?.items !== undefined)relations.items = relations.items.slice(0,6);
    return (
        <div className="flex flex-col gap-4 col-span-1">
            {coverImage && <Image src={coverImage} alt={title || "Desconocido"} width={400} height={600} priority className="rounded-xl shadow-xl border border-gray-800" />}

            <div className="bg-gray-900/80 rounded-xl p-4 shadow-md border border-gray-700 space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-xs">
                    {season && seasonYear && (
                        <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
                            {season} {seasonYear}
                        </span>
                    )}
                    {countryOfOrigin && <span className="px-2 py-1 rounded bg-gray-700 text-gray-300">{countryOfOrigin}</span>}
                    {isAdult && <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 font-semibold">+18 Adulto</span>}
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-300">
                    <div>
                        <span className="font-semibold text-gray-200">Estudio</span>
                        <p>{studio?.toUpperCase() || "Desconocido"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-200">Fuente</span>
                        <p>{source || "Desconocida"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-200">Episodios</span>
                        <p>{episodes ?? "—"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-200">Duración</span>
                        <p>{duration ? `${duration} min` : "—"}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-200">Inicio</span>
                        <p>{formatDate(startDate)}</p>
                    </div>

                    {endDate && (
                        <div>
                            <span className="font-semibold text-gray-200">Fin</span>
                            <p>{formatDate(endDate)}</p>
                        </div>
                    )}
                </div>

                {/* Next episode */}
                {nextAiringEpisode?.airingAt && (
                    <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 text-sm">
                        <span className="font-semibold text-blue-400">Próximo episodio</span>
                        <p className="text-gray-200">
                            <span className="font-semibold">Episodio {nextAiringEpisode.episode} </span>· {formatAiringDate(nextAiringEpisode.airingAt)}
                        </p>
                    </div>
                )}
            </div>
                        {/* Related anime */}
            {relations && !relations.empty && relations.items.length > 0 && (
                <section className=" flex flex-col justify-center items-center ">
                    <h2 className="text-xl font-bold text-white mb-4">Animes relacionados</h2>

                    <div className="grid grid-cols-2 gap-4 place-content-center  w-full max-w-sm">

                        {relations.items.map((anime) => (
                            <Link key={anime.relatedMediaId} href={`/anime/${anime.relatedMediaId}`} className="group">
                                <div className="flex flex-col  gap-2">
                                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
                                        <Image src={anime.relatedImage} alt={anime.relatedTitle} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                                    </div>

                                    <p className="text-sm text-center text-gray-300 leading-tight line-clamp-2 group-hover:text-white transition">{anime.relatedTitle}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
