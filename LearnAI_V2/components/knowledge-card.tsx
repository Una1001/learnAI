"use client"

import { cn } from "@/lib/utils"
import { BookOpen, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
          />
          
          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className={cn(
              "w-full max-w-md p-6 rounded-3xl overflow-hidden",
              "bg-gradient-to-br from-amber-50 to-orange-50",
              "border-2 border-amber-200/50",
              "shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
              className
            )}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
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
              <h3 className="text-2xl font-bold text-amber-900 mb-3">{title}</h3>
              
              {/* Content */}
              <p className="text-base text-amber-800 leading-relaxed mb-6">{content}</p>
              
              {/* Button */}
              <Button
                onClick={onClose}
                className={cn(
                  "w-full py-3 rounded-2xl font-bold text-lg",
                  "bg-gradient-to-r from-amber-500 to-orange-500",
                  "hover:from-amber-600 hover:to-orange-600",
                  "text-white shadow-lg transition-all"
                )}
              >
                我知道了
              </Button>
              
              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-amber-200/30 rounded-tl-3xl" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
