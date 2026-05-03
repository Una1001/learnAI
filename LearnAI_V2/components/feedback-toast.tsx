"use client"

import { cn } from "@/lib/utils"
import { Sparkles, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FeedbackToastProps {
  message: string
  isVisible: boolean
  type?: "encouragement" | "achievement" | "clue"
  onCollect?: () => void
  className?: string
}

export function FeedbackToast({ 
  message, 
  isVisible, 
  type = "encouragement",
  onCollect,
  className 
}: FeedbackToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Dimming overlay */}
          {type === "clue" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
            />
          )}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={cn(
              "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
              "px-8 py-8 rounded-3xl",
              type === "encouragement" 
                ? "bg-gradient-to-r from-primary/90 to-emerald-400/90" 
                : type === "clue"
                ? "bg-amber-100/95"
                : "bg-gradient-to-r from-amber-400/90 to-orange-400/90",
              "shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
              "backdrop-blur-sm",
              className
            )}
          >
          {type === "clue" ? (
            <div className="flex flex-col items-center gap-6">
              <span className="text-4xl font-bold text-amber-900 text-center drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">你找到了線索！</span>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    filter: ["drop-shadow(0 0 12px rgba(255,215,0,0.3))", "drop-shadow(0 0 40px rgba(255,215,0,1))", "drop-shadow(0 0 12px rgba(255,215,0,0.3))"]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <img 
                    src="/gold.png" 
                    alt="Gold coin" 
                    className="w-24 h-24 object-contain drop-shadow-[0_8px_16px_rgba(255,215,0,0.4)]"
                  />
                </motion.div>
              </motion.div>
              <span className="text-2xl font-bold text-amber-800 text-center">獲得硬幣</span>
              <div className="flex gap-4 w-full justify-center">
                {onCollect && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={onCollect}
                    className={cn(
                      "px-8 py-3 rounded-2xl",
                      "bg-amber-400/40 hover:bg-amber-400/60",
                      "border-2 border-amber-600/50",
                      "text-amber-900 font-bold text-lg",
                      "transition-all duration-200",
                      "drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                    )}
                  >
                    收入行囊
                  </motion.button>
                )}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={cn(
                    "px-8 py-3 rounded-2xl",
                    "bg-amber-300/30 hover:bg-amber-300/50",
                    "border-2 border-amber-600/40",
                    "text-amber-900 font-bold text-lg",
                    "transition-all duration-200",
                    "drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                  )}
                >
                  查看排行
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {type === "encouragement" ? (
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              ) : (
                <Star className="w-6 h-6 text-white" fill="currentColor" />
              )}
              <span className="text-lg font-bold text-white">{message}</span>
            </div>
          )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
