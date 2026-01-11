"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, MapPin, Calendar, User, Phone, Download } from "lucide-react"

interface BookingConfirmationScreenProps {
  tripId: string
}

export function BookingConfirmationScreen({ tripId }: BookingConfirmationScreenProps) {
  // Mock booking data
  const booking = {
    id: "BKG-2026-001",
    from: "Dakar",
    to: "Touba",
    date: "Aujourd'hui, 15 Jan",
    time: "08:00",
    seats: 2,
    totalPaid: 31500,
    driver: {
      name: "Moussa Ndiaye",
      phone: "+221 77 123 45 67",
      vehicle: "Toyota Hiace • DK 1234 AB",
    },
    pickupPoint: "Gare routière Pompiers, Dakar",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-slide-up">
        {/* Success Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-4 animate-bounce-subtle">
            <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Réservation confirmée!</h1>
          <p className="text-muted-foreground">Votre trajet a été réservé avec succès</p>
        </div>

        {/* Booking Details */}
        <Card className="shadow-xl">
          <CardContent className="p-6 space-y-4">
            <div className="text-center pb-4 border-b">
              <p className="text-sm text-muted-foreground mb-1">Numéro de réservation</p>
              <p className="text-xl font-bold">{booking.id}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Trajet</p>
                  <p className="font-semibold">
                    {booking.from} → {booking.to}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Date & Heure</p>
                  <p className="font-semibold">
                    {booking.date} à {booking.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Conducteur</p>
                  <p className="font-semibold">{booking.driver.name}</p>
                  <p className="text-sm text-muted-foreground">{booking.driver.vehicle}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Point de départ</p>
                  <p className="font-semibold text-sm">{booking.pickupPoint}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Places réservées</p>
                <p className="text-2xl font-bold">{booking.seats}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Montant payé</p>
                <p className="text-2xl font-bold text-primary">{booking.totalPaid.toLocaleString()} FCFA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full h-12 bg-transparent">
            <Phone className="mr-2 h-5 w-5" />
            Appeler le conducteur
          </Button>
          <Button variant="outline" className="w-full h-12 bg-transparent">
            <Download className="mr-2 h-5 w-5" />
            Télécharger le reçu
          </Button>
        </div>

        {/* Info */}
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <p className="text-sm text-center leading-relaxed">
              Un SMS de confirmation a été envoyé. Le conducteur vous contactera avant le départ.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full h-12 bg-transparent">
              Accueil
            </Button>
          </Link>
          <Link href="/profile/history" className="w-full">
            <Button className="w-full h-12">Mes réservations</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
