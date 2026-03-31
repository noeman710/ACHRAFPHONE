"use client";

import ImageGallery from "@/components/ImageGallery";
import SpecChips from "@/components/SpecChips";
import StickyActionBar from "@/components/StickyActionBar";
import { ArrowLeft, ShieldCheck, Truck, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import { notFound, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { use, useState } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addItem, items } = useCart();
  const product = ALL_PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }

  // Use ACTUAL product properties with fallback for missing ones
  const detailedProduct = {
    ...product,
    description: product.description || (product.category === "Mobile Phones" 
      ? "Forged in aerospace-grade titanium, featuring the A17 Pro chip and the most powerful camera system ever." 
      : "Premium quality accessory crafted for durability and everyday excellence."),
    images: [product.img, product.img, product.img], // Still use 3 for the gallery demo, but now they are the real img
    specs: product.category === "Mobile Phones" ? [
      { label: "Storage", options: ["256GB", "512GB", "1TB"] },
      { label: "Color", options: ["Natural Titanium", "Blue Titanium", "Black Titanium"] }
    ] : (product.colors ? [{ label: "Color", options: product.colors }] : [])
  };

  const handleOrder = () => {
    addItem(detailedProduct as any, quantity);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Nav (Replaces global header strictly for PDP or overlays it on mobile) */}
      <div className="lg:hidden absolute top-0 w-full p-4 z-20 flex justify-between items-center pointer-events-none">
        <Link href="/store" className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-surface-black hover:bg-white transition-colors pointer-events-auto active:scale-90 flex items-center gap-2">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 pt-4 lg:pt-10 px-0 md:px-6">
        
        {/* Left Column: Gallery */}
        <div className="w-full md:w-1/2">
          <ImageGallery images={detailedProduct.images} />
        </div>

        {/* Right Column: Product Info */}
        <div className="w-full md:w-1/2 px-6 md:px-0 flex flex-col pt-2 pb-6">
          <div className="hidden md:flex mb-6">
             <Link href="/store" className="text-sm font-semibold text-black/50 hover:text-black flex items-center gap-2 transition-colors">
               <ArrowLeft size={16} /> Back to store
             </Link>
          </div>

          <div className="flex items-center gap-2 mb-2 lg:mb-4">
            <span className="bg-surface-black text-surface-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-[6px] text-[10px] lg:text-xs font-bold uppercase tracking-widest">{detailedProduct.state}</span>
            <span className="text-black/50 text-xs lg:text-sm font-bold uppercase tracking-wide">{detailedProduct.brand}</span>
            {!detailedProduct.inStock && (
              <span className="bg-red-500 text-white px-2 lg:px-3 py-0.5 lg:py-1 rounded-[6px] text-[10px] lg:text-xs font-bold uppercase tracking-widest">Out of Stock</span>
            )}
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-2 lg:mb-4 leading-none">{detailedProduct.name}</h1>
          
          <div className="flex flex-col mb-4 lg:mb-6">
            {detailedProduct.oldPrice && (
              <span className="text-sm lg:text-base text-black/40 line-through font-medium">
                {detailedProduct.oldPrice.toLocaleString('fr-MA')} MAD
              </span>
            )}
            <div className={`text-2xl lg:text-3xl font-bold ${detailedProduct.oldPrice ? "text-red-600" : "text-surface-black"}`}>
              {detailedProduct.price.toLocaleString('fr-MA')} <span className="text-lg lg:text-xl font-medium text-black/50">MAD</span>
            </div>
          </div>
          
          <p className="text-black/60 text-sm lg:text-base leading-relaxed mt-2 mb-6 lg:mb-8 md:max-w-md">
            {detailedProduct.description}
          </p>

          {/* Smart-Match Accessories Link (Phones & Tablets) */}
          {!detailedProduct.isAccessory && (
            <Link 
              href={`/store?forModel=${encodeURIComponent(detailedProduct.name)}`}
              className="inline-flex w-fit items-center gap-2 bg-[#F5F5F7] px-5 py-3 rounded-full text-sm font-bold text-surface-black active:scale-95 transition-transform hover:bg-[#EAEAEA] mb-8"
            >
              <Layers size={18} className="text-black/50" />
              View Compatible Accessories
            </Link>
          )}

          {/* Specs Configuration */}
          <div className="w-full flex-col gap-2 mb-6 lg:mb-10">
            {detailedProduct.specs.map((spec: any) => (
              <SpecChips key={spec.label} label={spec.label} options={spec.options} />
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col gap-3 mb-8 lg:mb-10">
            <span className="text-xs lg:text-sm font-semibold opacity-50 uppercase tracking-widest">Quantity</span>
            <div className="flex items-center gap-4 bg-black/5 w-fit rounded-full p-1.5 border border-black/5">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl font-medium shadow-sm hover:bg-neutral-50 active:scale-90 transition-all border border-black/5"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-lg select-none">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl font-medium shadow-sm hover:bg-neutral-50 active:scale-90 transition-all border border-black/5"
              >
                +
              </button>
            </div>
          </div>

          {/* Desktop/Tablet CTA */}
          <div className="hidden md:block mb-8">
            <button 
              disabled={!detailedProduct.inStock}
              onClick={handleOrder}
              className={`px-8 py-5 rounded-[32px] font-bold text-lg flex items-center justify-center gap-2 transition-all w-full max-w-md shadow-lg ${!detailedProduct.inStock ? "bg-black/10 text-black/30 cursor-not-allowed" : "bg-surface-black text-surface-white active:scale-95 hover:bg-[#1f1f1f]"}`}
            >
              <span>{detailedProduct.inStock ? "Order Now (Cash on Delivery)" : "Out of Stock"}</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Mini Trust Badges */}
          <div className="bg-black/5 rounded-[16px] xl:rounded-[24px] p-5 lg:p-6 flex flex-col gap-4 mt-auto">
            <div className="flex items-center gap-3">
               <Truck size={20} className="text-black/70" />
               <span className="text-sm lg:text-base font-semibold text-black/90">Express Delivery in Tangier</span>
            </div>
            <div className="flex items-center gap-3">
               <ShieldCheck size={20} className="text-black/70" />
               <span className="text-sm lg:text-base font-semibold text-black/90">Official {detailedProduct.brand} Warranty & Authentic</span>
            </div>
          </div>
        </div>
      </div>

      <StickyActionBar product={detailedProduct} quantity={quantity} />
    </div>
  );
}
