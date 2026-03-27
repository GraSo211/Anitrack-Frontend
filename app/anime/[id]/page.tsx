import { getAnimeById } from "@/actions/getAnimeById";

import { Anime } from "@/types/Anime";
import Hero from "@/components/anime-detailed/Hero";
import LeftSection from "../../../components/anime-detailed/left-section/LeftSection";
import RightSection from "@/components/anime-detailed/right-section/RightSection";
import { EpisodePage } from "@/types/EpisodePage";
import { getEpisodesOfAnime } from "@/actions/getEpisodesOfAnime";
import MobileSection from "@/components/anime-detailed/MobileSection";

interface Props {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
    const { id } = await params;
    const anime: Anime | null = await getAnimeById(id);
    
    const episodePage: EpisodePage | null = await getEpisodesOfAnime(anime?.malId || 0);



    if (!anime) {
        return <div className="min-h-screen flex items-center justify-center">Error al cargar el anime</div>;
    }

    return (
        <div className="min-h-screen relative bg-black">
            {/* Hero */}
            <Hero bannerImage={anime.bannerImage} colorBg={anime.coverImage?.color} title={anime.title.romaji || anime.title.english} />

            {/* Content */}
            <main className=" relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="
                mt-48
                rounded-2xl
                shadow-2xl
                p-6
                hidden 
                lg:flex flex-col lg:flex-row
                gap-8
            "
                >
                    {/* Left */}
                    <LeftSection
                        coverImage={anime.coverImage?.extraLarge || anime.coverImage?.large}
                        title={anime.title.romaji || anime.title.english}
                        studio={anime.studio}
                        source={anime.source}
                        episodes={anime.episodes}
                        startDate={anime.startDate}
                        endDate={anime.endDate}
                        season={anime.season}
                        seasonYear={anime.seasonYear}
                        countryOfOrigin={anime.countryOfOrigin}
                        isAdult={anime.isAdult}
                        nextAiringEpisode={anime.nextAiringEpisode}
                        duration={anime.duration}
                        relations={anime.relations}
                    />

                    {/* Right */}
                    <RightSection
                        malId={anime.malId}
                        titleRomaji={anime.title.romaji}
                        titleEnglish={anime.title.english}
                        synonyms={anime.synonyms}
                        averageScore={anime.averageScore}
                        popularity={anime.popularity}
                        status={anime.status}
                        genres={anime.genres}
                        description={anime.description}
                        trailer={anime.trailer}
                        episodePage={episodePage}
                        episodes={anime.episodes}
                    />
                </div>

                <div className="lg:hidden">
                    <MobileSection anime={anime} episodePage={episodePage} />
                </div>
            </main>
        </div>
    );
}
