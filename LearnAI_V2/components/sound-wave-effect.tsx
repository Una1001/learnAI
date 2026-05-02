"use client"

import { cn } from "@/lib/utils"

interface SoundWaveEffectProps {
  isActive: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SoundWaveEffect({ isActive, size = "md", className }: SoundWaveEffectProps) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40"
  }
  
  return (
    <div className={cn(
      "absolute inset-0 flex items-center justify-center pointer-events-none",
      className
    )}>
      {/* Ripple waves */}
      {isActive && [...Array(3)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full border-2 border-accent/40",
            sizeClasses[size],
            "animate-[ripple_2s_ease-out_infinite]"
          )}
          style={{ 
            animationDelay: `${i * 0.5}s`,
            opacity: 0
          }}
        />
      ))}
      
      {/* Glow pulse */}
      {isActive && (
        <div className={cn(
          "absolute rounded-full",
          sizeClasses[size],
          "bg-accent/10 blur-xl animate-pulse"
        )} />
      )}
    </div>
  )
}
