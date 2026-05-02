"use client"

import { cn } from "@/lib/utils"
import { Footprints, Map } from "lucide-react"
import { motion } from "framer-motion"

interface StoryNavigationProps {
  era: string
  chapter: string
  progress: number // 0-100
  totalSteps?: number
  className?: string
}

export function StoryNavigation({ 
  era, 
  chapter, 
  progress, 
  totalSteps = 5,
  className 
}: StoryNavigationProps) {
  const completedSteps = Math.floor((progress / 100) * totalSteps)
  
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "w-full px-5 py-4 rounded-3xl",
        "bg-card/90 backdrop-blur-sm",
        "border border-border/50",
        "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        {/* Era and chapter label */}
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2.5 rounded-2xl",
            "bg-primary/10",
            "border border-primary/20"
          )}>
            <Map className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">冒險進度</p>
            <p className="text-lg font-bold text-foreground">
              {era} - {chapter}
            </p>
          </div>
        </div>
        
        {/* Footprint progress indicators */}
        <div className="flex items-center gap-2 px-1">
          {[...Array(totalSteps)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex-1 flex items-center justify-center py-2 rounded-xl transition-all duration-300",
                i < completedSteps 
                  ? "bg-primary/20" 
                  : i === completedSteps 
                    ? "bg-accent/20 animate-pulse" 
                    : "bg-muted/50"
              )}
            >
              <Footprints 
                className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  i < completedSteps 
                    ? "text-primary" 
                    : i === completedSteps 
                      ? "text-accent" 
                      : "text-muted-foreground/30"
                )}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Progress bar beneath footprints */}
        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              "bg-gradient-to-r from-primary via-primary/80 to-accent"
            )}
          />
        </div>
      </div>
    </motion.div>
  )
}
