import AiringAnimeTable from '../components/anime-table/AiringAnimeTable';
export default function Home() {
    return (
        <main className="flex flex-col items-center gap-3 justify-center min-h-screen     ">
            <section className='flex justify-center'>
                <AiringAnimeTable />
            </section>
            <section className='flex w-3/4 bg-gray-700 justify-center'>
                <h2>Lo mejor de la Temporada</h2>
                
            </section>
        </main>
    );
}
