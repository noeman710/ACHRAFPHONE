import clsx from "clsx";

interface FilterPillsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  size?: "sm" | "md";
}

export default function FilterPills({ categories, activeCategory, onSelect, size = "md" }: FilterPillsProps) {
  return (
    <div className={clsx("w-full overflow-x-auto no-scrollbar px-4 lg:px-6", size === "md" ? "py-4" : "py-2")}>
      <div className="flex gap-2 w-max">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={clsx(
              "rounded-[32px] font-medium whitespace-nowrap transition-colors border",
              size === "md" ? "px-5 py-2 text-sm" : "px-4 py-1.5 text-xs",
              activeCategory === c 
                ? "bg-surface-black text-surface-white border-surface-black" 
                : "bg-surface-white text-surface-black border-black/10 hover:border-black/30"
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
