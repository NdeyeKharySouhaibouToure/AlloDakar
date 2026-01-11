"use client"

import { useState, useEffect } from "react"
import type { Parcel } from "@/lib/types/database"

interface ParcelParams {
  sender_id?: string
  transporter_id?: string
  status?: string
}

export function useParcels(params?: ParcelParams) {
  const [parcels, setParcels] = useState<Parcel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchParcels()
  }, [JSON.stringify(params)])

  const fetchParcels = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams(params as Record<string, string>)
      const response = await fetch(`/api/parcels?${queryParams}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setParcels(data.parcels || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch parcels")
    } finally {
      setLoading(false)
    }
  }

  const createParcel = async (parcelData: Partial<Parcel>) => {
    const response = await fetch("/api/parcels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parcelData),
    })
    const data = await response.json()
    if (data.parcel) {
      setParcels([data.parcel, ...parcels])
    }
    return data
  }

  const updateParcel = async (id: string, updates: Partial<Parcel>) => {
    const response = await fetch(`/api/parcels/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    const data = await response.json()
    if (data.parcel) {
      setParcels(parcels.map((p) => (p.id === id ? data.parcel : p)))
    }
    return data
  }

  const assignParcel = async (id: string, tripId?: string) => {
    const response = await fetch(`/api/parcels/${id}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trip_id: tripId }),
    })
    const data = await response.json()
    if (data.parcel) {
      setParcels(parcels.map((p) => (p.id === id ? data.parcel : p)))
    }
    return data
  }

  return {
    parcels,
    loading,
    error,
    fetchParcels,
    createParcel,
    updateParcel,
    assignParcel,
  }
}

export function useParcelTracking(trackingCode: string) {
  const [parcel, setParcel] = useState<Parcel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (trackingCode) {
      trackParcel()
    }
  }, [trackingCode])

  const trackParcel = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/parcels/tracking/${trackingCode}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setParcel(data.parcel)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parcel not found")
    } finally {
      setLoading(false)
    }
  }

  return { parcel, loading, error, refetch: trackParcel }
}
