"use client";
import { useState } from "react";

export default function AiringSwitch({ onChange }: { onChange?: (value: string) => void }) {
  const [selected, setSelected] = useState<"all" | "following">("all");

  const handleSelect = (value: "all" | "following") => {
    setSelected(value);
    onChange?.(value);
  };


  return (
    <div className="relative flex w-fit p-1 bg-bg-tertiary rounded-xl shadow-inner border border-border-default">
      <div
        className={`
          absolute top-1 bottom-1 rounded-lg bg-accent-primary/20 transition-all duration-300 ease-out
          ${selected === "all" ? "left-1 right-[50%]" : "left-[50%] right-1"}
        `}
      />

      <button
        type="button"
        aria-pressed={selected === "all"}
        onClick={() => handleSelect("all")}
        className={`
          relative text-xs z-10 px-2 py-2 min-h-9 min-w-[4.5rem] rounded-lg transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
          ${selected === "all" ? "text-text-primary" : "text-text-tertiary"}
        `}
      >
        Todos los animes
      </button>

      <button
        type="button"
        aria-pressed={selected === "following"}
        onClick={() => handleSelect("following")}
        className={`
          relative text-xs z-10 px-2 py-2 min-h-9 min-w-[4.5rem] rounded-lg transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
          ${selected === "following" ? "text-text-primary" : "text-text-tertiary"}
        `}
      >
        Animes que sigo
      </button>
    </div>
  );
}
