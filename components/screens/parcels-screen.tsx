"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, MapPin, Clock } from "lucide-react"

export function ParcelsScreen() {
  const parcels = [
    {
      id: 1,
      from: "Dakar",
      to: "Touba",
      status: "in_transit",
      date: "Aujourd'hui, 14:30",
      tracking: "PKG-2026-001",
    },
    {
      id: 2,
      from: "Thiès",
      to: "Dakar",
      status: "delivered",
      date: "Hier, 10:15",
      tracking: "PKG-2026-002",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_transit":
        return <Badge className="bg-accent/10 text-accent">En transit</Badge>
      case "delivered":
        return <Badge className="bg-primary/10 text-primary">Livré</Badge>
      default:
        return <Badge variant="secondary">En attente</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-accent via-accent to-accent/90 text-accent-foreground px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Mes Colis</h1>
          <Link href="/parcels/send">
            <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Plus className="mr-1 h-4 w-4" />
              Nouveau
            </Button>
          </Link>
        </div>
        <p className="text-accent-foreground/80 text-sm">Suivez vos envois en temps réel</p>
      </header>

      {/* Parcels List */}
      <div className="px-4 py-6 space-y-3">
        {parcels.length > 0 ? (
          parcels.map((parcel) => (
            <Link key={parcel.id} href={`/parcels/${parcel.id}`}>
              <Card className="hover:shadow-lg transition-shadow active:scale-98 transition-transform">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-bold text-sm mb-1">{parcel.tracking}</p>
                        <p className="text-xs text-muted-foreground">{parcel.date}</p>
                      </div>
                    </div>
                    {getStatusBadge(parcel.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{parcel.from}</span>
                    <span className="text-muted-foreground">→</span>
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="font-medium">{parcel.to}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-bold mb-2">Aucun colis</h3>
            <p className="text-sm text-muted-foreground mb-4">Vous n'avez pas encore envoyé de colis</p>
            <Link href="/parcels/send">
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                Envoyer un colis
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Quick Info */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-4 flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Livraison rapide</p>
              <p className="text-xs text-muted-foreground text-pretty leading-relaxed">
                Vos colis sont transportés par nos conducteurs vérifiés lors de leurs trajets réguliers
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
