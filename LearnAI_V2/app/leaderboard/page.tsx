"use client"

import { motion } from "framer-motion"

interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  score: number
  avatar: string
  streak: number
}

const mockLeaderboard: LeaderboardEntry[] = [
  { id: "u1", rank: 1, name: "小宇", score: 9850, avatar: "🥇", streak: 17 },
  { id: "u2", rank: 2, name: "阿晴", score: 9210, avatar: "🥈", streak: 14 },
  { id: "u3", rank: 3, name: "凱文", score: 8890, avatar: "🥉", streak: 12 },
  { id: "u4", rank: 4, name: "米可", score: 8420, avatar: "⭐", streak: 10 },
  { id: "u5", rank: 5, name: "小恩", score: 8075, avatar: "🌟", streak: 9 },
  { id: "u6", rank: 6, name: "Luna", score: 7810, avatar: "✨", streak: 8 },
]

const podiumOrder = [2, 1, 3]

function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  const byRank = new Map(entries.slice(0, 3).map((entry) => [entry.rank, entry]))

  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-3xl grid-cols-3 items-end gap-3 md:gap-5">
        {podiumOrder.map((rank, index) => {
          const entry = byRank.get(rank)
          const isChampion = rank === 1
          const blockHeight = rank === 1 ? "h-44 md:h-52" : rank === 2 ? "h-32 md:h-40" : "h-28 md:h-36"
          const crown = rank === 1 ? "👑" : ""

          return (
            <motion.div
              key={rank}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.55 + index * 0.12, duration: 0.4 }}
                className="mb-3 flex justify-center"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-amber-100/50 bg-amber-200/30 text-3xl shadow-[0_0_20px_rgba(251,191,36,0.35)] backdrop-blur-sm md:h-20 md:w-20 md:text-4xl">
                  <span className="font-mono leading-none">🏆</span>
                  {crown ? (
                    <span className="absolute -top-4 text-xl md:text-2xl">{crown}</span>
                  ) : null}
                </div>
              </motion.div>

              <div className="mb-2 text-center">
                <p className="text-sm font-bold text-white md:text-base">{entry?.name ?? `TOP ${rank}`}</p>
                <p className="text-xs text-white/80">{entry ? `${entry.score.toLocaleString()} pts` : "-"}</p>
              </div>

              <div
                className={[
                  "relative overflow-hidden rounded-t-2xl border border-white/30",
                  "bg-gradient-to-b from-sky-200/35 to-blue-500/45",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_35px_rgba(2,6,23,0.35)]",
                  "backdrop-blur-md",
                  blockHeight,
                ].join(" ")}
              >
                <div className="absolute inset-x-0 top-0 h-2 bg-white/35" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0.18)_75%,transparent_75%,transparent)] bg-[length:22px_22px] opacity-30" />
                <div className="absolute inset-x-0 bottom-4 text-center text-4xl md:text-5xl">{entry?.avatar ?? "🏅"}</div>
                <div className="absolute inset-x-0 bottom-2 text-center font-black text-white">#{rank}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function LeaderboardList({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mx-auto w-full max-w-3xl rounded-3xl border border-white/30 bg-white/12 p-4 backdrop-blur-xl md:p-6"
    >
      <h2 className="mb-4 text-xl font-black tracking-wide text-white md:text-2xl">排行榜</h2>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.article
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 + index * 0.08, duration: 0.35 }}
            className="group flex items-center justify-between rounded-2xl border border-white/25 bg-slate-950/20 px-4 py-3 backdrop-blur-md transition-colors hover:bg-slate-950/35"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/20 font-bold text-white">#{entry.rank}</div>
              <div>
                <p className="font-bold text-white">{entry.name}</p>
                <p className="text-xs text-white/70">連勝 {entry.streak} 天</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-black text-emerald-300">{entry.score.toLocaleString()}</p>
              <p className="text-xs text-white/70">points</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}

export default function LeaderboardPage() {
  const sortedEntries = [...mockLeaderboard].sort((a, b) => a.rank - b.rank)

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-10 md:px-8"
      style={{
        backgroundImage: "url('/all_simple.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/90">LearnAI Arena</p>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">Leaderboard</h1>
          <p className="mt-3 text-sm text-white/80 md:text-base">每週積分更新，挑戰你的歷史創意極限。</p>
        </motion.header>

        <Podium entries={sortedEntries} />

        <LeaderboardList entries={sortedEntries} />
      </div>
    </main>
  )
}
