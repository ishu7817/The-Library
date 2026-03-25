import React from "react";
import { motion } from "framer-motion";
import articles from "./Articles";
import { Link } from "react-router-dom";
import Signature from "./Signature";

const MobileView = ({ width }) => {
  return (
    <div className=" overflow-y-scroll relative min-h-screen w-full bg-black overflow- font-mono text-zinc-400">
      <div
        className="absolute inset-0 bg-cover min-h-screen bg-center object-cover opacity-60 grayscale-[0.3]"
        style={{
          backgroundImage: "url('/mobileview.webp')"
          , objectPosition: ' center 50% '

        }}
      />
      <div className="bg-black/20 absolute inset-0" />


      <div className=" overflow-y-scroll relative z-10 flex flex-col items-center gap-[8%] min-h-[100vh] py-20 px-8 text-center  ">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-40 top-8  left-1/2 -translate-x-1/2"
        >
          <Signature className="text-[#B9A46A] scale-150 h-10 opacity-70" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-18"
        >
          <h2 className="text-[#C2A76D] mb-20 text-center text-md tracking-[0.6em] uppercase">
            The
            <br />
            Library
          </h2>
        </motion.div>

        <div className="space-y-4 mb-12">
          <p className="text-[10px] tracking-widest text-[#7FAF9B]">
            // SYSTEM_HALT
            <span
              style={{ animationDuration: "0.8s" }}
              className=" animate-pulse"
            >
              _
            </span>
          </p>

          <h1 className="text-2xl font-serif italic text-zinc-300 ">
            The visual depth requires <br /> more space to breathe.
          </h1>
          <p className="text-[10px] text-zinc-600 font-mono leading-relaxed max-w-[240px] mx-auto">
            The immersive terminal is locked to{" "}
            <span className="text-zinc-500 font-mono">desktop</span>. <br />
            The truth, however, remains accessible through the archive:
          </p>
        </div>
        <div className="flex gap-[5vw]">

          <Link to="/Articles">

            <motion.button

              whileHover="hover"
              initial="rest"
              className="group relative px-10 py-3 overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500 group-hover:border-amber-500 transition-colors"
                variants={{ rest: { x: 0, y: 0 }, hover: { x: -2, y: -2 } }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500 group-hover:border-amber-500 transition-colors"
                variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: 2 } }}
              />

              <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm border border-zinc-900/50 group-hover:bg-zinc-900/40 transition-all duration-500" />

              <span className="relative z-10 text-[10px] uppercase tracking-[0.6em] text-zinc-400 group-hover:text-zinc-100 transition-colors">
                Articles
              </span>

              <motion.div
                variants={{
                  rest: { scaleX: 0, opacity: 0 },
                  hover: { scaleX: 1, opacity: 1 }
                }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-amber-500/50 origin-left"
              />
            </motion.button>
          </Link>
          <Link to="/Vault">

            <motion.button

              whileHover="hover"
              initial="rest"
              className="group relative px-10 py-3 overflow-hidden rounded-full"
            >
              <motion.div
                className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500 group-hover:border-amber-500 transition-colors"
                variants={{ rest: { x: 0, y: 0 }, hover: { x: -2, y: -2 } }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500 group-hover:border-amber-500 transition-colors"
                variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: 2 } }}
              />

              <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm border border-zinc-900/50 group-hover:bg-zinc-900/40 transition-all duration-500" />

              <span className="relative z-10 text-[10px] uppercase tracking-[0.6em] text-zinc-400 group-hover:text-zinc-100 transition-colors">
                Insights
              </span>

              <motion.div
                variants={{
                  rest: { scaleX: 0, opacity: 0 },
                  hover: { scaleX: 1, opacity: 1 }
                }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-amber-500/50 origin-left"
              />
            </motion.button>
          </Link>


        </div>
      </div>
    </div>
  );
};

export default MobileView;
