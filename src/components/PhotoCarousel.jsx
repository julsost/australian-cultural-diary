import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="relative w-full max-w-3xl overflow-hidden">
        {/* Carousel track */}
        <div className="flex items-center justify-center relative h-[400px]">
          {images.map((src, i) => {
            const offset = (i - index + images.length) % images.length;
            let style = {};

            // Calculate visual position for left/right images
            if (offset === 0) {
              style = {
                zIndex: 3,
                scale: 1.05,
                filter: "blur(0px)",
                opacity: 1,
              };
            } else if (offset === 1 || offset === images.length - 1) {
              style = {
                zIndex: 2,
                scale: 0.9,
                filter: "blur(4px)",
                opacity: 0.7,
                x: offset === 1 ? 150 : -150,
              };
            } else {
              style = {
                zIndex: 1,
                scale: 0.8,
                filter: "blur(10px)",
                opacity: 0.4,
              };
            }

            return (
              <motion.img
                key={src}
                src={src}
                alt={`Memory ${i + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  ...style,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
                className="absolute w-[60%] h-[350px] object-cover rounded-2xl shadow-lg"
              />
            );
          })}
        </div>

        {/* Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-700 text-white rounded-full p-2 hover:bg-green-600 shadow-md"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-700 text-white rounded-full p-2 hover:bg-green-600 shadow-md"
        >
          ›
        </button>
      </div>

      {/* Image indicators */}
      <div className="flex gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-green-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
