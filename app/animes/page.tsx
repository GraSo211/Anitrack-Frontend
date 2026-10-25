import { getAllGenres } from '@/actions/animes/getAllGenres';
import { getAllTags } from '@/actions/animes/getAllTags';
import AnimesPage from '@/components/animes/AnimesPage'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Catálogo de animes",
  description: "Explora el catálogo completo de animes y filtra por género, temporada, año y estado de emisión para encontrar tu próxima serie favorita.",
  alternates: { canonical: "/animes" },
}

export default async function page() {
  const genres = await getAllGenres();
  const tags = await getAllTags();
  return (
    <AnimesPage genres={genres} tags={tags}></AnimesPage>
  )
}
