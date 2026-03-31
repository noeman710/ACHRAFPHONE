"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full aspect-square bg-white flex items-center justify-center p-8 mb-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image 
            src={images[currentIndex]} 
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={clsx(
              "w-2 h-2 rounded-full transition-all duration-300",
              idx === currentIndex ? "bg-surface-black w-4" : "bg-black/20"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
