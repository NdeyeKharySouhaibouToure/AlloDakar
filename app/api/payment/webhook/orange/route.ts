import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const supabase = await createClient()

    // Verify webhook signature in production
    // const signature = request.headers.get('x-orange-signature')

    const { payment_token, status, order_id } = payload

    // Find booking or parcel by payment reference
    const { data: bookings } = await supabase.from("bookings").select("*").eq("payment_reference", payment_token)

    const { data: parcels } = await supabase.from("parcels").select("*").eq("payment_reference", payment_token)

    if (bookings && bookings.length > 0) {
      await supabase
        .from("bookings")
        .update({
          payment_status: status === "SUCCESS" ? "paid" : "failed",
          paid_at: status === "SUCCESS" ? new Date().toISOString() : null,
        })
        .eq("payment_reference", payment_token)
    }

    if (parcels && parcels.length > 0) {
      await supabase
        .from("parcels")
        .update({
          payment_status: status === "SUCCESS" ? "paid" : "failed",
        })
        .eq("payment_reference", payment_token)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Orange Money webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
