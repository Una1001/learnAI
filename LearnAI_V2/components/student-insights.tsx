"use client"

import { cn } from "@/lib/utils"
import { Brain, TrendingUp, Users, MessageSquare } from "lucide-react"

interface StudentInsightsProps {
  className?: string
}

const insightCards = [
  {
    icon: Brain,
    label: "思考深度",
    value: "中高",
    trend: "+12%",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "學生能提出具批判性的問題",
  },
  {
    icon: TrendingUp,
    label: "參與度指標",
    value: "85%",
    trend: "+5%",
    color: "text-green-500",
    bgColor: "bg-green-50",
    description: "較上週有明顯提升",
  },
  {
    icon: Users,
    label: "活躍學生數",
    value: "28/32",
    trend: "",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    description: "本週參與對話的學生",
  },
  {
    icon: MessageSquare,
    label: "平均對話輪數",
    value: "8.3",
    trend: "+2.1",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "每位學生每次的互動次數",
  },
]

export function StudentInsights({ className }: StudentInsightsProps) {
  return (
    <div className={cn("", className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">學生洞察分析</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insightCards.map((card) => (
          <div
            key={card.label}
            className="bg-card rounded-2xl border border-border p-5 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", card.bgColor)}>
                <card.icon className={cn("w-5 h-5", card.color)} />
              </div>
              {card.trend && (
                <span className="text-sm font-medium text-green-600">
                  {card.trend}
                </span>
              )}
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-foreground mb-1">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
