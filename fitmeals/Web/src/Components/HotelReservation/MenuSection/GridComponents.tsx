import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";
import Image from "next/image";

interface GridComponentsProps {
  images?: string[];
}

const GridComponents = ({ images = [] }: GridComponentsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-8 animate-[fadeIn_0.3s_ease-out]">
        <div className="h-90 w-90 md:h-120 md:w-120">
          <ErrorComponent
            label="No items uploaded yet"
            whiteBg
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 place-items-center pt-4 w-full gap-5 animate-[fadeIn_0.3s_ease-out]">
        {images.map((url, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(url)}
            className="group relative h-40 w-40 md:h-70 md:w-70 bg-slate-50 border border-slate-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <Image
              src={url}
              alt={`Restaurant asset ${i + 1}`}
              fill
              sizes="(max-width: 768px) 160px, 280px"
              className="object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
            />
            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
              <div className="bg-white/90 text-slate-800 p-2 rounded-full shadow-lg backdrop-blur-xs scale-90 group-hover:scale-100 transition-all duration-300">
                <ZoomIn size={16} className="text-emerald-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-10 cursor-zoom-out select-none"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 text-white border border-white/10 p-2.5 rounded-full transition-all cursor-pointer shadow-lg active:scale-95 z-20"
            >
              <X size={20} />
            </motion.button>

            {/* Image Wrapper */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-[85vh] md:max-h-[90vh] rounded-[24px] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl flex items-center justify-center cursor-default"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Selected asset fullscreen view"
                className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain select-none pointer-events-none rounded-[24px]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GridComponents;
