"use client";
import React, { useState, useEffect } from 'react';
import { getReleasingAnimes } from '@/actions/getReleasingAnimes';
import { AnimeReleasing } from '@/types/AnimeReleasing';
import AnimeCard from '@/components/anime/horizontal-list/AnimeCard';
import { AnimeCard as AnimeCardType } from '@/types/AnimeCard';
import Filters from '@/components/animes/Filters';

export default function AnimesPage() {
  const [animes, setAnimes] = useState<AnimeReleasing[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<AnimeReleasing[]>([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      const data = await getReleasingAnimes();
      if (data) {
        setAnimes(data);
        setFilteredAnimes(data);
      }
    };
    fetchAnimes();
  }, []);

  // For now, filters are UI only, not applied
  // TODO: Implement filtering logic

  const convertToAnimeCard = (anime: AnimeReleasing): AnimeCardType => ({
    id: anime.id,
    title: {
      romaji: anime.title.romaji || '',
      english: anime.title.english || null,
    },
    coverImage: anime.coverImage,
  });

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-8">
          Animes
        </h1>

       <Filters></Filters>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredAnimes.map((anime) => (
            <AnimeCard key={anime.id} anime={convertToAnimeCard(anime)} />
          ))}
        </div>

        {filteredAnimes.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No se encontraron animes con los filtros seleccionados.
          </div>
        )}
      </div>
    </div>
  );
}
