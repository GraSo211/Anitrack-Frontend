import { getAllGenres } from '@/actions/getAllGenres';
import { getAllTags } from '@/actions/getAllTags';
import AnimesPage from '@/components/animes/AnimesPage'
import React from 'react'

export default async function page() {
  const genres = await getAllGenres();
  const tags = await getAllTags();
  return (
    <AnimesPage genres={genres} tags={tags}></AnimesPage>
  )
}
