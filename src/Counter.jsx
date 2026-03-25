import { div, span } from "framer-motion/client";
import React, { useState, useEffect } from "react";

const Counter = () => {
  const start = new Date("2024-4-16");
  const [now, setnow] = useState(new Date());
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() + 1 - (start.getMonth() + 1);
  let days = now.getDate() + 1 - (start.getDate() + 1);
  let interval;
  useEffect(() => {
    let midnight = new Date();
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);

    let msuntilmidnight = midnight - now;

    const timer = setTimeout(() => {
      setnow(new Date());

      interval = setInterval(() => {
        setnow(new Date());
      }, 86400000);
    }, msuntilmidnight);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (days < 0) {
    months--;
    const prevmonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevmonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return (
    <div className="relative opacity-70 ">
      <div className=" absolute inset-0 bg-green-400/25 blur-3xl bg-clip-border border border-white" />



      <div className="flex z-1 gap-1 w-fit h-17 justify-center">

        <div className="flex flex-col h-full justify-center gap-1 items-center ">

          <span className=" text-xs lg:text-sm font-mono uppercase text-[#7A8576] ">//Status</span>
          <span className="text-[#7A8576] font-mono uppercase text-xs lg:text-sm ">//UPTIME</span>
          <span className="text-[#7A8576] font-mono uppercase text-xs lg:text-sm ">//VELOCITY</span>


        </div>


        <div className=" h-full  ">
          <span style={{ animationDuration: '3s' }}
            className="bg-green-600 mx-2 animate-spin z-0 inline-block blur-xs w-2 h-full rounded-full border border-black/20 border-dotted"></span>
        </div>


        <div className="flex-col flex gap-1 h-full z-1  justify-center items-start">
          <span className="  text-[#2DD4BF]/70 font-mono uppercase text-xs lg:text-sm ">Active</span>
          <span className="text-center h-fit  ">
            <h1 className="z-100 text-center text-xs lg:text-sm w-fit h-fit text-[#2DD4BF]/70 uppercase  selection:bg-transparent selection:text-teal-100 font-mono text-nowrap"> {years !== 0 ? (years > 1 ? `${years} years` : `${years} year`) : null} {" "}
              {months !== 0 ? months > 1 ? `${months} months` : `${months} month` : null} {" "}
              {days !== 0 ? (days > 1 ?
                (<>
                  {days} days<span style={{ animationDuration: '0.5s' }} className=" animate-pulse">_</span>
                </>) :
                (<>
                  {days} day <span style={{ animationDuration: '0.5s' }} className=" animate-pulse">_</span>
                </>)) : <span style={{ animationDuration: '0.5s' }} className=" animate-pulse">_</span>}</h1>
          </span>

          <span className=" text-[#2DD4BF]/70 font-mono uppercase text-xs lg:text-sm ">Daily</span>
        </div>

      </div>

    </div>
  );
};

export default Counter;
