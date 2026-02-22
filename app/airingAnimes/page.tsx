"use client";
import { getReleasingAnimes } from '@/actions/getReleasingAnimes';
import { AnimeReleasing } from '@/types/AnimeReleasing';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

export default async function page() {
    useEffect(async () => {
        let animes: AnimeReleasing[] | null = await getReleasingAnimes();
    }, [])

    //const animesChecked: AnimeReleasing[] = Array.isArray(animes) ? animes : [];
    //const hasError = animes !== undefined && !Array.isArray(animes);

    const searchParams = useSearchParams()

    const search = searchParams.get('day')
    console.log(search)
    return (
        <div>page</div>
    )
}
