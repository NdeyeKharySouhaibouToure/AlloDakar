import { MobileLayout } from "@/components/mobile-layout"
import { BookingScreen } from "@/components/screens/booking-screen"

export default function BookingPage({
  params,
  searchParams,
}: { params: { id: string }; searchParams: { seats?: string } }) {
  return (
    <MobileLayout>
      <BookingScreen tripId={params.id} seats={Number.parseInt(searchParams.seats || "1")} />
    </MobileLayout>
  )
}
