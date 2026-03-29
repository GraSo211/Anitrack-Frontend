"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Stat from "@/components/user/Stat";
import { User } from "@/types/user/User";
import { useUserStore } from "@/stores/user";
import Link from "next/link";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`,
          { credentials: "include" }
        );

        if (!response.ok) throw new Error("No autenticado");

        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
    else setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Cargando perfil...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        No hay usuario autenticado
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">

      {/* HEADER */}
      <div className="flex gap-6 items-center border-b border-white/10 pb-6">

        <Image
          src={user.picture ?? "/coverImagePlaceholder.png"}
          alt={user.name}
          width={120}
          height={120}
          className="rounded-xl object-cover"
        />

        <div className="flex flex-col gap-2">

          <h1 className="text-3xl font-bold">{user.name}</h1>

          <div className="flex flex-wrap gap-4 text-sm opacity-70">
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

      {/* STATS PRINCIPALES */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Listas de Animes</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          <Link href="/lista-anime?status=watching">
            <Stat label="Viendo" value={user.statistics.numWatching} clickable />
          </Link>

          <Link href="/lista-anime?status=completed">
            <Stat label="Completado" value={user.statistics.numCompleted} clickable />
          </Link>

          <Link href="/lista-anime?status=on_hold">
            <Stat label="En espera" value={user.statistics.numOnHold} clickable />
          </Link>

          <Link href="/lista-anime?status=dropped">
            <Stat label="Abandonado" value={user.statistics.numDropped} clickable />
          </Link>

          <Link href="/lista-anime?status=plan_to_watch">
            <Stat label="Planeado" value={user.statistics.numPlanToWatch} clickable />
          </Link>

          <Link href="/lista-anime">
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

    </div>
  );
}