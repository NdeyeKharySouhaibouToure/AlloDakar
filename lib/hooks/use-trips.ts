"use client"

import { useState, useEffect } from "react"
import type { Trip } from "@/lib/types/database"

interface SearchParams {
  departure_city?: string
  arrival_city?: string
  date?: string
  driver_id?: string
}

export function useTrips(params?: SearchParams) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrips()
  }, [JSON.stringify(params)])

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams(params as Record<string, string>)
      const response = await fetch(`/api/trips?${queryParams}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setTrips(data.trips || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch trips")
    } finally {
      setLoading(false)
    }
  }

  const createTrip = async (tripData: Partial<Trip>) => {
    const response = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    })
    const data = await response.json()
    if (data.trip) {
      setTrips([data.trip, ...trips])
    }
    return data
  }

  const updateTrip = async (id: string, updates: Partial<Trip>) => {
    const response = await fetch(`/api/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    const data = await response.json()
    if (data.trip) {
      setTrips(trips.map((t) => (t.id === id ? data.trip : t)))
    }
    return data
  }

  const deleteTrip = async (id: string) => {
    const response = await fetch(`/api/trips/${id}`, { method: "DELETE" })
    const data = await response.json()
    if (data.success) {
      setTrips(trips.filter((t) => t.id !== id))
    }
    return data
  }

  return {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
  }
}

export function useTrip(id: string) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrip()
  }, [id])

  const fetchTrip = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trips/${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setTrip(data.trip)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch trip")
    } finally {
      setLoading(false)
    }
  }

  return { trip, loading, error, refetch: fetchTrip }
}
