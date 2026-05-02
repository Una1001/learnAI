"use client"

import { cn } from "@/lib/utils"
import { Sparkles, Star, X } from "lucide-react"
import { useEffect, useState } from "react"

interface AchievementToastProps {
  title: string
  xp: number
  isVisible: boolean
  onClose: () => void
  className?: string
}

export function AchievementToast({ 
  title, 
  xp, 
  isVisible, 
  onClose,
  className 
}: AchievementToastProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        onClose()
      }, 3500)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
    }
  }, [isVisible, onClose])
  
  if (!isVisible) return null
  
  return (
    <div className={cn(
      "fixed top-6 left-1/2 -translate-x-1/2 z-50",
      "animate-in fade-in-0 slide-in-from-top-4 duration-500",
      className
    )}>
      <div className={cn(
        "relative px-6 py-4 rounded-2xl",
        "bg-gradient-to-r from-amber-400/90 via-yellow-300/90 to-amber-400/90",
        "backdrop-blur-md shadow-2xl",
        "border-2 border-amber-200/50",
        // Neon glow effect
        "shadow-[0_0_30px_rgba(251,191,36,0.5),0_0_60px_rgba(251,191,36,0.3)]"
      )}>
        {/* Sparkle decorations */}
        <div className="absolute -top-2 -left-2">
          <Sparkles className="w-5 h-5 text-amber-100 animate-pulse" />
        </div>
        <div className="absolute -top-1 -right-3">
          <Star className="w-4 h-4 text-amber-100 animate-bounce" fill="currentColor" />
        </div>
        <div className="absolute -bottom-1 left-4">
          <Star className="w-3 h-3 text-amber-200 animate-pulse" fill="currentColor" style={{ animationDelay: '200ms' }} />
        </div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        >
          <X className="w-3 h-3 text-amber-700" />
        </button>
        
        <div className="flex items-center gap-4">
          {/* Crystal icon */}
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500",
            "shadow-lg shadow-blue-400/40",
            isAnimating && "animate-bounce"
          )}>
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white drop-shadow-lg">
              <path 
                fill="currentColor" 
                d="M12 2L4 8L12 22L20 8L12 2ZM12 5L17 8.5L12 18L7 8.5L12 5Z"
              />
              <path 
                fill="currentColor" 
                opacity="0.6"
                d="M12 5L7 8.5L12 18V5Z"
              />
            </svg>
          </div>
          
          {/* Content */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-amber-800/80 uppercase tracking-wide">
              成就達成!
            </span>
            <span className="text-lg font-bold text-amber-900">
              {title}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm font-bold text-amber-700">+{xp} XP</span>
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <Sparkles 
                    key={i} 
                    className="w-3 h-3 text-amber-600 animate-pulse" 
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress bar animation */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600/30 rounded-b-2xl overflow-hidden">
          <div 
            className="h-full bg-amber-600/60 animate-[shrink_3.5s_linear_forwards]"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}
