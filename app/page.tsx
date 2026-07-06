import BestAnimeSeason from "@/components/anime-general/BestAnimeSeason";
import AiringAnimeTable from "@/components/anime-general/table/AiringAnimeTable";
import AnimeCategories from "@/components/general-components/AnimeCategories";
import HeroSection from "@/components/general-components/HeroSection";



export default async function Home() {
    

    return (
        <main className="flex flex-col items-center gap-3 justify-center min-h-screen     ">
            <section className="w-full flex justify-center ">
                <HeroSection></HeroSection>
            </section>
            <section className="flex justify-center  ">
                <AiringAnimeTable />
            </section>

            <section className="w-full flex justify-center ">
                <BestAnimeSeason></BestAnimeSeason>
            </section>
          
            <section className="flex   justify-center  w-full   p-2 ">
                <AnimeCategories></AnimeCategories>
            </section>
        </main>
    );
}
