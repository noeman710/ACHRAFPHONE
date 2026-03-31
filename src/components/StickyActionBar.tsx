"use client";

import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";
import { useRouter } from "next/navigation";

interface ActionProps {
  product: Product;
  quantity: number;
}

export default function StickyActionBar({ product, quantity }: ActionProps) {
  const { addItem, items } = useCart();
  const router = useRouter();

  const handleOrder = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#121212] text-surface-white md:hidden z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pb-safe">
      <div className="flex items-center justify-between p-4 max-w-md mx-auto">
        <div className="flex flex-col ml-2">
          <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Total</span>
          <span className="font-bold text-xl leading-none">
            {(product.price * quantity).toLocaleString('fr-MA')} <span className="text-xs font-normal">MAD</span>
          </span>
        </div>
        
        <button 
          disabled={!product.inStock}
          onClick={handleOrder}
          className={`px-6 py-3.5 rounded-[32px] font-bold text-sm flex items-center gap-2 transition-transform ${!product.inStock ? "bg-white/10 text-white/30 cursor-not-allowed" : "bg-surface-white text-surface-black active:scale-95"}`}
        >
          <span>{product.inStock ? "Order Now" : "Out of Stock"}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
