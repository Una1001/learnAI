"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { TransitionCurtain } from "@/components/transition-curtain"

interface PeriodStory {
  title: string
  content: string
  period: string
}

const storiesByPeriod: Record<string, PeriodStory> = {
  qing: {
    title: "清領時期的茶商故事",
    period: "1870 年代",
    content: `1870 年代的午後，大稻埕的碼頭邊飄散著濃郁的茶葉清香。漢人茶商阿成正忙著指揮工人，將一箱箱印有「Formosa Oolong Tea」字樣的木箱搬上英國商船。

一旁的領事史密斯先生撥了撥斗篷上的灰塵，讚嘆道：「這茶到了倫敦一定會引起轟動。」阿成聽了呵呵一笑，一邊撥動算盤一邊回應：「開港後滿街都是洋行，咱們這碼頭的夕陽，現在可是映著全世界的錢潮呢！」

遠方傳來力夫們的號子聲，海風吹起了茶塵，整個港口沉浸在繁忙的貿易之中...`,
  },
  dutch: {
    title: "荷蘭統治時期的故事",
    period: "17 世紀",
    content: `在荷蘭統治台灣的時代，西方商人與原住民的交易開始改變了這片島嶼的命運。

大船停靠在基隆港，裝滿了珍貴的物資。荷蘭商人們在台灣建立了第一批商業據點，帶來了全新的貿易方式和文明衝擊。

這是台灣走向世界舞台的第一步，島上的人民開始接觸到外面的世界...`,
  },
  japanese: {
    title: "日治時期的發展故事",
    period: "20 世紀初",
    content: `明治維新後的日本帶來了現代化的浪潮。台灣迎來了鐵路、電力和工業革命。

總督府的官員們規劃著新的城市，工人們忙著鋪設鐵軌。一列列列車呼嘯而過，改變了人們的生活方式。

從農業社會邁向現代化工業社會，台灣經歷了前所未有的變革...`,
  },
}

export default function StoryIntroPage() {
  const searchParams = useSearchParams()
  const periodId = searchParams.get("period") || "qing"
  const [isCardVisible, setIsCardVisible] = useState(false)
  const [hasAcknowledged, setHasAcknowledged] = useState(false)

  const story = storiesByPeriod[periodId] || storiesByPeriod.qing

  // 自動顯示卡片
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCardVisible(true)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    setHasAcknowledged(true)
    // 動畫完成後導航到遊戲頁面
    setTimeout(() => {
      // 使用 startTransition 使導航更流暢
      window.location.href = `/student?period=${periodId}`
    }, 600)
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/backgrounds/simple.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 過渡幕簾 */}
      <TransitionCurtain isActive={hasAcknowledged} direction="out" duration={0.5} />
      {/* 暗色遮罩層 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 背景動畫粒子 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 100, 0.05)`,
              filter: "blur(40px)",
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 內容容器 */}
      <div className="w-full max-w-2xl relative z-10">
        {/* 標題區域 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-black mb-2"
            style={{
              textShadow: `
                3px 3px 0px rgba(0, 0, 0, 0.5),
                6px 6px 0px rgba(0, 0, 0, 0.3)
              `,
              color: "#FFFFFF",
              letterSpacing: "0.05em",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {story.title}
          </motion.h1>
          <motion.p
            className="text-xl text-white/70 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {story.period}
          </motion.p>
        </motion.div>

        {/* 故事卡片 */}
        <AnimatePresence>
          {isCardVisible && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
              }}
            >
              {/* 卡片外光暈 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-3xl blur-2xl"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* 卡片本體 */}
              <motion.div
                className="relative p-8 md:p-12 rounded-3xl backdrop-blur-md border-2 border-white/30 bg-gradient-to-br from-white/20 to-white/10 shadow-2xl"
                whileHover={!hasAcknowledged ? { scale: 1.02, y: -5 } : {}}
                animate={hasAcknowledged ? { 
                  scale: [1, 0.95, 0.9], 
                  opacity: [1, 0.8, 0] 
                } : {}}
                transition={hasAcknowledged ? { duration: 0.5 } : {}}
              >
                {/* 裝飾角落 */}
                <div className="absolute top-4 left-4 text-4xl opacity-20">✦</div>
                <div className="absolute bottom-4 right-4 text-4xl opacity-20">✦</div>

                {/* 故事文本 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-center"
                >
                  <motion.p
                    className="text-base md:text-lg leading-8 text-white/95 whitespace-pre-wrap"
                    style={{
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                      lineHeight: "1.8",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {story.content}
                  </motion.p>
                </motion.div>

                {/* 右下角按鈕 */}
                <motion.div
                  className="absolute bottom-6 right-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  <motion.button
                    onClick={handleContinue}
                    disabled={hasAcknowledged}
                    className="
                      flex items-center gap-2
                      px-6 py-3 rounded-full
                      bg-gradient-to-r from-blue-500 to-cyan-500
                      hover:from-blue-600 hover:to-cyan-600
                      text-white font-bold
                      shadow-lg
                      transition-all duration-300
                      disabled:opacity-50
                    "
                    whileHover={!hasAcknowledged ? { scale: 1.1 } : {}}
                    whileTap={!hasAcknowledged ? { scale: 0.95 } : {}}
                    animate={!hasAcknowledged ? { y: [0, 3, 0] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span>我知道了</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 背景故事提示文字 */}
        <motion.div
          className="text-center mt-20 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="text-sm">點擊「我知道了」準備開始冒險...</p>
        </motion.div>
      </div>

      {/* 返回主選單按鈕 */}
      <motion.div
        className="absolute top-6 left-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/student/level-select">
          <motion.button
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-300 backdrop-blur-sm border border-white/30 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← 返回
          </motion.button>
        </Link>
      </motion.div>
    </main>
  )
}
