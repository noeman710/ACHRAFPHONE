import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACHRAFPHONE - Premium Mobile Store Tangier",
  description: "Boutique de smartphones, tablettes et accessoires à Tanger. Livraison 24h Cash on Delivery.",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="font-sans min-h-screen bg-background text-foreground flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
