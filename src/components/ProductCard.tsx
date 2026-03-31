"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAdd: (e: React.MouseEvent, product: Product) => void;
  addingId: string | null;
}

export default function ProductCard({ product, onAdd, addingId }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className={`group flex flex-col bg-[#FFFFFF] rounded-[24px] overflow-hidden transition-all duration-300 shadow-[0px_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0px_12px_48px_rgba(0,0,0,0.1)] relative p-6 lg:p-8 ${!product.inStock ? "grayscale-[0.5] opacity-80 cursor-not-allowed" : "active:scale-[0.98]"}`}
      onClick={(e) => !product.inStock && e.preventDefault()}
    >
      {/* Internal Image Box - Light Gray #F4F4F7 */}
      <div className="w-full aspect-square flex items-center justify-center relative bg-[#F4F4F7] rounded-[16px] mb-8 lg:mb-10 transition-colors group-hover:bg-[#F0F0F5]">
        <div className="absolute top-4 left-4 lg:top-5 lg:left-5 flex flex-col gap-2 z-10">
          <span className="bg-black/5 text-[#121212] text-[10px] font-bold px-2.5 py-1 rounded-[12px] uppercase tracking-wider w-fit">
            {product.state}
          </span>
          {!product.inStock && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-[12px] uppercase tracking-wider w-fit">
              Out of Stock
            </span>
          )}
          {product.inStock && product.oldPrice && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-[12px] uppercase tracking-wider w-fit">
              Deal
            </span>
          )}
        </div>
        
        <div className="relative w-[75%] h-[75%] transition-transform duration-700 ease-out group-hover:scale-110">
            <Image 
                src={product.img} 
                alt={product.name}
                fill
                className="object-contain drop-shadow-xl"
            />
        </div>
      </div>
      
      {/* Content Section - 2.5x Spacing feel */}
      <div className="flex flex-col flex-1 relative min-h-[110px] lg:min-h-[130px] justify-between">
        <div className="space-y-3">
          <h3 className="font-bold text-[#121212] text-base lg:text-xl leading-tight line-clamp-2 pr-12 lg:pr-14">
            {product.name}
          </h3>
          {product.isAccessory && product.colors && (
            <div className="flex gap-2">
              {product.colors.map(color => (
                <span key={color} className="w-3.5 h-3.5 rounded-full border border-black/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]" style={{ backgroundColor: color }} title={color} />
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-col mt-6">
          {product.oldPrice && (
            <span className="text-xs lg:text-sm text-[#6E6E73] line-through font-medium mb-1 decoration-red-500/30">
              {product.oldPrice.toLocaleString('fr-MA')} MAD
            </span>
          )}
          <div className="flex items-end justify-between">
            <span className={`font-black text-xl lg:text-2xl tracking-tighter ${product.oldPrice ? "text-[#E31A1C]" : "text-[#121212]"}`}>
              {product.price.toLocaleString('fr-MA')} <span className="text-[10px] lg:text-xs font-black text-[#121212] ml-0.5">MAD</span>
            </span>
          </div>
        </div>

        {/* Action Button: Solid Black 32px Radius Pill */}
        <button 
           disabled={!product.inStock}
           onClick={(e) => onAdd(e, product)}
           className={`absolute bottom-0 right-0 rounded-[32px] w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center transition-all duration-300 shadow-lg ${!product.inStock ? "bg-black/5 text-black/20" : "bg-[#121212] text-white hover:scale-110 active:scale-95 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"}`}
           aria-label="Add to cart"
        >
          <AnimatePresence mode="wait">
             {addingId === product.id ? (
                <motion.div
                  key="added"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                >
                  <ShoppingBag size={20} strokeWidth={2.5} />
                </motion.div>
             ) : (
                <motion.div
                  key="bag"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <ShoppingBag size={20} className="icon-size" strokeWidth={2} />
                </motion.div>
             )}
          </AnimatePresence>
        </button>
      </div>
    </Link>
  );
}
