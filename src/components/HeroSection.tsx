import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 mt-4 lg:mt-6">
      <div className="relative w-full overflow-hidden bg-surface-black rounded-[20px] lg:rounded-[32px] aspect-[4/5] md:aspect-[21/9] flex flex-col md:flex-row items-center justify-between p-6 lg:p-16">
        <div className="z-10 text-center md:text-left flex flex-col items-center md:items-start w-full mt-4 md:mt-0 md:max-w-md">
          <h1 className="text-surface-white font-bold text-4xl lg:text-6xl tracking-tight mb-3 lg:mb-4 leading-tight">
            Power at <br className="md:hidden"/> <span className="text-surface-white/70 italic">Your Fingertips</span>
          </h1>
          <p className="text-surface-white/60 text-sm lg:text-lg mb-6 lg:mb-8 font-medium max-w-[280px] md:max-w-none">
            Discover our premium selection of the latest smartphones at the best prices.
          </p>
          
          <Link 
            href="/store"
            className="flex items-center gap-2 bg-surface-white text-surface-black px-6 lg:px-8 py-3 lg:py-4 rounded-[32px] font-bold tracking-wide text-sm lg:text-base transition-all active:scale-95 hover:bg-white/90"
          >
            Visit Store
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Floating Phone Image */}
        <div className="absolute -bottom-16 md:bottom-[-20%] md:right-4 w-full max-w-[280px] md:max-w-[350px] lg:max-w-[450px] flex justify-center md:justify-end">
          <Image 
            src="/hero.png" 
            alt="Premium Smartphone"
            width={600}
            height={600}
            className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}
