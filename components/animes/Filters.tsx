"use client";
import { Genre } from '@/types/Genre';
import { Tag } from '@/types/Tag';
import React, { useState, useRef, useEffect } from "react";
import { FaTags } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaCircleCheck } from "react-icons/fa6"; interface Props {
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


const removeFromArray = (item: string, array: string[], setArray: (newArray: string[]) => void) => {
  setArray(array.filter((v) => v !== item));
};


export default function Filters({ genres, tags, genreSelected, tagSelected, yearSelected, seasonSelected, statusSelected, setGenres, setTags, setYear, setSeason, setStatus }: Props) {
  const filterRef = useRef<HTMLDivElement>(null);
  const genresChecked = genres ? genres : [];
  const tagsChecked = tags ? tags : [];

  const [openFilter, setOpenFilter] = useState<string | null>(null)


  const clearAllFilters = () => {
    setGenres([]);
    setTags([]);
    setYear("");
    setSeason("");
    setStatus("");
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!filterRef.current) return;

      if (!filterRef.current.contains(event.target as Node)) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (

    <div ref={filterRef} className="flex flex-col gap-3 rounded-xl p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* GENRE */}
        <div className='flex flex-col gap-1 relative'>
          Género
          <div
            className='cursor-pointer w-full bg-gray-600/50 py-1.5 rounded-md items-center text-gray-200 select-none flex gap-1'
            onClick={() => setOpenFilter(openFilter === 'genres' ? null : 'genres')}
          >
            {!genreSelected[0] && !tagSelected[0] &&
              <span className='text-gray-400 text-sm font-semibold pl-2'>Cualquiera</span>
            }

            <span className='rounded-md bg-gray-600 text-sm font-semibold ml-2 px-1'>
              {genreSelected[0] ?? tagSelected[0]}
            </span>

            <span className='rounded-md bg-gray-600 text-sm font-semibold px-1'>
              {genreSelected.length > 1 || tagSelected.length > 1
                ? ` +${genreSelected.length + tagSelected.length - 1}`
                : ""}
            </span>
          </div>

          {openFilter === 'genres' && (
            <div className='absolute top-full mt-1 w-full z-50 bg-[#1f1f1f] flex flex-col gap-2 overflow-scroll max-h-50 rounded-md px-1 py-2'>
              <span className='font-bold px-1'>Géneros</span>

              {genresChecked.map(g => (
                <div
                  key={g.name}
                  className='flex cursor-pointer items-center justify-between gap-2 px-4 hover:bg-blue-700/40 rounded-xs p-1'
                  onClick={() => setGenres([...genreSelected, g.name])}
                >
                  {g.name}
                  {genreSelected.includes(g.name) &&
                    <FaCircleCheck color='#6fc8ff' />}
                </div>
              ))}

              <span className='font-bold px-1'>Tags</span>

              {tagsChecked.map(t => (
                <div
                  key={t.name}
                  className='flex cursor-pointer items-center justify-between gap-2 px-4 hover:bg-blue-700/40 rounded-xs p-1'
                >
                  {t.name}
                </div>
              ))}
            </div>
          )}
        </div>


        {/* YEAR */}
        <div className='flex flex-col gap-1 relative'>
          Año
          <div
            className='cursor-pointer w-full bg-gray-600/50 py-1.5 rounded-md items-center text-gray-200 select-none flex gap-1'
            onClick={() => setOpenFilter(openFilter === 'year' ? null : 'year')}
          >
            {!yearSelected &&
              <span className='text-gray-400 text-sm font-semibold pl-2'>Cualquiera</span>
            }

            {yearSelected &&
              <span className='rounded-md bg-gray-600 text-sm font-semibold ml-2 px-1'>
                {yearSelected}
              </span>
            }
          </div>

          {openFilter === 'year' && (
            <div className='absolute top-full mt-1 w-full z-50 bg-[#1f1f1f] flex flex-col gap-1 overflow-scroll max-h-50 rounded-md px-1 py-2'>
              {Array.from(
                { length: (new Date().getFullYear() + 1) - 1940 },
                (_, i) => (new Date().getFullYear() + 1) - i
              ).map(y => (
                <div
                  key={y}
                  className='flex cursor-pointer items-center justify-between px-4 hover:bg-blue-700/40 rounded-xs p-1'
                  onClick={() => setYear(y)}
                >
                  {y}
                  {yearSelected === y.toString() &&
                    <FaCircleCheck color='#6fc8ff' />}
                </div>
              ))}
            </div>
          )}
        </div>


        {/* SEASON */}
        <div className='flex flex-col gap-1 relative'>
          Temporada
          <div
            className='cursor-pointer w-full bg-gray-600/50 py-1.5 rounded-md items-center text-gray-200 select-none flex gap-1'
            onClick={() => setOpenFilter(openFilter === 'season' ? null : 'season')}
          >
            {!seasonSelected &&
              <span className='text-gray-400 text-sm font-semibold pl-2'>Cualquiera</span>
            }

            {seasonSelected &&
              <span className='rounded-md bg-gray-600 text-sm font-semibold ml-2 px-1'>
                {seasonSelected}
              </span>
            }
          </div>

          {openFilter === 'season' && (
            <div className='absolute top-full mt-1 w-full z-50 bg-[#1f1f1f] flex flex-col gap-1 rounded-md px-1 py-2'>
              {["WINTER", "SPRING", "SUMMER", "FALL"].map(s => (
                <div
                  key={s}
                  className='flex cursor-pointer items-center justify-between px-4 hover:bg-blue-700/40 rounded-xs p-1'
                  onClick={() => setSeason(s)}
                >
                  {s}
                  {seasonSelected === s &&
                    <FaCircleCheck color='#6fc8ff' />}
                </div>
              ))}
            </div>
          )}
        </div>


        {/* STATUS */}
        <div className='flex flex-col gap-1 relative'>
          Estado
          <div
            className='cursor-pointer w-full bg-gray-600/50 py-1.5 rounded-md items-center text-gray-200 select-none flex gap-1'
            onClick={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
          >
            {!statusSelected &&
              <span className='text-gray-400 text-sm font-semibold pl-2'>Cualquiera</span>
            }

            {statusSelected &&
              <span className='rounded-md bg-gray-600 text-sm font-semibold ml-2 px-1'>
                {statusSelected}
              </span>
            }
          </div>

          {openFilter === 'status' && (
            <div className='absolute top-full mt-1 w-full z-50 bg-[#1f1f1f] flex flex-col gap-1 rounded-md px-1 py-2'>

              {[
                { label: "Finalizado", value: "FINISHED" },
                { label: "En emisión", value: "AIRING" },
                { label: "Aun no lanzado", value: "NOT_YET_AIRED" },
                { label: "Cancelado", value: "CANCELLED" }
              ].map(s => (
                <div
                  key={s.value}
                  className='flex cursor-pointer items-center justify-between px-4 hover:bg-blue-700/40 rounded-xs p-1'
                  onClick={() => setStatus(s.value)}
                >
                  {s.label}
                  {statusSelected === s.value &&
                    <FaCircleCheck color='#6fc8ff' />}
                </div>
              ))}

            </div>
          )}
        </div>

      </div>


      {/* Selected Filters */}

      <div className='flex gap-2 items-center  w-fit flex-wrap group'>
        <FaTags />
        {genreSelected.filter((v): v is string => !!v).map((f, index) => (
          <span key={index} className="cursor-pointer bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => removeFromArray(f, genreSelected, setGenres)}>
            {f}
          </span>
        ))}

        {tagSelected.filter((v): v is string => !!v).map((f, index) => (
          <span key={index} className="cursor-pointer bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => removeFromArray(f, tagSelected, setTags)}>
            {f}
          </span>
        ))}

        {yearSelected && (
          <span className="cursor-pointer bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => setYear("")}>
            {yearSelected}
          </span>
        )}

        {seasonSelected && (
          <span className="cursor-pointer bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => setSeason("")}>
            {seasonSelected}
          </span>
        )}

        {statusSelected && (
          <span className="cursor-pointer bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => setStatus("")}>
            {statusSelected}
          </span>
        )}

        {
          (tagSelected.length !== 0 || genreSelected.length !== 0 || yearSelected || seasonSelected || statusSelected) && (
            <span className="cursor-pointer flex opacity-0 group-hover:opacity-100 duration-300 transition-opacity justify-center items-center gap-2 bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => clearAllFilters()}>
              Borrar Todo <RxCross2 />
            </span>
          )
        }
      </div>

    </div>
  )
}
