import Link from "next/link";

import buildTrailerUrl from "@/utils/buildTrailerUrl";
import { FaFireAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { AnimeStatus as AnimeStatusType } from "@/types/anime/Anime";
import AnimeStatus from "@/components/anime-general/info/AnimeStatus";
import Genres from "@/components/anime-general/info/Genres";
import { AnimeStatusProvider } from "./AnimeStatusContext";
import AnimeStatusControls from "./AnimeStatusControls";
import EpisodesPanel from "./EpisodesPanel";

interface Props {
    malId: number;
    titleRomaji?: string;
    titleEnglish?: string;
    synonyms: string[];
    averageScore?: number;
    popularity?: number;
    status?: string;
    genres: string[];
    description?: string;
    trailer?: {
        id?: number;
        site?: string;
        thumbnail?: string;
    };
    episodes: number | undefined;
    isAuthenticated?: boolean;
    animeStatus?: AnimeStatusType | null;
    nextEpisode?: number;
}

export default function RightSection({ malId, titleRomaji, titleEnglish, synonyms, averageScore, popularity, status, genres, description, trailer, episodes, isAuthenticated, animeStatus, nextEpisode }: Props) {
    return (
        <div className="flex flex-col w-full relative">
            <div>
                <h1 className="text-4xl font-extrabold text-text-primary">{titleRomaji ?? titleEnglish ?? "Título desconocido"}</h1>

                {synonyms.length > 0 && <p className="text-xs my-1 text-text-tertiary">{synonyms.join(", ")}</p>}

                <div className="flex flex-wrap gap-3 items-center text-text-secondary">
                    {averageScore && <span className='flex gap-1 justify-center items-center'><FaStar /> {averageScore}</span>}
                    {popularity && <span className='flex gap-1 justify-center items-center'><FaFireAlt></FaFireAlt> {popularity}</span>}
                    {status && <AnimeStatus status={status} />}
                </div>
            </div>

            <Genres genres={genres} />

            <AnimeStatusProvider animeStatus={animeStatus ?? null} isAuthenticated={isAuthenticated} id={malId} episodes={episodes} nextEpisode={nextEpisode}>
                {isAuthenticated && <AnimeStatusControls />}

                {description && (
                    <section className="bg-bg-secondary border border-border-default rounded-xl p-4 my-2">
                        <div className="text-text-primary leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}></div>
                    </section>
                )}

                {trailer?.thumbnail && (
                    <section>
                        <Link href={buildTrailerUrl(trailer)!} target="_blank">
                            <div className="relative w-full max-w-120 aspect-video">
                                <img
                                    alt={titleRomaji ?? "Trailer"}
                                    src={trailer.thumbnail}

                                    sizes="(max-width: 768px) 100vw, 480px"
                                    className="rounded-lg object-cover hover:brightness-90 transition"
                                />
                            </div>
                        </Link>
                    </section>
                )}

                {isAuthenticated && <EpisodesPanel />}
            </AnimeStatusProvider>
        </div>
    );
}
