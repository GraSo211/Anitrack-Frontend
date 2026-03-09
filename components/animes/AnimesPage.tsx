"use client";
import React, { useState, useEffect } from 'react';

import AnimeCard from '@/components/anime/horizontal-list/AnimeCard';
import { AnimeCard as AnimeCardType } from '@/types/AnimeCard';
import Filters from '@/components/animes/Filters';
import { Genre } from '@/types/Genre';
import { Tag } from '@/types/Tag';
import { getFilteredAnimes } from '@/actions/getFilteredAnimes';

interface Props {
  genres: Genre[] | null;
  tags: Tag[] | null;
}

export default function AnimesPage({ genres, tags }: Props) {


  const [genreSelected, setGenre] = useState<string[]>([]);
  const [tagSelected, setTag] = useState<string[]>([]);
  const [yearSelected, setYear] = useState<string>("");
  const [seasonSelected, setSeason] = useState<string>('');
  const [statusSelected, setStatus] = useState<string>(''); 
  const [filteredAnimes, setFilteredAnimes] = useState<AnimeCardType[]>([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      const data = await getFilteredAnimes({ genre: genreSelected, tag: tagSelected, season: seasonSelected, year: yearSelected, status: statusSelected });
      if (data) {
        setFilteredAnimes(data);
      }
    };
    fetchAnimes();
  }, [genreSelected, tagSelected, seasonSelected, yearSelected, statusSelected]);



  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-2">
          Animes
        </h1>

        <Filters genres={genres} tags={tags} genreSelected={genreSelected} tagSelected={tagSelected} yearSelected={yearSelected} seasonSelected={seasonSelected} statusSelected={statusSelected} setGenres={setGenre} setTags={setTag} setYear={setYear} setSeason={setSeason} setStatus={setStatus}  ></Filters>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
          {filteredAnimes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
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
