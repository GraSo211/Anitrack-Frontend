import type { Metadata } from "next";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";
import { getCurrentUser } from "@/actions/user/getCurrentUser";
import ProfileView from "@/components/user/ProfileView";
import EmptyState from "@/components/general-components/EmptyState";
import { User } from "@/types/user/User";

const getProfileUser = cache(async (): Promise<User | null> => {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    redirect("/iniciar-sesion");
  }

  return getCurrentUser(token);
});

export async function generateMetadata(): Promise<Metadata> {
  const user = await getProfileUser();

  if (!user) {
    return {
      title: "Mi perfil",
      description: "Tu perfil de Anitrack: estadísticas, listas y actividad de anime.",
      alternates: { canonical: "/perfil" },
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${user.name} - Perfil`,
    description: `Perfil de ${user.name} en Anitrack: estadísticas, listas y actividad de anime.`,
    alternates: { canonical: "/perfil" },
    robots: { index: false, follow: false },
  };
}

export default async function Page() {
  await connection();

  const user = await getProfileUser();

  if (!user) {
    return (
      <div className="p-6 text-text-primary flex justify-center items-center min-h-[60vh]">
        <EmptyState
          icon={<FiAlertCircle className="w-10 h-10" />}
          title="No se pudo cargar el perfil"
          description="Verificá tu conexión e intentá de nuevo."
          action={
            <Link
              href="/perfil"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-body-sm font-medium bg-accent-primary text-text-light hover:bg-accent-primary-hover transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
            >
              Reintentar
            </Link>
          }
        />
      </div>
    );
  }

  return <ProfileView user={user} />;
}
