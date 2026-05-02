"use client"

import { motion } from "framer-motion"

interface TransitionCurtainProps {
  isActive: boolean
  direction?: "in" | "out"
  duration?: number
}

export function TransitionCurtain({
  isActive,
  direction = "out",
  duration = 0.6,
}: TransitionCurtainProps) {
  const variants = {
    in: {
      left: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
      },
      right: {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      },
    },
    out: {
      left: {
        initial: { x: 0 },
        animate: { x: "-100%" },
        exit: { x: "100%" },
      },
      right: {
        initial: { x: 0 },
        animate: { x: "100%" },
        exit: { x: "-100%" },
      },
    },
  }

  if (!isActive) return null

  return (
    <>
      {/* Left curtain */}
      <motion.div
        className="fixed left-0 top-0 h-full w-1/2 bg-gradient-to-r from-slate-900 via-slate-800 to-transparent z-50"
        variants={variants[direction].left}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration, ease: "easeInOut" }}
      />
      {/* Right curtain */}
      <motion.div
        className="fixed right-0 top-0 h-full w-1/2 bg-gradient-to-l from-slate-900 via-slate-800 to-transparent z-50"
        variants={variants[direction].right}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration, ease: "easeInOut" }}
      />
    </>
  )
}
