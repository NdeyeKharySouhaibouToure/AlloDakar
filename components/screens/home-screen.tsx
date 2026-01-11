"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Star, Package, Clock, Users, TrendingUp } from "lucide-react"
import { useTrips } from "@/lib/hooks/use-trips"
import { useAuthContext } from "@/components/providers/auth-provider"

export function HomeScreen() {
  const router = useRouter()
  const { user } = useAuthContext()
  const { trips, loading } = useTrips()

  // Take only first 3 trips for popular routes
  const popularRoutes = trips.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground px-4 pt-6 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="bg-white/90 p-2 rounded-xl backdrop-blur-sm">
              <Image
                src="/images/chatgpt-20image-2011-20janv.png"
                alt="Allô Dakar"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <Users className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2 text-balance">
              {user ? `Bonjour ${user.full_name.split(" ")[0]}!` : "Bonjour!"}
            </h1>
            <p className="text-primary-foreground/90 text-sm">Où souhaitez-vous aller aujourd'hui?</p>
          </div>
        </div>
      </header>

      {/* Search Card */}
      <div className="px-4 -mt-20 relative z-20 mb-6">
        <Card className="shadow-xl border-0">
          <CardContent className="p-6 space-y-4">
            <Link href="/search" className="block w-full">
              <Button className="w-full h-12 text-base" size="lg">
                Rechercher un trajet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/parcels/send">
            <Card className="hover:shadow-md transition-shadow active:scale-95 transition-transform">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Envoyer</p>
                  <p className="text-xs text-muted-foreground">un colis</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/driver">
            <Card className="hover:shadow-md transition-shadow active:scale-95 transition-transform">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Devenir</p>
                  <p className="text-xs text-muted-foreground">conducteur</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Trajets populaires</h2>
          <Link href="/search/results" className="text-sm text-primary font-medium">
            Voir tout
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-lg bg-muted" />
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
          <div className="space-y-3">
            {popularRoutes.map((trip) => (
              <Link key={trip.id} href={`/trip/${trip.id}`}>
                <Card className="hover:shadow-lg transition-all active:scale-98 transition-transform">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <MapPin className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-base mb-1">
                              {trip.departure_city} → {trip.arrival_city}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {trip.departure_time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {trip.available_seats} places
                              </span>
                            </div>
                          </div>
                          {trip.driver && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current" />
                              {trip.driver.driver_rating}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-lg font-bold text-primary">
                            {trip.price_per_seat.toLocaleString()} {trip.currency}
                          </p>
                          <Button size="sm" className="h-8">
                            Réserver
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Trust Banner */}
      <div className="px-4 pb-6">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary fill-current" />
              </div>
            </div>
            <h3 className="font-bold mb-2">Voyagez en toute confiance</h3>
            <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
              Tous nos conducteurs sont vérifiés et notés par la communauté
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
