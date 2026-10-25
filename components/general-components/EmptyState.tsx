import { clsx } from "clsx";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={clsx(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-border-subtle bg-bg-secondary px-6 py-12 text-center",
        className
      )}
    >
      {icon && <div className="text-text-muted">{icon}</div>}
      <p className="text-body-md font-semibold text-text-primary">{title}</p>
      {description && <p className="max-w-sm text-body-sm text-text-secondary">{description}</p>}
      {action}
    </div>
  );
}
