export type User = {
  id: string
  phone: string
  full_name: string
  email?: string
  avatar_url?: string
  date_of_birth?: string
  gender?: string
  is_driver: boolean
  driver_license_number?: string
  driver_license_url?: string
  cni_number?: string
  cni_url?: string
  driver_verified: boolean
  driver_rating: number
  total_trips: number
  vehicle_make?: string
  vehicle_model?: string
  vehicle_year?: number
  vehicle_color?: string
  vehicle_plate?: string
  vehicle_photos?: string[]
  vehicle_type?: string
  vehicle_seats?: number
  preferred_language: string
  notifications_enabled: boolean
  email_notifications: boolean
  created_at: string
  updated_at: string
}

export type Trip = {
  id: string
  driver_id: string
  departure_city: string
  arrival_city: string
  departure_address?: string
  arrival_address?: string
  departure_date: string
  departure_time: string
  estimated_duration?: number
  price_per_seat: number
  currency: string
  total_seats: number
  available_seats: number
  stops?: string[]
  amenities?: string[]
  baggage_policy?: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  instant_booking: boolean
  women_only: boolean
  pets_allowed: boolean
  smoking_allowed: boolean
  created_at: string
  updated_at: string
  driver?: User
}

export type Booking = {
  id: string
  trip_id: string
  passenger_id: string
  seats_booked: number
  total_price: number
  passenger_phone: string
  passenger_name: string
  payment_method: string
  payment_status: "pending" | "paid" | "failed" | "refunded"
  payment_reference?: string
  paid_at?: string
  status: "confirmed" | "cancelled" | "completed" | "no_show"
  cancellation_reason?: string
  cancelled_at?: string
  special_requests?: string
  created_at: string
  updated_at: string
  trip?: Trip
  passenger?: User
}

export type Parcel = {
  id: string
  sender_id: string
  transporter_id?: string
  trip_id?: string
  pickup_city: string
  delivery_city: string
  pickup_address: string
  delivery_address: string
  sender_name: string
  sender_phone: string
  recipient_name: string
  recipient_phone: string
  description: string
  weight?: number
  size?: string
  photo_url?: string
  fragile: boolean
  price?: number
  currency: string
  pickup_date: string
  delivery_date?: string
  status: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled"
  tracking_code: string
  payment_method?: string
  payment_status: "pending" | "paid" | "failed"
  payment_reference?: string
  created_at: string
  updated_at: string
  sender?: User
  transporter?: User
}

export type Review = {
  id: string
  reviewer_id: string
  reviewed_id: string
  booking_id?: string
  parcel_id?: string
  rating: number
  comment?: string
  review_type: "driver" | "passenger" | "parcel"
  created_at: string
  updated_at: string
  reviewer?: User
  reviewed?: User
}

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: "booking" | "trip" | "parcel" | "payment" | "system"
  entity_type?: string
  entity_id?: string
  read: boolean
  read_at?: string
  created_at: string
}
