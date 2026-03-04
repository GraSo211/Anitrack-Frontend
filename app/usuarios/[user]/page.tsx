import { getUserByUsername } from '@/actions/getUserByUsername';
import Stat from '@/components/user/Stat';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    params: Promise<{ user: string }>;
}

export default async function Page({ params }: Props) {
    
  const user = await getUserByUsername((await params).user);
    if (!user) {
        return (
            <div className="max-w-5xl mx-auto p-6 text-white">
                <h1 className="text-2xl font-bold">Usuario no encontrado.</h1>
            </div>
        );
    }

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">

      <div className="flex flex-col md:flex-row gap-6 items-start">

        <Image
          src={user.imageUrl}
          alt={user.username}
          width={160}
          height={160}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{user.username}</h1>

          <p className="text-sm opacity-80">
            Se unio: {new Date(user.joined).toLocaleDateString()}
          </p>

          <p className="text-sm opacity-80">
            Ultima Conexión: {new Date(user.lastOnline).toLocaleString()}
          </p>

          {user.gender && (
            <p className="text-sm">Genero: {user.gender}</p>
          )}

          {user.location && (
            <p className="text-sm">Ubicacion: {user.location}</p>
          )}

          {user.birthday && (
            <p className="text-sm">
              Cumpleaños: {new Date(user.birthday).toLocaleDateString()}
            </p>
          )}

          <Link
            href={user.url}
            target="_blank"
            className="text-blue-400 hover:underline text-sm"
          >
            Ver en MyAnimeList
          </Link>
        </div>

      </div>

      <div className="mt-8">

        <h2 className="text-2xl font-semibold mb-4">Estadisticas</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Stat label="Dias Vistos" value={user.statistics.daysWatched} />
          <Stat label="Puntaje Promedio" value={user.statistics.meanScore} />
          <Stat label="Viendo" value={user.statistics.watching} />
          <Stat label="Completado" value={user.statistics.completed} />
          <Stat label="En Espera" value={user.statistics.onHold} />
          <Stat label="Abandonado" value={user.statistics.dropped} />
          <Stat label="Planeado Ver" value={user.statistics.planToWatch} />
          <Stat label="Episodios Vistos" value={user.statistics.episodesWatched} />

        </div>

      </div>

      <div className="mt-8">

        <h2 className="text-2xl font-semibold mb-4">Redes Externas</h2>

        <ul className="flex flex-col gap-2">
          {user.external.map((ext) => (
            <li key={ext.url}>
              <Link
                href={ext.url}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                {ext.name}
              </Link>
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}

