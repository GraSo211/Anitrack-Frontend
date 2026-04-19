"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getAnimesByName } from "@/actions/animes/getAnimesByName";
import Link from "next/link";
import { AnimesByName } from "@/types/anime/Anime";
import { FiSearch, FiX } from "react-icons/fi";
import { clsx } from "clsx";
import Image from "next/image";

/**
 * Search Component - Anitrack Design System v2.0
 *
 * Búsqueda inteligente con:
 * - Autocompletado con delay optimizado
 * - Navegación por teclado (flechas, enter, escape)
 * - Resultados con imágenes
 * - Estados de carga y vacío
 * - Accesibilidad completa (ARIA)
 */
export default function Search() {
  const [animes, setAnimes] = useState<AnimesByName[] | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchAnime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setActiveIndex(-1);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (!value.trim()) {
        setAnimes(null);
        setIsOpen(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsOpen(true);

      timeoutRef.current = setTimeout(async () => {
        try {
          const result: AnimesByName[] | null = await getAnimesByName(6, value);
          setAnimes(result);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    },
    []
  );

  const closeDropdown = useCallback(() => {
    setQuery("");
    setAnimes(null);
    setActiveIndex(-1);
    setIsOpen(false);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!animes || !isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < animes.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          if (activeIndex >= 0 && animes[activeIndex]) {
            window.location.href = `/anime/a-${animes[activeIndex].id}`;
          }
          break;
        case "Escape":
          closeDropdown();
          break;
      }
    },
    [animes, activeIndex, closeDropdown, isOpen]
  );

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Search Input */}
      <div
        className={clsx(
          "flex items-center gap-2",
          "rounded-xl px-3 h-12",
          "bg-bg-tertiary border border-border-default",
          "transition-all duration-fast ease-out",
          "hover:border-border-strong",
          "focus-within:border-accent-primary focus-within:ring-2 focus-within:ring-accent-primary/20",
          isOpen && animes && "rounded-b-none border-accent-primary"
        )}
      >
        <FiSearch
          className={clsx(
            "w-5 h-5 flex-shrink-0 transition-colors duration-fast",
            query ? "text-text-secondary" : "text-text-muted"
          )}
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={searchAnime}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && animes?.length && setIsOpen(true)}
          aria-label="Buscar anime"
          aria-autocomplete="list"
          aria-expanded={isOpen && !!animes}
          aria-controls={isOpen ? "search-results" : undefined}
          aria-activedescendant={
            activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
          }
          autoComplete="off"
          className={clsx(
            "w-full bg-transparent",
            "text-body-sm text-text-primary placeholder:text-text-muted",
            "focus:outline-none"
          )}
          placeholder="Buscar anime..."
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={closeDropdown}
            aria-label="Limpiar búsqueda"
            className={clsx(
              "p-1 rounded-md",
              "text-text-muted hover:text-text-primary",
              "hover:bg-bg-quaternary",
              "transition-all duration-fast",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
            )}
          >
            <FiX className="w-4 h-4" />
          </button>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div
            className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && animes && (
        <div
          id="search-results"
          role="listbox"
          className={clsx(
            "absolute top-full left-0 right-0",
            "mt-0 pt-2",
            "bg-bg-secondary border border-t-0 border-accent-primary",
            "rounded-b-xl rounded-t-none",
            "shadow-xl overflow-hidden z-50",
            "max-h-[28rem] overflow-y-auto"
          )}
        >
          {animes.length > 0 ? (
            <ul className="divide-y divide-border-subtle">
              {animes.map((anime, index) => (
                <li
                  key={anime.id}
                  id={`search-result-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={clsx(
                    "transition-colors cursor-pointer",
                    index === activeIndex
                      ? "bg-accent-primary-subtle"
                      : "hover:bg-bg-tertiary"
                  )}
                  onClick={() => {
                    window.location.href = `/anime/a-${anime.id}`;
                  }}
                >
                  <Link
                    href={`/anime/a-${anime.id}`}
                    className="flex items-center gap-3 p-3"
                    onClick={(e) => {
                      e.preventDefault();
                      closeDropdown();
                    }}
                  >
                    {/* Anime Cover */}
                    <div className="relative w-12 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-bg-tertiary shadow-sm">
                      <Image
                        src={
                          anime.coverImage?.extraLarge ||
                          "/coverImagePlaceholder.jpg"
                        }
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    {/* Anime Info */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={clsx(
                          "font-medium text-body-sm truncate",
                          index === activeIndex
                            ? "text-accent-primary"
                            : "text-text-primary"
                        )}
                      >
                        {anime.title.romaji}
                      </span>
                      {anime.title.english && (
                        <span className="text-caption text-text-tertiary truncate">
                          {anime.title.english}
                        </span>
                      )}
                    </div>

                    {/* Arrow indicator on active */}
                    {index === activeIndex && (
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={clsx(
                "p-6 text-center",
                "border-t border-border-subtle"
              )}
            >
              <div className="text-text-tertiary text-body-sm mb-1">
                No se encontraron resultados
              </div>
              <div className="text-text-muted text-caption">
                Intenta con otro término de búsqueda
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
