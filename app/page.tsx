import { Suspense } from "react";
import type { Metadata } from "next";
import BestAnimeSeason from "@/components/anime-general/BestAnimeSeason";
import AiringAnimeTable from "@/components/anime-general/table/AiringAnimeTable";
import AnimeCategories from "@/components/general-components/AnimeCategories";
import HeroSection from "@/components/general-components/HeroSection";
import Skeleton from "@/components/general-components/Skeleton";

export const metadata: Metadata = {
    title: { absolute: "Anitrack - Tu rastreador de anime" },
    description: "Lleva el control de tus animes vistos, descubre los estrenos de la temporada y organiza tu lista de pendientes en un solo lugar. ¡Regístrate y personaliza tu perfil!",
    alternates: { canonical: "/" },
    openGraph: { url: "/" },
};

function HeroSkeleton() {
    return (
        <div className="w-full h-162.5 px-6 md:px-16 lg:px-28 flex items-center">
            <div className="flex flex-col gap-4 max-w-3xl w-full">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-8 w-96" />
                <Skeleton className="h-20 w-full max-w-2xl" />
                <div className="flex gap-3 mt-6">
                    <Skeleton className="h-12 w-40 rounded-xl" />
                    <Skeleton className="h-12 w-40 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

function SectionSkeleton({ lines = 1 }: { lines?: number }) {
    return (
        <div className="w-full max-w-7xl px-4 py-6 flex flex-col items-center gap-4">
            <Skeleton className="h-8 w-64" />
            {lines > 1 && <Skeleton className="h-4 w-96" />}
            <Skeleton className="h-48 w-full rounded-xl" />
        </div>
    );
}

export default async function Home() {
    return (
        <div className="flex flex-col items-center gap-3 justify-center min-h-screen">
            <section className="w-full flex justify-center">
                <Suspense fallback={<HeroSkeleton />}>
                    <HeroSection />
                </Suspense>
            </section>

            <section className="flex justify-center w-full">
                <Suspense fallback={<SectionSkeleton lines={2} />}>
                    <AiringAnimeTable />
                </Suspense>
            </section>

            <section className="w-full flex justify-center">
                <Suspense fallback={<SectionSkeleton />}>
                    <BestAnimeSeason />
                </Suspense>
            </section>

            <section className="flex justify-center w-full p-2">
                <Suspense fallback={<SectionSkeleton />}>
                    <AnimeCategories />
                </Suspense>
            </section>
        </div>
    );
}
