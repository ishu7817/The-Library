import React, { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const Chasingpetals = ({ p, mouseX, mouseY, onDone }) => {
  
  const xOffset = useSpring(0, { stiffness: 10, damping: 65 });
  const yOffset = useSpring(0, { stiffness: 10, damping: 65 });

  useEffect(() => {
    const unsub = mouseX.on("change", () => {
      const el = document.getElementById(p.id);
      if (!el) return;
      
      const r = el.getBoundingClientRect();
      const petalX = r.left + r.width / 2;
      const petalY = r.top + r.height / 2;

      const dx = petalX - mouseX.get();
      const dy = petalY - mouseY.get();
      const dist = Math.sqrt(dx * dx + dy * dy);
      

      if (dist < 1300) {
        const power = (1300 - dist) / 1300;
        xOffset.set(-dx * power * 0.9); 
        yOffset.set(-dy * power * 0.6);
      } else {
        xOffset.set(0);
        yOffset.set(0);
      }
    });
    return () => unsub();
  }, [p.id, mouseX, mouseY, xOffset, yOffset]);

  return (
    <motion.div
      id={p.id}
      initial={{ left: `${p.startX}vw`, top: `${p.startY}vh`, opacity: 1 }}
      animate={{ 
        
        top: "110vh", 
        left: `${p.startX + p.drift}vw`, 
        opacity: 1, 
        rotate: 360 
      }}
      transition={{ duration: p.duration + 5, ease: "linear" }}
      style={{ 
        x: xOffset, 
        y: yOffset, 
        width: p.size, 
        height: p.size / 2.5, 
        borderRadius: "40% 60% 40% 60%",
      }}
      onAnimationComplete={onDone}
      className="absolute bg-zinc-100/20 blur-[1.5px] pointer-events-none"
    />
  );
};

export default Chasingpetals;