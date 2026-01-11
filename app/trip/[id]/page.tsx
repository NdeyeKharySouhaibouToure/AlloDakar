import { MobileLayout } from "@/components/mobile-layout"
import { TripDetailScreen } from "@/components/screens/trip-detail-screen"

export default function TripDetailPage({ params }: { params: { id: string } }) {
  return (
    <MobileLayout>
      <TripDetailScreen tripId={params.id} />
    </MobileLayout>
  )
}
