import { cookies } from "next/headers"
import { getAnimeList } from "@/actions/anime-list/getAnimeList"
import { redirect } from "next/navigation";
import AnimeList from "@/components/animeList/AnimeList";


export default async function Page({searchParams}:{searchParams: Promise<{status?: string}>}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const {status} = await searchParams ?? ""; // default: todos
  console.log(status)
  const animeList = await getAnimeList(token, status);

  if (!animeList) {
    return <div className="text-white p-6">Error al cargar la lista</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Anime List</h1>

      <AnimeList animeList={animeList} ></AnimeList>
    </div>
  );
}