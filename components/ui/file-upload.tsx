"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  type: "avatar" | "vehicle" | "document" | "parcel"
  accept?: string
  multiple?: boolean
  maxSize?: number
  onUpload?: (urls: string[]) => void
  className?: string
}

export function FileUpload({
  type,
  accept = "image/*",
  multiple = false,
  maxSize = 5,
  onUpload,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024
    const invalidFiles = selectedFiles.filter((file) => file.size > maxSizeBytes)

    if (invalidFiles.length > 0) {
      setError(`Les fichiers doivent faire moins de ${maxSize}MB`)
      return
    }

    setFiles(selectedFiles)
    setError(null)

    // Generate previews
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file))
    setPreviews(newPreviews)
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setError(null)

    try {
      const uploadedUrls: string[] = []

      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", type)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Upload failed")
        }

        uploadedUrls.push(data.url)
      }

      onUpload?.(uploadedUrls)
      setFiles([])
      setPreviews([])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setFiles(newFiles)
    setPreviews(newPreviews)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {previews.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors"
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-center">
            <span className="font-medium text-foreground">Cliquez pour télécharger</span>
            <p className="text-muted-foreground">ou glissez-déposez vos fichiers</p>
          </div>
          <p className="text-xs text-muted-foreground">Max {maxSize}MB</p>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative flex items-center gap-3 p-3 border rounded-lg">
                {files[index].type.startsWith("image/") ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={files[index].name}
                    className="h-16 w-16 object-cover rounded"
                  />
                ) : (
                  <FileIcon className="h-16 w-16 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{files[index].name}</p>
                  <p className="text-xs text-muted-foreground">{(files[index].size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="shrink-0 p-1 hover:bg-destructive/10 rounded"
                  disabled={uploading}
                >
                  <X className="h-4 w-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2">
            <Button type="button" onClick={handleUpload} disabled={uploading} className="flex-1">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Télécharger
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={uploading || !multiple}
            >
              Ajouter plus
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
