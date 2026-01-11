"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, User, Phone, CheckCircle2, Clock, Truck } from "lucide-react"

interface ParcelTrackingScreenProps {
  parcelId: string
}

export function ParcelTrackingScreen({ parcelId }: ParcelTrackingScreenProps) {
  const router = useRouter()

  // Mock parcel data
  const parcel = {
    id: parcelId,
    trackingNumber: "PKG-2026-001",
    from: "Dakar",
    to: "Touba",
    status: "in_transit",
    currentLocation: "En route vers Touba",
    sender: {
      name: "Abdou Bah",
      phone: "+221 77 123 45 67",
    },
    receiver: {
      name: "Awa Diop",
      phone: "+221 76 987 65 43",
    },
    transporter: {
      name: "Moussa Ndiaye",
      phone: "+221 77 111 22 33",
      vehicle: "Toyota Hiace • DK 1234 AB",
    },
    details: {
      description: "Vêtements et documents",
      weight: "5 kg",
      size: "Moyen",
    },
    price: 3500,
    timeline: [
      { status: "created", label: "Demande créée", time: "Aujourd'hui, 08:00", completed: true },
      { status: "picked_up", label: "Colis récupéré", time: "Aujourd'hui, 09:30", completed: true },
      { status: "in_transit", label: "En transit", time: "Aujourd'hui, 10:00", completed: true },
      { status: "delivered", label: "Livré", time: "Estimation: 13:30", completed: false },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_transit":
        return (
          <Badge className="bg-accent/10 text-accent">
            <Truck className="h-3 w-3 mr-1" />
            En transit
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Livré
          </Badge>
        )
      default:
        return <Badge variant="secondary">En attente</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent via-accent to-accent/90 text-accent-foreground px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-accent-foreground hover:bg-white/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">Suivi de colis</h1>
            <p className="text-sm text-accent-foreground/80">{parcel.trackingNumber}</p>
          </div>
          {getStatusBadge(parcel.status)}
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Route & Status */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Package className="h-8 w-8 text-accent" />
              <div className="flex-1">
                <p className="font-bold text-lg">
                  {parcel.from} → {parcel.to}
                </p>
                <p className="text-sm text-muted-foreground">{parcel.currentLocation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-4">Statut du colis</h3>
            <div className="space-y-4">
              {parcel.timeline.map((item, index) => (
                <div key={item.status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        item.completed ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.completed ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    {index < parcel.timeline.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-8 ${item.completed ? "bg-accent" : "bg-muted"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`font-semibold ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-primary" />
                <p className="text-xs font-semibold text-muted-foreground">Expéditeur</p>
              </div>
              <p className="font-semibold text-sm mb-1">{parcel.sender.name}</p>
              <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                <Phone className="h-3 w-3 mr-1" />
                Appeler
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-muted-foreground">Destinataire</p>
              </div>
              <p className="font-semibold text-sm mb-1">{parcel.receiver.name}</p>
              <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                <Phone className="h-3 w-3 mr-1" />
                Appeler
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Transporter Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Transporteur</h3>
            <div className="flex items-start gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-primary">
                  {parcel.transporter.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-bold">{parcel.transporter.name}</p>
                <p className="text-sm text-muted-foreground">{parcel.transporter.vehicle}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Contacter le transporteur
            </Button>
          </CardContent>
        </Card>

        {/* Parcel Details */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Détails du colis</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Description</span>
                <span className="font-medium text-right">{parcel.details.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Poids</span>
                <span className="font-medium">{parcel.details.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taille</span>
                <span className="font-medium">{parcel.details.size}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold">Prix</span>
                <span className="font-bold text-accent">{parcel.price.toLocaleString()} FCFA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
