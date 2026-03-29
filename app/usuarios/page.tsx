import { getRandomUsers } from '@/actions/user/getRandomUsers'
import { UserJikan } from '@/types/user/User';
import Link from 'next/link';
import React from 'react'
import UserSearch from '@/components/user/UserSearch';
import { UserRandom } from '@/types/user/User';

export default async function page() {
  const users: UserRandom[] | null = await getRandomUsers();
  const usersToShow = users ? users.slice(0, 12) : [];
  if (users === null) return;
  return (
    <div className="min-h-screen   px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">
          Usuarios
        </h1>

        <div className="flex flex-col items-center gap-3 mb-10">
          <p className="text-gray-200 text-lg">Buscar usuarios</p>

          <UserSearch />

        </div>

        {/* Usuarios Random */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {usersToShow.map((user) => (
            <div key={user.username} className='relative hover:-translate-y-1'>
              <Link

                href={`/usuarios/${user.username}`}
                className="bg-gray-800/50 rounded-xl mt-2 shadow-sm relative hover:shadow-md 
                         transition p-6 flex flex-col items-center 
                         border border-gray-600 "
              >
                <img
                  src={user.imageUrl}
                  alt={user.username}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />

                <h3 className="text-lg font-semibold text-gray-200">
                  {user.username}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Última conexión:{" "}
                  {new Date(user.lastOnline).toLocaleDateString()}{" "}
                  {new Date(user.lastOnline).toLocaleTimeString()}
                </p>

              </Link>

              <Link href={user.profileUrl} className="text-indigo-400 text-xs absolute top-0 right-2 hover:text-indigo-300 mt-2">
                Ver perfil de MyAnimeList
              </Link>
            </div>


          ))}
        </div>
      </div>
    </div>
  );
}
