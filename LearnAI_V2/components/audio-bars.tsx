"use client"

import { cn } from "@/lib/utils"

interface AudioBarsProps {
  isActive: boolean
  barCount?: number
  className?: string
}

export function AudioBars({ isActive, barCount = 5, className }: AudioBarsProps) {
  return (
    <div className={cn(
      "flex items-end gap-1 h-8",
      className
    )}>
      {[...Array(barCount)].map((_, i) => {
        const heights = [40, 80, 60, 100, 50]
        const delays = [0, 150, 80, 200, 120]
        
        return (
          <div
            key={i}
            className={cn(
              "w-1.5 rounded-full transition-all duration-150",
              "bg-gradient-to-t from-primary to-primary/60",
              // Neon glow
              "shadow-[0_0_8px_rgba(147,197,253,0.6)]",
              isActive ? "animate-[audioBar_0.5s_ease-in-out_infinite_alternate]" : "h-1"
            )}
            style={{ 
              height: isActive ? `${heights[i]}%` : '4px',
              animationDelay: isActive ? `${delays[i]}ms` : '0ms',
            }}
          />
        )
      })}
    </div>
  )
}
