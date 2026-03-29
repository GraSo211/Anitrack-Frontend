import { getBannerImageFromAnimeOfSeason } from "@/actions/animes/getBannerImageFromAnimeOfSeason";
import Image from "next/image";
import Link from "next/link";
import React from "react";



export default async function HeroSection() {
    const bannerImage = await getBannerImageFromAnimeOfSeason();

    return (
        <section className="relative w-full h-162.5 flex items-center px-6 md:px-16 lg:px-28">
            {bannerImage ? (
                <Image
                    src={bannerImage}
                    alt="Hero Image"
                    fill
                    priority
                    loading="eager"
                    className="absolute inset-0 object-cover object-center -z-10
                mask-[linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_95%)]
                saturate-[1.3] brightness-[0.85]"
                />
            ) : (
                <div className="absolute inset-0 bg-linear-to-b from-gray-800 to-gray-900 -z-10" />
            )}


            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent -z-10" />

            <div className="flex flex-col gap-4 max-w-3xl ">
                <h1 className={`
                    text-3xl font-extrabold tracking-tight
                    md:text-5xl
                    2xl:text-6xl  
                    `}>ANITRACK</h1>

                <h2 className={`
                    text-xl font-semibold
                    md:text-3xl 
                    `}>MANTENTE AL DIA CON TUS SERIES FAVORITAS</h2>

                <p className={`
                    text-lg mt-2 font-light text-white/80 leading-relaxed
                    `} > Sigue tus series, descubre nuevos animes y mantente al día con las últimas tendencias en el mundo del anime.</p>

                <div className={`
                    flex gap-3 mt-6
                    2xl:gap-6
                    `}>
                    <Link href="/animes"
                        className={`
                            cursor-pointer
                         text-sm px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transition-all shadow-lg shadow-black/30
                         2xl:px-6 2xl:text-base
                        hover:bg-white/20 
                    `}
                    >
                        Comenzar a Trackear
                    </Link>

                    <Link href="/login"
                        className={`
                            cursor-pointer
                        text-sm px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all shadow 
                        2xl:px-6 2xl:text-base
                        hover:bg-white/15 ` }
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </section>
    );
}
