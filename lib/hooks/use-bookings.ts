"use client"

import { useState, useEffect } from "react"
import type { Booking } from "@/lib/types/database"

export function useBookings(passengerId?: string) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [passengerId])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const params = passengerId ? `?passenger_id=${passengerId}` : ""
      const response = await fetch(`/api/bookings${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setBookings(data.bookings || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch bookings")
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (bookingData: Partial<Booking>) => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
    const data = await response.json()
    if (data.booking) {
      setBookings([data.booking, ...bookings])
    }
    return data
  }

  const cancelBooking = async (id: string) => {
    const response = await fetch(`/api/bookings/${id}`, { method: "DELETE" })
    const data = await response.json()
    if (data.success) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)))
    }
    return data
  }

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    cancelBooking,
  }
}
