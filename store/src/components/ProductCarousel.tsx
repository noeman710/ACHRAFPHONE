"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { Product } from "@/lib/products";

interface ProductCarouselProps {
  title: string;
  viewAllLink: string;
  products: Product[];
}

export default function ProductCarousel({ title, viewAllLink, products }: ProductCarouselProps) {
  return (
    <div className="w-full max-w-[1440px] mx-auto py-10 lg:py-16">
      <div className="flex justify-between items-end px-4 md:px-6 lg:px-8 mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{title}</h2>
        <Link 
          href={viewAllLink}
          className="text-sm font-semibold text-black/60 hover:text-black flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full overflow-x-auto no-scrollbar pb-8 px-4 md:px-6 lg:px-8 snap-x snap-mandatory">
        <div className="flex gap-4 lg:gap-6 w-max">
          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/product/${product.id}`}
              className={`group flex flex-col justify-between bg-white border border-black/5 rounded-[24px] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg w-[240px] md:w-[300px] snap-center lg:snap-start shrink-0 relative ${!product.inStock ? "grayscale-[0.5] opacity-80 cursor-not-allowed" : "active:scale-[0.98]"}`}
              onClick={(e) => !product.inStock && e.preventDefault()}
            >
              {/* Image Area */}
              <div className="w-full aspect-[4/5] pt-4 px-4 flex items-center justify-center relative bg-[#Fbfbfb]">
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  <span className="bg-black/5 text-black text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                    {product.state}
                  </span>
                  {!product.inStock && (
                    <span className="bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                      Out of Stock
                    </span>
                  )}
                  {product.inStock && product.oldPrice && (
                    <span className="bg-green-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                      Deal
                    </span>
                  )}
                </div>
                
                <Image 
                  src={product.img} 
                  alt={product.name}
                  width={240}
                  height={240}
                  className="w-[75%] h-auto object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-md"
                />
              </div>
              
              {/* Detail Area */}
              <div className="bg-white p-5 flex flex-col gap-2 border-t border-black/5 min-h-[120px] justify-between">
                <h3 className="font-semibold text-base leading-snug line-clamp-2 md:text-lg">{product.name}</h3>
                
                <div className="flex flex-col mt-2">
                  {product.oldPrice && (
                    <span className="text-[10px] md:text-xs text-black/40 line-through font-medium">
                      {product.oldPrice.toLocaleString('fr-MA')} MAD
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-lg md:text-xl tracking-tight ${product.oldPrice ? "text-red-600" : "text-black"}`}>
                      {product.price.toLocaleString('fr-MA')} <span className="text-xs font-medium opacity-50">MAD</span>
                    </span>
                    <div className={`rounded-full p-2 transition-all duration-300 ${!product.inStock ? "bg-black/5 text-black/20" : "bg-black/5 text-black group-hover:bg-black group-hover:text-white"}`}>
                      <ShoppingBag size={18} strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
