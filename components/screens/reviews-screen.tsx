"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star } from "lucide-react"

export function ReviewsScreen() {
  const router = useRouter()

  const reviews = [
    {
      id: 1,
      trip: "Dakar → Touba",
      date: "15 Jan 2026",
      rating: 5,
      comment: "Excellent conducteur, très ponctuel et professionnel. Voyage très confortable.",
      driver: "Moussa Ndiaye",
    },
    {
      id: 2,
      trip: "Dakar → Saint-Louis",
      date: "10 Jan 2026",
      rating: 4,
      comment: "Bon trajet, véhicule propre et climatisé.",
      driver: "Fatou Sall",
    },
    {
      id: 3,
      trip: "Thiès → Kaolack",
      date: "5 Jan 2026",
      rating: 5,
      comment: "Parfait! Je recommande vivement ce conducteur.",
      driver: "Ibrahima Diop",
    },
  ]

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-primary-foreground hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="font-bold text-lg">Mes avis</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Average Rating */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-8 w-8 fill-accent text-accent" />
              <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-muted-foreground">Moyenne sur {reviews.length} avis</p>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-accent text-accent" : "text-muted"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-3">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{review.trip}</h3>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        {review.rating}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{review.driver}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
