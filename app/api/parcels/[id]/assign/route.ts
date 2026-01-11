import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const { trip_id } = await request.json()

    // Verify user is a driver
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("is_driver")
      .eq("id", user.id)
      .single()

    if (userError || !userData?.is_driver) {
      return NextResponse.json({ error: "Only drivers can accept parcels" }, { status: 403 })
    }

    const { data, error } = await supabase
      .from("parcels")
      .update({
        transporter_id: user.id,
        trip_id: trip_id || null,
        status: "assigned",
      })
      .eq("id", id)
      .select("*, sender:users!sender_id(*), transporter:users!transporter_id(*)")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, parcel: data })
  } catch (error) {
    console.error("[v0] Error assigning parcel:", error)
    return NextResponse.json({ error: "Failed to assign parcel" }, { status: 500 })
  }
}
