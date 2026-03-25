
import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Signature from "./Signature";
import Counter from "./Counter";
import Database from "./Database";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const blurReveal = {
  hidden: { opacity: 0, filter: "blur(5px)", y: 8, scale: 0.94 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: { duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }
  },
};

const ghostReveal = {
  hidden: { opacity: 0, filter: "brightness(90px)" },
  visible: {
    opacity: 1,
    filter: "brightness(0px)",

    transition: { duration: 2, ease: "easeOut" },
  },
};

const terminalSnap = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

const navSlide = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "backOut" },
  },
};

const HomePage = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="to-black relative min-h-screen min-w-full overflow-y-auto bg-[#0E1411] flex flex-col -center items-center"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/jj.webp')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="min-w-full min-h-full overflow-y-auto overflow-x-hidden relative backdrop-brightness-[0.3] backdrop-blur-xs"></div>
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-10"
        style={{
          backgroundImage: "url('https://assets.codepen.io/13471/noise.png')",
        }}
      ></div>

      <div className=" items-center min-w-30vw m-auto overflow-y-auto relative pt-33 flex flex-col gap-7 z-20">

        <motion.h1
          variants={blurReveal}
          className="text-7xl md:text-8xl  xl:text-9xl min-w-full whitespace-nowrap h-fit font-fredoka tracking-normal text-[#C2A76D]/70 selection:bg-transparent selection:text-teal-400/10 text-center"
        >
          Nimesh Mangal
        </motion.h1>


        <motion.h1
          variants={blurReveal}
          className="text-2xl font-serif text-center font-light italic text-[#9A9A9A] mr-6 selection:bg-transparent selection:text-teal-400/10"
        >
          Philosophical Aphorist & Essayist
        </motion.h1>


        <motion.p
          variants={ghostReveal}
          className="text-xs mt-2 text-[#7A8576]/80 tracking-[0.15em] uppercase text-center selection:bg-transparent selection:text-teal-400/10"
        >
          Thoughts meant to disturb clarity before they create it
        </motion.p>


        <motion.div variants={navSlide} className="relative mb-20 flex flex-col items-center z-30">
          <Navbar />
        </motion.div>
      </div>


      <motion.div
        variants={terminalSnap}
        className="z-100 absolute top-[2.5em] md:left-[3em] left-50% "
      >
        <Signature className="h-16 text-[#B9A46A] opacity-70" />
      </motion.div>

      <motion.div
        variants={terminalSnap}
        className="absolute left-2 bottom-3 lg:bottom-6 lg:left-4 z-20"
      >
        <Counter />
      </motion.div>

      <motion.div
        variants={terminalSnap}
        className="absolute bottom-3 right-2 lg:bottom-6 lg:right-4 z-20"
      >
        <Database />
      </motion.div>

    </motion.div>
  );
};

export default HomePage;