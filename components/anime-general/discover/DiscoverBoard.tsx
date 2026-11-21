"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FiTrendingUp, FiAward, FiStar } from "react-icons/fi";

import Button from "@/components/general-components/Button";
import { AnimeCard } from "@/types/anime/Anime";

type Tab = "popular" | "topRated";

interface Props {
    popular: AnimeCard[];
    topRated: AnimeCard[];
}

const ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
};

const toPlainText = (html: string | null | undefined) =>
    (html ?? "")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity] ?? entity);

const getDisplayTitle = (anime: AnimeCard) =>
    anime.title.english?.trim() || anime.title.romaji?.trim() || "Sin título";

const getHeroBackground = (anime: AnimeCard) =>
    anime.bannerImage ||
    anime.coverImage?.extraLarge ||
    anime.coverImage?.large ||
    anime.coverImage?.medium ||
    "/coverImagePlaceholder.png";

const getPosterSrc = (anime: AnimeCard) =>
    anime.coverImage?.medium || anime.coverImage?.large || anime.coverImage?.extraLarge || "/coverImagePlaceholder.png";

export default function DiscoverBoard({ popular, topRated }: Props) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>(() => (popular.length ? "popular" : "topRated"));
    const [selectedId, setSelectedId] = useState<number>(() =>
        popular.length ? popular[0].id : topRated[0]?.id ?? 0
    );

    const list = useMemo(() => (activeTab === "popular" ? popular : topRated), [activeTab, popular, topRated]);

    const selectedAnime = useMemo(
        () => list.find((anime) => anime.id === selectedId) ?? list[0],
        [list, selectedId]
    );

    const handleTabChange = (tab: Tab) => {
        const nextList = tab === "popular" ? popular : topRated;
        setActiveTab(tab);
        setSelectedId(nextList[0]?.id ?? 0);
    };

    if (!selectedAnime) {
        return null;
    }

    return (
        <section id="descubrir" className="my-6 w-full" aria-label="Descubrir">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-accent-primary" aria-hidden="true" />
                    <div>
                        <h2 className="text-heading-lg font-bold text-text-primary">Descubrir</h2>
                        <p className="text-body-sm text-text-secondary">
                            Explorá lo más popular y los animes mejor valorados de todos los tiempos
                        </p>
                    </div>
                </div>

                <div
                    role="tablist"
                    aria-label="Filtros de descubrimiento"
                    className="flex items-center w-full sm:w-auto gap-1 p-1 rounded-full bg-bg-tertiary border border-border-default"
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "popular"}
                        onClick={() => handleTabChange("popular")}
                        className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-caption sm:text-body-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent-primary/50 ${
                            activeTab === "popular"
                                ? "bg-accent-primary text-text-light shadow-md"
                                : "text-text-secondary hover:text-text-primary hover:bg-bg-quaternary"
                        }`}
                    >
                        <FiTrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                        Más Popular
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "topRated"}
                        onClick={() => handleTabChange("topRated")}
                        className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-caption sm:text-body-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent-primary/50 ${
                            activeTab === "topRated"
                                ? "bg-accent-primary text-text-light shadow-md"
                                : "text-text-secondary hover:text-text-primary hover:bg-bg-quaternary"
                        }`}
                    >
                        <FiAward className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                        Mejores Valorados
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 lg:h-[560px]">
                <div className="flex flex-col bg-bg-secondary border border-border-default rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
                        <h3 className="text-heading-sm font-semibold text-text-primary">Ranking</h3>
                        <span className="text-caption text-text-secondary uppercase tracking-wide">Top 10</span>
                    </div>
                    <div className="relative flex-1 min-h-0">
                        <div className="h-full p-2 space-y-1 lg:overflow-y-auto overflow-visible">
                        {list.map((anime, index) => {
                            const rank = index + 1;
                            const selected = selectedAnime.id === anime.id;
                            return (
                                <button
                                    key={anime.id}
                                    type="button"
                                    aria-current={selected ? "true" : undefined}
                                    onClick={() => setSelectedId(anime.id)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors focus-visible:ring-2 focus-visible:ring-accent-primary/50 ${
                                        selected
                                            ? "bg-accent-primary-subtle border border-accent-primary"
                                            : "hover:bg-bg-tertiary border border-transparent"
                                    }`}
                                >
                                    <span
                                        className={`w-6 text-center text-heading-sm font-bold ${
                                            selected ? "text-accent-primary" : "text-text-secondary"
                                        }`}
                                    >
                                        #{rank}
                                    </span>
                                    <div className="relative w-10 h-14 flex-shrink-0 rounded-md overflow-hidden bg-bg-tertiary">
                                        <Image
                                            src={getPosterSrc(anime)}
                                            alt={`Portada de ${getDisplayTitle(anime)}`}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="flex-1 min-w-0 text-body-sm font-medium text-text-primary truncate">
                                        {getDisplayTitle(anime)}
                                    </span>
                                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-bg-tertiary border border-border-default text-caption text-text-secondary">
                                        {anime.format ?? "—"}
                                    </span>
                                    <span className="flex items-center gap-1 text-body-sm font-semibold text-text-primary flex-shrink-0">
                                        <FiStar className="w-3.5 h-3.5 text-accent-primary" aria-hidden="true" />
                                        {anime.averageScore ?? "—"}
                                        {anime.averageScore != null && "%"}
                                    </span>
                                </button>
                            );
                        })}
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden lg:block h-8 bg-gradient-to-t from-bg-secondary to-transparent" aria-hidden="true" />
                    </div>
                </div>

                <div className="relative h-[420px] lg:h-full rounded-xl overflow-hidden border border-border-default bg-bg-secondary">
                    <Image
                        src={getHeroBackground(selectedAnime)}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-overlay-dark/95 via-overlay-dark/75 to-overlay-dark/10" aria-hidden="true" />

                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary text-text-light text-overline font-semibold shadow-md">
                            #{list.findIndex((anime) => anime.id === selectedAnime.id) + 1} Destacado
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-overlay-dark/80 to-transparent pointer-events-none" aria-hidden="true" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
                        <h3 className="text-heading-lg lg:text-heading-xl font-bold text-text-light line-clamp-2">
                            {getDisplayTitle(selectedAnime)}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-1 rounded-md bg-surface-light/10 border border-surface-light/20 text-caption text-text-light/90">
                                {selectedAnime.format ?? "—"}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-light/10 border border-surface-light/20 text-caption text-text-light/90">
                                <FiStar className="w-3.5 h-3.5" aria-hidden="true" />
                                {selectedAnime.averageScore ?? "—"}
                                {selectedAnime.averageScore != null && "%"}
                            </span>
                            {selectedAnime.genres?.slice(0, 3).map((genre) => (
                                <span
                                    key={genre}
                                    className="px-2 py-1 rounded-md bg-surface-light/10 border border-surface-light/20 text-caption text-text-light/90"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <p className="text-body-sm text-text-light/80 line-clamp-3 max-w-2xl">
                            {toPlainText(selectedAnime.description) || "Sin sinopsis disponible."}
                        </p>

                        <div className="mt-1">
                            <Button
                                variant="primary"
                                size="md"
                                leftIcon={<span aria-hidden="true">▶</span>}
                                onClick={() => router.push(`/anime/a-${selectedAnime.id}`)}
                            >
                                Ver anime
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
