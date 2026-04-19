"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "dark",
      setTheme: (theme) => {
        const resolved = theme === "system" ? getSystemTheme() : theme;
        set({ theme, resolvedTheme: resolved });
        document.documentElement.setAttribute("data-theme", resolved);
      },
      toggleTheme: () => {
        const current = get().resolvedTheme;
        const newTheme = current === "dark" ? "light" : "dark";
        set({ theme: newTheme, resolvedTheme: newTheme });
        document.documentElement.setAttribute("data-theme", newTheme);
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolved =
            state.theme === "system" ? getSystemTheme() : state.theme;
          state.resolvedTheme = resolved;
          document.documentElement.setAttribute("data-theme", resolved);
        }
      },
    }
  )
);
