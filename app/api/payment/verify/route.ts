import { createClient } from "@/lib/supabase/server"
import { verifyWavePayment } from "@/lib/payment/wave"
import { verifyOrangeMoneyPayment } from "@/lib/payment/orange-money"
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

    const { transactionId, paymentMethod, bookingId, parcelId } = await request.json()

    if (!transactionId || !paymentMethod) {
      return NextResponse.json({ error: "Missing transaction information" }, { status: 400 })
    }

    let verificationResult

    if (paymentMethod === "wave") {
      verificationResult = await verifyWavePayment(transactionId)
    } else if (paymentMethod === "orange_money") {
      verificationResult = await verifyOrangeMoneyPayment(transactionId)
    } else {
      return NextResponse.json({ error: "Unsupported payment method" }, { status: 400 })
    }

    if (!verificationResult.success) {
      return NextResponse.json({ error: verificationResult.error }, { status: 400 })
    }

    // Update payment status
    const paymentStatus = verificationResult.status === "completed" ? "paid" : "pending"

    if (bookingId) {
      await supabase
        .from("bookings")
        .update({
          payment_status: paymentStatus,
          paid_at: paymentStatus === "paid" ? new Date().toISOString() : null,
        })
        .eq("id", bookingId)

      // Create notification for successful payment
      if (paymentStatus === "paid") {
        await supabase.from("notifications").insert({
          user_id: user.id,
          title: "Paiement réussi",
          message: "Votre réservation a été confirmée avec succès",
          type: "payment",
          entity_type: "booking",
          entity_id: bookingId,
        })
      }
    } else if (parcelId) {
      await supabase
        .from("parcels")
        .update({
          payment_status: paymentStatus,
        })
        .eq("id", parcelId)

      if (paymentStatus === "paid") {
        await supabase.from("notifications").insert({
          user_id: user.id,
          title: "Paiement réussi",
          message: "Votre demande de colis a été confirmée",
          type: "payment",
          entity_type: "parcel",
          entity_id: parcelId,
        })
      }
    }

    return NextResponse.json({
      success: true,
      status: verificationResult.status,
      paymentStatus,
    })
  } catch (error) {
    console.error("[v0] Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
