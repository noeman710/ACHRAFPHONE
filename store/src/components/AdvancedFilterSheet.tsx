"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface AdvancedFilterSheetProps {
  availableBrands: string[];
  availableSubCats: string[];
  availableConditions: string[];
  resultCount: number;
  
  activeCategory: string;
  activeBrand: string;
  activeCondition: string;
  activeSubCat: string;
  sortOrder: string;
  minPrice: string;
  maxPrice: string;
  
  setActiveCategory: (cat: string) => void;
  setActiveBrand: (brand: string) => void;
  setActiveCondition: (cond: string) => void;
  setActiveSubCat: (sub: string) => void;
  setSortOrder: (order: string) => void;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  resetFilters: () => void;
}

export default function AdvancedFilterSheet({ 
  availableBrands, 
  availableSubCats,
  availableConditions,
  resultCount,
  activeCategory,
  activeBrand,
  activeCondition,
  activeSubCat,
  sortOrder,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setActiveCategory,
  setActiveBrand,
  setActiveCondition,
  setActiveSubCat,
  setSortOrder,
  resetFilters
}: AdvancedFilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["All", "Mobile Phones", "Tablets", "Accessories"];
  const sortOptions = [
    { id: "newest", label: "Newest" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 lg:right-8 z-40 bg-surface-black text-surface-white p-4 lg:p-5 rounded-full shadow-2xl transition-all active:scale-90 hover:scale-105 flex items-center justify-center group"
        aria-label="Filtres Avancés"
      >
        <SlidersHorizontal size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg bg-surface-black text-surface-white rounded-t-[32px] p-6 shadow-2xl h-[85vh] lg:h-[75vh] flex flex-col border border-white/5"
            >
              {/* Apple-style Drawer Handle */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 shrink-0" />

              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                   <h3 className="font-bold text-2xl tracking-tight">Filters</h3>
                   <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Refine your selection</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={resetFilters} 
                    className="text-xs font-bold text-white/50 hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white active:scale-90">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-8 space-y-10 px-1">
                
                {/* Category Selection */}
                <div>
                  <h4 className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Category</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={clsx(
                          "px-4 py-3 rounded-[16px] border transition-all text-sm font-bold text-left",
                          activeCategory === cat
                            ? "bg-white text-black border-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Order */}
                <div>
                  <h4 className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Sort By</h4>
                  <div className="flex flex-col gap-2">
                    {sortOptions.map(option => (
                      <button 
                        key={option.id}
                        onClick={() => setSortOrder(option.id)}
                        className={clsx(
                          "w-full px-5 py-4 rounded-[16px] border transition-all text-sm font-bold flex items-center justify-between",
                          sortOrder === option.id
                            ? "bg-white text-black border-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                        )}
                      >
                        <span>{option.label}</span>
                        {sortOrder === option.id && <div className="w-2 h-2 rounded-full bg-black animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Price Range (MAD)</h4>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[20px] border border-white/5">
                    <div className="flex flex-col flex-1 gap-1.5">
                       <span className="text-[9px] font-black uppercase opacity-40 ml-1">Minimum</span>
                       <input 
                        type="number" 
                        placeholder="0" 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full bg-transparent p-0 text-white placeholder:text-white/20 outline-none text-lg font-bold" 
                      />
                    </div>
                    <div className="w-[1px] h-10 bg-white/10 mx-2" />
                    <div className="flex flex-col flex-1 gap-1.5">
                       <span className="text-[9px] font-black uppercase opacity-40 ml-1">Maximum</span>
                       <input 
                        type="number" 
                        placeholder="Any" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-transparent p-0 text-white placeholder:text-white/20 outline-none text-lg font-bold" 
                       />
                    </div>
                  </div>
                </div>

                {/* Brands (Mobile/Tablets) */}
                {(activeCategory === "Mobile Phones" || activeCategory === "Tablets" || activeCategory === "All") && (
                  <div>
                    <h4 className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Brands</h4>
                    <div className="grid grid-cols-2 gap-2">
                       <button 
                         onClick={() => setActiveBrand("All")}
                         className={clsx(
                           "px-4 py-3 rounded-[16px] border transition-all text-sm font-bold text-left",
                           activeBrand === "All" ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"
                         )}
                       >
                         All Brands
                       </button>
                       {availableBrands.map(brand => (
                        <button 
                          key={brand} 
                          onClick={() => setActiveBrand(brand)}
                          className={clsx(
                            "px-4 py-3 rounded-[16px] border transition-all text-sm font-bold text-left",
                            activeBrand === brand
                              ? "bg-white text-black border-white"
                              : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                          )}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Categories (Accessories) */}
                {activeCategory === "Accessories" && (
                  <div>
                    <h4 className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Type of Accessory</h4>
                    <div className="grid grid-cols-2 gap-2">
                       <button 
                         onClick={() => setActiveSubCat("All")}
                         className={clsx(
                           "px-4 py-3 rounded-[16px] border transition-all text-sm font-bold text-left",
                           activeSubCat === "All" ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"
                         )}
                       >
                         All Types
                       </button>
                       {availableSubCats.map(sub => (
                        <button 
                          key={sub} 
                          onClick={() => setActiveSubCat(sub)}
                          className={clsx(
                            "px-4 py-3 rounded-[16px] border transition-all text-sm font-bold text-left",
                            activeSubCat === sub
                              ? "bg-white text-black border-white"
                              : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                          )}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Condition */}
                <div>
                  <h4 className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-4">Condition</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setActiveCondition("All")}
                      className={clsx(
                        "px-4 py-3 rounded-[16px] border transition-all text-sm font-bold",
                        activeCondition === "All" ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60"
                      )}
                    >
                      All
                    </button>
                    {availableConditions.map(cond => (
                      <button 
                        key={cond} 
                        onClick={() => setActiveCondition(cond)}
                        className={clsx(
                          "px-4 py-3 rounded-[16px] border transition-all text-sm font-bold",
                          activeCondition === cond
                            ? "bg-white text-black border-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                        )}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex gap-3 mt-auto">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-surface-white text-surface-black py-5 rounded-[40px] font-bold text-center active:scale-95 transition-all text-lg shadow-[0_20px_50px_rgba(255,255,255,0.15)] hover:bg-[#F2F2F2]"
                >
                  Show {resultCount} {resultCount === 1 ? 'Item' : 'Items'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
