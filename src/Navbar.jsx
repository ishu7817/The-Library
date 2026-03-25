import { useRef, useEffect, useState } from "react";
import { backInOut, easeInOut, motion, spring } from "framer-motion";
import { link } from "framer-motion/client";
import { Link } from "react-router-dom";

const Navbar = () => {
  const buttonsRef = useRef({});
  // const targ = buttonsRef.current
  const [lineStyle, setLineStyle] = useState({
    left: "50%",
    x: "-50%",
    height: 1,
    width: 3,
    opacity: 1,
    rotate: 360,
    repeat: "Infinity",
    duration: 0.5,
  });

  const moveLineTo = (item) => {
    const target = buttonsRef.current[item];

    if (target) {
      setLineStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
        height: 1,
        opacity: 1,
        rotate: 0,
        repeat: 0,
        duration: 0.2,
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-0">
      <div className=" relative px-9 py-6 z-0 rounded-full  w-[40vw] h-fit  selection:bg-transparent selection:text-teal-500/20 ">
        <motion.div className="  z-8 mt-35  flex justify-center gap-12 ">
          {["Articles", "Quotes", "About"].map((item) => (
            <Link to={`/${item.trim()}`}>
              <button
                key={item}
                ref={(el) => (buttonsRef.current[item] = el)}
                onMouseEnter={() => moveLineTo(item)}
                onMouseLeave={() => {
                  moveLineTo(item);
                  setLineStyle({
                    left: "50%",
                    x: "-50%",
                    width: 7,
                    opacity: 1,
                    height: 2,
                    rotate: 360,
                    repeat: Infinity,
                    duration: 0.5,
                  });
                }}
                style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)" }}
                className={`  tracking-widest text-lg md:text-xl lg:text-2xl  md: z-10 px-2 py-1 cursor-pointer  font-medium font-heading  text-white text-shadow-2xs `}
              >
                {item}
              </button>
            </Link>
          ))}

          <motion.div
            animate={{
              rotate: lineStyle.rotate,
              height: lineStyle.height,
              left: lineStyle.left,
              width: lineStyle.width,
              opacity: lineStyle.opacity,
            }}

            transition={{
              ease: "anticipate",
              duration: 0.6,
              delay: 0.2,

              rotate: {
                duration: lineStyle.duration,
                repeatType: "loop",
                repeat: lineStyle.repeat,
                delay: 0.2,
              },
            }}
            className="absolute opacity-0  bottom-5 h-[1px] bg-[rgb(154,170,102)] w-1  rounded-full"
            style={{ position: "absolute" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
