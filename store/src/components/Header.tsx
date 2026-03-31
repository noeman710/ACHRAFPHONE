"use client";

import { Search, ShoppingBag, Menu, X, Home, Store, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { items } = useCart();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Support", href: "https://wa.me/212600000000", external: true },
    { name: "Account", href: "/account" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Background (separated to not break fixed position containing blocks for the mobile menu) */}
      <div className="absolute inset-0 w-full h-full backdrop-blur-md bg-[rgba(249,249,249,0.8)] border-b border-black/5 -z-10" />
      
      <div className="flex h-12 lg:h-14 items-center justify-between px-4 md:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/" className="font-sans font-bold text-lg tracking-tight text-foreground flex items-center justify-start flex-none">
          <span className="sr-only">ACHRAFPHONE</span>
          <span className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100">
            <span className="w-5 h-5 bg-surface-black rounded-[6px] text-surface-white flex items-center justify-center font-black italic text-[10px]">A</span>
            <span className="hidden lg:inline tracking-tighter">ACHRAF</span><span className="hidden lg:inline font-light tracking-tighter">PHONE</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 text-xs font-semibold tracking-wide">
          {navLinks.map((link) => (
            link.external ? (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black transition-colors">
                {link.name}
              </a>
            ) : (
              <Link key={link.name} href={link.href} className="text-black/70 hover:text-black transition-colors">
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Actions (Search, Cart, Language, and Mobile Menu) */}
        <div className="flex items-center gap-1 lg:gap-3">
          <button className="hidden lg:flex items-center gap-1 text-[10px] font-bold tracking-wider px-2" aria-label="Language">
            <span className="text-black">EN</span>
            <span className="text-black/30">|</span>
            <span className="text-black/50 hover:text-black">FR</span>
          </button>
          
          <button 
             onClick={() => setIsSearchOpen(!isSearchOpen)}
             className="p-2 text-foreground/80 hover:text-foreground transition-colors" 
             aria-label="Search"
          >
            {isSearchOpen ? <X size={20} strokeWidth={2} /> : <Search size={20} strokeWidth={2} />}
          </button>
          
          <Link href="/checkout" className="relative p-2 text-foreground/80 hover:text-foreground transition-colors" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={2} />
            {items.length > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-surface-black text-[9px] font-bold text-surface-white">
                {items.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Global Search Overlay Header */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/5 shadow-2xl overflow-hidden z-40"
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 flex flex-col gap-4">
               <div className="flex items-center border border-black/10 rounded-full px-4 bg-black/[0.02]">
                  <Search size={20} className="text-black/40" />
                  <input 
                    type="text" 
                    placeholder="Search products, brands, or accessories..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-4 px-3 outline-none text-sm font-medium" 
                    autoFocus
                  />
                  <Link href={`/store?q=${searchQuery}`} onClick={() => setIsSearchOpen(false)} className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold active:scale-95 transition-transform">
                    Search
                  </Link>
               </div>
               <div className="flex gap-2">
                 <span className="text-xs text-black/50 font-medium">Trending:</span>
                 {["iPhone 15", "Samsung S24", "AirPods", "Charger"].map(term => (
                   <Link key={term} href={`/store?q=${term}`} onClick={() => setIsSearchOpen(false)} className="text-xs font-semibold text-black hover:underline">
                     {term}
                   </Link>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Side Drawer (Sidebar) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Darkened Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden h-[100dvh]"
            />
            
            {/* Sliding Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-background border-l border-black/5 shadow-2xl flex flex-col pt-4 px-6 lg:hidden h-[100dvh]"
            >
              <div className="flex justify-between items-center mb-8 mt-1 h-12">
                <span className="font-bold text-xl tracking-tight">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  link.external ? (
                    <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold px-4 py-4 rounded-2xl hover:bg-black/5 transition-colors text-surface-black">
                      {link.name}
                    </a>
                  ) : (
                    <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-semibold px-4 py-4 rounded-2xl hover:bg-black/5 transition-colors text-surface-black">
                      {link.name}
                    </Link>
                  )
                ))}
              </nav>

              <div className="mt-6 flex bg-black/5 rounded-2xl p-1">
                 <button className="flex-1 text-center py-2 bg-white rounded-xl shadow-sm text-sm font-bold">English (EN)</button>
                 <button className="flex-1 text-center py-2 text-black/50 hover:text-black text-sm font-bold">Français (FR)</button>
              </div>
              
              <div className="mt-auto mb-8">
                 <div className="bg-surface-black rounded-[24px] p-6 text-center text-surface-white">
                   <h4 className="font-bold text-sm mb-2">Need Help?</h4>
                   <p className="text-xs text-white/70 mb-5 leading-relaxed">Our Tangier-based support is available on WhatsApp 24/7.</p>
                   <a href="https://wa.me/212600000000" className="inline-block bg-surface-white text-surface-black w-full py-3.5 rounded-[32px] text-sm font-bold active:scale-95 transition-transform">
                     Contact Support
                   </a>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
