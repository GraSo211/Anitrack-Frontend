"use client";

import { useThemeStore } from "@/stores/theme";
import { useEffect, useRef, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { clsx } from "clsx";

interface ThemeToggleProps {
  variant?: "icon" | "button" | "dropdown";
  className?: string;
}

/**
 * ThemeToggle Component - Anitrack Design System v2.0
 *
 * Control de tema con tres variantes:
 * - icon: Botón circular compacto (default)
 * - button: Botón con texto
 * - dropdown: Selector desplegable con todas las opciones
 *
 * @example
 * <ThemeToggle variant="icon" />
 * <ThemeToggle variant="button" />
 */
export default function ThemeToggle({
  variant = "icon",
  className,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (variant !== "dropdown" || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, variant]);

  // Placeholder para evitar hydration mismatch
  if (!mounted) {
    return (
      <div
        className={clsx(
          "w-10 h-10 rounded-lg bg-bg-tertiary animate-pulse",
          className
        )}
      />
    );
  }

  const themeOptions = [
    { value: "light" as const, label: "Claro", icon: FiSun },
    { value: "dark" as const, label: "Oscuro", icon: FiMoon },
    { value: "system" as const, label: "Sistema", icon: FiMonitor },
  ];

  const currentTheme = themeOptions.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon ?? FiMonitor;

  // Dropdown variant
  if (variant === "dropdown") {
    return (
      <div ref={containerRef} className={clsx("relative", className)}>
        <button
          type="button"
          aria-label="Cambiar tema"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className={clsx(
            "flex items-center gap-2",
            "px-3 py-2 rounded-lg",
            "bg-bg-tertiary border border-border-default",
            "text-text-primary",
            "hover:bg-bg-quaternary",
            "transition-all duration-fast",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
          )}
        >
          <CurrentIcon className="w-[18px] h-[18px]" />
          <span className="text-body-sm">{currentTheme?.label}</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            role="menu"
            aria-label="Opciones de tema"
            className={clsx(
              "absolute right-0 mt-2 w-40",
              "bg-bg-secondary border border-border-default",
              "rounded-xl shadow-xl",
              "overflow-hidden",
              "z-50"
            )}
          >
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "w-full flex items-center gap-3",
                    "px-4 py-2.5 text-body-sm",
                    "transition-colors duration-fast",
                    "first:rounded-t-xl last:rounded-b-xl",
                    isActive
                      ? "text-accent-primary bg-accent-primary-subtle"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Button variant
  if (variant === "button") {
    const isDark = resolvedTheme === "dark";
    const ToggleIcon = isDark ? FiSun : FiMoon;

    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        className={clsx(
          "flex items-center gap-2",
          "px-4 py-2.5 rounded-lg",
          "text-body-sm font-medium",
          "bg-accent-primary text-white",
          "hover:bg-accent-primary-hover",
          "shadow-md hover:shadow-glow",
          "transition-all duration-fast ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50",
          className
        )}
      >
        <ToggleIcon className="w-[18px] h-[18px]" />
        <span>{isDark ? "Modo claro" : "Modo oscuro"}</span>
      </button>
    );
  }

  // Icon variant (default)
  const isDark = resolvedTheme === "dark";
  const ToggleIcon = isDark ? FiSun : FiMoon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={clsx(
        "p-2.5 rounded-lg",
        "bg-bg-tertiary border border-border-default",
        "text-text-secondary hover:text-text-primary",
        "hover:bg-bg-quaternary hover:border-border-strong",
        "transition-all duration-fast ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30",
        className
      )}
    >
      <ToggleIcon className="w-5 h-5" />
    </button>
  );
}
