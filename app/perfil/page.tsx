"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Stat from "@/components/user/Stat";
import { User } from "@/types/User";

export default function Page() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {
      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`,
          {
            credentials: "include"
          }
        );

        if (!response.ok) {
          throw new Error("No autenticado");
        }

        const data = await response.json();
        setUser(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

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
    <div className="max-w-5xl mx-auto p-6 text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-6 items-start">

        <Image
          src={user.picture ?? "/coverImagePlaceholder.png"}
          alt={user.name}
          width={160}
          height={160}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-2">

          <h1 className="text-3xl font-bold">{user.name}</h1>

          <p className="text-sm opacity-80">
            ID: {user.id}
          </p>

          {user.joinedAt && (
            <p className="text-sm opacity-80">
              Se unió: {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          )}

          {user.gender && (
            <p className="text-sm opacity-80">
              Género: {user.gender}
            </p>
          )}

          {user.location && (
            <p className="text-sm opacity-80">
              Ubicación: {user.location}
            </p>
          )}

          {user.birthday && (
            <p className="text-sm opacity-80">
              Cumpleaños: {new Date(user.birthday).toLocaleDateString()}
            </p>
          )}

          {user.timeZone && (
            <p className="text-sm opacity-80">
              Zona horaria: {user.timeZone}
            </p>
          )}

        </div>

      </div>

      {/* ESTADÍSTICAS */}
      <div className="mt-10">

        <h2 className="text-2xl font-semibold mb-4">
          Estadísticas de Anime
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Stat label="Viendo" value={user.statistics.numWatching} />
          <Stat label="Completado" value={user.statistics.numCompleted} />
          <Stat label="En espera" value={user.statistics.numOnHold} />
          <Stat label="Abandonado" value={user.statistics.numDropped} />

          <Stat label="Planeado ver" value={user.statistics.numPlanToWatch} />
          <Stat label="Total Anime" value={user.statistics.numTotal} />

          <Stat label="Episodios vistos" value={user.statistics.episodesWatched} />
          <Stat label="Puntaje promedio" value={user.statistics.meanScore} />

        </div>

      </div>

      {/* MÉTRICAS EXTRA */}
      <div className="mt-10">

        <h2 className="text-2xl font-semibold mb-4">
          Métricas de Visualización
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <Stat label="Días viendo anime" value={user.statistics.daysWatched} />
          <Stat label="Días en emisión" value={user.statistics.daysWatching} />
          <Stat label="Días completados" value={user.statistics.daysCompleted} />

          <Stat label="Rewatch" value={user.statistics.timesRewatched} />
          <Stat label="Días totales" value={user.statistics.daysTotal} />

        </div>

      </div>

    </div>
  );
}