"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/components/general-components/useCurrentUser";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, loading } = useCurrentUser(true);

    useEffect(() => {
        if (!loading && user && !user.admin) {
            router.replace("/");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-text-secondary">
                Cargando...
            </div>
        );
    }

    if (!user || !user.admin) {
        return (
            <div className="flex justify-center items-center h-screen text-text-secondary">
                No autorizado
            </div>
        );
    }

    return <>{children}</>;
}
