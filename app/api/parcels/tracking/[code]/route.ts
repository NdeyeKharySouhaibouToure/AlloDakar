import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("parcels")
      .select("*, sender:users!sender_id(*), transporter:users!transporter_id(*), trip:trips(*)")
      .eq("tracking_code", code)
      .single()

    if (error) {
      return NextResponse.json({ error: "Parcel not found" }, { status: 404 })
    }

    return NextResponse.json({ parcel: data })
  } catch (error) {
    console.error("[v0] Error tracking parcel:", error)
    return NextResponse.json({ error: "Failed to track parcel" }, { status: 500 })
  }
}
