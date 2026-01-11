import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const passengerId = searchParams.get("passenger_id")

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    let query = supabase
      .from("bookings")
      .select("*, trip:trips(*, driver:users!driver_id(*)), passenger:users!passenger_id(*)")

    if (passengerId) {
      query = query.eq("passenger_id", passengerId)
    } else {
      query = query.eq("passenger_id", user.id)
    }

    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ bookings: data })
  } catch (error) {
    console.error("[v0] Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
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

    const bookingData = await request.json()

    // Check if trip has available seats
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("available_seats")
      .eq("id", bookingData.trip_id)
      .single()

    if (tripError || !trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }

    if (trip.available_seats < bookingData.seats_booked) {
      return NextResponse.json({ error: "Not enough available seats" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        ...bookingData,
        passenger_id: user.id,
      })
      .select("*, trip:trips(*, driver:users!driver_id(*)), passenger:users!passenger_id(*)")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, booking: data })
  } catch (error) {
    console.error("[v0] Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
