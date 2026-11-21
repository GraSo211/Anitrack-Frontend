import Image from "next/image";
import Link from "next/link";
import Stat from "@/components/user/Stat";
import { User } from "@/types/user/User";

export default function ProfileView({ user }: { user: User }) {
  return (
    <div className="max-w-6xl mx-auto p-6 text-text-primary">

      {/* HEADER */}
      <div className="flex gap-6 items-center border-b border-border-default pb-6">

        <Image
          src={user.picture ?? "/coverImagePlaceholder.png"}
          alt={user.name}
          width={120}
          height={120}
          className="rounded-xl object-cover"
        />

        <div className="flex flex-col gap-2">

          <h1 className="text-3xl font-bold">{user.name}</h1>

          {user.admin && (
            <span className="w-fit rounded-full bg-accent-primary-subtle px-3 py-1 text-xs font-medium text-accent-primary">
              Administrador
            </span>
          )}

          <Link href={user.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-primary hover:underline w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded">
            Ver en MyAnimeList
          </Link>

          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            {user.location && <span>{user.location}</span>}
            {user.gender && <span>{user.gender}</span>}
            {user.joinedAt && (
              <span>
                Desde {new Date(user.joinedAt).toLocaleDateString()}
              </span>
            )}
          </div>

        </div>

      </div>

      {user.statistics === null ? (
        <p className="mt-8 text-text-secondary">Estadísticas no disponibles</p>
      ) : (
        <>
          {/* STATS PRINCIPALES */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Listas de Animes</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

              <Link href="/mi-lista?status=watching" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded-xl">
                <Stat label="Viendo" value={user.statistics.numWatching} clickable />
              </Link>

              <Link href="/mi-lista?status=completed" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded-xl">
                <Stat label="Completado" value={user.statistics.numCompleted} clickable />
              </Link>

              <Link href="/mi-lista?status=on_hold" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded-xl">
                <Stat label="En espera" value={user.statistics.numOnHold} clickable />
              </Link>

              <Link href="/mi-lista?status=dropped" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded-xl">
                <Stat label="Abandonado" value={user.statistics.numDropped} clickable />
              </Link>

              <Link href="/mi-lista?status=plan_to_watch" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded-xl">
                <Stat label="Planeado" value={user.statistics.numPlanToWatch} clickable />
              </Link>

              <Link href="/mi-lista" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded-xl">
                <Stat label="Total" value={user.statistics.numTotal} clickable />
              </Link>

            </div>
          </section>

          {/* MÉTRICAS */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Actividad</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <Stat label="Episodios vistos" value={user.statistics.episodesWatched} />
              <Stat label="Puntaje promedio" value={user.statistics.meanScore} />
              <Stat label="Rewatch" value={user.statistics.timesRewatched} />
              <Stat label="Días totales" value={user.statistics.daysTotal} />

            </div>
          </section>

          {/* TIEMPO */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Tiempo</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              <Stat label="Días viendo" value={user.statistics.daysWatched} />
              <Stat label="En emisión" value={user.statistics.daysWatching} />
              <Stat label="Completados" value={user.statistics.daysCompleted} />

            </div>
          </section>
        </>
      )}

    </div>
  );
}
