



import React from "react";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";

const Progressbar = ({ current, total, favs }) => {
  const lenis = useLenis();
  const barRef = useRef(null);
  const bg = `${(current / (total - 1)) * 100}%`;


  const handleClick = (e) => {
    e.stopPropagation();
    if (barRef.current && lenis) {
      const rect = barRef.current.getBoundingClientRect();
      const clickposition = e.clientY - rect.top;
      const percentage = clickposition / rect.height;
      const targetindex = Math.floor(percentage * total);
      lenis.scrollTo(`#quote-${targetindex}`, { immediate: true });
    }
  };

  const handlesave = (e, index) => {
    e.stopPropagation();
    lenis.scrollTo(`#quote-${index}`);
  };

  return (
    <div ref={barRef}>
      <motion.div
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
        onClick={handleClick}
        className="bg-whte relative w-[10px] black/40 overflow-visible cursor-pointer z-20 min-h-[40vh] backdrop-blur-2xl"
      >
        {favs.map((index) => {
          const save = `${(index / total) * 100}%`;
          return (
            <motion.div
              key={index}
              className="absolute w-full"
              style={{ top: save, perspective: "1000px" }}
            >
              <motion.div
                initial="idle"
                whileHover="hovered"

                className="relative"
                onClick={(e) => handlesave(e, index)}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28" height="28" viewBox="0 0 24 24"
                  fill="none" stroke="#71717A" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="absolute right-full mr-1 transition-all duration-100"
                  variants={{
                    idle: { stroke: "#71717A", scale: "0.5" },
                    hovered: { x: 4, stroke: "#facc15", scale: "0.8" }
                  }}
                  style={{ originX: "25%", originY: "75%" }}
                >
                  <path d="m11 19-6-6" /><path d="m5 21-2-2" /><path d="m8 16-4 4" /><path d="M9.5 17.5 21 6V3h-3L6.5 14.5" />
                </motion.svg>
              </motion.div>
            </motion.div>
          );
        })}

        <motion.div
          style={{
            height: `${bg}`,
            backgroundImage: "radial-gradient(rgb(345, 258, 11, 0.6) 1px, transparent 0)",
            backgroundSize: "4px 4px",
          }}
          className="w-full transition-all duration-900 z-30 ease-out top-0 overflow-visible absolute bgyellow-400/70"
        />
      </motion.div>
    </div>
  );
};

export default Progressbar;