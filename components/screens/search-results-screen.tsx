"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Clock, Users, SlidersHorizontal, MapPin } from "lucide-react"
import { useTrips } from "@/lib/hooks/use-trips"

export function SearchResultsScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState("price")

  const departureCity = searchParams.get("departure_city") || ""
  const arrivalCity = searchParams.get("arrival_city") || ""
  const date = searchParams.get("date") || ""

  const { trips: results, loading } = useTrips({
    departure_city: departureCity,
    arrival_city: arrivalCity,
    date: date,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-primary-foreground hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">Résultats de recherche</h1>
            <p className="text-sm text-primary-foreground/80">
              {loading ? "Chargement..." : `${results.length} trajets disponibles`}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <Button
            size="sm"
            variant={sortBy === "price" ? "default" : "outline"}
            onClick={() => setSortBy("price")}
            className="whitespace-nowrap"
          >
            Prix
          </Button>
          <Button
            size="sm"
            variant={sortBy === "time" ? "default" : "outline"}
            onClick={() => setSortBy("time")}
            className="whitespace-nowrap"
          >
            Heure
          </Button>
          <Button
            size="sm"
            variant={sortBy === "rating" ? "default" : "outline"}
            onClick={() => setSortBy("rating")}
            className="whitespace-nowrap"
          >
            Note
          </Button>
          <Button size="sm" variant="outline" className="whitespace-nowrap bg-transparent">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Results List */}
      <div className="px-4 py-4 space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 rounded-lg bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          results.map((trip) => (
            <Link key={trip.id} href={`/trip/${trip.id}`}>
              <Card className="hover:shadow-lg transition-all active:scale-98">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <MapPin className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-base mb-1">
                            {trip.departure_city} → {trip.arrival_city}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {trip.departure_time}
                            </span>
                            <span>•</span>
                            <span>{trip.estimated_duration ? `${trip.estimated_duration}min` : "N/A"}</span>
                          </div>
                          {trip.driver && (
                            <>
                              <p className="text-sm text-muted-foreground">{trip.driver.full_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {trip.driver.vehicle_make} {trip.driver.vehicle_model}
                              </p>
                            </>
                          )}
                        </div>
                        {trip.driver && (
                          <Badge variant="secondary" className="flex items-center gap-1 whitespace-nowrap">
                            <Star className="h-3 w-3 fill-current" />
                            {trip.driver.driver_rating}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{trip.available_seats} places</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {trip.price_per_seat.toLocaleString()} {trip.currency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* Empty State */}
      {!loading && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="h-20 w-20 rounded-full bg-muted mb-4 flex items-center justify-center">
            <MapPin className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-lg mb-2">Aucun trajet trouvé</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Essayez de modifier vos critères de recherche ou vérifiez une autre date
          </p>
          <Button onClick={() => router.back()}>Modifier la recherche</Button>
        </div>
      )}
    </div>
  )
}
