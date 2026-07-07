"use client";
import React from "react";
import AnimeCard from "./AnimeCard";
import { AnimeCard as AnimeCardType } from "@/types/anime/Anime";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

interface Props {
    animes: AnimeCardType[],
}
export default function AnimeListCarousel({ animes }: Props) {

    return (
        <div className="max-w-full min-w-0  ">
            <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView={3}
                spaceBetween={8}
                loop
                autoplay={{ pauseOnMouseEnter: true }}
                breakpoints={{
                    520: { slidesPerView: 3, spaceBetween: 8 },
                    768: { slidesPerView: 4, spaceBetween: 12 },
                    1024: { slidesPerView: 4, spaceBetween: 12, navigation: true },
                    1280: { slidesPerView: 5, spaceBetween: 12, navigation: true },
                    1536: { slidesPerView: 6, spaceBetween: 12, navigation: true },
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
