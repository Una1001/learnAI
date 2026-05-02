"use client"

import { cn } from "@/lib/utils"
import { Sparkles, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FeedbackToastProps {
  message: string
  isVisible: boolean
  type?: "encouragement" | "achievement"
  className?: string
}

export function FeedbackToast({ 
  message, 
  isVisible, 
  type = "encouragement",
  className 
}: FeedbackToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={cn(
            "fixed top-6 left-1/2 -translate-x-1/2 z-50",
            "px-6 py-4 rounded-2xl",
            type === "encouragement" 
              ? "bg-gradient-to-r from-primary/90 to-emerald-400/90" 
              : "bg-gradient-to-r from-amber-400/90 to-orange-400/90",
            "shadow-[0_8px_30px_rgba(0,0,0,0.2)]",
            "backdrop-blur-sm",
            className
          )}
        >
          <div className="flex items-center gap-3">
            {type === "encouragement" ? (
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            ) : (
              <Star className="w-6 h-6 text-white" fill="currentColor" />
            )}
            <span className="text-lg font-bold text-white">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
