"use client";

import Link from "next/link";
import React from "react";
import Search from "./Search";
import { IoMenu } from "react-icons/io5";
import { clsx } from "clsx";
import { useSidebarStore } from "@/stores/sidebar";
import ThemeToggle from "../ThemeToggle";
import Button from "../Button";

interface HeaderProps {
  isAuthenticated: boolean;
}

const navLinks = [
  { href: "/animes", label: "Animes" },
  { href: "/airingAnimes", label: "En Emisión" },
  { href: "/usuarios", label: "Usuarios" },
];

/**
 * Header Component - Anitrack Design System v2.0
 *
 * Navegación principal con:
 * - Efecto glassmorphism
 * - Altura consistente (72px)
 * - Search integrado
 * - Accesibilidad completa (ARIA)
 */
export default function Header({ isAuthenticated }: HeaderProps) {
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full",
        "border-b border-border-default",
        "glass",
        "transition-colors duration-slow ease-default"
      )}
      role="banner"
    >
      <div className="container">
        <div className="flex items-center justify-between h-[var(--header-height)]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={clsx(
                "text-heading-lg font-bold tracking-tight",
                "gradient-text",
                "hover:opacity-90 transition-opacity duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50",
                "rounded-lg px-2 py-1 -ml-2"
              )}
              aria-label="Anitrack - Inicio"
            >
              ANITRACK
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <Search />
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-3 py-2 rounded-lg",
                  "text-body-sm font-medium text-text-secondary",
                  "hover:text-text-primary hover:bg-bg-tertiary",
                  "transition-all duration-fast ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
                )}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <Link
                href="/lista-anime"
                className={clsx(
                  "ml-2 px-4 py-2 rounded-lg",
                  "text-body-sm font-medium text-text-primary",
                  "bg-accent-primary text-white",
                  "hover:bg-accent-primary-hover",
                  "shadow-md hover:shadow-glow",
                  "transition-all duration-fast ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
                )}
              >
                Mi Lista
              </Link>
            ) : (
              <Link href="/login" className="ml-2">
                <Button variant="primary" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
            )}

            <div className="ml-3 pl-3 border-l border-border-default">
              <ThemeToggle variant="icon" />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle variant="icon" />
            <button
              onClick={toggle}
              aria-label="Abrir menú de navegación"
              aria-expanded="false"
              aria-controls="mobile-sidebar"
              className={clsx(
                "p-2.5 rounded-lg",
                "text-text-secondary hover:text-text-primary",
                "hover:bg-bg-tertiary",
                "transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
              )}
            >
              <IoMenu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
