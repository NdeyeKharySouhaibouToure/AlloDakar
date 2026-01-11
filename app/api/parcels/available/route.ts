import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pickupCity = searchParams.get("pickup_city")
    const deliveryCity = searchParams.get("delivery_city")

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Verify user is a driver
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("is_driver")
      .eq("id", user.id)
      .single()

    if (userError || !userData?.is_driver) {
      return NextResponse.json({ error: "Only drivers can view available parcels" }, { status: 403 })
    }

    let query = supabase.from("parcels").select("*, sender:users!sender_id(*)").eq("status", "pending")

    if (pickupCity) {
      query = query.eq("pickup_city", pickupCity)
    }
    if (deliveryCity) {
      query = query.eq("delivery_city", deliveryCity)
    }

    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ parcels: data })
  } catch (error) {
    console.error("[v0] Error fetching available parcels:", error)
    return NextResponse.json({ error: "Failed to fetch available parcels" }, { status: 500 })
  }
}
