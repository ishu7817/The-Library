import React from 'react'
// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { library } from './Library'
import { easeIn, easeInOut, easeOut, spring } from 'framer-motion'
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import AvoidancePetal from "./AvoidancePetal";
import Signature from './Signature';



const articles = () => {



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
    const interval = setInterval(() => {
      if (petals.length < 30) {
        setPetals((prev) => [
          ...prev,
          {
            id: `r-${Math.random()}`,
            startX: 70 + Math.random() * 25,
            startY: 5 + Math.random() * 30,
            size: 4 + Math.random() * 6,
            duration: 2 + Math.random() * 12,
            drift: -25 - Math.random() * 35,
          },
        ]);
      }

      if (leftpetals.length < 20) {
        setleftpetals((prev) => [
          ...prev,
          {
            id: `l-${Math.random()}`,
            startX: 1 + Math.random() * 10,
            startY: 5 + Math.random() * 25,
            size: 2 + Math.random() * 6,
            duration: 12 + Math.random() * 10,
            drift: 10 + Math.random() * 20,
          },
        ]);
      }
    }, 1100);
    return () => clearInterval(interval);
  }, [petals, leftpetals]);



  useEffect(() => {
    const onBlur = () => {
      document.title = `distracted again?`
    }
    const onFocus = () => {
      document.title = `Articles`
    }
    window.addEventListener("blur", onBlur)
    window.addEventListener("focus", onFocus)

    return () => {
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [])





  return (
    <>

      <div className="fixed inset-0"

        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="./blossom.webp"
            className="h-full w-full object-cover opacity-80"
            style={{ objectPosition: '20% center' }}
          />


          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-zinc-950/20" />
        </div>

        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {[...petals, ...leftpetals].map((p) => (
              <AvoidancePetal
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


        <div className='absolute inset-0 bg-black/30'></div>
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
          style={{ filter: 'contrast(150%) brightness(100%)' }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(39,39,42,0.15),_transparent_70%)]" />

        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
      </div>







      <motion.div
        className=' md:w-[80vw] h-[80vh] w-fit xl:w-[60vw] min-h-screen pb-[5vh] flex flex-col gap-5 m-auto pt-[15vh] items-center lg:items-center '

      >
        <motion.div className=" m-auto z-100 relative pb-5  ml-[50%] -translate-x-1/2 ">
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


        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: 'easeIn' }}
          className='library   z-60 relative flex w-full flex-col xs:flex-row min-[285px]:flex-row items-center gap-[20vw] sm:gap-[27vw] justify-center  bg-none items-   '>
          <h1 className=' text-zinc-300 font-serif text-nowrap text-xl sm:text-3xl sm:text-4xl' >The Library</h1>
          <Link to="/" className="group">
            <button className='scale-90 font-heading  cursor-pointer text-white/60 text-nowrap transition-all  opacity-85 hover:opacity-25 hover:scale-85'>
              ← Return Home
              <div className=' group-hover:bg-gradient-to-r from-transparent to-yellow-300/70  backdrop-blur-3xl h-[1px] w-full group-hover:translate-x-0 transition-all duration-275  -translate-x-full ' />
            </button>
          </Link>
        </motion.div>

        <div className=' seperation  w-full h-[1px] bg-black/30 opacity-20 z-10 '></div>

        <div className="cards flex flex-col gap-12  md:w-[80%] w-[80vw]   relative ">

          {library.map((article) => (

            <motion.div initial={{
              y: 50,
              opacity: 0,
              // scale: 0.4,
            }}

              animate={{
                scale: 1,
                y: 0,
                opacity: 1
              }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.6 }} className="cardcont group relative min-h-[20vh] w-[full] ">

              <motion.div initial={{ backdropFilter: "blur(0px)" }} animate={{ backdropFilter: "blur(8px)" }} transition={{ duration: 1, delay: 0.6, ease: easeIn }}
                className="card transition-all duration-900 hover:scale-110 hover:mx-10 p-6 h-45 w-[full] flex flex-col relative gap-[10%]  bg-black/5 border-[1px] border-white/5 rounded-2xl " >




                <div className="kicker ">
                  <h1 className=' text-xs justify-self-center sm:justify-self-auto md:text-sm text-white/30 font-bold'>
                    {article.kicker}
                  </h1>

                </div>
                <div className=" w-full titledate flex gap-[20%] ">

                  <span className='sm:w-[70%]  w-[100%] overflow-scroll  scroll- scroll-smooth scrollbar-none transition-all text-nowrap'>
                    <h1 className=' title justify-self-center sm:justify-self-auto  base text-2xl md:text-3xl text-zinc-400 font-cormorant font-bold tracking-wide'>
                      {article.title}
                    </h1>
                  </span>


                  <span className=' hidden  p-1 text-xs sm:text-sm text-white/40 font-light text-nowrap font-mono tracking-wide border-[1px] border-white/5 items-center sm:flex justify-center rounded-b-md'>
                    {article.date}
                  </span>

                </div>

                <div className="subtitlew w-[100%] text-start   ">
                  <h1 className='truncate  text-center sm:text-start text-white/45 text-sm italic'>
                    {article.subtitle}
                  </h1>

                </div>


                <div className="timeread flex gap-[75%] ">

                  <span className='italic text-sm text-white/25 text-nowrap'>
                    {article.readtime}

                  </span>
                  <Link to={`/articles/${article.slug}`} key={article.id} className='overflow-hidden  flex transition-all'>

                    <button className='scale-90 sm:scale-100 italic absolute  md:right-12 right-6  text-white/90 text-nowrap transition-all  opacity-85 hover:opacity-25 hover:scale-105'>
                      Read Article →
                      <div className='bg-yellow-300/0 group-hover:bg-gradient-to-r from-transparent to-yellow-300/70  backdrop-blur-3xl h-[1px] w-full group-hover:translate-x-0 transition-all duration-275  -translate-x-full ' />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}

        </div>
      </motion.div>

    </>
  )
}

export default articles
