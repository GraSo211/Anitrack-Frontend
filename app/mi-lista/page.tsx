import { cookies } from "next/headers"
import type { Metadata } from "next"
import { getAnimeListEnriched } from "@/actions/anime-list/getAnimeListEnriched"
import { getAllGenres } from '@/actions/animes/getAllGenres';
import { getAllTags } from '@/actions/animes/getAllTags';
import { redirect } from "next/navigation";
import AnimeListWithFilters from "@/components/anime-general/animeList/AnimeListWithFilters";
import EmptyState from "@/components/general-components/EmptyState";
import Link from "next/link";
import { FiInbox, FiAlertCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Mi lista",
  description: "Gestiona los animes que estás viendo, los que tenés pendientes y los ya terminados. Tu progreso, tus puntuaciones y tu historial en un solo lugar.",
  alternates: { canonical: "/mi-lista" },
  robots: { index: false, follow: false },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/iniciar-sesion");
  }

  const { status } = await searchParams ?? "";

  const animeListResult = await getAnimeListEnriched(token, status);
  const genres = await getAllGenres();
  const tags = await getAllTags();

  if (!animeListResult) {
    return (
      <div className="p-6 text-text-primary flex justify-center items-center min-h-[60vh]">
        <EmptyState
          icon={<FiAlertCircle className="w-10 h-10" />}
          title="Error al cargar tu lista"
          description="No pudimos obtener tus animes. Intentá nuevamente más tarde."
        />
      </div>
    );
  }

  const animeList = animeListResult.animeList;

  if (animeList.length === 0) {
    return (
      <div className="p-6 text-text-primary flex justify-center items-center min-h-[60vh]">
        <EmptyState
          icon={<FiInbox className="w-10 h-10" />}
          title="Tu lista está vacía"
          description={status ? "No hay animes con ese estado." : "Todavía no agregaste ningún anime a tu lista."}
          action={
            <Link
              href="/animes"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-body-sm font-medium bg-accent-primary text-white hover:bg-accent-primary-hover transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
            >
              Explorar animes
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6 text-text-primary flex justify-center items-center flex-col">
      <AnimeListWithFilters animeList={animeListResult} genres={genres} tags={tags} />
    </div>
  );
}
