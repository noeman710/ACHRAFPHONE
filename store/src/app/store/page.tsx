"use client";

import { useState, useMemo, useEffect } from "react";
import FilterPills from "@/components/FilterPills";
import AdvancedFilterSheet from "@/components/AdvancedFilterSheet";
import ProductGrid from "@/components/ProductGrid";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { ALL_PRODUCTS } from "@/lib/products";

const CATEGORIES = ["All", "Mobile Phones", "Tablets", "Accessories"];
const BRANDS_MOBILE = ["All", "Apple", "Samsung", "Xiaomi", "Huawei"];
const CONDITIONS = ["All", "New", "Used"];
const ACCESSORY_SUB_CATEGORIES = ["All", "Protection", "Energy", "Audio", "Connectivity", "Input", "Stands"];

export default function StorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const forModel = searchParams.get("forModel"); // Smart Match

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("Mobile Phones");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeCondition, setActiveCondition] = useState("All");
  const [activeSubCat, setActiveSubCat] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  
  // Advanced sheet bounds (Price)
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    if (initialQuery) {
       setSearchQuery(initialQuery);
       setActiveCategory("All");
    }
  }, [initialQuery]);

  useEffect(() => {
    if (forModel) {
       setActiveCategory("Accessories");
    }
  }, [forModel]);

  const resetFilters = () => {
    setActiveCategory("Mobile Phones");
    setActiveBrand("All");
    setActiveCondition("All");
    setActiveSubCat("All");
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");
    setSortOrder("newest");
  };

  const clearSmartMatch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("forModel");
    router.replace(`/store?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    let result = ALL_PRODUCTS.filter((product) => {
      // 0. Smart Match Filter
      if (forModel && product.compatibility) {
        if (!product.compatibility.includes(forModel)) return false;
      }

      // 1. Search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
         return false;
      }

      // 2. Filter by Category
      if (activeCategory !== "All" && product.category !== activeCategory) {
        return false;
      }
      
      // 3. Filter by Brand (Only applied if category is Mobile or we selected a specific brand)
      if (activeBrand !== "All" && activeCategory === "Mobile Phones" && product.brand !== activeBrand) {
        return false;
      }

      // 4. SubCategory for accessories
      if (activeCategory === "Accessories" && activeSubCat !== "All" && product.subCategory !== activeSubCat) {
        return false;
      }

      // 5. Filter by Condition (New/Used)
      if (activeCondition !== "All" && product.state !== activeCondition) {
        return false;
      }

      // 6. Filter by Price Bounds
      if (minPrice !== "" && product.price < Number(minPrice)) {
         return false;
      }
      if (maxPrice !== "" && product.price > Number(maxPrice)) {
         return false;
      }

      return true;
    });

    // 7. Sorting
    if (sortOrder === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "newest") {
      // Assuming latest in array is newest
      result.reverse();
    }

    return result;
  }, [searchQuery, activeCategory, activeBrand, activeCondition, activeSubCat, minPrice, maxPrice, forModel, sortOrder]);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500 pb-16 relative min-h-screen">
      <div className="sticky top-12 lg:top-14 z-30 bg-[rgba(255,255,255,0.8)] backdrop-blur-xl border-b border-black/5 flex flex-col pb-4 shadow-sm">
        
        {/* Tier 1: Main Categories */}
        <div className="max-w-[1440px] mx-auto w-full flex justify-start px-4 md:px-6 lg:px-8">
          <FilterPills 
            categories={CATEGORIES} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
            size="md"
          />
        </div>

        {/* Tier 2: Brands (Mobiles) OR Sub-categories (Accessories) */}
        {activeCategory === "Mobile Phones" && (
          <div className="max-w-[1440px] mx-auto w-full flex justify-start px-4 md:px-6 lg:px-8 -mt-2">
            <FilterPills 
              categories={BRANDS_MOBILE} 
              activeCategory={activeBrand} 
              onSelect={setActiveBrand} 
              size="sm"
            />
          </div>
        )}
        {activeCategory === "Accessories" && (
          <div className="max-w-[1440px] mx-auto w-full flex justify-start px-4 md:px-6 lg:px-8 -mt-2">
            <FilterPills 
              categories={ACCESSORY_SUB_CATEGORIES} 
              activeCategory={activeSubCat} 
              onSelect={setActiveSubCat} 
              size="sm"
            />
          </div>
        )}
      </div>
      
      <div className="pt-8 lg:pt-12 w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Smart-Match Pill */}
        {forModel && (
          <div className="mb-6 flex">
            <button 
              onClick={clearSmartMatch}
              className="flex items-center gap-2 bg-surface-black text-surface-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-[#222] transition-colors active:scale-95"
            >
              Filtered for: {forModel}
              <X size={16} className="opacity-70" />
            </button>
          </div>
        )}

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-black/10 rounded-[20px] py-3 pl-12 pr-4 outline-none focus:border-black/30 transition-colors shadow-sm text-sm" 
          />
        </div>
        
        <ProductGrid products={filteredProducts} />
      </div>

      <AdvancedFilterSheet 
        // Data
        availableBrands={BRANDS_MOBILE.filter(b => b !== "All")}
        availableSubCats={ACCESSORY_SUB_CATEGORIES.filter(s => s !== "All")}
        availableConditions={CONDITIONS.filter(c => c !== "All")}
        resultCount={filteredProducts.length}
        
        // Active State
        activeCategory={activeCategory}
        activeBrand={activeBrand}
        activeCondition={activeCondition}
        activeSubCat={activeSubCat}
        sortOrder={sortOrder}
        minPrice={minPrice}
        maxPrice={maxPrice}
        
        // Setters
        setActiveCategory={setActiveCategory}
        setActiveBrand={setActiveBrand}
        setActiveCondition={setActiveCondition}
        setActiveSubCat={setActiveSubCat}
        setSortOrder={setSortOrder}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        resetFilters={resetFilters}
      />
    </div>
  );
}
