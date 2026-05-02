"use client"

import { cn } from "@/lib/utils"
import { BookOpen, Sparkles, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface KnowledgeCardProps {
  title: string
  content: string
  isVisible: boolean
  onClose: () => void
  className?: string
}

export function KnowledgeCard({ 
  title, 
  content, 
  isVisible, 
  onClose,
  className 
}: KnowledgeCardProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={cn(
            "relative w-full max-w-md p-5 rounded-3xl overflow-hidden",
            "bg-gradient-to-br from-amber-50 to-orange-50",
            "border-2 border-amber-200/50",
            "shadow-[0_8px_30px_rgba(251,191,36,0.2)]",
            className
          )}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              "absolute top-3 right-3 p-1.5 rounded-full",
              "bg-white/60 hover:bg-white",
              "transition-colors"
            )}
          >
            <X className="w-4 h-4 text-amber-700" />
          </button>
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className={cn(
              "p-2.5 rounded-2xl",
              "bg-amber-400/20",
              "border border-amber-300/30"
            )}>
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-700">知識補充卡片</span>
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-amber-900 mb-2">{title}</h3>
          
          {/* Content */}
          <p className="text-base text-amber-800 leading-relaxed">{content}</p>
          
          {/* Decorative corner */}
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-amber-200/30" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
