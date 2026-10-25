"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import { AnimeCard as AnimeCardType } from "@/types/anime/Anime";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FiPause, FiPlay } from "react-icons/fi";

interface Props {
    animes: AnimeCardType[],
}
export default function AnimeListCarousel({ animes }: Props) {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [isAutoplaying, setIsAutoplaying] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(media.matches);
        setIsAutoplaying(!media.matches);

        const handler = (event: MediaQueryListEvent) => {
            setReducedMotion(event.matches);
            setIsAutoplaying(!event.matches);
        };

        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (!swiperInstance || !swiperInstance.autoplay) return;

        if (isAutoplaying && !reducedMotion) {
            swiperInstance.autoplay.start();
        } else {
            swiperInstance.autoplay.stop();
        }
    }, [isAutoplaying, reducedMotion, swiperInstance]);

    const toggleAutoplay = () => {
        setIsAutoplaying((prev) => !prev);
    };

    return (
        <div className="max-w-full min-w-0">
            {!reducedMotion && (
            <div className="flex justify-end mb-1">
                <button
                    type="button"
                    onClick={toggleAutoplay}
                    aria-pressed={isAutoplaying && !reducedMotion}
                    aria-label={isAutoplaying && !reducedMotion ? "Pausar carrusel" : "Reanudar carrusel"}
                    className="inline-flex items-center gap-1.5 rounded-md bg-bg-tertiary border border-border-default px-2 py-1 text-caption font-medium text-text-secondary hover:text-text-primary hover:bg-bg-quaternary focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-colors"
                >
                    {isAutoplaying && !reducedMotion ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
                    {isAutoplaying && !reducedMotion ? "Pausar" : "Reproducir"}
                </button>
            </div>
            )}
            <Swiper
                onSwiper={setSwiperInstance}
                modules={[Autoplay, Navigation]}
                slidesPerView={3}
                spaceBetween={8}
                loop
                autoplay={reducedMotion ? false : { pauseOnMouseEnter: true }}
                navigation
                breakpoints={{
                    520: { slidesPerView: 3, spaceBetween: 8 },
                    768: { slidesPerView: 4, spaceBetween: 12 },
                    1024: { slidesPerView: 4, spaceBetween: 12 },
                    1280: { slidesPerView: 5, spaceBetween: 12 },
                    1536: { slidesPerView: 6, spaceBetween: 12 },
                }}
            >
                {animes.map((anime: AnimeCardType) => (
                    <SwiperSlide key={anime.id}>
                        <AnimeCard anime={anime} className="w-full lg:w-full" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
