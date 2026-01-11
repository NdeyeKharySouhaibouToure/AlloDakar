import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const { data, error } = await supabase
      .from("parcels")
      .select("*, sender:users!sender_id(*), transporter:users!transporter_id(*), trip:trips(*)")
      .eq("id", id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ parcel: data })
  } catch (error) {
    console.error("[v0] Error fetching parcel:", error)
    return NextResponse.json({ error: "Failed to fetch parcel" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const updates = await request.json()

    const { data, error } = await supabase
      .from("parcels")
      .update(updates)
      .eq("id", id)
      .select("*, sender:users!sender_id(*), transporter:users!transporter_id(*)")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, parcel: data })
  } catch (error) {
    console.error("[v0] Error updating parcel:", error)
    return NextResponse.json({ error: "Failed to update parcel" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    // Cancel parcel instead of deleting
    const { data, error } = await supabase
      .from("parcels")
      .update({ status: "cancelled" })
      .eq("id", id)
      .eq("sender_id", user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, parcel: data })
  } catch (error) {
    console.error("[v0] Error cancelling parcel:", error)
    return NextResponse.json({ error: "Failed to cancel parcel" }, { status: 500 })
  }
}
