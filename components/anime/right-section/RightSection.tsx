// components/anime-detailed/right-section/RightSection.server.tsx


import Link from "next/link";


import buildTrailerUrl from "@/utils/buildTrailerUrl";
import { EpisodePage } from "@/types/anime/Episode";
import { FaFireAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { cookies } from "next/headers";
import AnimeUserStatus from "./AnimeUserStatus";
import { getAnimeStatus } from "@/actions/anime-list/getAnimeStatus";
import { AnimeStatus as AnimeStatusType } from "@/types/anime/Anime";
import AnimeStatus from "@/components/anime-general/info/AnimeStatus";
import Genres from "@/components/anime-general/info/Genres";
import Episodes from "@/components/anime-general/info/Episodes";

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
    episodePage?: EpisodePage | null;
    episodes: number| undefined
}

export default async function RightSection({ malId, titleRomaji, titleEnglish, synonyms, averageScore, popularity, status, genres, description, trailer, episodePage, episodes }: Props) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    
    const animeStatus: AnimeStatusType | null  = await getAnimeStatus(token, malId);


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


            {token && <AnimeUserStatus animeStatus={animeStatus} token={token} id={malId} episodes={episodes}></AnimeUserStatus>}

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

            {
                episodePage?.items.length != 0 &&
                <section className="mt-6">
                    <h2 className="text-2xl font-bold text-text-primary mb-4">Episodios</h2>

                    {episodePage && episodePage.items?.map((episode) => <Episodes key={episode.malId} episode={episode} watched={false} />)}
                </section>
            }


        </div>
    );
}
