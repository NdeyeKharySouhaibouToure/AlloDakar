"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Star, Phone, MessageCircle, Shield, Calendar } from "lucide-react"

interface TripDetailScreenProps {
  tripId: string
}

export function TripDetailScreen({ tripId }: TripDetailScreenProps) {
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState(1)

  // Mock data - would come from API
  const trip = {
    id: tripId,
    from: "Dakar",
    to: "Touba",
    price: 15000,
    duration: "3h 30min",
    departureTime: "08:00",
    arrivalTime: "11:30",
    date: "Aujourd'hui, 15 Jan",
    seatsAvailable: 3,
    totalSeats: 9,
    driver: {
      name: "Moussa Ndiaye",
      rating: 4.9,
      trips: 156,
      joinedYear: 2023,
      photo: null,
      vehicle: "Toyota Hiace",
      plateNumber: "DK 1234 AB",
      verified: true,
    },
    amenities: ["Climatisation", "Bagages inclus", "Wifi", "Arrêts autorisés"],
    pickupPoint: "Gare routière Pompiers, Dakar",
    dropoffPoint: "Grande Mosquée, Touba",
  }

  const handleBooking = () => {
    router.push(`/trip/${tripId}/booking?seats=${selectedSeats}`)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center gap-3 sticky top-0 z-40">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-primary-foreground hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">
            {trip.from} → {trip.to}
          </h1>
          <p className="text-sm text-primary-foreground/80">{trip.date}</p>
        </div>
      </div>

      {/* Trip Image */}
      <div className="relative h-48 bg-muted">
        <Image src="/senegal-dakar-city.jpg" alt="Trip route" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-white/90 text-primary hover:bg-white">
            <Calendar className="h-3 w-3 mr-1" />
            {trip.date}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-4">
        {/* Route & Time */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <div className="h-16 w-0.5 bg-border my-1" />
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-bold">{trip.from}</p>
                    <p className="text-sm text-muted-foreground">{trip.departureTime}</p>
                    <p className="text-xs text-muted-foreground">{trip.pickupPoint}</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{trip.to}</p>
                    <p className="text-sm text-muted-foreground">{trip.arrivalTime}</p>
                    <p className="text-xs text-muted-foreground">{trip.dropoffPoint}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{trip.duration}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-4">Conducteur</h3>
            <div className="flex items-start gap-3 mb-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">
                  {trip.driver.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold">{trip.driver.name}</p>
                  {trip.driver.verified && (
                    <Badge variant="secondary" className="h-5 px-1.5">
                      <Shield className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-accent" />
                    {trip.driver.rating}
                  </span>
                  <span>{trip.driver.trips} trajets</span>
                  <span>Depuis {trip.driver.joinedYear}</span>
                </div>
                <p className="text-sm">
                  {trip.driver.vehicle} • {trip.driver.plateNumber}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Appeler
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Équipements</h3>
            <div className="grid grid-cols-2 gap-2">
              {trip.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seats Selection */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Nombre de places</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {trip.seatsAvailable} places disponibles sur {trip.totalSeats}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                disabled={selectedSeats <= 1}
              >
                -
              </Button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold">{selectedSeats}</span>
                <span className="text-sm text-muted-foreground ml-2">{selectedSeats === 1 ? "place" : "places"}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedSeats(Math.min(trip.seatsAvailable, selectedSeats + 1))}
                disabled={selectedSeats >= trip.seatsAvailable}
              >
                +
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-card border-t border-border p-4 z-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Prix total</p>
            <p className="text-2xl font-bold text-primary">{(trip.price * selectedSeats).toLocaleString()} FCFA</p>
          </div>
          <Button size="lg" onClick={handleBooking} className="h-12 px-8">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  )
}
