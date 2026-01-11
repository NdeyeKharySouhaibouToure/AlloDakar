-- Allô Dakar Database Schema
-- Version 1.0

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  avatar_url TEXT,
  date_of_birth DATE,
  gender VARCHAR(20),
  
  -- Driver specific fields
  is_driver BOOLEAN DEFAULT FALSE,
  driver_license_number VARCHAR(100),
  driver_license_url TEXT,
  cni_number VARCHAR(100),
  cni_url TEXT,
  driver_verified BOOLEAN DEFAULT FALSE,
  driver_rating DECIMAL(3,2) DEFAULT 0,
  total_trips INTEGER DEFAULT 0,
  
  -- Vehicle info
  vehicle_make VARCHAR(100),
  vehicle_model VARCHAR(100),
  vehicle_year INTEGER,
  vehicle_color VARCHAR(50),
  vehicle_plate VARCHAR(50),
  vehicle_photos TEXT[], -- Array of photo URLs
  vehicle_type VARCHAR(50), -- sedan, suv, van, bus
  vehicle_seats INTEGER,
  
  -- Settings
  preferred_language VARCHAR(10) DEFAULT 'fr',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trips table
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Route info
  departure_city VARCHAR(100) NOT NULL,
  arrival_city VARCHAR(100) NOT NULL,
  departure_address TEXT,
  arrival_address TEXT,
  departure_location GEOGRAPHY(POINT),
  arrival_location GEOGRAPHY(POINT),
  
  -- Timing
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  estimated_duration INTEGER, -- in minutes
  
  -- Pricing
  price_per_seat DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'FCFA',
  
  -- Capacity
  total_seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  
  -- Trip details
  stops TEXT[], -- Array of intermediate stops
  amenities TEXT[], -- wifi, ac, music, etc.
  baggage_policy VARCHAR(50), -- small, medium, large
  
  -- Status
  status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  
  -- Settings
  instant_booking BOOLEAN DEFAULT TRUE,
  women_only BOOLEAN DEFAULT FALSE,
  pets_allowed BOOLEAN DEFAULT FALSE,
  smoking_allowed BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  passenger_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Booking details
  seats_booked INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  
  -- Passenger info
  passenger_phone VARCHAR(20) NOT NULL,
  passenger_name VARCHAR(255) NOT NULL,
  
  -- Payment
  payment_method VARCHAR(50) NOT NULL, -- wave, orange_money, cash, card
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_reference VARCHAR(255),
  paid_at TIMESTAMP WITH TIME ZONE,
  
  -- Status
  status VARCHAR(50) DEFAULT 'confirmed', -- confirmed, cancelled, completed, no_show
  cancellation_reason TEXT,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  
  -- Notes
  special_requests TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parcels table
CREATE TABLE IF NOT EXISTS public.parcels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  transporter_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  
  -- Route
  pickup_city VARCHAR(100) NOT NULL,
  delivery_city VARCHAR(100) NOT NULL,
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  pickup_location GEOGRAPHY(POINT),
  delivery_location GEOGRAPHY(POINT),
  
  -- Contacts
  sender_name VARCHAR(255) NOT NULL,
  sender_phone VARCHAR(20) NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  
  -- Parcel details
  description TEXT NOT NULL,
  weight DECIMAL(10,2), -- in kg
  size VARCHAR(50), -- small, medium, large
  photo_url TEXT,
  fragile BOOLEAN DEFAULT FALSE,
  
  -- Pricing
  price DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'FCFA',
  
  -- Timing
  pickup_date DATE NOT NULL,
  delivery_date DATE,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, assigned, picked_up, in_transit, delivered, cancelled
  tracking_code VARCHAR(50) UNIQUE,
  
  -- Payment
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_reference VARCHAR(255),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reviewed_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  parcel_id UUID REFERENCES public.parcels(id) ON DELETE SET NULL,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  review_type VARCHAR(50) NOT NULL, -- driver, passenger, parcel
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(reviewer_id, booking_id),
  UNIQUE(reviewer_id, parcel_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- booking, trip, parcel, payment, system
  
  -- Related entity
  entity_type VARCHAR(50), -- booking, trip, parcel
  entity_id UUID,
  
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table (for chat between users)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Related to
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  parcel_id UUID REFERENCES public.parcels(id) ON DELETE SET NULL,
  
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trips_departure_city ON public.trips(departure_city);
CREATE INDEX IF NOT EXISTS idx_trips_arrival_city ON public.trips(arrival_city);
CREATE INDEX IF NOT EXISTS idx_trips_departure_date ON public.trips(departure_date);
CREATE INDEX IF NOT EXISTS idx_trips_driver_id ON public.trips(driver_id);
CREATE INDEX IF NOT EXISTS idx_trips_status ON public.trips(status);

CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON public.bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_passenger_id ON public.bookings(passenger_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

CREATE INDEX IF NOT EXISTS idx_parcels_sender_id ON public.parcels(sender_id);
CREATE INDEX IF NOT EXISTS idx_parcels_transporter_id ON public.parcels(transporter_id);
CREATE INDEX IF NOT EXISTS idx_parcels_status ON public.parcels(status);
CREATE INDEX IF NOT EXISTS idx_parcels_tracking_code ON public.parcels(tracking_code);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);

CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);
