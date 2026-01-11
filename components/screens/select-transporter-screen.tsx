"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Package, Clock } from "lucide-react"

export function SelectTransporterScreen() {
  const router = useRouter()

  // Mock transporters
  const transporters = [
    {
      id: 1,
      name: "Moussa Ndiaye",
      rating: 4.9,
      trips: 156,
      vehicle: "Toyota Hiace",
      price: 3500,
      date: "Aujourd'hui",
      time: "08:00",
      verified: true,
    },
    {
      id: 2,
      name: "Fatou Sall",
      rating: 4.8,
      trips: 98,
      vehicle: "Mercedes Sprinter",
      price: 3000,
      date: "Demain",
      time: "10:30",
      verified: true,
    },
    {
      id: 3,
      name: "Ibrahima Diop",
      rating: 4.7,
      trips: 142,
      vehicle: "Toyota Coaster",
      price: 4000,
      date: "Aujourd'hui",
      time: "14:00",
      verified: false,
    },
  ]

  const handleSelect = (transporterId: number) => {
    router.push(`/parcels/send/confirm?transporter=${transporterId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent via-accent to-accent/90 text-accent-foreground px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-accent-foreground hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">Choisir un transporteur</h1>
            <p className="text-sm text-accent-foreground/80">{transporters.length} transporteurs disponibles</p>
          </div>
        </div>
      </div>

      {/* Route Info */}
      <div className="px-4 py-4 bg-muted/50">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-accent" />
          <div className="flex-1">
            <p className="font-semibold">Dakar → Touba</p>
            <p className="text-sm text-muted-foreground">5 kg • Taille moyenne</p>
          </div>
        </div>
      </div>

      {/* Transporters List */}
      <div className="px-4 py-4 space-y-3">
        {transporters.map((transporter) => (
          <Card key={transporter.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary">
                    {transporter.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold">{transporter.name}</p>
                    {transporter.verified && (
                      <Badge variant="secondary" className="h-5 text-xs">
                        Vérifié
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-accent" />
                      {transporter.rating}
                    </span>
                    <span>{transporter.trips} trajets</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{transporter.vehicle}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {transporter.date} à {transporter.time}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-accent">{transporter.price.toLocaleString()} FCFA</p>
                </div>
                <Button onClick={() => handleSelect(transporter.id)}>Choisir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <div className="px-4 pb-6">
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Le transporteur sera notifié de votre demande. Vous serez contacté pour confirmer les détails avant
              l'envoi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
