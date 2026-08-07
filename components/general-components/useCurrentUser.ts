"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user";
import { User } from "@/types/user/User";

let inFlight: Promise<void> | null = null;

export function useCurrentUser(isAuthenticated: boolean) {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState(isAuthenticated && !user);

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        if (user) {
            setLoading(false);
            return;
        }
        if (inFlight) return;

        setLoading(true);
        inFlight = (async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`, {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("No autenticado");
                const data: User = await response.json();
                setUser(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
                inFlight = null;
            }
        })();
    }, [isAuthenticated, user, setUser]);

    return { user, loading };
}
