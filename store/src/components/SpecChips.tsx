"use client";

import { useState } from "react";
import clsx from "clsx";

interface SpecProps {
  label: string;
  options: string[];
}

export default function SpecChips({ label, options }: SpecProps) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-black/5 last:border-0">
      <h3 className="text-sm font-semibold opacity-60 tracking-tight">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={clsx(
              "px-5 py-3 rounded-[12px] text-sm font-bold transition-all border",
              selected === opt
                ? "bg-surface-black text-surface-white border-surface-black scale-100 shadow-md"
                : "bg-surface-white text-surface-black border-black/10 hover:border-black/30 scale-95"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
