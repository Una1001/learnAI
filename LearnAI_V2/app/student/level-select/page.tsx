"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Period {
  id: string
  name: string
  description: string
  color: string
  textColor: string
  borderColor: string
}

const periods: Period[] = [
  {
    id: "qing",
    name: "清領時期",
    description: "18世紀 - 19世紀",
    color: "from-sky-400/30 to-sky-500/30",
    textColor: "text-sky-100",
    borderColor: "border-sky-300/40",
  },
  {
    id: "dutch",
    name: "荷蘭統治時期",
    description: "17世紀",
    color: "from-emerald-400/28 to-emerald-500/32",
    textColor: "text-emerald-100",
    borderColor: "border-emerald-300/40",
  },
  {
    id: "japanese",
    name: "日治時期",
    description: "20世紀初",
    color: "from-emerald-200/20 to-emerald-300/24",
    textColor: "text-emerald-50",
    borderColor: "border-emerald-200/30",
  },
]

export default function LevelSelectPage() {
  const router = useRouter()
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null)

  const handlePeriodSelect = (periodId: string) => {
    router.push(`/student/story-intro?period=${periodId}`)
  }

  // 直接導向至 story-intro，不使用中間轉場覆蓋層

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/all_simple.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 暗色遮罩層 */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 背景動畫效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 內容容器 */}
      <motion.div
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 標題 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1
            className="text-5xl md:text-6xl font-black mb-4"
            style={{
              textShadow: `
                3px 3px 0px rgba(0, 0, 0, 0.5),
                6px 6px 0px rgba(0, 0, 0, 0.3)
              `,
              color: "#FFFFFF",
              letterSpacing: "0.05em",
            }}
          >
            選擇時代
          </h1>
          <p className="text-xl text-white/80 drop-shadow-lg">
            踏入台灣的歷史時光中...
          </p>
        </motion.div>

        {/* 關卡卡片列表 */}
        <div className="space-y-6">
          {periods.map((period, index) => (
            <motion.div
              key={period.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.5, ease: "easeOut" }}
              onHoverStart={() => setHoveredPeriod(period.id)}
              onHoverEnd={() => setHoveredPeriod(null)}
            >
              <div
                onClick={() => handlePeriodSelect(period.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePeriodSelect(period.id)
                  }
                }}
              >
                <motion.div
                  className={`
                    relative group cursor-pointer
                    p-6 md:p-8 rounded-2xl
                    border-3 ${period.borderColor}
                    bg-gradient-to-br ${period.color}
                    backdrop-blur-sm
                    overflow-hidden
                    transition-all duration-300
                  `}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  {/* 光澤效果 */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-2xl"
                    animate={hoveredPeriod === period.id ? { opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  {/* 內容 */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className={`text-2xl md:text-3xl font-bold ${period.textColor} mb-2`}>
                        {period.name}
                      </h3>
                      <p className="text-white/70 text-lg">{period.description}</p>
                    </div>

                    {/* 箭頭圖標 */}
                    <motion.div
                      className={`ml-4 flex-shrink-0 ${period.textColor}`}
                      animate={hoveredPeriod === period.id ? { x: [0, 8, 0] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ChevronRight className="w-10 h-10" />
                    </motion.div>
                  </div>

                  {/* 懸停光暈 */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                    animate={hoveredPeriod === period.id ? { opacity: 1 } : { opacity: 0 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 返回按鈕 */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/student">
            <motion.button
              className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-300 backdrop-blur-sm border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              返回
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      
    </main>
  )
}
