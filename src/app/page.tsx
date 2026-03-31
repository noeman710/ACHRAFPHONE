import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import TrustBar from "@/components/TrustBar";
import { ALL_PRODUCTS } from "@/lib/products";

export default function Home() {
  // Get dynamic data from lib/products
  const latestPhones = ALL_PRODUCTS.filter(p => p.category === "Mobile Phones").slice(0, 4);
  const accessories = ALL_PRODUCTS.filter(p => p.isAccessory).slice(0, 4);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-700 bg-background overflow-hidden">
      <HeroSection />
      
      <ProductCarousel title="Latest Smartphones" viewAllLink="/store" products={latestPhones} />
      
      {/* Visual Divider / Branding Row */}
      <div className="bg-surface-black text-surface-white py-16 xl:py-24 mt-4 lg:mt-10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-neutral-900 pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-col items-center">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-center">Mobile Excellence.</h2>
           <p className="text-center text-white/70 max-w-2xl mx-auto md:text-lg mb-8 leading-relaxed">
             ACHRAFPHONE is your premium destination in Tangier for mobile devices. Enjoy official warranties and reliable local delivery.
           </p>
           <div className="w-full max-w-3xl">
             <TrustBar />
           </div>
        </div>
      </div>

      <ProductCarousel title="Must-Have Accessories" viewAllLink="/store" products={accessories} />

      {/* Minimal Footer */}
      <footer className="px-4 md:px-6 lg:px-8 py-12 text-center text-sm font-medium text-black/40 border-t border-black/5 flex flex-col items-center gap-2 mt-8">
        <span>ACHRAFPHONE Tangier • Premium Apple & Samsung Store</span>
        <span className="opacity-70">Copyright © 2026. All rights reserved.</span>
      </footer>
    </div>
  );
}
