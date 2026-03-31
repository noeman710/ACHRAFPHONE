"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "@/lib/products";

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Simple persist to localStorage or just keep in memory for demo
  useEffect(() => {
    const saved = localStorage.getItem("achrafphone_cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("achrafphone_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      // Merger logic: if item with same ID exists, increment quantity
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => 
          i.id === product.id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      }
      
      // Otherwise add new item
      const newItem = { 
        ...product, 
        cartId: Math.random().toString(36).substring(7), 
        quantity 
      };
      return [...prev, newItem];
    });
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    setItems((prev) => 
      prev.map(i => i.cartId === cartId ? { ...i, quantity: Math.max(1, quantity) } : i)
    );
  };

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
