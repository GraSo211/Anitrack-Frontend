import { getAllGenres } from '@/actions/animes/getAllGenres';
import { getAllTags } from '@/actions/animes/getAllTags';
import AnimesPage from '@/components/animes/AnimesPage'
import React from 'react'

export default async function page() {
  const genres = await getAllGenres();
  const tags = await getAllTags();
  return (
    <AnimesPage genres={genres} tags={tags}></AnimesPage>
  )
}
