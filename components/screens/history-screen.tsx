"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Calendar, Star, Package } from "lucide-react"

export function HistoryScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("trips")

  const tripHistory = [
    {
      id: 1,
      from: "Dakar",
      to: "Touba",
      date: "15 Jan 2026",
      status: "completed",
      price: 15000,
      driver: "Moussa Ndiaye",
      rating: 5,
    },
    {
      id: 2,
      from: "Dakar",
      to: "Saint-Louis",
      date: "10 Jan 2026",
      status: "completed",
      price: 12000,
      driver: "Fatou Sall",
      rating: 4,
    },
    {
      id: 3,
      from: "Thiès",
      to: "Kaolack",
      date: "5 Jan 2026",
      status: "cancelled",
      price: 8000,
      driver: "Ibrahima Diop",
      rating: null,
    },
  ]

  const parcelHistory = [
    {
      id: 1,
      from: "Dakar",
      to: "Touba",
      date: "12 Jan 2026",
      status: "delivered",
      price: 3500,
      tracking: "PKG-2026-001",
    },
    {
      id: 2,
      from: "Thiès",
      to: "Dakar",
      date: "8 Jan 2026",
      status: "delivered",
      price: 2500,
      tracking: "PKG-2026-002",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary/10 text-primary">Terminé</Badge>
      case "delivered":
        return <Badge className="bg-primary/10 text-primary">Livré</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Annulé
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="font-bold text-lg">Historique</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="trips">Trajets</TabsTrigger>
            <TabsTrigger value="parcels">Colis</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="mt-4 space-y-3">
            {tripHistory.map((trip) => (
              <Card key={trip.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">
                          {trip.from} → {trip.to}
                        </h3>
                        {getStatusBadge(trip.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>{trip.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{trip.driver}</p>
                    </div>
                    <p className="font-bold text-primary">{trip.price.toLocaleString()} F</p>
                  </div>

                  {trip.status === "completed" && trip.rating && (
                    <div className="flex items-center gap-1 pt-3 border-t">
                      <span className="text-sm text-muted-foreground mr-2">Votre note:</span>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < trip.rating! ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  )}

                  {trip.status === "completed" && !trip.rating && (
                    <div className="pt-3 border-t">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Star className="h-4 w-4 mr-2" />
                        Noter ce trajet
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="parcels" className="mt-4 space-y-3">
            {parcelHistory.map((parcel) => (
              <Link key={parcel.id} href={`/parcels/${parcel.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-bold text-sm mb-1">{parcel.tracking}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="font-medium">
                                {parcel.from} → {parcel.to}
                              </span>
                            </div>
                          </div>
                          {getStatusBadge(parcel.status)}
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <span className="text-sm text-muted-foreground">{parcel.date}</span>
                          <p className="font-bold text-accent">{parcel.price.toLocaleString()} F</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
