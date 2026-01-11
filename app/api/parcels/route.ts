import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const senderId = searchParams.get("sender_id")
    const transporterId = searchParams.get("transporter_id")
    const status = searchParams.get("status")

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    let query = supabase.from("parcels").select("*, sender:users!sender_id(*), transporter:users!transporter_id(*)")

    if (senderId) {
      query = query.eq("sender_id", senderId)
    }
    if (transporterId) {
      query = query.eq("transporter_id", transporterId)
    }
    if (status) {
      query = query.eq("status", status)
    }

    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ parcels: data })
  } catch (error) {
    console.error("[v0] Error fetching parcels:", error)
    return NextResponse.json({ error: "Failed to fetch parcels" }, { status: 500 })
  }
}

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

    const parcelData = await request.json()

    const { data, error } = await supabase
      .from("parcels")
      .insert({
        ...parcelData,
        sender_id: user.id,
      })
      .select("*, sender:users!sender_id(*)")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, parcel: data })
  } catch (error) {
    console.error("[v0] Error creating parcel:", error)
    return NextResponse.json({ error: "Failed to create parcel" }, { status: 500 })
  }
}
