"use client";
import React, { useState, useEffect } from 'react';

import { AnimeCard as AnimeCardType } from '@/types/anime/Anime';
import Filters from '@/components/anime-general/filters/Filters';
import { Genre } from '@/types/anime/Genre';
import { Tag } from '@/types/anime/Tag';
import { getFilteredAnimes } from '@/actions/animes/getFilteredAnimes';
import AnimeCard from '../anime-general/horizontal-list/AnimeCard';
import EmptyState from '@/components/general-components/EmptyState';
import Skeleton from '@/components/general-components/Skeleton';
import { FiInbox, FiAlertTriangle } from 'react-icons/fi';

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchAnimes = async () => {
      setIsLoading(true);
      setHasError(false);
      const data = await getFilteredAnimes({ cant: 25, genre: genreSelected, tag: tagSelected, season: seasonSelected, year: yearSelected, status: statusSelected });
      if (data) {
        setFilteredAnimes(data);
      } else {
        setFilteredAnimes([]);
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchAnimes();
  }, [genreSelected, tagSelected, seasonSelected, yearSelected, statusSelected]);



  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-text-primary mb-2">
          Animes
        </h1>

        <Filters genres={genres} tags={tags} genreSelected={genreSelected} tagSelected={tagSelected} yearSelected={yearSelected} seasonSelected={seasonSelected} statusSelected={statusSelected} setGenres={setGenre} setTags={setTag} setYear={setYear} setSeason={setSeason} setStatus={setStatus}  ></Filters>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : hasError ? (
          <EmptyState
            icon={<FiAlertTriangle className="w-8 h-8" />}
            title="No se pudieron cargar los animes"
            description="Ocurrió un problema al buscar el catálogo. Intentá nuevamente más tarde."
          />
        ) : filteredAnimes.length === 0 ? (
          <EmptyState
            icon={<FiInbox className="w-8 h-8" />}
            title="No se encontraron animes"
            description="Probá con otros filtros para ver más resultados."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAnimes.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
