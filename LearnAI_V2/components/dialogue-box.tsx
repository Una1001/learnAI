"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DialogueBoxProps {
  speaker: string
  message: string
  isTyping?: boolean
  className?: string
}

export function DialogueBox({ 
  speaker, 
  message, 
  isTyping = false, 
  className 
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (isTyping && currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + message[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isTyping, message])
  
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [message])
  
  const textToShow = isTyping ? displayedText : message
  
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn("w-full max-w-2xl", className)}
    >
      {/* Storybook dialogue card */}
      <div className={cn(
        "relative rounded-3xl p-6 md:p-8 overflow-hidden",
        "bg-card",
        "border-2 border-border/50",
        "shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      )}>
        {/* Top decorative line */}
        <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
        
        {/* Speaker label - book style */}
        <div className={cn(
          "absolute -top-4 left-6 px-5 py-2 rounded-2xl",
          "bg-primary",
          "shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        )}>
          <span className="text-sm font-bold text-white">{speaker}</span>
        </div>
        
        {/* Dialogue content - larger text for kids */}
        <div className="mt-4">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
            {textToShow}
            <AnimatePresence>
              {isTyping && currentIndex < message.length && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "inline-block w-1 h-6 ml-1 rounded-full",
                    "bg-primary animate-pulse"
                  )} 
                />
              )}
            </AnimatePresence>
          </p>
        </div>
        
        {/* Decorative book corner fold */}
        <div className={cn(
          "absolute bottom-0 right-0 w-8 h-8",
          "bg-gradient-to-br from-transparent via-transparent to-primary/10"
        )} />
        
        {/* Page dots decoration */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-2 h-2 rounded-full",
                i === 0 ? "bg-primary/60" : "bg-primary/20"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Speech bubble tail - pointing left to avatar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className={cn(
          "w-6 h-6 rotate-45",
          "bg-card",
          "border-l-2 border-t-2 border-border/50"
        )} />
      </div>
    </motion.div>
  )
}
