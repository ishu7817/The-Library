import React from 'react';
import { motion } from 'framer-motion';

const Copybutton = ({ iswriting }) => {
  const penVariants = {
    idle: { z: 0, rotateX: 0, stroke: "#3f3f46" },
    writing: {
      z: [0, -20, 20, 0], 
      rotateX: [-10, 20, -10],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
    }
    
    const lineVariants = {
      idle: { 
        scaleX: 1, 
        stroke: "#3f3f46", 
        originX: 0 
      },
      writing: { 
        scaleX: 2.5, 
        stroke: "rgba(245, 158, 11, 0.8)", 
        strokeWidth: 2,
        transition: { duration: 0.8 } 
      
    }
    }
  return (
    <div style={{ perspective: "1000px", transformStyle: "preserve-3d" }}> 
      <motion.div 
        animate={iswriting ? "writing" : "idle"}
        initial="idle"
        style={{ transformStyle: "preserve-3d" }}
        className="cursor-pointer relative rounded-sm backdrop-blur-3xl h-full bg-transparent transition-colors shadow-2xl p-2"
      >
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" height="27" 
          viewBox="0 0 24 24" 
          fill="none"
        animate={{
 
          scale: [1, 1.5, 1]
        }}
          
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          
          style={{ transformStyle: "preserve-3d", overflow: "visible" }}
        >
        
          <motion.path 
            d="M13 21h8" 
            variants={lineVariants}
          />

         
          <motion.g 
            variants={penVariants} 
            style={{ 
              transformStyle: "preserve-3d",
              originX: "4px", 
              originY: "20px" 
            }}
          >
            <path 
              d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
            />
          </motion.g>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Copybutton;