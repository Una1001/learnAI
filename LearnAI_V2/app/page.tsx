"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookOpen, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "60% center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 暗色遮罩层 */}
      <div className="absolute inset-0 bg-black/20" />
      
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title Section - 弹出 + 浮动效果 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* 外光晕效果 */}
            <div className="absolute inset-0 blur-3xl bg-yellow-400/30 rounded-full" style={{ width: "150%", left: "-25%", top: "-20%" }} />
            
            <h1 className="text-6xl font-black text-center relative drop-shadow-lg"
              style={{
                textShadow: `
                  3px 3px 0px rgba(0, 0, 0, 0.5),
                  6px 6px 0px rgba(0, 0, 0, 0.3),
                  0 0 20px rgba(255, 255, 255, 0.6)
                `,
                letterSpacing: "0.1em",
                color: "#FFFFFF",
                fontStyle: "italic",
              }}
            >
              小小探險王
            </h1>
          </motion.div>
        </motion.div>

        {/* Buttons Section - 浮动按钮 */}
        <div className="space-y-6">
          {/* Teacher Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 80 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link href="/teacher" className="block h-full">
                <Button
                  className="w-full h-32 text-xl font-bold rounded-3xl text-white shadow-2xl hover:shadow-2xl transition-all duration-300 border-4 border-white/50"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(34, 197, 94, 0.3) 100%)",
                    backdropFilter: "blur(10px)",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  size="lg"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Users className="w-10 h-10" />
                    <span>我是老師</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Student Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, type: "spring", stiffness: 80 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Link href="/student/level-select" className="block h-full">
                <Button
                  className="w-full h-32 text-xl font-bold rounded-3xl text-white shadow-2xl hover:shadow-2xl transition-all duration-300 border-4 border-white/50"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(59, 130, 246, 0.3) 100%)",
                    backdropFilter: "blur(10px)",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  size="lg"
                >
                  <div className="flex flex-col items-center gap-3">
                    <BookOpen className="w-10 h-10" />
                    <span>我是學生</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
