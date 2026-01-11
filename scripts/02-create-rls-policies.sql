-- Row Level Security Policies for Allô Dakar
-- Version 1.0

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trips policies
CREATE POLICY "Anyone can view active trips"
  ON public.trips FOR SELECT
  USING (status IN ('scheduled', 'in_progress'));

CREATE POLICY "Drivers can create trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = driver_id);

CREATE POLICY "Drivers can update own trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = driver_id);

CREATE POLICY "Drivers can delete own trips"
  ON public.trips FOR DELETE
  USING (auth.uid() = driver_id);

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = passenger_id OR auth.uid() IN (
    SELECT driver_id FROM public.trips WHERE id = trip_id
  ));

CREATE POLICY "Users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = passenger_id);

CREATE POLICY "Users can update own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = passenger_id);

CREATE POLICY "Drivers can update bookings for their trips"
  ON public.bookings FOR UPDATE
  USING (auth.uid() IN (
    SELECT driver_id FROM public.trips WHERE id = trip_id
  ));

-- Parcels policies
CREATE POLICY "Users can view own parcels as sender"
  ON public.parcels FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = transporter_id);

CREATE POLICY "Users can create parcels"
  ON public.parcels FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Senders can update own parcels"
  ON public.parcels FOR UPDATE
  USING (auth.uid() = sender_id);

CREATE POLICY "Transporters can update assigned parcels"
  ON public.parcels FOR UPDATE
  USING (auth.uid() = transporter_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- Messages policies
CREATE POLICY "Users can view own messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update received messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = receiver_id);
