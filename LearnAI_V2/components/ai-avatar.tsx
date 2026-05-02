"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { AudioBars } from "./audio-bars"

interface AIAvatarProps {
  name: string
  nameZhuyin?: string[]
  title: string
  isSpeaking: boolean
  isListening?: boolean
  className?: string
}

export function AIAvatar({ 
  name, 
  nameZhuyin,
  title, 
  isSpeaking, 
  isListening = false, 
  className 
}: AIAvatarProps) {
  const nameChars = name.split("")
  
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn("flex flex-col items-center gap-4", className)}
    >
      {/* Avatar without card frame */}
      <div className="relative">
        {/* Outer glow when speaking */}
        {isSpeaking && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            className="absolute inset-[-16px] rounded-[2rem] bg-primary/15 blur-xl"
          />
        )}
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-36 h-44 md:w-44 md:h-52 transition-all duration-300"
        >
          {/* Liu Mingchuan illustration - Qing dynasty official */}
          <div className="absolute inset-0 flex items-center justify-center pt-4">
            <svg
              viewBox="0 0 100 120"
              className="w-28 h-36 md:w-36 md:h-44"
              fill="none"
            >
              {/* Face */}
              <ellipse cx="50" cy="42" rx="18" ry="20" fill="#F5D6BA" />
              {/* Hair/Hat - Qing official style */}
              <path
                d="M32 35 Q50 18 68 35 L68 28 Q50 12 32 28 Z"
                fill="#1a1a2e"
              />
              {/* Official hat with red ball */}
              <ellipse cx="50" cy="18" rx="10" ry="4" fill="#1a1a2e" />
              <circle cx="50" cy="12" r="5" fill="#dc2626" />
              <circle cx="50" cy="10" r="2" fill="#fef08a" />
              {/* Eyes - friendly */}
              <ellipse cx="43" cy="40" rx="3" ry="2.5" fill="#1a1a2e" />
              <ellipse cx="57" cy="40" rx="3" ry="2.5" fill="#1a1a2e" />
              <circle cx="44" cy="39" r="1" fill="white" />
              <circle cx="58" cy="39" r="1" fill="white" />
              {/* Eyebrows - wise */}
              <path d="M38 35 Q43 33 48 36" stroke="#1a1a2e" strokeWidth="1.5" fill="none" />
              <path d="M52 36 Q57 33 62 35" stroke="#1a1a2e" strokeWidth="1.5" fill="none" />
              {/* Nose */}
              <path d="M50 43 L48 50 L52 50" stroke="#D4A574" strokeWidth="1" fill="none" />
              {/* Smile */}
              <path d="M44 54 Q50 58 56 54" stroke="#1a1a2e" strokeWidth="1.5" fill="none" />
              {/* Beard */}
              <path d="M40 56 Q50 68 60 56" stroke="#4a4a4a" strokeWidth="1" fill="none" strokeDasharray="2 1" />
              {/* Robe - Blue official robe */}
              <path
                d="M28 65 Q50 58 72 65 L78 120 L22 120 Z"
                fill="#1e40af"
              />
              {/* Robe inner collar */}
              <path
                d="M38 65 L50 82 L62 65"
                stroke="#F5D6BA"
                strokeWidth="4"
                fill="none"
              />
              {/* Mandarin square badge */}
              <rect x="40" y="88" width="20" height="16" rx="2" fill="#fbbf24" />
              <circle cx="50" cy="96" r="5" fill="#dc2626" />
            </svg>
          </div>
        </motion.div>
        
        {/* Audio bars when speaking */}
        {isSpeaking && (
          <>
            <div className="absolute left-[-24px] top-1/2 -translate-y-1/2">
              <AudioBars isActive={isSpeaking} barCount={3} />
            </div>
            <div className="absolute right-[-24px] top-1/2 -translate-y-1/2">
              <AudioBars isActive={isSpeaking} barCount={3} />
            </div>
          </>
        )}
        
        {/* Speaking indicator */}
        {isSpeaking && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              "absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full",
              "bg-primary",
              "shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-white">說話中</span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Name with Zhuyin */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          {nameChars.map((char, index) => (
            <ruby key={index} className="text-2xl md:text-3xl font-bold text-foreground">
              {char}
              {nameZhuyin && nameZhuyin[index] && (
                <rt className="text-xs text-muted-foreground font-normal">
                  {nameZhuyin[index]}
                </rt>
              )}
            </ruby>
          ))}
        </div>
        <p className="text-sm md:text-base text-muted-foreground font-medium mt-1">{title}</p>
      </div>
    </motion.div>
  )
}
