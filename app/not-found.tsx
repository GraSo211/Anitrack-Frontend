import type { Metadata } from "next";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import EmptyState from "@/components/general-components/EmptyState";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="w-full max-w-lg">
        <EmptyState
          icon={<FiMapPin className="w-10 h-10" />}
          title="Página no encontrada"
          description="La página que buscás no existe o fue movida. Volvé al inicio o explorá el catálogo."
          action={
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center px-4 gap-2 text-body-sm font-medium rounded-md bg-accent-primary text-text-light hover:bg-accent-primary-hover transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
              >
                Volver al inicio
              </Link>
              <Link
                href="/animes"
                className="inline-flex h-10 items-center justify-center px-4 gap-2 text-body-sm font-medium rounded-md bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-quaternary hover:border-border-strong transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30"
              >
                Explorar catálogo
              </Link>
            </div>
          }
          className="py-20"
        />
      </div>
    </div>
  );
}
