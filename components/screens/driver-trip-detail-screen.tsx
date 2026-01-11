"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Clock, Users, Phone, MessageCircle, Edit } from "lucide-react"

interface DriverTripDetailScreenProps {
  tripId: string
}

export function DriverTripDetailScreen({ tripId }: DriverTripDetailScreenProps) {
  const router = useRouter()

  // Mock trip data
  const trip = {
    id: tripId,
    from: "Dakar",
    to: "Touba",
    date: "Aujourd'hui, 15 Jan",
    time: "08:00",
    pickupPoint: "Gare routière Pompiers",
    seatsTotal: 9,
    seatsBooked: 7,
    pricePerSeat: 15000,
    totalEarnings: 105000,
    bookings: [
      {
        id: 1,
        passenger: "Abdou Bah",
        phone: "+221 77 123 45 67",
        seats: 2,
        status: "confirmed",
        amount: 30000,
      },
      {
        id: 2,
        passenger: "Awa Diop",
        phone: "+221 76 987 65 43",
        seats: 1,
        status: "confirmed",
        amount: 15000,
      },
      {
        id: 3,
        passenger: "Omar Sow",
        phone: "+221 78 111 22 33",
        seats: 3,
        status: "confirmed",
        amount: 45000,
      },
      {
        id: 4,
        passenger: "Fatou Kane",
        phone: "+221 77 444 55 66",
        seats: 1,
        status: "pending",
        amount: 15000,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background pb-6">
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
            <h1 className="font-bold text-lg">
              {trip.from} → {trip.to}
            </h1>
            <p className="text-sm text-primary-foreground/80">{trip.date}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">
                {trip.seatsBooked}/{trip.seatsTotal}
              </p>
              <p className="text-xs text-muted-foreground">Places</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-5 w-5 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold">{trip.bookings.length}</p>
              <p className="text-xs text-muted-foreground">Réservations</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Revenus</p>
              <p className="text-lg font-bold text-primary">{trip.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">FCFA</p>
            </CardContent>
          </Card>
        </div>

        {/* Trip Details */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Point de départ</p>
                <p className="font-semibold">{trip.pickupPoint}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Heure de départ</p>
                <p className="font-semibold">{trip.time}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings */}
        <div>
          <h3 className="font-bold mb-3">Réservations ({trip.bookings.length})</h3>
          <div className="space-y-3">
            {trip.bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-primary">
                          {booking.passenger
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold mb-1">{booking.passenger}</p>
                        <p className="text-sm text-muted-foreground">{booking.phone}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={booking.status === "confirmed" ? "secondary" : "outline"}>
                            {booking.seats} {booking.seats === 1 ? "place" : "places"}
                          </Badge>
                          {booking.status === "pending" && (
                            <Badge className="bg-accent/10 text-accent">En attente</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-primary">{booking.amount.toLocaleString()} F</p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <Card className="bg-muted/50">
          <CardContent className="p-4 space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Modifier le trajet
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent"
            >
              Annuler le trajet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
