"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Save } from "lucide-react"

export function ProfileInfoScreen() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "Abdou",
    lastName: "Bah",
    email: "abdou.bah@example.com",
    phone: "+221 77 123 45 67",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to API
    router.back()
  }

  return (
    <div className="min-h-screen bg-background pb-24">
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
          <h1 className="font-bold text-lg">Mes informations</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {formData.firstName[0]}
                {formData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <Button type="button" size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12"
                required
              />
              <p className="text-xs text-muted-foreground">Numéro utilisé pour la connexion</p>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Vos informations personnelles sont sécurisées et ne seront jamais partagées sans votre consentement.
            </p>
          </CardContent>
        </Card>
      </form>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-card border-t border-border p-4 z-50">
        <Button type="submit" size="lg" className="w-full h-14 text-base" onClick={handleSubmit}>
          <Save className="mr-2 h-5 w-5" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}
