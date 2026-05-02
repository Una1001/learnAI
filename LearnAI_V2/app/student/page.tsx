"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { AIAvatar } from "@/components/ai-avatar"
import { GameHUD } from "@/components/game-hud"
import { DialogueBox } from "@/components/dialogue-box"
import { VoiceButton } from "@/components/voice-button"
import { StoryNavigation } from "@/components/story-navigation"
import { KnowledgeCard } from "@/components/knowledge-card"
import { FeedbackToast } from "@/components/feedback-toast"
import Link from "next/link"
import { Settings, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function StudentInterface() {
  const searchParams = useSearchParams()
  const period = searchParams?.get("period") || "qing"
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [trust, setTrust] = useState(3)
  const [storyProgress, setStoryProgress] = useState(40)
  const [currentDialogue, setCurrentDialogue] = useState(
    "如果你要運送大批茶葉，走山路很累，你會希望有什麼發明？"
  )
  const [isTyping, setIsTyping] = useState(true)
  
  // Feedback states
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [encouragementMessage, setEncouragementMessage] = useState("")
  const [showKnowledge, setShowKnowledge] = useState(false)
  const [knowledgeData, setKnowledgeData] = useState({ title: "", content: "" })

  const showFeedback = useCallback((message: string) => {
    setEncouragementMessage(message)
    setShowEncouragement(true)
    setTimeout(() => setShowEncouragement(false), 3000)
  }, [])

  // Simulate AI speaking
  useEffect(() => {
    if (isTyping) {
      setIsSpeaking(true)
      const timer = setTimeout(() => {
        setIsSpeaking(false)
        setIsTyping(false)
      }, currentDialogue.length * 50 + 500)
      return () => clearTimeout(timer)
    }
  }, [isTyping, currentDialogue])

  const handleVoicePress = () => {
    setIsListening(true)
  }

  const handleVoiceRelease = () => {
    setIsListening(false)
    simulateResponse()
  }

  const handleTextSubmit = (text: string) => {
    simulateResponse()
  }

  const simulateResponse = () => {
    // Step 1: Show encouragement
    setTimeout(() => {
      showFeedback("你觀察得太棒了！")
    }, 500)

    // Step 2: Show knowledge card
    setTimeout(() => {
      setKnowledgeData({
        title: "黑怪獸火車",
        content: "劉銘傳在1887年開始建造台灣第一條鐵路，從基隆到台北。當時的人們第一次看到會冒煙的火車，都叫它「黑怪獸」呢！"
      })
      setShowKnowledge(true)
    }, 2000)

    // Step 3: New dialogue with follow-up question
    setTimeout(() => {
      setCurrentDialogue(
        "蓋鐵路需要很多錢，有些人說太貴了不值得。如果你是當時的官員，你支持他建鐵路嗎？為什麼？"
      )
      setIsTyping(true)
      setTrust(prev => Math.min(prev + 1, 5))
      setStoryProgress(prev => Math.min(prev + 20, 100))
    }, 5000)
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Feedback Toast */}
      <FeedbackToast 
        message={encouragementMessage}
        isVisible={showEncouragement}
        type="encouragement"
      />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-60 right-16 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-secondary/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-row w-full h-screen">
        {/* Left Sidebar */}
        <aside className="w-80 bg-card/50 border-r border-border/50 px-6 py-6 flex flex-col gap-6 overflow-y-auto">
          {/* Home button */}
          <Link 
            href="/student/level-select"
            className="p-3 rounded-2xl bg-card hover:bg-card/80 border border-border/50 shadow-sm transition-all flex items-center justify-center gap-2"
            aria-label="返回關卡選擇"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">返回關卡選擇</span>
          </Link>

          {/* Header in sidebar */}
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-foreground"
          >
            時空冒險導師
          </motion.h1>

          {/* Story Navigation */}
          <StoryNavigation 
            era="台灣清領時期"
            chapter="鐵路篇"
            progress={storyProgress}
            totalSteps={5}
          />

          {/* Teacher Link */}
          <Link 
            href="/teacher"
            className="mt-auto p-3 rounded-2xl bg-card hover:bg-card/80 border border-border/50 shadow-sm transition-all flex items-center justify-center gap-2"
            aria-label="老師後台"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">老師後台</span>
          </Link>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main content */}
          <div className="flex-1 flex flex-row items-center justify-center gap-8 px-8 py-6 overflow-auto">
            {/* AI Avatar - Liu Mingchuan */}
            <AIAvatar 
              name="劉銘傳" 
              nameZhuyin={["ㄌㄧㄡˊ", "ㄇㄧㄥˊ", "ㄔㄨㄢˊ"]}
              title="台灣首任巡撫 (1885年)" 
              isSpeaking={isSpeaking}
              isListening={isListening}
            />

            {/* Dialogue Box - positioned to the right of avatar */}
            <DialogueBox 
              speaker=""
              message={currentDialogue}
              isTyping={isTyping}
              className="flex-shrink-0"
            />

            {/* Knowledge Card */}
            <KnowledgeCard
              title={knowledgeData.title}
              content={knowledgeData.content}
              isVisible={showKnowledge}
              onClose={() => setShowKnowledge(false)}
            />

            {/* Listening indicator */}
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-accent/15 border border-accent/20"
              >
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 h-4 rounded-full bg-accent origin-bottom"
                    />
                  ))}
                </div>
                <span className="text-base font-bold text-accent">正在聆聽...</span>
              </motion.div>
            )}
          </div>

          {/* Voice Button */}
          <footer className="px-8 py-6 border-t border-border/50 bg-card/30">
            <VoiceButton 
              onPress={handleVoicePress}
              onRelease={handleVoiceRelease}
              onTextSubmit={handleTextSubmit}
              testAnswer="我想要一台有噴射背包的搬運機器人！"
            />
          </footer>
        </div>
      </div>
    </main>
  )
}
