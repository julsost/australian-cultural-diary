import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

function DiaryCard({ title, image, onClick }) {
  return (
    <motion.div
      className="cursor-pointer rounded-2xl shadow-md bg-white overflow-hidden hover:shadow-lg transition"
      whileTap={{ rotateY: 180, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-rose-700">{title}</h3>
      </div>
    </motion.div>
  );
}

export default function Carousel({ entries, selected, onSelect }) {
  const controls = useAnimation();

  // 👇 spin the whole ring forever
  useEffect(() => {
    controls.start({
      rotate: 1000,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 50, // ⏱️ controls the rotation speed (higher = slower)
      },
    });
  }, [controls]);

  // 👇 tiny "bounce" when a diary is selected
  useEffect(() => {
    if (selected) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }
  }, [selected]);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const radius = isMobile ? 50 : 50;
  const size = isMobile ? 300 : 750;

  return (
    <nav>
      {/* orbit view (desktop) */}
      <div className="relative flex flex-col items-center justify-center hidden sm:flex">
        <div className="relative translate-y-20 -translate-x-60">
          <motion.div
            animate={controls}
            className="relative rounded-full border border-sand flex items-center justify-center overflow-visible"
            style={{ width: size, height: size }}
          >
            <ul className="relative list-none m-0 p-0 w-full h-full">
              {entries.map((e, i) => {
                const angle = (i / entries.length) * Math.PI * 2;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <li
                    key={e.id}
                    style={{
                      position: "absolute",
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <button
                      onClick={() => onSelect(e.id)}
                      className={`w-36 h-36 sm:w-29 sm:h-29 rounded-full overflow-hidden border-4 shadow-md hover:scale-105 transition-transform ${
                        selected === e.id
                          ? "border-eucalyptus ring-2 ring-eucalyptus/40"
                          : "border-gray-200"
                      } focus:outline-none`}
                      aria-label={e.title}
                    >
                      <img
                        src={
                          e.images[0]
                            ? `/australian-cultural-diary/images/${e.images[0]}`
                            : "/australian-cultural-diary/images/placeholder.jpg"
                        }
                        alt={e.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
 
        </div>
      </div>

      {/* mobile grid fallback */}
      <div className="mt-6 grid grid-cols-2 sm:hidden gap-3 px-4">
        {entries.map((e) => (
          <button
            key={e.id}
            onClick={() => onSelect(e.id)}
            className="flex flex-col items-center gap-2 p-2 border rounded-lg hover:shadow-md transition"
          >
            <img
              src={
                e.images[0]
                  ? `/australian-cultural-diary/images/${e.images[0]}`
                  : "/australian-cultural-diary/images/placeholder.jpg"
              }
              alt={e.title}
              className="w-20 h-20 object-cover rounded-full"
            />
            <div className="text-center">
              <div className="font-medium text-sm">{e.title}</div>
              <div className="text-xs text-gray-500">{e.date}</div>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
}
