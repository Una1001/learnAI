"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
  delay?: number
}

export function PageTransition({ children, delay = 0 }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-transition"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          delay,
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
