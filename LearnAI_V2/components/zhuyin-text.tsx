"use client"

import { cn } from "@/lib/utils"

interface ZhuyinChar {
  char: string
  zhuyin: string
}

interface ZhuyinTextProps {
  text: ZhuyinChar[]
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl"
}

const rtSizeClasses = {
  sm: "text-[8px]",
  md: "text-[10px]",
  lg: "text-xs",
  xl: "text-sm"
}

export function ZhuyinText({ text, className, size = "md" }: ZhuyinTextProps) {
  return (
    <span className={cn("inline-flex flex-wrap", sizeClasses[size], className)}>
      {text.map((item, index) => (
        <ruby key={index} className="mx-0.5">
          {item.char}
          <rt className={cn(rtSizeClasses[size], "text-muted-foreground font-normal")}>
            {item.zhuyin}
          </rt>
        </ruby>
      ))}
    </span>
  )
}

// Helper function to create zhuyin text data
export function createZhuyinData(chars: string[], zhuyins: string[]): ZhuyinChar[] {
  return chars.map((char, i) => ({
    char,
    zhuyin: zhuyins[i] || ""
  }))
}
