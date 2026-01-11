"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/types/database"

interface AuthContextType {
  user: User | null
  loading: boolean
  sendOTP: (phone: string) => Promise<unknown>
  verifyOTP: (phone: string, otp: string) => Promise<unknown>
  register: (data: Partial<User>) => Promise<unknown>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<unknown>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if Supabase is configured
    const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!hasSupabase) {
      console.log("[v0] Supabase not configured yet. Auth features will be limited.")
      setLoading(false)
      return
    }

    // Load user session if Supabase is configured
    const loadUser = async () => {
      try {
        const response = await fetch("/api/users/profile")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("[v0] Failed to load user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
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
    const data = await response.json()
    if (response.ok && data.user) {
      setUser(data.user)
    }
    return data
  }

  const register = async (userData: Partial<User>) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    const data = await response.json()
    if (response.ok && data.user) {
      setUser(data.user)
    }
    return data
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
    if (response.ok && data.user) {
      setUser(data.user)
    }
    return data
  }

  const value = {
    user,
    loading,
    sendOTP,
    verifyOTP,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
