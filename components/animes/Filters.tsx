"use client";
import { Genre } from '@/types/Genre';
import { Tag } from '@/types/Tag';
import React, { useState } from 'react'
import { FaTags } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
interface Props {
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
  const [selected, setSelected] = useState("")
  const genresChecked = genres ? genres : [];
  const tagsChecked = tags ? tags : [];

  const clearAllFilters = () => {
    setGenres([]);
    setTags([]);
    setYear("");
    setSeason("");
    setStatus("");
  };

  return (

    <div className="flex flex-col gap-3 rounded-xl p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Género
          </label>

          <select
            value={selected}
            onChange={(e) => {
              const [type, value] = e.target.value.split(":");

              if (type === "genre") {
                setGenres([...genreSelected, value]);
              }

              if (type === "tag") {
                setTags([...tagSelected, value]);
              }
            }}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Cualquiera</option>

            <optgroup label="Géneros">
              {genresChecked.map((g) => (
                <option key={g.name} value={`genre:${g.name}`}>
                  {g.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Tags">
              {tagsChecked.map((t) => (
                <option key={t.name} value={`tag:${t.name}`}>
                  {t.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Año
          </label>
          <select
            value={yearSelected}
            onChange={(e) => setYear(e.target.value)}

            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={""} className='text-gray-600  '>Cualquiera</option>
            {Array.from({ length: ((new Date().getFullYear() + 1) - 1940) / 1 + 1 }, (_, i) => (new Date().getFullYear() + 1) - (i * 1)).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Season Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Temporada
          </label>
          <select
            value={seasonSelected}
            onChange={(e) => setSeason(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Cualquiera</option>
            <option value="WINTER">Invierno</option>
            <option value="SPRING">Primavera</option>
            <option value="SUMMER">Verano</option>
            <option value="FALL">Otoño</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Estado
          </label>
          <select
            value={statusSelected}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Cualquiera</option>
            <option value="FINISHED">Finalizado</option>
            <option value="AIRING">En emisión</option>
            <option value="NOT_YET_AIRED">Aun no lanzado</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>
      </div>
      <div className='flex gap-2 items-center  w-fit group'>
        <FaTags /> 
        {genreSelected.filter((v): v is string => !!v).map((f, index) => (
          <span key={index} className="bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => removeFromArray(f, genreSelected, setGenres )}>
            {f}
          </span>
        ))}

        {tagSelected.filter((v): v is string => !!v).map((f, index) => (
          <span key={index} className="bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => removeFromArray(f, tagSelected, setTags )}>
            {f}
          </span>
        ))}

        {yearSelected && (
          <span className="bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => setYear("")}>
            {yearSelected}
          </span>
        )}

        {seasonSelected && (
          <span className="bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => setSeason("")}>
            {seasonSelected}
          </span>
        )}

        {statusSelected && (
          <span className="bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={() => setStatus("")}>
            {statusSelected}
          </span>
        )}

        {
          (tagSelected.length !== 0 || genreSelected.length !== 0 || yearSelected || seasonSelected || statusSelected) && ( 
            <span className=" flex opacity-0 group-hover:opacity-100 duration-300 transition-opacity justify-center items-center gap-2 bg-gray-800/60 text-gray-200 px-2 py-1 rounded-md text-sm" onClick={()=>clearAllFilters()}>
              Borrar Todo <RxCross2 />
            </span>
           )  
        }
      </div>

    </div>
  )
}
