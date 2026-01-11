import { Suspense } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { SearchResultsScreen } from "@/components/screens/search-results-screen"

export default function SearchResultsPage() {
  return (
    <MobileLayout>
      <Suspense>
        <SearchResultsScreen />
      </Suspense>
    </MobileLayout>
  )
}
