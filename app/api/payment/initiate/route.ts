import { createClient } from "@/lib/supabase/server"
import { initiateWavePayment } from "@/lib/payment/wave"
import { initiateOrangeMoneyPayment } from "@/lib/payment/orange-money"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const { bookingId, parcelId, paymentMethod, phoneNumber, amount } = await request.json()

    if (!paymentMethod || !phoneNumber || !amount) {
      return NextResponse.json({ error: "Missing required payment information" }, { status: 400 })
    }

    const reference = `AD_${Date.now()}_${bookingId || parcelId}`

    let paymentResult

    if (paymentMethod === "wave") {
      paymentResult = await initiateWavePayment({
        amount,
        currency: "XOF",
        phoneNumber,
        description: bookingId ? `Booking payment - ${bookingId}` : `Parcel payment - ${parcelId}`,
        reference,
      })
    } else if (paymentMethod === "orange_money") {
      paymentResult = await initiateOrangeMoneyPayment({
        amount,
        currency: "XOF",
        phoneNumber,
        description: bookingId ? `Booking payment - ${bookingId}` : `Parcel payment - ${parcelId}`,
        reference,
      })
    } else {
      return NextResponse.json({ error: "Unsupported payment method" }, { status: 400 })
    }

    if (!paymentResult.success) {
      return NextResponse.json({ error: paymentResult.error }, { status: 400 })
    }

    // Update booking or parcel with payment reference
    if (bookingId) {
      await supabase
        .from("bookings")
        .update({
          payment_reference: paymentResult.transactionId,
          payment_status: "pending",
        })
        .eq("id", bookingId)
    } else if (parcelId) {
      await supabase
        .from("parcels")
        .update({
          payment_reference: paymentResult.transactionId,
          payment_status: "pending",
        })
        .eq("id", parcelId)
    }

    return NextResponse.json({
      success: true,
      transactionId: paymentResult.transactionId,
      status: paymentResult.status,
    })
  } catch (error) {
    console.error("[v0] Error initiating payment:", error)
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 })
  }
}
