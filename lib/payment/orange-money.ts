// Orange Money API integration for Senegal
// Documentation: https://developer.orange.com

export interface OrangeMoneyPaymentRequest {
  amount: number
  currency: string
  phoneNumber: string
  description: string
  reference: string
}

export interface OrangeMoneyPaymentResponse {
  success: boolean
  transactionId?: string
  status?: string
  error?: string
}

export async function initiateOrangeMoneyPayment(data: OrangeMoneyPaymentRequest): Promise<OrangeMoneyPaymentResponse> {
  try {
    // In production, use actual Orange Money API
    // For now, this is a mock implementation
    const ORANGE_API_URL = process.env.ORANGE_MONEY_API_URL || "https://api.orange.com/orange-money-webpay/sn/v1"
    const ORANGE_API_KEY = process.env.ORANGE_MONEY_API_KEY

    if (!ORANGE_API_KEY) {
      console.warn("[v0] Orange Money API key not configured, using mock payment")
      return {
        success: true,
        transactionId: `OM_${Date.now()}`,
        status: "pending",
      }
    }

    const response = await fetch(`${ORANGE_API_URL}/webpayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ORANGE_API_KEY}`,
      },
      body: JSON.stringify({
        merchant_key: process.env.ORANGE_MERCHANT_KEY,
        currency: data.currency,
        order_id: data.reference,
        amount: data.amount,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        notif_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook/orange`,
        lang: "fr",
        reference: data.reference,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Payment failed",
      }
    }

    return {
      success: true,
      transactionId: result.payment_token,
      status: result.status,
    }
  } catch (error) {
    console.error("[v0] Orange Money payment error:", error)
    return {
      success: false,
      error: "Payment processing failed",
    }
  }
}

export async function verifyOrangeMoneyPayment(transactionId: string): Promise<OrangeMoneyPaymentResponse> {
  try {
    const ORANGE_API_URL = process.env.ORANGE_MONEY_API_URL || "https://api.orange.com/orange-money-webpay/sn/v1"
    const ORANGE_API_KEY = process.env.ORANGE_MONEY_API_KEY

    if (!ORANGE_API_KEY) {
      console.warn("[v0] Orange Money API key not configured, using mock verification")
      return {
        success: true,
        transactionId,
        status: "completed",
      }
    }

    const response = await fetch(`${ORANGE_API_URL}/webpayment/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${ORANGE_API_KEY}`,
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Verification failed",
      }
    }

    return {
      success: true,
      transactionId: result.payment_token,
      status: result.status,
    }
  } catch (error) {
    console.error("[v0] Orange Money verification error:", error)
    return {
      success: false,
      error: "Verification failed",
    }
  }
}
