"use client"

import { cn } from "@/lib/utils"

interface VoiceWaveformProps {
  isActive: boolean
  className?: string
}

export function VoiceWaveform({ isActive, className }: VoiceWaveformProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-primary transition-all duration-150",
            isActive ? "animate-pulse" : "h-2"
          )}
          style={{
            height: isActive ? `${12 + Math.sin(i * 1.5) * 8}px` : "8px",
            animationDelay: `${i * 100}ms`,
            animationDuration: isActive ? "0.5s" : "0s",
          }}
        />
      ))}
    </div>
  )
}
