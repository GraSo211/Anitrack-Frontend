import { cookies } from "next/headers"
import { getAnimeListEnriched } from "@/actions/anime-list/getAnimeListEnriched"
import { getAllGenres } from '@/actions/animes/getAllGenres';
import { getAllTags } from '@/actions/animes/getAllTags';
import { redirect } from "next/navigation";
import AnimeListWithFilters from "@/components/anime-general/animeList/AnimeListWithFilters";


export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const { status } = await searchParams ?? "";

  const animeList = await getAnimeListEnriched(token, status);
  const genres = await getAllGenres();
  const tags = await getAllTags();

  if (!animeList) {
    return <div className="text-white p-6">Error al cargar la lista</div>;
  }

  return (
    <div className="p-6 text-white flex justify-center items-center flex-col">
      <AnimeListWithFilters animeList={animeList} genres={genres} tags={tags} />
    </div>
  );
}
