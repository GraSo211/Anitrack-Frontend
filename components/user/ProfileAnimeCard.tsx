"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfileAnimeCard({
  anime,
}: {
  anime: {
    id: number;
    title: string;
    cover: string;
    score: number;
  };
}) {
  return (
    <Link
      href={`/anime/m-${anime.id}`}
      className="group block rounded-xl overflow-hidden bg-bg-tertiary border border-border-default hover:border-accent-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 transition"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={anime.cover}
          alt={`Portada de ${anime.title}`}
          fill
          sizes="(max-width: 640px) 50vw, 16vw"
          className="object-cover transition-transform duration-slower group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-md bg-accent-primary text-text-light text-caption font-bold px-1.5 py-0.5 shadow-md">
          {anime.score}
        </div>
      </div>
      <div className="p-2.5">
        <h3 className="text-body-sm font-medium text-text-primary line-clamp-2 leading-snug group-hover:text-accent-primary transition">
          {anime.title}
        </h3>
      </div>
    </Link>
  );
}
