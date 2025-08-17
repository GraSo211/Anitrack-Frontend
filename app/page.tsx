import AiringAnimeTable from '../components/anime/table/AiringAnimeTable';
import AnimeList from '../components/anime/horizontal-list/AnimeList';
export default function Home() {
    return (
        <main className="flex flex-col items-center gap-3 justify-center min-h-screen     ">
            <section className='flex justify-center'>
                <AiringAnimeTable />
            </section>
            <section className='flex w-3/5  justify-center'>
                <AnimeList />
            </section>
        </main>
    );
}
