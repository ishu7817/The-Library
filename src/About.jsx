import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Chasingpetals from "./Chasingpetals";
import { Link } from "react-router-dom";

const About = () => {
  const [petals, setPetals] = useState([]);
  const [leftpetals, setleftpetals] = useState([]);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    if (petals.length === 0 && leftpetals.length === 0) {
      const initialRight = Array.from({ length: 5 }).map(() => ({
        id: `r-init-${Math.random()}`,
        startX: 70 + Math.random() * 25,
        startY: Math.random() * 60,
        size: 4 + Math.random() * 6,
        duration: 15 + Math.random() * 10,
        drift: -25 - Math.random() * 35,
      }));

      const initialLeft = Array.from({ length: 5 }).map(() => ({
        id: `l-init-${Math.random()}`,
        startX: 1 + Math.random() * 10,
        startY: Math.random() * 60,
        size: 2 + Math.random() * 6,
        duration: 15 + Math.random() * 10,
        drift: 10 + Math.random() * 20,
      }));

      setPetals(initialRight);
      setleftpetals(initialLeft);
    }

    const interval = setInterval(() => {
      setPetals((prev) => {
        if (prev.length < 15) {
          return [...prev, {
            id: `r-${Math.random()}`,
            startX: 70 + Math.random() * 25,
            startY: -10,
            size: 4 + Math.random() * 6,
            duration: 15 + Math.random() * 10,
            drift: -25 - Math.random() * 35,
          }];
        }
        return prev;
      });

      setleftpetals((prev) => {
        if (prev.length < 12) {
          return [...prev, {
            id: `l-${Math.random()}`,
            startX: 1 + Math.random() * 10,
            startY: -10,
            size: 2 + Math.random() * 6,
            duration: 15 + Math.random() * 10,
            drift: 10 + Math.random() * 20,
          }];
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-zinc-950 overflow-hidden font-sans selection:bg-zinc-100 selection:text-zinc-900"
    >



      <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {[...petals, ...leftpetals].map((p) => (
            <Chasingpetals
              key={p.id}
              p={p}
              mouseX={mouseX}
              mouseY={mouseY}
              onDone={() => {
                setPetals((prev) => prev.filter((i) => i.id !== p.id));
                setleftpetals((prev) => prev.filter((i) => i.id !== p.id));
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center ">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mb-12 text-[10px] xs:text-sm uppercase tracking-[0.8em] text-zinc-300/50 selection:bg-amber-500 selection:-black selection:text-zinc-400"
        >
          //IMPERMANENCE...
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="max-w-3xl font-heading font-  text-xl italic leading-relaxed text-zinc-200/79 md:text-3xl"
        >
          "The author believes that talking about himself doesn't make as much
          of a difference in the world."
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0, }}
          animate={{
            scaleX: 1,
          }}
          transition={{ duration: 1, delay: 2 }}
          className="my-6 h-[1px] w-12 bg-amber-300/30
          
          zinc-700/50"
        />

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="flex flex-col gap-2"
        >
          <p className="text-[11px]  tracking-[0.4em] text-zinc-300/70">
            There is no "about me."
          </p>
          <p className="text-[11px]  tracking-[0.4em] text-zinc-300/70">
            If you're here,
          </p>
          <p className="text-sm italic font-alegreya uppercase tracking-[0.2em] text-zinc-100">
            It’s about <i>you</i>
          </p>
        </motion.div>
      </div>

      <motion.div className=" absolute right-3 bottom-5 z-50">
        <Link to="/" className=" z-40 group">
          <button className="scale-90 font-heading italic     text-white/60 text-nowrap transition-all  opacity-85 hover:opacity-55 hover:scale-85">
            ← Return Home
            <div className=" group-hover:bg-gradient-to-r from-transparent to-yellow-300/70  backdrop-blur-3xl h-[1px] w-full group-hover:translate-x-0 transition-all duration-375  -translate-x-full " />
          </button>
        </Link>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
};

export default About;
