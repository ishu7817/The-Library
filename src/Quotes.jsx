import React, { useEffect } from "react";
import { Aphorisms } from "./Aphorisms";
import { motion } from "framer-motion";
import { Key } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Signature from "./Signature";
import { useLenis } from "lenis/react";
import Progressbar from "./Progressbar";
import { useState } from "react";
import Savebutton from "./Savebutton";
import Copybutton from "./copybutton";
import Xbutton from "./Xbutton";
import Vault from "./Vault";
import { link } from "framer-motion/client";
import { Link } from "react-router-dom";
import MobileView from "./MobileView";
import ReactMarkdown from 'react-markdown';

const Quotes = () => {






  const [currentindex, setcurrentindex] = useState(0);

  const lenis = useLenis();
  const [save, setsave] = useState(false);

  const [favarr, setfavarr] = useState(() => {
    const saved = localStorage.getItem("library-favs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("library-favs", JSON.stringify(favarr));
  }, [favarr]);

  useEffect(() => {
    if (!lenis) return;
    const originalLerp = lenis.options.lerp;
    lenis.options.lerp = 0.05;
    lenis.options.duration = 1.5;  

    const issaved = favarr.includes(currentindex);
    return () => {
      lenis.options.lerp = originalLerp;
      lenis.options.duration = 1; 
    };
  }, [lenis]);

  const togglesave = (index) => {
    setsave(true);

    setTimeout(() => {
      setsave(false);
    }, 3000);

    favarr.includes(index);
    setfavarr((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const [iscopy, setiscopy] = useState(false);
  const [iswriting, setiswriting] = useState(false);
  const oncopy = (quote) => {
    navigator.clipboard.writeText(quote);

    setiswriting(true);
    setTimeout(() => setiswriting(false), 2000);

    setTimeout(() => setiscopy(true), 2000);
    setTimeout(() => setiscopy(false), 3000);
  };

  const shareOnX = (quote) => {
    const handle = "IshuSyncs";
    const text = encodeURIComponent(`"${quote}"\n\ncc: @${handle}`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;

    window.open(url, "_blank");
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isDesktop) {
    return <MobileView />;
  }
  else {
    return (

      <div className="relative w-full selection:bg-transparent selection:text-amber-200 snap-mandatory snap-y bg-black">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            backgroundImage: "url('/mushashi.webp')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",

            backgroundPosition: "center",
          }}
          className="fixed  inset-0 pointer-events-none  "
        >
          <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0 pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-l from-green-200/10 via-transparent to-white/5 z-0 pointer-events-none" />
        </motion.div>
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
          style={{
            backgroundImage: "url('https://assets.codepen.io/13471/noise.png')",
          }}
        />
        <motion.div className="z-100 fixed top-5    px-2  ">

          <Link to="/" className="group">
            <button className='scale-90 font-heading italic absolute left-3 cursor-pointer text-white/60 text-nowrap transition-all  opacity-85 hover:opacity-25 hover:scale-85'>
              ← Return Home
              <div className=' group-hover:bg-gradient-to-r from-transparent to-yellow-300/70  backdrop-blur-3xl h-[1px] w-full group-hover:translate-x-0 transition-all duration-275  -translate-x-full ' />
            </button>
          </Link>
        </motion.div>

        <motion.div className="z-100 fixed top-[2.5em]  left-1/2 -translate-x-1/2 ">
          <Signature
            style={{
              textShadow: `
    0 0 6px rgba(92, 60, 10,1),
    0 0 12px rgba(212, 175, 55, 0.5),
    2px 2px 8px rgba(92, 60, 10, 0.4)
  `,
            }}
            className="h-16 text-black opacity-70 text-shadow-amber-50 text-shadow-2xs"
          />
        </motion.div>

        <div className="fixed left-[2.5em] inset-y-0  top-50 bottom-50 z-50 flex mx-2 items-center  ">
          <Progressbar
            className="fixed z-50"
            current={currentindex}
            total={Aphorisms.length}
            favs={favarr}
          // index = {index}
          />
        </div>

        {Aphorisms.map((aphorism, index) => {
          const issaved = favarr.includes(index);
          return (
            <motion.section
              className="    ml-6 w-full min-h-screen justify-center snap-start flex flex-col relative z-30 left-10 scrollbar-none max-w-xl "
              key={aphorism.id}
              id={`quote-${index}`}
              onViewportEnter={() => setcurrentindex(index)}
            >
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                  // backdropFilter: 2
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  // backdropFilter: 0,
                }}
                transition={{ duration: 1 }}
                className="font-cormorant italic  pt-15 md:w-[50vw] lg:w-full text-2xl lg:text-3xl   justify-center flex items-center flex-col  text-center ml-4 md:text-3xl text-zinc-300 leading-tight"
              >
                <ReactMarkdown
                  components={{
                    strong: ({ node, ...props }) => (
                      <span className="font-bold text-zinc-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.1)]" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <span className="italic opacity-80" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <span className="whitespace-pre-line block" {...props} />
                    )
                  }}
                >
                  {aphorism.quote}
                </ReactMarkdown>


                <motion.div className=" mt-10  pl-90  bottom-60 lg:right-0 flex items-center gap-12 md:gap-6   z-50">



                  <motion.div className="group relative flex flex-col items-center">
                    <div
                      className={`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap
                    opacity-0 pointer-events-none translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300 ease-out
                    text-[10px] uppercase tracking-widest ${iswriting ? "text-amber-300/80 " : " text-zinc-300/80 "} font-mono`}
                    >
                      Echo...
                    </div>

                    <button
                      onClick={() => shareOnX(aphorism.quote)}
                      className="cursor-pointer relative rounded-sm backdrop-blur-3xl scale-70 md:scale-80 lg:scale-100 h-full bg-transparent transition-colors shadow-2xl p-2"
                    >
                      <motion.svg
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-[#3f3f46] transition-colors"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                      </motion.svg>
                    </button>
                  </motion.div>

                  <motion.div className="group relative flex flex-col items-center ">
                    <div
                      className={`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap
                    opacity-0 pointer-events-none translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300 ease-out
                    text-[10px] uppercase tracking-widest ${iswriting ? "text-amber-300/80 " : " text-zinc-300/80 "} font-mono`}
                    >
                      {iswriting ? "Inscribing..." : "Capture"}
                    </div>

                    <button
                      className="scale-70 md:scale-80 lg:scale-100"
                      onClick={() => oncopy(aphorism.quote)}
                    >
                      <Copybutton iswriting={iswriting} />
                    </button>
                  </motion.div>

                  <motion.div className="  scale-70 md:scale-80 lg:scale-100 cursor-pointer relative flex flex-col items-center  group p-2 rounded-sm backdrop-blur-3xl bg-transparent transition-colors shadow-2xl">
                    <div
                      className={`absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap
               opacity-0 pointer-events-none translate-y-2
               group-hover:opacity-100 group-hover:translate-y-0
               transition-all duration-300 ease-out
               text-[10px] uppercase tracking-widest  ${issaved ? "text-amber-300/80 " : " text-zinc-300/80 "} font-mono`}
                    >
                      {issaved ? "Internalized" : "Internalize"}
                    </div>
                    <motion.svg
                      onClick={() => togglesave(index)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      className="w-6.5 h-6.5 cursor-pointer"
                      index={index}
                      animate={{
                        fill: issaved ? "rgb(245, 158, 11,0.8)" : "transparent",
                        stroke: issaved ? "#52525b" : "#3f3f46",
                        strokeWidth: 1.5,
                        scale: [1, 1.5, 1.2],
                      }}
                      style={{ rotate: 136 }}
                    >
                      <path d="m11 19-6-6" />
                      <path d="m5 21-2-2" />
                      <path d="m8 16-4 4" />
                      <path d="M9.5 17.5 21 6V3h-3L6.5 14.5" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.h1>
              <AnimatePresence>
                {save && issaved ? (
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900/50 border border-zinc-300/20 backdrop-blur-3xl px-6 py-3 rounded-full text-amber-300/50 text-sm font-medium "
                  >
                    Internalized!
                  </motion.div>
                ) : (
                  ""
                )}




                <Link to="/vault" className="fixed [@media(min-height:500px)]:bottom-12  bottom-2 left-12 z-50">
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    className="group relative flex flex-col items-start gap-4 cursor-pointer"
                  >
                    <motion.div
                      variants={{
                        rest: { height: "2px", width: "80px", opacity: 0.4 },
                        hover: { height: "var(--vault-hover-h)", width: "140px", opacity: 1 },
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="relative overflow-hidden border-x border-zinc-800 bg-zinc-950"
                    >
                      <motion.img
                        src="/eye.jpg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="  absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-40 group-hover:opacity-80 transition-opacity"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 opacity-80" />
                    </motion.div>

                    <div className="flex flex-col gap-1">
                      <motion.span
                        variants={{
                          rest: { opacity: 0, x: -5 },
                          hover: { opacity: 1, x: 0 },
                        }}
                        className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 font-mono"
                      >
                        Archive Access
                      </motion.span>
                      <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-200 group-hover:text-amber-500 transition-colors">
                        The Vault
                      </span>
                    </div>
                  </motion.div>
                </Link>



                {iscopy ? (
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900/50 border border-zinc-300/20 backdrop-blur-3xl px-6 py-3 rounded-full text-amber-300/50 text-sm font-medium "
                  >
                    Inscribed!
                  </motion.div>
                ) : (
                  ""
                )}
              </AnimatePresence>
            </motion.section>
          );
        })}
      </div>
    );
  }
};

export default Quotes;
