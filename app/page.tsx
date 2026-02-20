import AiringAnimeTable from "../components/anime/table/AiringAnimeTable";

import HeroSection from "@/components/general-components/HeroSection";
import BestAnimeSeason from "@/components/anime/BestAnimeSeason";
import AnimeCategories from "@/components/general-components/AnimeCategories";

export default async function Home() {
    

    return (
        <main className="flex flex-col items-center gap-3 justify-center min-h-screen     ">
            <section className="w-full flex justify-center ">
                <HeroSection></HeroSection>
            </section>
            <section className="flex justify-center  ">
                <AiringAnimeTable />
            </section>

            <section className="w-full flex justify-center hidden">
                <BestAnimeSeason></BestAnimeSeason>
            </section>
          
            <section className="flex w-3/5  justify-center hidden">
                <AnimeCategories></AnimeCategories>
            </section>
        </main>
    );
}
