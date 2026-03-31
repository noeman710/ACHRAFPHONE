"use client";

import { ArrowLeft, CheckCircle2, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/lib/products";
import Image from "next/image";

export default function CheckoutPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { items, cartTotal, addItem, updateQuantity, removeItem, clearCart } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  // Up-sell items lookup
  const charger = ALL_PRODUCTS.find(p => p.id === "a4");
  const glass = ALL_PRODUCTS.find(p => p.id === "a3");
  
  // Checking if they are already in cart
  const hasCharger = items.some(i => i.id === "a4");
  const hasGlass = items.some(i => i.id === "a3");

  // Show Upsell only if there's at least one phone and they don't have both
  const hasPhone = items.some(i => i.category === "Mobile Phones");
  const showUpsell = hasPhone && (!hasCharger || !hasGlass);

  const displayTotal = cartTotal;

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-in zoom-in duration-500 text-center w-full max-w-md mx-auto">
        <CheckCircle2 size={80} className="text-[#121212] mb-6" strokeWidth={1.5} />
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4 text-[#121212]">Order Received!</h1>
        <p className="text-black/60 text-base mb-8 max-w-sm font-medium">
          Thank you for choosing ACHRAFPHONE. We will contact you on WhatsApp shortly to coordinate your delivery.
        </p>
        <Link 
          href="/"
          className="bg-[#121212] text-white px-8 py-4 rounded-[32px] font-black text-sm w-full active:scale-95 transition-transform shadow-lg shadow-black/10"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen pb-20 animate-in fade-in duration-500 bg-[#F9F9F9]">
      <div className="w-full max-w-2xl mx-auto pt-6 lg:pt-12 px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center mb-10">
          <Link href="/store" className="p-3 mr-4 bg-white border border-black/5 shadow-sm hover:bg-black hover:text-white rounded-full active:scale-90 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Review</span>
            <h1 className="font-black text-2xl lg:text-3xl tracking-tight text-[#121212]">Your Order</h1>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="bg-white border border-black/5 rounded-[24px] p-4 md:p-8 mb-10 flex flex-col gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
          {items.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center opacity-20">
                <Trash2 size={24} />
              </div>
              <p className="font-black text-black/30 uppercase tracking-widest text-sm">Your cart is empty</p>
              <Link href="/store" className="text-sm font-bold underline decoration-2 underline-offset-4">Browse Collection</Link>
            </div>
          ) : (
             items.map(item => (
                <div key={item.cartId} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-5 border-b border-black/5 last:border-0 last:pb-0 relative group">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#F4F4F7] rounded-[16px] flex items-center justify-center p-3 flex-shrink-0">
                     <Image src={item.img} alt={item.name} width={80} height={80} className="w-full h-auto object-contain drop-shadow-md" />
                  </div>
                  
                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex flex-col">
                        <span className="font-black text-lg lg:text-xl leading-tight text-[#121212]">{item.name}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/30 mt-0.5">{item.brand} | {item.state}</span>
                      </div>
                      <button 
                        onClick={() => removeItem(item.cartId)}
                        className="p-2 text-black/20 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-[#F4F4F7] rounded-full p-1 border border-black/5">
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-[#121212]"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="w-8 text-center text-sm font-black text-[#121212]">{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-[#121212]"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                      
                      <span className="font-black text-lg lg:text-xl text-[#121212]">
                        {(item.price * item.quantity).toLocaleString('fr-MA')} <span className="text-[10px] font-bold opacity-30 italic">MAD</span>
                      </span>
                    </div>
                  </div>
                </div>
             ))
          )}
        </div>

        <h2 className="text-xl lg:text-2xl font-bold tracking-tight mb-6">Your Details</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-6 bg-white p-6 lg:p-8 rounded-[24px] shadow-sm border border-black/5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs lg:text-sm font-semibold opacity-60 ml-1">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Achraf"
              className="bg-white border-2 border-black/10 hover:border-black/30 rounded-[12px] px-4 py-3.5 lg:py-4 outline-none text-sm lg:text-base font-medium focus:border-surface-black focus:ring-4 ring-black/5 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs lg:text-sm font-semibold opacity-60 ml-1">Phone Number (WhatsApp)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm lg:text-base font-semibold opacity-50">+212</span>
              <input 
                type="tel" 
                required
                placeholder="6XX XX XX XX"
                className="w-full bg-white border-2 border-black/10 hover:border-black/30 rounded-[12px] pl-16 pr-4 py-3.5 lg:py-4 outline-none text-sm lg:text-base font-medium focus:border-surface-black focus:ring-4 ring-black/5 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs lg:text-sm font-semibold opacity-60 ml-1">Neighborhood (Tangier only)</label>
            <div className="relative">
              <select 
                required
                className="w-full bg-white border-2 border-black/10 hover:border-black/30 rounded-[12px] px-4 py-3.5 lg:py-4 outline-none text-sm lg:text-base font-medium focus:border-surface-black focus:ring-4 ring-black/5 transition-all appearance-none"
                defaultValue=""
              >
                <option value="" disabled>Select your neighborhood...</option>
                <option value="malabata">Malabata</option>
                <option value="iberia">Iberia</option>
                <option value="mesnana">Mesnana</option>
                <option value="branes">Branes</option>
                <option value="autre">Other (Standard Delivery)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                ▼
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-2">
            <label className="text-xs lg:text-sm font-semibold opacity-60 ml-1">Detailed Address</label>
            <textarea 
              rows={3}
              placeholder="Street, building, floor..."
              className="bg-white border-2 border-black/10 hover:border-black/30 rounded-[12px] px-4 py-3.5 lg:py-4 outline-none text-sm lg:text-base font-medium focus:border-surface-black focus:ring-4 ring-black/5 transition-all resize-none"
            />
          </div>

          {/* Tanger Upsell - "Did you forget protection?" Bento Box */}
          {showUpsell && (
             <div className="bg-[#F5F5F7] rounded-[20px] p-5 my-2 border border-black/5">
                <h3 className="font-bold text-[15px] mb-4">Did you forget protection?</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                   {/* Charger Upsell */}
                   {!hasCharger && charger && (
                     <div className="flex-1 bg-white p-3 rounded-[16px] shadow-sm flex items-center gap-3">
                        <div className="w-12 h-12 bg-black/5 rounded-[8px] flex items-center justify-center p-1 relative shrink-0">
                           <Image src={charger.img} alt={charger.name} width={40} height={40} className="w-full h-auto object-contain" />
                        </div>
                        <div className="flex flex-col flex-1 pr-2">
                           <span className="font-semibold text-xs line-clamp-1">{charger.name}</span>
                           <span className="font-bold text-sm">{charger.price} MAD</span>
                        </div>
                        <button type="button" onClick={() => addItem(charger)} className="w-8 h-8 rounded-full bg-surface-black text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform hover:scale-105">
                           <Plus size={16} strokeWidth={2.5} />
                        </button>
                     </div>
                   )}
                   
                   {/* Glass Upsell */}
                   {!hasGlass && glass && (
                     <div className="flex-1 bg-white p-3 rounded-[16px] shadow-sm flex items-center gap-3">
                        <div className="w-12 h-12 bg-black/5 rounded-[8px] flex items-center justify-center p-1 relative shrink-0">
                           <Image src={glass.img} alt={glass.name} width={40} height={40} className="w-full h-auto object-contain" />
                        </div>
                        <div className="flex flex-col flex-1 pr-2">
                           <span className="font-semibold text-xs line-clamp-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Privacy Glass</span>
                           <span className="font-bold text-sm">{glass.price} MAD</span>
                        </div>
                        <button type="button" onClick={() => addItem(glass)} className="w-8 h-8 rounded-full bg-surface-black text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform hover:scale-105">
                           <Plus size={16} strokeWidth={2.5} />
                        </button>
                     </div>
                   )}
                </div>
             </div>
          )}

          <div className="bg-black/5 rounded-[16px] p-5 lg:p-6 mb-2 mt-2 text-center border border-black/5">
            <p className="text-xs lg:text-sm font-semibold opacity-80 leading-relaxed">
              Payment of {displayTotal.toLocaleString('fr-MA')} MAD will be made <strong className="text-black">in cash upon delivery</strong>.
              <br/>No payment is required now.
            </p>
          </div>

          <button 
            type="submit"
            className="w-full bg-surface-black text-surface-white py-4 lg:py-5 rounded-[32px] font-bold text-sm lg:text-base tracking-wide active:scale-95 transition-transform hover:bg-[#1f1f1f]"
          >
            Confirm My Order (Cash on Delivery)
          </button>
        </form>
      </div>
    </div>
  );
}
