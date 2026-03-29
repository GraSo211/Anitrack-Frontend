import { cookies } from "next/headers"
import { getAnimeList } from "@/actions/anime-list/getAnimeList"
import { redirect } from "next/navigation";
import AnimeList from "@/components/anime-general/animeList/AnimeList";


export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const { status } = await searchParams ?? ""; // default: todos

  const animeList = await getAnimeList(token, status);


  if (!animeList) {
    return <div className="text-white p-6">Error al cargar la lista</div>;
  }

  const statusDicc = {
    watching: "Viendo",
    completed: "Completado",
    on_hold: "En espera",
    dropped: "Abandonado",
    plan_to_watch: "Planeado"
  }
  const label = status && status in statusDicc
    ? statusDicc[status as keyof typeof statusDicc]
    : "Todos";
  return (
    <div className="p-6 text-white flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold mb-6">Animes en estado: {label}</h1>

      <AnimeList animeList={animeList} ></AnimeList>
    </div>
  );
}