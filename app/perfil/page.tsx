"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Stat from "@/components/user/Stat";
import Skeleton from "@/components/general-components/Skeleton";
import Button from "@/components/general-components/Button";
import { User } from "@/types/user/User";
import { useUserStore } from "@/stores/user";
import Link from "next/link";

function ProfileSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-text-primary">
      <div className="flex gap-6 items-center border-b border-border-default pb-6">
        <Skeleton className="w-[120px] h-[120px] rounded-xl shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <section className="mt-8">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const fetchUser = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`,
        { credentials: "include" }
      );

      if (response.status === 401) {
        window.location.href = "/iniciar-sesion";
        return;
      }

      if (!response.ok) throw new Error("No autenticado");

      const data: User = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
    else setLoading(false);
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-text-primary px-6 text-center">
        <p className="text-lg font-medium mb-2">No se pudo cargar el perfil</p>
        <p className="text-text-secondary mb-6">Verificá tu conexión e intentá de nuevo.</p>
        <Button onClick={fetchUser}>Reintentar</Button>
      </div>
    );
  }

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

          <Link href={user.url} target="_blank" className="text-sm text-accent-primary hover:underline w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded">
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
