"use client";

import { clsx } from "clsx";
import { ReactNode } from "react";

/**
 * DashboardCard Component - Ejemplo de uso del Design System
 *
 * Este componente demuestra cómo aplicar el sistema de diseño
 * para crear nuevos componentes consistentes.
 */

interface DashboardCardProps {
  /** Título de la tarjeta */
  title: string;
  /** Valor principal a mostrar */
  value: string | number;
  /** Subtítulo o descripción */
  subtitle?: string;
  /** Icono a mostrar (de react-icons) */
  icon?: ReactNode;
  /** Variante de color */
  variant?: "default" | "success" | "warning" | "error" | "info";
  /** Tendencia (porcentaje positivo o negativo) */
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

/**
 * DashboardCard - Ejemplo de implementación del Design System
 *
 * Uso:
 * <DashboardCard
 *   title="Animes Completados"
 *   value={42}
 *   subtitle="Este año"
 *   icon={<FiCheckCircle />}
 *   variant="success"
 *   trend={{ value: 12, label: "vs mes anterior" }}
 * />
 */
export function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
  trend,
  className,
}: DashboardCardProps) {
  // Configuración de variantes de color
  const variantStyles = {
    default: {
      iconBg: "bg-accent-primary-subtle",
      iconColor: "text-accent-primary",
      border: "border-border-default",
      hoverBorder: "hover:border-accent-primary/30",
    },
    success: {
      iconBg: "bg-status-success-subtle",
      iconColor: "text-status-success",
      border: "border-status-success/20",
      hoverBorder: "hover:border-status-success/40",
    },
    warning: {
      iconBg: "bg-status-warning-subtle",
      iconColor: "text-status-warning",
      border: "border-status-warning/20",
      hoverBorder: "hover:border-status-warning/40",
    },
    error: {
      iconBg: "bg-status-error-subtle",
      iconColor: "text-status-error",
      border: "border-status-error/20",
      hoverBorder: "hover:border-status-error/40",
    },
    info: {
      iconBg: "bg-status-info-subtle",
      iconColor: "text-status-info",
      border: "border-status-info/20",
      hoverBorder: "hover:border-status-info/40",
    },
  };

  const styles = variantStyles[variant];
  const trendPositive = trend && trend.value >= 0;

  return (
    <div
      className={clsx(
        // Layout
        "relative flex flex-col",
        // Spacing
        "p-5 gap-3",
        // Appearance
        "bg-bg-secondary rounded-xl",
        "border",
        styles.border,
        // Interactive
        "transition-all duration-normal ease-spring",
        styles.hoverBorder,
        "hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-accent-primary/30",
        className
      )}
    >
      {/* Header: Icon + Title */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-caption text-text-tertiary uppercase tracking-wider font-medium">
            {title}
          </span>
        </div>

        {icon && (
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-10 h-10 rounded-lg",
              styles.iconBg,
              styles.iconColor
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className="flex flex-col gap-1">
        <span className="text-display-md font-bold text-text-primary">
          {value}
        </span>

        {subtitle && (
          <span className="text-body-sm text-text-secondary">{subtitle}</span>
        )}
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={clsx(
              "text-body-sm font-medium",
              trendPositive ? "text-status-success" : "text-status-error"
            )}
          >
            {trendPositive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-caption text-text-muted">{trend.label}</span>
        </div>
      )}

      {/* Decorative gradient (opcional) */}
      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 h-1 rounded-b-xl",
          "bg-gradient-to-r from-accent-primary to-accent-secondary",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-normal"
        )}
      />
    </div>
  );
}

/**
 * DashboardCardGrid - Ejemplo de layout
 *
 * Muestra cómo organizar múltiples cards en un grid responsive
 */
export function DashboardCardGrid({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx(
        // Grid layout responsive
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        // Gap
        "gap-4 lg:gap-6"
      )}
    >
      {children}
    </div>
  );
}

/**
 * EJEMPLO DE USO COMPLETO:
 *
 * import { DashboardCard, DashboardCardGrid } from "./DashboardCard.example";
 * import { FiCheckCircle, FiClock, FiStar, FiTrendingUp } from "react-icons/fi";
 *
 * export default function UserDashboard() {
 *   return (
 *     <DashboardCardGrid>
 *       <DashboardCard
 *         title="Completados"
 *         value={42}
 *         subtitle="Animes finalizados"
 *         icon={<FiCheckCircle className="w-5 h-5" />}
 *         variant="success"
 *         trend={{ value: 12, label: "este mes" }}
 *       />
 *
 *       <DashboardCard
 *         title="Viendo"
 *         value={8}
 *         subtitle="En progreso"
 *         icon={<FiClock className="w-5 h-5" />}
 *         variant="info"
 *       />
 *
 *       <DashboardCard
 *         title="Puntuación Media"
 *         value={8.4}
 *         subtitle="De 50 valoraciones"
 *         icon={<FiStar className="w-5 h-5" />}
 *         variant="warning"
 *         trend={{ value: -2.1, label: "vs mes anterior" }}
 *       />
 *
 *       <DashboardCard
 *         title="Horas Vistas"
 *         value={186}
 *         subtitle="Este año"
 *         icon={<FiTrendingUp className="w-5 h-5" />}
 *         variant="default"
 *         trend={{ value: 24, label: "vs año pasado" }}
 *       />
 *     </DashboardCardGrid>
 *   );
 * }
 */

export default DashboardCard;
