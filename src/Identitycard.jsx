import React from "react";
import { MotionConfig, motion } from "framer-motion";
const Identitycard = () => {
  return (
    <div>
      <div className=" z-10 flex rounded-2xl h-[40vh] w-full  bg-black/20 justify-between m-3  backdrop-blur-md">
        <div className=" m-6 flex flex-col items-center justify-center ">
          <div className="flex">
            <motion.div
              initial={{ backgroundPositionX: 23 }}
              className=" p-3 text-6xl w-fit rounded-xl  tracking-widest mb-2  text-black/80  font-fredoka font-extrabold leading-snug "
            >
              NIMESH MANGAL
            </motion.div>
          </div>

          <div className="flex bg-white/5 backdrop-blur-md">
            <h1 className="  text-transparent text-3xl font-dancing font-bold tracking-wide m-3">
              Philosophical Aphorist
            </h1>
            <h1 className="   text-transparent text-4xl font-caveat tracking-wide mr-1 ml-1 m-3">
              &
            </h1>
            <h1 className="   text-transparent text-3xl font-dancing font-bold tracking-wide m-3">
              Essayist
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identitycard;
