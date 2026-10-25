"use client";
import { Genre } from '@/types/anime/Genre';
import { Tag } from '@/types/anime/Tag';
import React, { useState, useRef, useEffect, useId } from "react";
import { FaTags } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TbRating18Plus } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";

export interface FiltersProps {
  genres: Genre[] | null;
  tags: Tag[] | null;
  genreSelected: string[];
  tagSelected: string[];
  yearSelected: string;
  seasonSelected: string;
  statusSelected: string;
  setGenres: (genre: string[]) => void;
  setTags: (tag: string[]) => void;
  setYear: (year: string) => void;
  setSeason: (season: string) => void;
  setStatus: (status: string) => void;
}


const toggleArrayItem = (item: string, array: string[], setArray: (newArray: string[]) => void) => {
  setArray(array.includes(item) ? array.filter((v) => v !== item) : [...array, item]);
};


type FilterKey = 'genres' | 'year' | 'season' | 'status';

const SEASON_OPTIONS = [
  { label: "Invierno", value: "WINTER" },
  { label: "Primavera", value: "SPRING" },
  { label: "Verano", value: "SUMMER" },
  { label: "Otoño", value: "FALL" },
];

const STATUS_OPTIONS = [
  { label: "Finalizado", value: "FINISHED" },
  { label: "En emisión", value: "RELEASING" },
  { label: "En pausa", value: "HIATUS" },
  { label: "Aún no lanzado", value: "NOT_YET_RELEASED" },
  { label: "Cancelado", value: "CANCELLED" },
];

