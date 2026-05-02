"use client"

import { cn } from "@/lib/utils"
import { Upload, FileText, CheckCircle2 } from "lucide-react"
import { useState, useCallback } from "react"

interface UploadZoneProps {
  className?: string
  onFileUpload?: (file: File) => void
}

export function UploadZone({ className, onFileUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const processFile = (file: File) => {
    setUploadedFile(file.name)
    setIsProcessing(true)
    setProgress(0)
    onFileUpload?.(file)

    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200",
          "flex flex-col items-center justify-center text-center",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50 hover:bg-muted/50",
          uploadedFile && !isProcessing && "border-green-400 bg-green-50"
        )}
      >
        <input
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="上傳教材檔案"
        />

        {!uploadedFile ? (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              請上傳課綱 PDF/PPT
            </p>
            <p className="text-sm text-muted-foreground">
              拖放檔案至此處，或點擊選擇檔案
            </p>
          </>
        ) : isProcessing ? (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              AI 知識庫處理中
            </p>
            <div className="w-full max-w-xs h-3 bg-muted rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              正在分析教材內容... {progress}%
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              {uploadedFile}
            </p>
            <p className="text-sm text-green-600">
              已成功匯入知識庫！
            </p>
          </>
        )}
      </div>
    </div>
  )
}
