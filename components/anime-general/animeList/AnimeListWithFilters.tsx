"use client";
import React, { useState, useMemo } from 'react';
import { Genre } from '@/types/anime/Genre';
import { Tag } from '@/types/anime/Tag';
import type { EnrichedAnimeItem, EnrichedAnimeList } from '@/actions/anime-list/getAnimeListEnriched';
import Filters from '@/components/anime-general/filters/Filters';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

interface Props {
  animeList: EnrichedAnimeList;
  genres: Genre[] | null;
  tags: Tag[] | null;
}

export default function AnimeListWithFilters({ animeList, genres, tags }: Props) {
  const [genreSelected, setGenre] = useState<string[]>([]);
  const [tagSelected, setTag] = useState<string[]>([]);
  const [yearSelected, setYear] = useState<string>('');
  const [seasonSelected, setSeason] = useState<string>('');
  const [statusSelected, setStatus] = useState<string>('');

  const filteredItems = useMemo(() => {
    const items = animeList.animeList;

    return items.filter((item) => {
      if (genreSelected.length > 0) {
        const hasGenre = genreSelected.some((g) =>
          item.genres.some((ig) => ig.toLowerCase() === g.toLowerCase())
        );
        if (!hasGenre) return false;
      }

      if (seasonSelected && item.season !== seasonSelected) {
        return false;
      }

      if (yearSelected && item.seasonYear !== null) {
        if (item.seasonYear.toString() !== yearSelected) return false;
      }

      if (statusSelected && item.animeStatus !== statusSelected) {
        return false;
      }

      return true;
    });
  }, [animeList.animeList, genreSelected, seasonSelected, yearSelected, statusSelected]);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center text-text-primary mb-2">
          Mi Lista
        </h1>

        <Filters
          genres={genres}
          tags={tags}
          genreSelected={genreSelected}
          tagSelected={tagSelected}
          yearSelected={yearSelected}
          seasonSelected={seasonSelected}
          statusSelected={statusSelected}
          setGenres={setGenre}
          setTags={setTag}
          setYear={setYear}
          setSeason={setSeason}
          setStatus={setStatus}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-6">
          {filteredItems.map((anime) => (
            <Link
              href={`/anime/m-${anime.id}`}
              key={anime.id}
              className="bg-bg-secondary border border-border-default rounded-lg overflow-hidden shadow hover:scale-105 transition"
            >
              <img
                src={anime.mainPicture.large}
                alt={anime.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-2">
                <h2 className="text-sm font-semibold line-clamp-2">
                  {anime.title}
                </h2>

                <div className="text-xs flex items-center gap-1 text-text-tertiary mt-1">
                  <FaStar size={20} /> {anime.score}
                </div>

                <div className="text-xs text-text-muted">
                  {anime.status}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center text-text-tertiary mt-8">
            No se encontraron animes con los filtros seleccionados.
          </div>
        )}
      </div>
    </div>
  );
}
