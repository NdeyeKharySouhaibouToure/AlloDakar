import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { phone, fullName, email, dateOfBirth, gender } = await request.json()

    if (!phone || !fullName) {
      return NextResponse.json({ error: "Phone and full name are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Create user profile
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: user.id,
        phone,
        full_name: fullName,
        email,
        date_of_birth: dateOfBirth,
        gender,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      user: data,
    })
  } catch (error) {
    console.error("[v0] Error registering user:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
