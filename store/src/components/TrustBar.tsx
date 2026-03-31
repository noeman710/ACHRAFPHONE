import { Truck, Clock, Banknote } from "lucide-react";

export default function TrustBar() {
  const features = [
    { label: "Free", icon: Truck },
    { label: "24h Express", icon: Clock },
    { label: "On Delivery", icon: Banknote },
  ];

  return (
    <div className="px-4 py-8 relative">
      <div className="flex flex-col items-center">
        <h3 className="text-surface-black font-bold uppercase tracking-widest text-[10px] mb-6 opacity-40">Tangier Delivery</h3>
        
        <div className="w-full grid grid-cols-3 bg-surface-white border border-black/5 rounded-[24px] p-4 lg:p-6 shadow-sm">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className="bg-neutral-100 p-2.5 lg:p-3 rounded-full mb-2 lg:mb-3 text-surface-black">
                <feature.icon size={18} />
              </div>
              <span className="text-[10px] lg:text-xs font-bold text-surface-black text-center leading-tight">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
