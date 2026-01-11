import { MobileLayout } from "@/components/mobile-layout"
import { BookingConfirmationScreen } from "@/components/screens/booking-confirmation-screen"

export default function BookingConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <MobileLayout>
      <BookingConfirmationScreen tripId={params.id} />
    </MobileLayout>
  )
}
