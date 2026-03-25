import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

const AvoidancePetal = ({ p, mouseX, mouseY, onDone }) => {








    const xOffset = useSpring(0, { stiffness: 80, damping: 20 });
    const yOffset = useSpring(0, { stiffness: 80, damping: 20 });

    useEffect(() => {
        const unsub = mouseX.on("change", () => {
            const el = document.getElementById(p.id);
            if (!el) return;
            const r = el.getBoundingClientRect();
            const dx = (r.left + r.width / 2) - mouseX.get();
            const dy = (r.top + r.height / 2) - mouseY.get();
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) { // 100px Force Field
                const power = (100 - dist) / 100;
                xOffset.set(dx * power * 1.3);
                yOffset.set(dy * power * 1.3);
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
            initial={{
                left: `${p.startX}vw`,
                top: `${p.startY}vh`,
                opacity: 0
            }}
            animate={{
                top: "110vh",
                left: `${p.startX + p.drift}vw`,
                opacity: [0, 0.7, 0.7, 0],
                rotate: 360
            }}
            transition={{ duration: p.duration, ease: "linear" }}

            style={{
                x: xOffset,
                y: yOffset,
                width: p.size,
                height: p.size / 2.5,
                borderRadius: "40% 60% 40% 60%"
            }}
            onAnimationComplete={onDone}
            className="absolute bg-zinc-100/40 blur-[0.5px] pointer-events-none"
        />
    );
};

export default AvoidancePetal