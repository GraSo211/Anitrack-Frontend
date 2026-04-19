"use client";

import { clsx } from "clsx";

interface AnimeStatusProps {
  status: string;
  className?: string;
  /** Tamaño del badge */
  size?: "sm" | "md" | "lg";
  /** Mostrar indicador de pulso (para 'En Emisión') */
  showPulse?: boolean;
}

type StatusConfig = {
  label: string;
  className: string;
  showPulse?: boolean;
};

/**
 * AnimeStatus Component - Anitrack Design System v2.0
 *
 * Badge de estado para anime con:
 * - Colores semánticos consistentes
 * - Indicador de pulso opcional
 * - Múltiples tamaños
 * - Accesibilidad ARIA
 *
 * @example
 * <AnimeStatus status="RELEASING" showPulse />
 * <AnimeStatus status="FINISHED" size="sm" />
 */
export default function AnimeStatus({
  status,
  className,
  size = "md",
  showPulse: showPulseProp,
}: AnimeStatusProps) {
  const statusConfig: Record<string, StatusConfig> = {
    RELEASING: {
      label: "En Emisión",
      className: clsx(
        "bg-anime-releasing-subtle text-anime-releasing border-anime-releasing/30"
      ),
      showPulse: true,
    },
    FINISHED: {
      label: "Finalizado",
      className: clsx(
        "bg-anime-finished-subtle text-anime-finished border-anime-finished/30"
      ),
    },
    NOT_YET_RELEASED: {
      label: "Próximamente",
      className: clsx(
        "bg-anime-upcoming-subtle text-anime-upcoming border-anime-upcoming/30"
      ),
    },
    CANCELLED: {
      label: "Cancelado",
      className: clsx(
        "bg-anime-cancelled-subtle text-anime-cancelled border-anime-cancelled/30"
      ),
    },
    HIATUS: {
      label: "En Pausa",
      className: clsx(
        "bg-anime-paused-subtle text-anime-paused border-anime-paused/30"
      ),
    },
  };

  const config = statusConfig[status];

  if (!config) {
    return null;
  }

  const shouldShowPulse = showPulseProp ?? config.showPulse ?? false;

  // Size variations
  const sizeClasses = {
    sm: "px-2 py-0.5 text-caption gap-1",
    md: "px-2.5 py-1 text-caption gap-1.5",
    lg: "px-3 py-1.5 text-body-sm gap-2",
  };

  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium border",
        sizeClasses[size],
        config.className,
        className
      )}
      role="status"
      aria-label={`Estado: ${config.label}`}
    >
      <span
        className={clsx(
          "rounded-full",
          dotSizes[size],
          shouldShowPulse && "animate-pulse"
        )}
        style={{ backgroundColor: "currentColor" }}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
