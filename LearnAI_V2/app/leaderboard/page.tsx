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
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 bg-white/25 text-3xl shadow-[0_0_20px_rgba(255,255,255,0.45)] backdrop-blur-sm md:h-20 md:w-20 md:text-4xl">
                  {isChampion ? (
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="drop-shadow-[0_0_10px_rgba(251,191,36,0.85)]"
                    >
                      💖
                    </motion.span>
                  ) : (
                    <span className="font-mono leading-none">🏆</span>
                  )}
                </div>
              </motion.div>

              <div className="mb-2 text-center">
                <p className="text-sm font-bold text-white md:text-base" style={{ textShadow: "0 1px 2px rgba(15,23,42,0.8)" }}>
                  {entry?.name ?? `TOP ${rank}`}
                </p>
                <p className="text-xs text-white/90" style={{ textShadow: "0 1px 2px rgba(15,23,42,0.8)" }}>
                  {entry ? `${entry.score.toLocaleString()} pts` : "-"}
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + index * 0.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className={[
                  "relative overflow-hidden rounded-[2.2rem] border border-emerald-100/50",
                  "bg-gradient-to-b from-lime-200/35 via-amber-200/30 to-amber-700/45",
                  "shadow-[inset_0_2px_0_rgba(255,255,255,0.55),0_16px_28px_rgba(2,6,23,0.35)]",
                  "backdrop-blur-sm",
                  blockHeight,
                ].join(" ")}
              >
                <div className="absolute inset-x-4 top-2 h-4 rounded-full bg-emerald-300/50 blur-[1px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(120,53,15,0.24),transparent_30%)]" />

                <div className="absolute inset-x-0 bottom-9 flex justify-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/95 bg-white/35 text-2xl shadow-[0_4px_14px_rgba(15,23,42,0.4)] backdrop-blur-sm md:h-14 md:w-14 md:text-3xl">
                    {entry?.avatar ?? "🏅"}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-2 text-center font-black text-white" style={{ textShadow: "0 1px 2px rgba(15,23,42,0.8)" }}>
                  #{rank}
                </div>
              </motion.div>
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
      className="mx-auto w-full max-w-3xl rounded-3xl bg-white/80 p-4 backdrop-blur-sm md:p-6"
    >
      <h2 className="mb-4 text-xl font-black tracking-wide text-white md:text-2xl" style={{ textShadow: "0 1px 2px rgba(15,23,42,0.85)" }}>
        排行榜
      </h2>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.article
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 + index * 0.08, duration: 0.35 }}
            className="group flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/90"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-extrabold text-slate-800">{entry.rank}</div>
                <div className="text-lg">🏅</div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-white/95 bg-white/30 text-xl shadow-[0_3px_10px_rgba(15,23,42,0.35)] backdrop-blur-sm">
                {entry.avatar}
              </div>
              <div>
                <p className="font-bold text-slate-800" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}>
                  {entry.name}
                </p>
                <p className="text-xs text-slate-600" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.6)" }}>
                  連勝 {entry.streak} 天
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="flex items-center justify-end gap-1 text-lg font-black text-slate-800">
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: index * 0.06 }}
                >
                  🪙
                </motion.span>
                {entry.score.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600">points</p>
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
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>Leaderboard</h1>
          <p className="mt-3 text-sm text-white md:text-base" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>每週積分更新，挑戰你的歷史創意極限。</p>
        </motion.header>

        <Podium entries={sortedEntries} />

        <LeaderboardList entries={sortedEntries} />
      </div>
    </main>
  )
}
