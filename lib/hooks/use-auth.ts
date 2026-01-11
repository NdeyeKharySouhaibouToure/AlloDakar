"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/types/database"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log("[v0] Supabase not configured. Auth features will be limited.")
      setLoading(false)
      return
    }

    // Import Supabase client only if configured
    import("@/lib/supabase/client").then(({ createClient }) => {
      const supabase = createClient()

      // Get initial session
      const getUser = async () => {
        try {
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser()

          if (authUser) {
            const { data: userData } = await supabase.from("users").select("*").eq("id", authUser.id).single()

            setUser(userData)
          }
        } catch (error) {
          console.error("[v0] Failed to get user:", error)
        } finally {
          setLoading(false)
        }
      }

      getUser()

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const { data: userData } = await supabase.from("users").select("*").eq("id", session.user.id).single()

          setUser(userData)
        } else {
          setUser(null)
        }
        setLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    })
  }, [])

  const sendOTP = async (phone: string) => {
    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })
    return response.json()
  }

  const verifyOTP = async (phone: string, otp: string) => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    })
    return response.json()
  }

  const register = async (data: Partial<User>) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
  }

  const updateProfile = async (updates: Partial<User>) => {
    const response = await fetch("/api/users/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    const data = await response.json()
    if (data.user) {
      setUser(data.user)
    }
    return data
  }

  return {
    user,
    loading,
    sendOTP,
    verifyOTP,
    register,
    logout,
    updateProfile,
  }
}
