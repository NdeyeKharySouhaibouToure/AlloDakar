"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Calendar, Clock, Users, DollarSign, ArrowRight } from "lucide-react"

export function CreateTripScreen() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "",
    price: "",
    pickupPoint: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit to API
    router.push("/driver")
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
        <h1 className="font-bold text-lg">Créer un trajet</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-4">
        {/* Route */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg mb-4">Itinéraire</h3>

            <div className="space-y-2">
              <Label htmlFor="from">Ville de départ</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                <Input
                  id="from"
                  placeholder="Ex: Dakar"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  className="pl-11 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">Ville d'arrivée</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-accent" />
                <Input
                  id="to"
                  placeholder="Ex: Touba"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="pl-11 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupPoint">Point de départ</Label>
              <Input
                id="pickupPoint"
                placeholder="Ex: Gare routière Pompiers"
                value={formData.pickupPoint}
                onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                className="h-12"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg mb-4">Date et heure</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="pl-11 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="pl-11 h-12"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capacity & Price */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg mb-4">Places et tarif</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="seats">Nombre de places</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="seats"
                    type="number"
                    placeholder="Ex: 9"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    className="pl-11 h-12"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prix par place</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="15000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="pl-11 h-12"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Prix recommandé: <span className="font-semibold">12,000 - 18,000 FCFA</span>
            </p>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg mb-4">Informations complémentaires</h3>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                placeholder="Ex: Arrêts autorisés, climatisation, wifi disponible..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="min-h-24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Une fois publié, votre trajet sera visible par tous les utilisateurs. Vous recevrez une notification pour
              chaque nouvelle réservation.
            </p>
          </CardContent>
        </Card>
      </form>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-card border-t border-border p-4 z-50">
        <Button size="lg" className="w-full h-14 text-base" onClick={handleSubmit}>
          Publier le trajet
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
