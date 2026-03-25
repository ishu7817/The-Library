import React from 'react';
import { motion } from 'framer-motion';

const GlowingSword = () => {

  const darkSilver = "#52525b";
  const brightSilver = "#e4e4e7";
  const glowColor = "rgba(228, 228, 231, 0.75)";

  return (
    <div className="p-10 bg-black flex justify-center items-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="64" height="64"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ filter: `drop-shadow(0px 0px 0px ${glowColor})` }}
        animate={{
          filter: [
            `drop-shadow(0px 0px 4px ${glowColor})`,
            `drop-shadow(0px 0px 12px ${glowColor})`,
            `drop-shadow(0px 0px 4px ${glowColor})`
          ]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >

        <defs>
          <linearGradient id="silver-blade-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkSilver} />
            <stop offset="45%" stopColor={brightSilver} />
            <stop offset="100%" stopColor={darkSilver} />
          </linearGradient>
        </defs>

        <g stroke="url(#silver-blade-sheen)">
          <path d="m11 19-6-6" />
          <path d="m5 21-2-2" />
          <path d="m8 16-4 4" />
          <path d="M9.5 17.5 21 6V3h-3L6.5 14.5" />
        </g>
      </motion.svg>
    </div>
  );
};

export default GlowingSword;