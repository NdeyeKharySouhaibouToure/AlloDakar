import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const supabase = await createClient()

    // Verify webhook signature in production
    // const signature = request.headers.get('x-wave-signature')

    const { transaction_id, status, reference } = payload

    // Find booking or parcel by payment reference
    const { data: bookings } = await supabase.from("bookings").select("*").eq("payment_reference", transaction_id)

    const { data: parcels } = await supabase.from("parcels").select("*").eq("payment_reference", transaction_id)

    if (bookings && bookings.length > 0) {
      await supabase
        .from("bookings")
        .update({
          payment_status: status === "completed" ? "paid" : "failed",
          paid_at: status === "completed" ? new Date().toISOString() : null,
        })
        .eq("payment_reference", transaction_id)
    }

    if (parcels && parcels.length > 0) {
      await supabase
        .from("parcels")
        .update({
          payment_status: status === "completed" ? "paid" : "failed",
        })
        .eq("payment_reference", transaction_id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Wave webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
