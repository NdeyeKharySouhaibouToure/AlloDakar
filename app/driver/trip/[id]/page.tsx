import { MobileLayout } from "@/components/mobile-layout"
import { DriverTripDetailScreen } from "@/components/screens/driver-trip-detail-screen"

export default function DriverTripDetailPage({ params }: { params: { id: string } }) {
  return (
    <MobileLayout>
      <DriverTripDetailScreen tripId={params.id} />
    </MobileLayout>
  )
}
