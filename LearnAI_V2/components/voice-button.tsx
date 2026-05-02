"use client"

import { cn } from "@/lib/utils"
import { Mic, Send } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface VoiceButtonProps {
  onPress?: () => void
  onRelease?: () => void
  onTextSubmit?: (text: string) => void
  className?: string
}

export function VoiceButton({ onPress, onRelease, onTextSubmit, className }: VoiceButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [textInput, setTextInput] = useState("")
  
  const handlePress = () => {
    setIsPressed(true)
    onPress?.()
  }
  
  const handleRelease = () => {
    setIsPressed(false)
    onRelease?.()
  }
  
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onTextSubmit?.(textInput)
      setTextInput("")
    }
  }
  
  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Voice button with ripple effects */}
      <div className="relative">
        {/* Ripple waves when pressed */}
        <AnimatePresence>
          {isPressed && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.3,
                    repeat: Infinity 
                  }}
                  className={cn(
                    "absolute inset-0 rounded-full",
                    "border-2 border-accent/50"
                  )}
                />
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-[-30px] rounded-full bg-accent/15 blur-xl" 
              />
            </>
          )}
        </AnimatePresence>
        
        {/* Main button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onMouseLeave={() => isPressed && handleRelease()}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
          className={cn(
            "relative w-24 h-24 md:w-28 md:h-28 rounded-full transition-colors duration-200",
            "bg-gradient-to-b from-accent to-orange-400",
            "shadow-[0_6px_0_0_rgba(194,65,12,0.4),0_10px_20px_rgba(0,0,0,0.15)]",
            "border-4 border-white/30",
            "flex items-center justify-center",
            "focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background",
            isPressed && "translate-y-1 shadow-[0_3px_0_0_rgba(194,65,12,0.4),0_5px_10px_rgba(0,0,0,0.1)]"
          )}
          aria-label="點擊說話"
        >
          {/* Inner highlight */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
          
          {/* Mic icon */}
          <motion.div
            animate={isPressed ? { scale: 1.1 } : { scale: 1 }}
          >
            <Mic 
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md",
                isPressed && "animate-pulse"
              )} 
            />
          </motion.div>
        </motion.button>
        
        {/* Audio bars when pressed */}
        <AnimatePresence>
          {isPressed && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: [8, 20, 8],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    delay: i * 0.08
                  }}
                  className="w-2 rounded-full bg-accent"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Label */}
      <motion.span 
        animate={isPressed ? { color: "var(--accent)" } : {}}
        className="text-lg md:text-xl font-bold text-foreground"
      >
        {isPressed ? "正在聆聽..." : "點擊說話"}
      </motion.span>
      
      {/* Text input alternative */}
      <div className={cn(
        "flex items-center gap-3 w-full max-w-md px-5 py-3 rounded-2xl",
        "bg-card border border-border/50",
        "shadow-sm"
      )}>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
          placeholder="或者在這裡打字..."
          className={cn(
            "flex-1 bg-transparent text-lg",
            "placeholder:text-muted-foreground/50",
            "focus:outline-none"
          )}
        />
        <Button
          size="icon"
          onClick={handleTextSubmit}
          disabled={!textInput.trim()}
          className={cn(
            "rounded-xl bg-primary hover:bg-primary/90",
            "disabled:opacity-50"
          )}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
