"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useState } from "react"

interface ScenarioGeneratorProps {
  className?: string
}

const historicalPeriods = [
  { value: "qing", label: "清朝" },
  { value: "ming", label: "明朝" },
  { value: "tang", label: "唐朝" },
  { value: "han", label: "漢朝" },
  { value: "warring", label: "戰國時期" },
  { value: "spring", label: "春秋時期" },
]

const personalities = [
  { value: "serious", label: "嚴肅" },
  { value: "humorous", label: "幽默" },
  { value: "wise", label: "睿智" },
  { value: "friendly", label: "親切" },
  { value: "mysterious", label: "神秘" },
]

export function ScenarioGenerator({ className }: ScenarioGeneratorProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("")
  const [selectedPersonality, setSelectedPersonality] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    if (!selectedPeriod || !selectedPersonality) return
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className={cn("bg-card rounded-2xl border border-border p-6", className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">情境生成器</h3>
      
      <div className="space-y-5">
        {/* Historical Period Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            選擇歷史時期
          </label>
          <div className="flex flex-wrap gap-2">
            {historicalPeriods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  selectedPeriod === period.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Personality Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            角色性格
          </label>
          <div className="flex flex-wrap gap-2">
            {personalities.map((personality) => (
              <button
                key={personality.value}
                onClick={() => setSelectedPersonality(personality.value)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  selectedPersonality === personality.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                {personality.label}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!selectedPeriod || !selectedPersonality || isGenerating}
          className="w-full rounded-xl h-12 text-base"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              生成 AI 角色情境
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
