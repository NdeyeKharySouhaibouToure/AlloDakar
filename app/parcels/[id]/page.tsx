import { MobileLayout } from "@/components/mobile-layout"
import { ParcelTrackingScreen } from "@/components/screens/parcel-tracking-screen"

export default function ParcelTrackingPage({ params }: { params: { id: string } }) {
  return (
    <MobileLayout>
      <ParcelTrackingScreen parcelId={params.id} />
    </MobileLayout>
  )
}
