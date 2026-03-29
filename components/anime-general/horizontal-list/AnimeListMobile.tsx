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
export default function AnimeListMobile({ animes }: Props) {

    return (
        <div className=" flex justify-center items-center  w-60">
            <Swiper
                modules={[Autoplay, Navigation]}
                className=""
                spaceBetween={5}
                autoplay
                slidesPerView={2}
                loop

            >


                {animes.map((anime: AnimeCardType) => (
                    <SwiperSlide  key={anime.id}>
                        <AnimeCard anime={anime} />
                    </SwiperSlide>
                ))}


            </Swiper>
        </div>
    );
}
