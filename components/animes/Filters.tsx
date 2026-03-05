"use client";
import React, { useState } from 'react'

export default function Filters() {
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [season, setSeason] = useState('');
    const [status, setStatus] = useState('');
  
  return (
     
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Género
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="action">Acción</option>
                <option value="adventure">Aventura</option>
                <option value="comedy">Comedia</option>
                <option value="drama">Drama</option>
                <option value="fantasy">Fantasía</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Ciencia Ficción</option>
                <option value="slice-of-life">Slice of Life</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Año
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                {Array.from({ length: 25 }, (_, i) => 2024 - i).map((y) => (
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
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="FINISHED">Finalizado</option>
                <option value="RELEASING">En emisión</option>
                <option value="NOT_YET_RELEASED">No lanzado</option>
                <option value="CANCELLED">Cancelado</option>
                <option value="HIATUS">En pausa</option>
              </select>
            </div>
          </div>
        </div>
  )
}
