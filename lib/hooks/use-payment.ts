"use client"

import { useState } from "react"

interface PaymentData {
  bookingId?: string
  parcelId?: string
  paymentMethod: "wave" | "orange_money" | "cash" | "card"
  phoneNumber: string
  amount: number
}

export function usePayment() {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initiatePayment = async (data: PaymentData) => {
    try {
      setProcessing(true)
      setError(null)

      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error)
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setProcessing(false)
    }
  }

  const verifyPayment = async (transactionId: string, paymentMethod: string, bookingId?: string, parcelId?: string) => {
    try {
      setProcessing(true)
      setError(null)

      const response = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId,
          paymentMethod,
          bookingId,
          parcelId,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error)
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setProcessing(false)
    }
  }

  return {
    processing,
    error,
    initiatePayment,
    verifyPayment,
  }
}
