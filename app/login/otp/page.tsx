import { Suspense } from "react"
import { OTPScreen } from "@/components/screens/auth/otp-screen"

export default function OTPPage() {
  return (
    <Suspense>
      <OTPScreen />
    </Suspense>
  )
}
