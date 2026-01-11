import { createClient } from "@/lib/supabase/client"

export type UploadType = "avatar" | "vehicle" | "document" | "parcel"

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadFile(file: File, type: UploadType, userId: string): Promise<UploadResult> {
  try {
    const supabase = createClient()

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return {
        success: false,
        error: "File size must be less than 5MB",
      }
    }

    // Validate file type
    const allowedTypes = {
      avatar: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      vehicle: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      document: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
      parcel: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    }

    if (!allowedTypes[type].includes(file.type)) {
      return {
        success: false,
        error: "Invalid file type",
      }
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}/${type}/${Date.now()}.${fileExt}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from("allodakar").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("[v0] Upload error:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("allodakar").getPublicUrl(data.path)

    return {
      success: true,
      url: publicUrl,
    }
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return {
      success: false,
      error: "Upload failed",
    }
  }
}

export async function uploadMultipleFiles(
  files: File[],
  type: UploadType,
  userId: string,
): Promise<{ success: boolean; urls: string[]; errors: string[] }> {
  const results = await Promise.all(files.map((file) => uploadFile(file, type, userId)))

  const urls = results.filter((r) => r.success).map((r) => r.url!)
  const errors = results.filter((r) => !r.success).map((r) => r.error!)

  return {
    success: urls.length > 0,
    urls,
    errors,
  }
}

export async function deleteFile(url: string): Promise<boolean> {
  try {
    const supabase = createClient()

    // Extract path from URL
    const path = url.split("/").slice(-3).join("/")

    const { error } = await supabase.storage.from("allodakar").remove([path])

    if (error) {
      console.error("[v0] Delete error:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("[v0] Delete error:", error)
    return false
  }
}
