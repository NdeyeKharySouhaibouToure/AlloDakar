"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, Calendar, Users, Package, Star, DollarSign } from "lucide-react"

export function DriverDashboardScreen() {
  const stats = {
    totalEarnings: 487500,
    thisMonth: 125000,
    totalTrips: 156,
    rating: 4.9,
    activeBookings: 8,
  }

  const upcomingTrips = [
    {
      id: 1,
      from: "Dakar",
      to: "Touba",
      date: "Aujourd'hui",
      time: "08:00",
      bookings: 7,
      seats: 9,
      earnings: 105000,
    },
    {
      id: 2,
      from: "Dakar",
      to: "Saint-Louis",
      date: "Demain",
      time: "10:30",
      bookings: 4,
      seats: 9,
      earnings: 48000,
    },
  ]

  const parcelRequests = [
    {
      id: 1,
      from: "Dakar",
      to: "Touba",
      sender: "Abdou Bah",
      date: "Aujourd'hui",
      price: 3500,
      status: "pending",
    },
    {
      id: 2,
      from: "Thiès",
      to: "Dakar",
      sender: "Awa Diop",
      date: "Demain",
      price: 2500,
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-6">Espace Conducteur</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <p className="text-xs font-medium opacity-90">Ce mois</p>
                </div>
                <p className="text-2xl font-bold">{stats.thisMonth.toLocaleString()}</p>
                <p className="text-xs opacity-75">FCFA</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  <p className="text-xs font-medium opacity-90">Trajets</p>
                </div>
                <p className="text-2xl font-bold">{stats.totalTrips}</p>
                <p className="text-xs opacity-75">Total</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 fill-current" />
                  <p className="text-xs font-medium opacity-90">Note</p>
                </div>
                <p className="text-2xl font-bold">{stats.rating}</p>
                <p className="text-xs opacity-75">/ 5.0</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  <p className="text-xs font-medium opacity-90">Réservations</p>
                </div>
                <p className="text-2xl font-bold">{stats.activeBookings}</p>
                <p className="text-xs opacity-75">Actives</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Trip Button */}
      <div className="px-4 -mt-8 relative z-20 mb-6">
        <Link href="/driver/create-trip">
          <Button size="lg" className="w-full h-14 shadow-xl">
            <Plus className="mr-2 h-5 w-5" />
            Créer un nouveau trajet
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs defaultValue="trips" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="trips">Mes trajets</TabsTrigger>
            <TabsTrigger value="parcels">
              Colis
              {parcelRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 px-1.5">
                  {parcelRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="mt-4 space-y-3">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map((trip) => (
                <Link key={trip.id} href={`/driver/trip/${trip.id}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {trip.from} → {trip.to}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {trip.date} à {trip.time}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {trip.bookings}/{trip.seats} places
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{trip.bookings} réservations</span>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-primary">{trip.earnings.toLocaleString()} FCFA</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-semibold mb-1">Aucun trajet prévu</p>
                  <p className="text-sm text-muted-foreground mb-4">Créez votre premier trajet pour commencer</p>
                  <Link href="/driver/create-trip">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Créer un trajet
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="parcels" className="mt-4 space-y-3">
            {parcelRequests.length > 0 ? (
              parcelRequests.map((parcel) => (
                <Card key={parcel.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold mb-1">
                              {parcel.from} → {parcel.to}
                            </h3>
                            <p className="text-sm text-muted-foreground">{parcel.sender}</p>
                            <p className="text-xs text-muted-foreground">{parcel.date}</p>
                          </div>
                          <Badge className="bg-accent/10 text-accent">Nouveau</Badge>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <p className="font-bold text-accent">{parcel.price.toLocaleString()} FCFA</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Refuser
                            </Button>
                            <Button size="sm">Accepter</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-semibold mb-1">Aucune demande de colis</p>
                  <p className="text-sm text-muted-foreground">Les demandes apparaîtront ici selon vos trajets</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Earnings Card */}
      <div className="px-4 mt-6 pb-6">
        <Link href="/driver/earnings">
          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenus totaux</p>
                    <p className="text-2xl font-bold">{stats.totalEarnings.toLocaleString()} FCFA</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  →
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
