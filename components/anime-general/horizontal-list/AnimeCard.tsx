"use client";

import { AnimeCard as AnimeCardType } from "@/types/anime/Anime";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { FiPlay } from "react-icons/fi";

interface AnimeCardProps {
  anime: AnimeCardType;
  className?: string;
  /** Mostrar indicador de progreso del usuario */
  progress?: {
    watched: number;
    total: number;
  };
  /** Tamaño de la tarjeta */
  size?: "sm" | "md" | "lg";
}

/**
 * AnimeCard Component - Anitrack Design System v2.0
 *
 * Tarjeta optimizada para mostrar información de anime con:
 * - Aspect ratio 2:3 (estándar poster)
 * - Indicador de progreso opcional
 * - Estados de carga y hover refinados
 * - Accesibilidad completa
 *
 * @example
 * <AnimeCard anime={anime} />
 * <AnimeCard anime={anime} progress={{ watched: 12, total: 24 }} size="lg" />
 */
export default function AnimeCard({
  anime,
  className,
  progress,
  size = "md",
}: AnimeCardProps) {
  const coverUrl =
    anime.coverImage?.extraLarge ||
    anime.coverImage?.large ||
    anime.coverImage?.medium ||
    "/coverImagePlaceholder.jpg";

  const title = anime.title.romaji || anime.title.english || "Sin título";

  // Calcular porcentaje de progreso si existe
  const progressPercent = progress
    ? Math.min(100, Math.round((progress.watched / progress.total) * 100))
    : null;

  const isComplete = progressPercent === 100;

  // Tamaños responsivos basados en el prop size
  const sizeClasses = {
    sm: "text-caption",
    md: "text-body-sm",
    lg: "text-body-md",
  };

  return (
    <div
      className={clsx(
        "group relative flex flex-col",
        "rounded-xl overflow-hidden",
        "bg-bg-secondary border border-border-default",
        "transition-all duration-normal ease-spring",
        "hover:border-accent-primary/40 hover:shadow-lg",
        "focus-within:border-accent-primary focus-within:shadow-glow",
        className
      )}
    >
      {/* Image Container - Aspect Ratio 2:3 */}
      <Link
        href={`/anime/a-${anime.id}`}
        className={clsx(
          "block relative overflow-hidden",
          "aspect-[2/3]"
        )}
        aria-label={`Ver detalles de ${title}`}
      >
        {/* Poster Image */}
        <Image
          src={coverUrl}
          alt={`Portada de ${title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className={clsx(
            "object-cover transition-transform duration-slower ease-out",
            "group-hover:scale-105"
          )}
        />

        {/* Hover Overlay with Gradient */}
        <div
          className={clsx(
            "absolute inset-0",
            "bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-normal",
            "flex items-end justify-center pb-4"
          )}
          aria-hidden="true"
        >
          {/* Quick Action Button */}
          <span
            className={clsx(
              "inline-flex items-center gap-2",
              "px-4 py-2 rounded-full",
              "bg-accent-primary text-white",
              "text-caption font-medium",
              "transform translate-y-2 opacity-0",
              "group-hover:translate-y-0 group-hover:opacity-100",
              "transition-all duration-normal ease-out"
            )}
          >
            <FiPlay className="w-3.5 h-3.5" />
            Ver detalles
          </span>
        </div>

        {/* Progress Bar */}
        {progressPercent !== null && (
          <div
            className={clsx(
              "absolute bottom-0 left-0 right-0",
              "h-1 bg-bg-primary/50 backdrop-blur-sm"
            )}
          >
            <div
              className={clsx(
                "h-full transition-all duration-slow ease-out",
                isComplete ? "bg-status-success" : "bg-accent-primary"
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1.5">
        <Link href={`/anime/a-${anime.id}`} className="group/title">
          <h4
            className={clsx(
              sizeClasses[size],
              "font-medium line-clamp-2 leading-snug",
              "text-text-primary",
              "transition-colors duration-fast",
              "group-hover/title:text-accent-primary"
            )}
            title={title}
          >
            {title}
          </h4>
        </Link>

        {/* Progress Info */}
        {progress && (
          <div className="flex items-center gap-2 text-caption text-text-tertiary">
            <span
              className={clsx(
                isComplete ? "text-status-success" : "text-text-tertiary"
              )}
            >
              {progress.watched}/{progress.total}
            </span>
            <span className="text-border-strong">•</span>
            <span>{progressPercent}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
