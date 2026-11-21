"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import EmptyState from "@/components/general-components/EmptyState";
import Button from "@/components/general-components/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="w-full max-w-lg">
        <EmptyState
          icon={<FiAlertTriangle className="w-10 h-10" />}
          title="Algo salió mal"
          description="No pudimos cargar esta página. Intentá de nuevo o volvé al inicio."
          action={
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={reset} variant="primary">
                Reintentar
              </Button>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center px-4 gap-2 text-body-sm font-medium rounded-md bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-quaternary hover:border-border-strong transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
              >
                Volver al inicio
              </Link>
            </div>
          }
          className="py-20"
        />
      </div>
    </div>
  );
}
