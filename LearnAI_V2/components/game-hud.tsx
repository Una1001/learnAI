"use client"

import { cn } from "@/lib/utils"
import { Star, Heart, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface GameHUDProps {
  level: string
  trust: number // 0-5 hearts
  maxTrust?: number
  className?: string
}

export function GameHUD({ 
  level, 
  trust, 
  maxTrust = 5,
  className 
}: GameHUDProps) {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "flex items-center justify-between gap-4 px-5 py-4 rounded-3xl",
        "bg-card/90 backdrop-blur-sm",
        "border border-border/50",
        "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {/* Level Badge */}
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative p-3 rounded-2xl",
            "bg-gradient-to-br from-amber-100 to-amber-50",
            "border border-amber-200/50",
            "shadow-sm"
          )}
        >
          <Star className="w-6 h-6 text-amber-500" fill="currentColor" />
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
        </motion.div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">等級</p>
          <p className="text-lg font-bold text-foreground">{level}</p>
        </div>
      </div>
      
      {/* Trust Hearts */}
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs text-muted-foreground font-medium text-right">信任度</p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(maxTrust)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Heart 
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    i < trust 
                      ? "text-rose-400 drop-shadow-[0_0_4px_rgba(251,113,133,0.5)]" 
                      : "text-muted-foreground/20"
                  )}
                  fill={i < trust ? "currentColor" : "none"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
