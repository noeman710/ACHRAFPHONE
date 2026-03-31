"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";
import { useState } from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingId(product.id);
    addItem(product);
    
    setTimeout(() => {
      setAddingId(null);
    }, 500);
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 pb-32 w-full max-w-[1440px] mx-auto">
      <div className="flex justify-between items-end mb-12 px-2 lg:px-0">
        <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-2">Catalog</span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#121212]">Our Collection</h2>
        </div>
        <span className="hidden sm:inline-block text-xs md:text-sm text-black/50 font-bold bg-black/5 px-4 py-1.5 rounded-full border border-black/5">
          {products.length} results
        </span>
      </div>
      
      {products.length === 0 ? (
        <div className="w-full text-center py-40 flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center opacity-20" />
          <span className="opacity-30 font-black text-2xl uppercase tracking-widest text-[#121212]">No matches found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 md:gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={handleQuickAdd}
              addingId={addingId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
