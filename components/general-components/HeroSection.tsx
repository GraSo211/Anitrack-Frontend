import { getAnimeOfSeason } from "@/actions/getAnimeOfSeason";
import Image from "next/image";
import React from "react";



export default async function HeroSection() {
    const anime = await getAnimeOfSeason();

    return (
        <section className="relative w-full h-[650px] flex items-center px-6 md:px-16 lg:px-28">
            <Image
                src={anime.bannerImage}
                alt="Hero Image"
                fill
                className="absolute inset-0 object-cover object-center -z-10
                [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_95%)]
                saturate-[1.3] brightness-[0.85]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent -z-10" />

            <div className="flex flex-col gap-4 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">ANITRACK</h1>

                <h2 className="text-2xl md:text-3xl font-semibold">MANTENTE AL DIA CON TUS SERIES FAVORITAS</h2>
                <p className="text-lg mt-2 font-light text-white/80 leading-relaxed">Sigue tus series, descubre nuevos animes y mantente al día con las últimas tendencias en el mundo del anime.</p>
                
                <div className="flex gap-6 mt-6">
                    <button
                        className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 
                    hover:bg-white/20 transition-all shadow-lg shadow-black/30"
                    >
                        Comenzar a Trackear
                    </button>

                    <button
                        className="px-6 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 
                    hover:bg-white/15 transition-all shadow"
                    >
                        Explorar Catalogo
                    </button>
                </div>
            </div>
        </section>
    );
}
