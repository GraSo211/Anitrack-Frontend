"use client";

import React, { useEffect, useRef } from "react";
import Search from "./Header/Search";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { useSidebarStore } from "@/stores/sidebar";
import { clsx } from "clsx";
import { FiHome, FiFilm, FiUsers, FiLogIn, FiUser, FiCalendar, FiList } from "react-icons/fi";

interface SidebarProps {
  isAuthenticated?: boolean;
}

const navLinks = [
  { href: "/", label: "Inicio", icon: FiHome },
  { href: "/animes", label: "Animes", icon: FiFilm },
  { href: "/airingAnimes", label: "En Emisión", icon: FiCalendar },
  { href: "/usuarios", label: "Usuarios", icon: FiUsers },
];

/**
 * Sidebar Component - Anitrack Design System v2.0
 *
 * Navegación móvil lateral con:
 * - Focus trap completo
 * - Cierre con ESC y click fuera
 * - Transiciones suaves
 * - Accesibilidad ARIA completa
 */
export default function Sidebar({ isAuthenticated = false }: SidebarProps) {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggle();
      }

      // Focus trap
      if (e.key === "Tab") {
        const focusableElements = sidebarRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus close button when opened
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, toggle]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-40 lg:hidden",
          "bg-bg-primary/60 backdrop-blur-sm",
          "animate-fade-in"
        )}
        onClick={toggle}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={clsx(
          "fixed inset-y-0 right-0 z-50",
          "w-80 max-w-full",
          "bg-bg-secondary border-l border-border-default",
          "shadow-2xl",
          "transform transition-transform duration-normal ease-out",
          "lg:hidden",
          "animate-slide-in-right"
        )}
      >
        {/* Header */}
        <div
          className={clsx(
            "flex items-center justify-between",
            "p-4 border-b border-border-default"
          )}
        >
          <span className="text-heading-sm font-semibold text-text-primary">
            Menú
          </span>
          <button
            ref={closeButtonRef}
            onClick={toggle}
            aria-label="Cerrar menú"
            className={clsx(
              "p-2.5 rounded-lg",
              "text-text-secondary hover:text-text-primary",
              "hover:bg-bg-tertiary",
              "transition-all duration-fast",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
            )}
          >
            <RxCross1 className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border-default">
          <Search />
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto p-4"
          aria-label="Navegación móvil"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={toggle}
                  className={clsx(
                    "flex items-center gap-3",
                    "px-4 py-3 rounded-lg",
                    "text-body-sm font-medium text-text-secondary",
                    "hover:text-text-primary hover:bg-bg-tertiary",
                    "transition-all duration-fast ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
                  )}
                >
                  <link.icon className="w-5 h-5" aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}

            <li className="pt-4 mt-4 border-t border-border-subtle">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/lista-anime"
                    onClick={toggle}
                    className={clsx(
                      "flex items-center gap-3",
                      "px-4 py-3 rounded-lg mb-1",
                      "text-body-sm font-medium text-text-secondary",
                      "hover:text-text-primary hover:bg-bg-tertiary",
                      "transition-all duration-fast ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
                    )}
                  >
                    <FiList className="w-5 h-5" aria-hidden="true" />
                    <span>Mi Lista</span>
                  </Link>
                  <Link
                    href="/perfil"
                    onClick={toggle}
                    className={clsx(
                      "flex items-center gap-3",
                      "px-4 py-3 rounded-lg",
                      "text-body-sm font-medium text-text-secondary",
                      "hover:text-text-primary hover:bg-bg-tertiary",
                      "transition-all duration-fast ease-out",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
                    )}
                  >
                    <FiUser className="w-5 h-5" aria-hidden="true" />
                    <span>Perfil</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={toggle}
                  className={clsx(
                    "flex items-center justify-center gap-2",
                    "px-4 py-3 rounded-lg",
                    "text-body-sm font-medium text-white",
                    "bg-accent-primary hover:bg-accent-primary-hover",
                    "shadow-md hover:shadow-glow",
                    "transition-all duration-fast ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
                  )}
                >
                  <FiLogIn className="w-5 h-5" aria-hidden="true" />
                  <span>Iniciar Sesión</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
