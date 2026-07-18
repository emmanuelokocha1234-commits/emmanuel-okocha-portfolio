"use client";

import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  {
    className: "left-[-10%] top-[-10%] size-[38rem] bg-emerald-500/20",
    float: { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
    duration: 26,
  },
  {
    className: "right-[-15%] top-[10%] size-[34rem] bg-purple-500/20",
    float: { x: [0, -30, 20, 0], y: [0, 30, -20, 0] },
    duration: 30,
  },
  {
    className: "left-[10%] bottom-[-15%] size-[32rem] bg-cyan-500/15",
    float: { x: [0, 25, -35, 0], y: [0, -20, 15, 0] },
    duration: 34,
  },
  {
    className: "right-[5%] bottom-[5%] size-[26rem] bg-blue-500/15",
    float: { x: [0, -20, 25, 0], y: [0, 20, -25, 0] },
    duration: 28,
  },
];

export function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${blob.className}`}
          animate={prefersReducedMotion ? undefined : blob.float}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
