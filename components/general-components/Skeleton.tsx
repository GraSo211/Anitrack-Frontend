import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

/** Placeholder de carga para una región concreta. */
export default function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={clsx("animate-pulse rounded-md bg-bg-tertiary", className)}
      {...props}
    />
  );
}
