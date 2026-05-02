"use client"

import { UploadZone } from "@/components/upload-zone"
import { ScenarioGenerator } from "@/components/scenario-generator"
import { StudentInsights } from "@/components/student-insights"
import Link from "next/link"
import { ArrowLeft, BookOpen, Users, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-2 rounded-xl hover:bg-muted transition-colors"
                aria-label="返回學生介面"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">教師管理中心</h1>
                <p className="text-sm text-muted-foreground">AI 智慧教育平台</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ml-2">
                <span className="text-sm font-medium text-primary">王</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "總課程數", value: "12", icon: BookOpen, color: "text-primary" },
            { label: "學生總數", value: "128", icon: Users, color: "text-accent" },
            { label: "本週對話", value: "1,247", icon: Settings, color: "text-green-500" },
            { label: "完成率", value: "94%", icon: Settings, color: "text-orange-500" },
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Upload Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-foreground">教材上傳</h2>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  AI 處理
                </span>
              </div>
              <UploadZone />
            </section>

            {/* Scenario Generator */}
            <section>
              <ScenarioGenerator />
            </section>
          </div>

          {/* Right Column */}
          <div>
            <StudentInsights />
            
            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">最近活動</h3>
              <div className="bg-card rounded-2xl border border-border divide-y divide-border">
                {[
                  { student: "小明", action: "完成了與劉銘傳的對話", time: "5 分鐘前", score: "+50 XP" },
                  { student: "小華", action: "提出了一個深度問題", time: "12 分鐘前", score: "+30 XP" },
                  { student: "小美", action: "達成信任度 100%", time: "25 分鐘前", score: "成就解鎖" },
                  { student: "小龍", action: "開始新的歷史冒險", time: "1 小時前", score: "" },
                ].map((activity, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-sm font-medium text-secondary-foreground">
                          {activity.student[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          <span className="text-primary">{activity.student}</span> {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <span className="text-sm font-medium text-green-600">
                        {activity.score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
