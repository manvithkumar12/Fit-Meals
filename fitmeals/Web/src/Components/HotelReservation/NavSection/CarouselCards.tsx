"use client";
import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/Carousel";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface Data {
  ImageUrl: string[];
}

const CarouselCards = ({ ImageUrl }: Data) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="md:w-[50%] w-full rounded-2xl shadow-lg relative">
        <Carousel>
          <CarouselContent>
            {ImageUrl?.map((item, index) => (
              <CarouselItem key={index}>
                <div
                  onClick={() => setSelectedImage(item)}
                  className="group relative w-full h-53.25 z-0 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <Image
                    src={item}
                    alt={`Restaurant image ${index + 1}`}
                    fill
                    className="object-cover shadow-lg group-hover:scale-[1.03] transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL="/blur.jpeg"
                    priority
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="bg-white/90 text-slate-800 p-2 rounded-full shadow-lg backdrop-blur-xs scale-90 group-hover:scale-100 transition-all duration-300">
                      <ZoomIn size={16} className="text-emerald-700" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
              <Image
                src={selectedImage}
                alt="Selected asset fullscreen view"
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain select-none pointer-events-none rounded-[24px]"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CarouselCards;
