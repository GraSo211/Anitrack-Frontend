"use client";
import { useState } from "react";

export default function AiringSwitch({ onChange }: { onChange?: (value: string) => void }) {
  const [selected, setSelected] = useState<"all" | "following">("all");

  const handleSelect = (value: "all" | "following") => {
    setSelected(value);
    onChange?.(value);
  };


  return (
    <div className="relative flex w-fit p-1 bg-[#021321] rounded-xl shadow-inner">
      <div
        className={`
          absolute top-1 bottom-1 rounded-lg bg-[#021faa]/20 transition-all duration-300 ease-out
          ${selected === "all" ? "left-1 right-[50%]" : "left-[50%] right-1"}
        `}
      />

  
      <button
        onClick={() => handleSelect("all")}
        className={`
          relative text-xs z-10 px-2 py-2  rounded-lg transition-colors duration-300  ${selected === "all" ? "text-white" : "text-gray-300"}
        `}
      >
        Todos los animes
      </button>

  
      <button
        onClick={() => handleSelect("following")}
        className={`
          relative text-xs z-10 px-2 py-2  rounded-lg transition-colors duration-300
          ${selected === "following" ? "text-white" : "text-gray-300"}
        `}
      >
        Animes que sigo
      </button>
    </div>
  );
}
