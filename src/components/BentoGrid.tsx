import Link from "next/link";
import { Smartphone, Headphones, Tablet, Sparkles } from "lucide-react";

export default function BentoGrid() {
  const categories = [
    { title: "Smartphones", icon: Smartphone, href: "/store?category=phones", color: "bg-surface-black text-white" },
    { title: "Accessoires", icon: Headphones, href: "/store?category=accessories", color: "bg-neutral-100 text-black border border-black/5" },
    { title: "Tablettes", icon: Tablet, href: "/store?category=tablets", color: "bg-neutral-100 text-black border border-black/5" },
    { title: "Promotions", icon: Sparkles, href: "/store?category=offers", color: "bg-surface-black text-white" },
  ];

  const Icon0 = categories[0].icon;
  const Icon1 = categories[1].icon;
  const Icon2 = categories[2].icon;
  const Icon3 = categories[3].icon;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4 tracking-tight">Catégories</h2>
      <div className="grid grid-cols-2 gap-3">
        {/* Large item 1 */}
        <Link 
          href={categories[0].href}
          className={`${categories[0].color} rounded-[20px] p-5 flex flex-col items-start justify-between min-h-[140px] transition-transform active:scale-[0.98]`}
        >
          <Icon0 size={28} strokeWidth={1.5} />
          <span className="font-semibold text-lg">{categories[0].title}</span>
        </Link>
        
        <div className="grid grid-rows-2 gap-3">
          {/* Small item 1 */}
          <Link 
            href={categories[1].href}
            className={`${categories[1].color} rounded-[16px] p-4 flex items-center justify-between transition-transform active:scale-[0.98]`}
          >
            <span className="font-medium">{categories[1].title}</span>
            <Icon1 size={20} className="opacity-70" />
          </Link>
          
          {/* Small item 2 */}
          <Link 
            href={categories[2].href}
            className={`${categories[2].color} rounded-[16px] p-4 flex items-center justify-between transition-transform active:scale-[0.98]`}
          >
            <span className="font-medium">{categories[2].title}</span>
            <Icon2 size={20} className="opacity-70" />
          </Link>
        </div>

        {/* Promo item bridging bottom */}
        <Link 
          href={categories[3].href}
          className={`${categories[3].color} col-span-2 rounded-[20px] p-5 flex items-center justify-between transition-transform active:scale-[0.98]`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Icon3 size={24} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-lg block">{categories[3].title}</span>
              <span className="text-white/60 text-sm">Offres limitées</span>
            </div>
          </div>
          <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            -20%
          </span>
        </Link>
      </div>
    </div>
  );
}
