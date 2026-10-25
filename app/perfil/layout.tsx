import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi perfil",
  description: "Consulta tus estadísticas de anime, los géneros que más mirás y el resumen de tu actividad en Anitrack, todo desde tu perfil personal.",
  robots: { index: false, follow: false },
};

export default function PerfilLayout({ children }: { children: React.ReactNode }) {
  return children;
}
