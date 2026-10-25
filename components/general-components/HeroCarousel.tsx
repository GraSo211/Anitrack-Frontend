"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FiPause, FiPlay } from "react-icons/fi";
import { clsx } from "clsx";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface Props {
    images: string[];
}

export default function HeroCarousel({ images }: Props) {
    const hasMultiple = images.length > 1;
    const swiperRef = useRef<SwiperType | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            setReducedMotion(false);
            return;
        }

        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(media.matches);

        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    const handleTogglePause = () => {
        const swiper = swiperRef.current;
        if (!swiper || !swiper.autoplay) return;

        if (isPaused) {
            swiper.autoplay.start();
        } else {
            swiper.autoplay.stop();
        }
        setIsPaused((prev) => !prev);
    };

    const autoplayConfig =
        hasMultiple && !reducedMotion
            ? { delay: 5000, disableOnInteraction: false }
            : false;

    const effect = reducedMotion ? undefined : "fade";

    return (
        <section
            className="relative w-full h-162.5 flex items-center px-6 md:px-16 lg:px-28 overflow-hidden"
            aria-roledescription="carrusel"
            aria-label="Animes destacados"
            aria-live="polite"
        >
            {images.length > 0 ? (
                <div className="absolute inset-0 -z-20">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Autoplay, EffectFade, Pagination]}
                        effect={effect}
                        slidesPerView={1}
                        loop={hasMultiple}
                        autoplay={autoplayConfig}
                        pagination={hasMultiple ? { clickable: true } : false}
                        className="w-full h-full"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide
                                key={image}
                                className="relative w-full h-full"
                                aria-label={`Diapositiva ${index + 1} de ${images.length}`}
                                aria-roledescription="slide"
                            >
                                <Image
                                    src={image}
                                    alt={`Hero Image ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    className="object-cover object-center saturate-[1.3] brightness-[0.85]"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className="absolute inset-0 bg-linear-to-b from-bg-tertiary to-bg-primary -z-20" />
            )}

            {/* Side overlay for text legibility */}
            <div
                className="absolute inset-0 -z-10 bg-linear-to-r from-bg-primary/85 via-bg-primary/50 to-transparent"
                aria-hidden="true"
            />

            {/* Bottom fade into theme background */}
            <div
                className="absolute inset-x-0 bottom-0 h-40 -z-10 bg-linear-to-t from-bg-primary via-bg-primary/60 to-transparent"
                aria-hidden="true"
            />

            {hasMultiple && !reducedMotion && (
                <button
                    type="button"
                    onClick={handleTogglePause}
                    aria-label={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
                    aria-pressed={isPaused}
                    className={clsx(
                        "absolute bottom-4 right-4 z-20",
                        "flex items-center justify-center",
                        "w-10 h-10 rounded-full",
                        "bg-bg-secondary/80 backdrop-blur-md border border-border-default",
                        "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
                        "transition-all duration-fast",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
                    )}
                >
                    {isPaused ? <FiPlay className="w-4 h-4" /> : <FiPause className="w-4 h-4" />}
                </button>
            )}

            <div className="flex flex-col gap-4 max-w-3xl">
                <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl 2xl:text-6xl text-text-primary">
                    ANITRACK
                </h1>

                <h2 className="text-xl font-semibold md:text-3xl text-text-primary">
                    MANTENTE AL DIA CON TUS SERIES FAVORITAS
                </h2>

                <p className="text-lg mt-2 font-light text-text-secondary leading-relaxed">
                    Sigue tus series, descubre nuevos animes y mantente al día con las últimas tendencias en el mundo del anime.
                </p>

                <div className="flex gap-3 mt-6 2xl:gap-6">
                    <Link
                        href="/animes"
                        className={clsx(
                            "text-sm px-4 py-3 rounded-xl transition-all shadow-lg",
                            "bg-bg-secondary/60 backdrop-blur-md border border-border-default text-text-primary",
                            "2xl:px-6 2xl:text-base",
                            "hover:bg-bg-tertiary/80 hover:border-border-strong"
                        )}
                    >
                        Comenzar a Trackear
                    </Link>

                    <Link
                        href="/iniciar-sesion"
                        className={clsx(
                            "text-sm px-4 py-3 rounded-xl transition-all shadow",
                            "bg-bg-primary/40 backdrop-blur-md border border-border-default/60 text-text-primary",
                            "2xl:px-6 2xl:text-base",
                            "hover:bg-bg-secondary/60 hover:border-border-default"
                        )}
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </section>
    );
}