export default function Filters({ genres, tags, genreSelected, tagSelected, yearSelected, seasonSelected, statusSelected, setGenres, setTags, setYear, setSeason, setStatus }: FiltersProps) {
  const filterRef = useRef<HTMLDivElement>(null);
  const genresChecked = genres ? genres : [];
  const tagsChecked = tags ? tags : [];

  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const baseId = useId();

  const clearAllFilters = () => {
    setGenres([]);
    setTags([]);
    setYear("");
    setSeason("");
    setStatus("");
  };

  const toggleFilter = (key: FilterKey) => {
    setOpenFilter(openFilter === key ? null : key);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!filterRef.current) return;

      if (!filterRef.current.contains(event.target as Node)) {
        setOpenFilter(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const genreTriggerId = `${baseId}-genre-trigger`;
  const genreListId = `${baseId}-genre-list`;
  const yearTriggerId = `${baseId}-year-trigger`;
  const yearListId = `${baseId}-year-list`;
  const seasonTriggerId = `${baseId}-season-trigger`;
  const seasonListId = `${baseId}-season-list`;
  const statusTriggerId = `${baseId}-status-trigger`;
  const statusListId = `${baseId}-status-list`;

  const years = Array.from(
    { length: (new Date().getFullYear() + 1) - 1940 },
    (_, i) => (new Date().getFullYear() + 1) - i
  );

  return (

    <div ref={filterRef} className="flex flex-col gap-3 rounded-xl p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* GENRE */}
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor={genreTriggerId} className="text-body-sm font-medium text-text-secondary">Género</label>
          <button
            type="button"
            id={genreTriggerId}
            aria-haspopup="listbox"
            aria-expanded={openFilter === 'genres'}
            aria-controls={genreListId}
            className='cursor-pointer w-full bg-bg-tertiary border border-border-default py-1.5 rounded-md items-center text-text-primary select-none flex gap-1 focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'
            onClick={() => toggleFilter('genres')}
          >
            {!genreSelected[0] && !tagSelected[0] &&
              <span className='text-text-tertiary text-sm font-semibold pl-2'>Cualquiera</span>
            }

            <span className='rounded-md bg-bg-quaternary text-sm font-semibold ml-2 px-1'>
              {genreSelected[0] ?? tagSelected[0]}
            </span>

            <span className='rounded-md bg-bg-quaternary text-sm font-semibold px-1'>
              {genreSelected.length > 1 || tagSelected.length > 1
                ? ` +${genreSelected.length + tagSelected.length - 1}`
                : ""}
            </span>
          </button>

          {openFilter === 'genres' && (
            <div
              id={genreListId}
              role="listbox"
              aria-multiselectable="true"
              aria-labelledby={genreTriggerId}
              className='absolute top-full mt-1 w-full z-50 bg-bg-secondary border border-border-default flex flex-col gap-2 overflow-scroll max-h-50 rounded-md px-1 py-2'
            >
              <span className='font-bold px-1 text-text-primary'>Géneros</span>

              {genresChecked.map(g => (
                <button
                  type="button"
                  key={g.name}
                  role="option"
                  aria-selected={genreSelected.includes(g.name)}
                  className='flex cursor-pointer items-center justify-between gap-2 px-4 hover:bg-accent-primary-subtle text-text-primary rounded-xs p-1 text-left focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset'
                  onClick={() => toggleArrayItem(g.name, genreSelected, setGenres)}
                >
                  {g.name}
                  {genreSelected.includes(g.name) &&
                    <FaCircleCheck className="text-accent-primary" aria-hidden="true" />}
                </button>
              ))}

              <span className='font-bold px-1 text-text-primary'>Tags</span>

              {tagsChecked.map(t => (
                <button
                  type="button"
                  key={t.name}
                  role="option"
                  aria-selected={tagSelected.includes(t.name)}
                  className="group flex cursor-pointer relative items-center justify-between gap-2 px-4 hover:bg-accent-primary-subtle text-text-primary rounded-xs p-1 text-left focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset"
                  onClick={() => toggleArrayItem(t.name, tagSelected, setTags)}
                >
                  {t.name}

                  <span
                    className="
                      pointer-events-none
                      absolute top-full mt-1 left-0
                      w-full
                      rounded-md
                      bg-bg-primary/95
                      backdrop-blur-md
                      text-sm text-text-primary
                      px-3 py-2
                      opacity-0
                      group-hover:opacity-100
                      transition
                      z-50
                    "
                  >
                    {t.description}

                    {t.isAdult && <TbRating18Plus className='absolute bottom-1 right-1' size={25} color='red'></TbRating18Plus>}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>


        {/* YEAR */}
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor={yearTriggerId} className="text-body-sm font-medium text-text-secondary">Año</label>
          <button
            type="button"
            id={yearTriggerId}
            aria-haspopup="listbox"
            aria-expanded={openFilter === 'year'}
            aria-controls={yearListId}
            className='cursor-pointer w-full bg-bg-tertiary border border-border-default py-1.5 rounded-md items-center text-text-primary select-none flex gap-1 focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'
            onClick={() => toggleFilter('year')}
          >
            {!yearSelected &&
              <span className='text-text-tertiary text-sm font-semibold pl-2'>Cualquiera</span>
            }

            {yearSelected &&
              <span className='rounded-md bg-bg-quaternary text-sm font-semibold ml-2 px-1'>
                {yearSelected}
              </span>
            }
          </button>

          {openFilter === 'year' && (
            <div
              id={yearListId}
              role="listbox"
              aria-labelledby={yearTriggerId}
              className='absolute top-full mt-1 w-full z-50 bg-bg-secondary border border-border-default flex flex-col gap-1 overflow-scroll max-h-50 rounded-md px-1 py-2'
            >
              {years.map(y => (
                <button
                  type="button"
                  key={y}
                  role="option"
                  aria-selected={yearSelected === y.toString()}
                  className='flex cursor-pointer items-center justify-between px-4 hover:bg-accent-primary-subtle text-text-primary rounded-xs p-1 text-left focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset'
                  onClick={() => setYear(y.toString())}
                >
                  {y}
                  {yearSelected === y.toString() &&
                    <FaCircleCheck className="text-accent-primary" aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>


        {/* SEASON */}
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor={seasonTriggerId} className="text-body-sm font-medium text-text-secondary">Temporada</label>
          <button
            type="button"
            id={seasonTriggerId}
            aria-haspopup="listbox"
            aria-expanded={openFilter === 'season'}
            aria-controls={seasonListId}
            className='cursor-pointer w-full bg-bg-tertiary border border-border-default py-1.5 rounded-md items-center text-text-primary select-none flex gap-1 focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'
            onClick={() => toggleFilter('season')}
          >
            {!seasonSelected &&
              <span className='text-text-tertiary text-sm font-semibold pl-2'>Cualquiera</span>
            }

            {seasonSelected &&
              <span className='rounded-md bg-bg-quaternary text-sm font-semibold ml-2 px-1'>
                {seasonSelected}
              </span>
            }
          </button>

          {openFilter === 'season' && (
            <div
              id={seasonListId}
              role="listbox"
              aria-labelledby={seasonTriggerId}
              className='absolute top-full mt-1 w-full z-50 bg-bg-secondary border border-border-default flex flex-col gap-1 rounded-md px-1 py-2'
            >
              {SEASON_OPTIONS.map(s => (
                <button
                  type="button"
                  key={s.value}
                  role="option"
                  aria-selected={seasonSelected === s.value}
                  className='flex cursor-pointer items-center justify-between px-4 hover:bg-accent-primary-subtle text-text-primary rounded-xs p-1 text-left focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset'
                  onClick={() => setSeason(s.value)}
                >
                  {s.label}
                  {seasonSelected === s.value &&
                    <FaCircleCheck className="text-accent-primary" aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>


        {/* STATUS */}
        <div className='flex flex-col gap-1 relative'>
          <label htmlFor={statusTriggerId} className="text-body-sm font-medium text-text-secondary">Estado</label>
          <button
            type="button"
            id={statusTriggerId}
            aria-haspopup="listbox"
            aria-expanded={openFilter === 'status'}
            aria-controls={statusListId}
            className='cursor-pointer w-full bg-bg-tertiary border border-border-default py-1.5 rounded-md items-center text-text-primary select-none flex gap-1 focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'
            onClick={() => toggleFilter('status')}
          >
            {!statusSelected &&
              <span className='text-text-tertiary text-sm font-semibold pl-2'>Cualquiera</span>
            }

            {statusSelected &&
              <span className='rounded-md bg-bg-quaternary text-sm font-semibold ml-2 px-1'>
                {statusSelected}
              </span>
            }
          </button>

          {openFilter === 'status' && (
            <div
              id={statusListId}
              role="listbox"
              aria-labelledby={statusTriggerId}
              className='absolute top-full mt-1 w-full z-50 bg-bg-secondary border border-border-default flex flex-col gap-1 rounded-md px-1 py-2'
            >
              {STATUS_OPTIONS.map(s => (
                <button
                  type="button"
                  key={s.value}
                  role="option"
                  aria-selected={statusSelected === s.value}
                  className='flex cursor-pointer items-center justify-between px-4 hover:bg-accent-primary-subtle text-text-primary rounded-xs p-1 text-left focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset'
                  onClick={() => setStatus(s.value)}
                >
                  {s.label}
                  {statusSelected === s.value &&
                    <FaCircleCheck className="text-accent-primary" aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>


      {/* Selected Filters */}

      <div className='flex gap-2 items-center w-fit flex-wrap group'>
        <FaTags className="text-text-secondary" aria-hidden="true" />
        {genreSelected.filter((v): v is string => !!v).map((f, index) => (
          <button
            type="button"
            key={index}
            className="cursor-pointer bg-bg-tertiary text-text-primary border border-border-default px-2 py-1 rounded-md text-sm hover:bg-accent-primary-subtle focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={() => toggleArrayItem(f, genreSelected, setGenres)}
          >
            {f}
          </button>
        ))}

        {tagSelected.filter((v): v is string => !!v).map((f, index) => (
          <button
            type="button"
            key={index}
            className="cursor-pointer bg-bg-tertiary text-text-primary border border-border-default px-2 py-1 rounded-md text-sm hover:bg-accent-primary-subtle focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={() => toggleArrayItem(f, tagSelected, setTags)}
          >
            {f}
          </button>
        ))}

        {yearSelected && (
          <button
            type="button"
            className="cursor-pointer bg-bg-tertiary text-text-primary border border-border-default px-2 py-1 rounded-md text-sm hover:bg-accent-primary-subtle focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={() => setYear("")}
          >
            {yearSelected}
          </button>
        )}

        {seasonSelected && (
          <button
            type="button"
            className="cursor-pointer bg-bg-tertiary text-text-primary border border-border-default px-2 py-1 rounded-md text-sm hover:bg-accent-primary-subtle focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={() => setSeason("")}
          >
            {seasonSelected}
          </button>
        )}

        {statusSelected && (
          <button
            type="button"
            className="cursor-pointer bg-bg-tertiary text-text-primary border border-border-default px-2 py-1 rounded-md text-sm hover:bg-accent-primary-subtle focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            onClick={() => setStatus("")}
          >
            {statusSelected}
          </button>
        )}

        {
          (tagSelected.length !== 0 || genreSelected.length !== 0 || yearSelected || seasonSelected || statusSelected) && (
            <button
              type="button"
              className="cursor-pointer flex opacity-0 group-hover:opacity-100 duration-300 transition-opacity justify-center items-center gap-2 bg-bg-tertiary text-text-primary border border-border-default px-2 py-1 rounded-md text-sm focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              onClick={() => clearAllFilters()}
            >
              Borrar Todo <RxCross2 aria-hidden="true" />
            </button>
          )
        }
      </div>

    </div>
  )
}
