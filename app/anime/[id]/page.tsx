import { Anime, AnimeStatus as AnimeStatusType } from "@/types/anime/Anime";
import type { Metadata } from "next";
import { cache } from "react";
import { getAnimeByAnyId } from "@/actions/anime/getAnimeByAnyId";
import { getAnimeStatus } from "@/actions/anime-list/getAnimeStatus";
import { connection } from "next/server";
import { cookies } from "next/headers";
import Hero from "@/components/anime/Hero";
import CoverImage from "@/components/anime/CoverImage";
import AnimeHeader from "@/components/anime/AnimeHeader";
import MetadataCard from "@/components/anime/MetadataCard";
import RelatedAnime from "@/components/anime/RelatedAnime";
import DescriptionSection from "@/components/anime/DescriptionSection";
import TrailerSection from "@/components/anime/TrailerSection";
import { AnimeStatusProvider } from "@/components/anime/right-section/AnimeStatusContext";
import AnimeStatusControls from "@/components/anime/right-section/AnimeStatusControls";
import EpisodesPanel from "@/components/anime/right-section/EpisodesPanel";

interface Props {
    params: Promise<{ id: string }>;
}

const getAnime = cache(getAnimeByAnyId);

function toPlainText(html?: string) {
    return (html ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
    const { id } = await params;
    const anime = await getAnime(id);

    if (!anime) {
        return { title: "Anime no encontrado", robots: { index: false, follow: false } };
    }

    const title = anime.title?.romaji || anime.title?.english || "Anime";
    const plain = toPlainText(anime.description);
    const description = plain
        ? plain.length > 160
            ? `${plain.slice(0, 157).trimEnd()}...`
            : plain
        : `Información, episodios y estado de ${title} en Anitrack.`;
    const image = anime.bannerImage || anime.coverImage?.extraLarge || anime.coverImage?.large;
    const images = image ? [{ url: image, alt: title }] : undefined;

    return {
        title,
        description,
        alternates: { canonical: `/anime/${id}` },
        openGraph: { type: "website", title, description, url: `/anime/${id}`, images },
        twitter: { card: "summary_large_image", title, description, images },
    };
}

export default async function page({ params }: Props) {
    const { id } = await params;
    const anime: Anime | null = await getAnime(id);

    if (!anime) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
                Error al cargar el anime
            </div>
        );
    }

    await connection();
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const animeStatus: AnimeStatusType | null = token ? await getAnimeStatus(token, anime.malId) : null;
    const nextEpisode = anime.nextAiringEpisode?.episode;
    const isAuthenticated = Boolean(token);
    const title = anime.title?.romaji || anime.title?.english;

    return (
        <div className="min-h-screen relative flow-root bg-bg-primary">
            <Hero
                bannerImage={anime.bannerImage}
                colorBg={anime.coverImage?.color}
                title={title}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-48 lg:mt-56 grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-x-8 gap-y-4 bg-bg-secondary border border-border-default rounded-2xl shadow-2xl p-6">
                    <div className="order-1 lg:col-start-1 flex justify-center lg:justify-start">
                        {anime.coverImage?.extraLarge && (
                            <CoverImage
                                src={anime.coverImage.extraLarge}
                                alt={title || "Desconocido"}
                                className="w-72 lg:w-full"
                                sizes="(max-width: 1024px) 300px, 320px"
                            />
                        )}
                    </div>

                    <div className="order-2 lg:col-start-2 lg:row-start-1 min-w-0">
                        <AnimeHeader
                            title={title}
                            synonyms={anime.synonyms}
                            averageScore={anime.averageScore}
                            popularity={anime.popularity}
                            status={anime.status}
                            genres={anime.genres}
                        />
                    </div>

                    <div className="order-3 lg:col-start-1">
                        <MetadataCard
                            season={anime.season}
                            seasonYear={anime.seasonYear}
                            countryOfOrigin={anime.countryOfOrigin}
                            isAdult={anime.isAdult}
                            studio={anime.studio}
                            source={anime.source}
                            episodes={anime.episodes}
                            duration={anime.duration}
                            startDate={anime.startDate}
                            endDate={anime.endDate}
                            nextAiringEpisode={anime.nextAiringEpisode}
                        />
                    </div>

                    <AnimeStatusProvider
                        animeStatus={animeStatus ?? null}
                        isAuthenticated={isAuthenticated}
                        id={anime.malId}
                        episodes={anime.episodes}
                        nextEpisode={nextEpisode}
                    >
                        <div className="contents">
                            {isAuthenticated && (
                                <div className="order-4 lg:col-start-2 min-w-0">
                                    <AnimeStatusControls />
                                </div>
                            )}

                            {anime.description && (
                                <div className="order-5 lg:col-start-2 min-w-0">
                                    <DescriptionSection description={anime.description} />
                                </div>
                            )}

                            {anime.trailer?.thumbnail && (
                                <div className="order-6 lg:col-start-2 min-w-0">
                                    <TrailerSection trailer={anime.trailer} title={title} />
                                </div>
                            )}

                            {isAuthenticated && (
                                <div className="order-7 lg:col-start-2 min-w-0">
                                    <EpisodesPanel />
                                </div>
                            )}
                        </div>
                    </AnimeStatusProvider>

                    {anime.relations && (
                        <div className="order-8 lg:col-start-1">
                            <RelatedAnime relations={anime.relations} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
