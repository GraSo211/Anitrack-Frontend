"use client";

import { clsx } from "clsx";
import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Button Component - Anitrack Design System v2.0
 *
 * Botón multi-variante con accesibilidad completa y estados interactivos.
 * Soporta todos los tamaños y variantes del sistema de diseño.
 *
 * @example
 * <Button variant="primary" size="md">Ver Anime</Button>
 * <Button variant="ghost" leftIcon={<FiEye />}>Ver Detalles</Button>
 * <Button variant="danger" size="sm">Eliminar</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles - accesible y consistente
    const baseStyles = clsx(
      "inline-flex items-center justify-center",
      "font-medium whitespace-nowrap",
      "transition-all duration-fast ease-out",
      "focus-visible:outline-none",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      "active:scale-[0.98]"
    );

    // Variant styles - siguendo el Design System
    const variantStyles = {
      primary: clsx(
        "bg-accent-primary text-white",
        "hover:bg-accent-primary-hover",
        "shadow-md hover:shadow-glow",
        "focus-visible:ring-2 focus-visible:ring-accent-primary/50"
      ),
      secondary: clsx(
        "bg-bg-tertiary text-text-primary",
        "border border-border-default",
        "hover:bg-bg-quaternary hover:border-border-strong",
        "focus-visible:ring-2 focus-visible:ring-accent-primary/30"
      ),
      ghost: clsx(
        "bg-transparent text-text-secondary",
        "hover:bg-bg-tertiary hover:text-text-primary",
        "focus-visible:ring-2 focus-visible:ring-accent-primary/30"
      ),
      danger: clsx(
        "bg-status-error text-white",
        "hover:bg-red-600",
        "shadow-md hover:shadow-lg hover:shadow-red-500/25",
        "focus-visible:ring-2 focus-visible:ring-status-error/50"
      ),
      success: clsx(
        "bg-status-success text-white",
        "hover:bg-green-600",
        "shadow-md hover:shadow-lg hover:shadow-green-500/25",
        "focus-visible:ring-2 focus-visible:ring-status-success/50"
      ),
    };

    // Size styles - siguiendo el 8px grid
    const sizeStyles = {
      sm: clsx(
        "h-8 px-3 gap-1.5",
        "text-caption rounded-md"
      ),
      md: clsx(
        "h-10 px-4 gap-2",
        "text-body-sm rounded-md"
      ),
      lg: clsx(
        "h-12 px-6 gap-2.5",
        "text-body-md rounded-lg"
      ),
      icon: clsx(
        "h-10 w-10 p-0",
        "rounded-lg"
      ),
    };

    // Icon sizes based on button size
    const iconSizes = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      icon: "w-5 h-5",
    };

    // Wrap icons in consistent sizing
    const wrapIcon = (icon: ReactNode) =>
      icon ? (
        <span className={clsx("inline-flex items-center justify-center", iconSizes[size])}>
          {icon}
        </span>
      ) : null;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && wrapIcon(leftIcon)}
        {size !== "icon" && <span>{children}</span>}
        {!isLoading && wrapIcon(rightIcon)}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
