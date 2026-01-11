import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const departureCity = searchParams.get("departure_city")
    const arrivalCity = searchParams.get("arrival_city")
    const date = searchParams.get("date")
    const driverId = searchParams.get("driver_id")

    const supabase = await createClient()
    let query = supabase.from("trips").select("*, driver:users!driver_id(*)")

    if (departureCity) {
      query = query.eq("departure_city", departureCity)
    }
    if (arrivalCity) {
      query = query.eq("arrival_city", arrivalCity)
    }
    if (date) {
      query = query.eq("departure_date", date)
    }
    if (driverId) {
      query = query.eq("driver_id", driverId)
    }

    query = query.in("status", ["scheduled", "in_progress"]).order("departure_date", { ascending: true })

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ trips: data })
  } catch (error) {
    console.error("[v0] Error fetching trips:", error)
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 })
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

    const tripData = await request.json()

    const { data, error } = await supabase
      .from("trips")
      .insert({
        ...tripData,
        driver_id: user.id,
        available_seats: tripData.total_seats,
      })
      .select("*, driver:users!driver_id(*)")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, trip: data })
  } catch (error) {
    console.error("[v0] Error creating trip:", error)
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 })
  }
}
