"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, MapPin, Phone, User, ArrowRight } from "lucide-react"

export function SendParcelScreen() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    senderName: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    description: "",
    weight: "",
    size: "small",
    fragile: false,
  })

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      // Submit and go to transporter selection
      router.push("/parcels/send/select-transporter")
    }
  }

  const handleBack = () => {
    if (step === 1) {
      router.back()
    } else {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent via-accent to-accent/90 text-accent-foreground px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={handleBack} className="text-accent-foreground hover:bg-white/10">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">Envoyer un colis</h1>
            <p className="text-sm text-accent-foreground/80">Étape {step} sur 3</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? "bg-accent-foreground" : "bg-accent-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Step 1: Route Information */}
        {step === 1 && (
          <div className="space-y-4 animate-slide-up">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-4">Informations du trajet</h3>

                  <div className="space-y-4">
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
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Nous trouverons des transporteurs fiables qui effectuent ce trajet régulièrement
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div className="space-y-4 animate-slide-up">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold mb-4">Expéditeur</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Nom complet</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="senderName"
                          placeholder="Votre nom"
                          value={formData.senderName}
                          onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                          className="pl-11 h-12"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderPhone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="senderPhone"
                          type="tel"
                          placeholder="+221 77 123 45 67"
                          value={formData.senderPhone}
                          onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                          className="pl-11 h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-bold mb-4">Destinataire</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="receiverName">Nom complet</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="receiverName"
                          placeholder="Nom du destinataire"
                          value={formData.receiverName}
                          onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                          className="pl-11 h-12"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receiverPhone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="receiverPhone"
                          type="tel"
                          placeholder="+221 77 123 45 67"
                          value={formData.receiverPhone}
                          onChange={(e) => setFormData({ ...formData, receiverPhone: e.target.value })}
                          className="pl-11 h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Parcel Details */}
        {step === 3 && (
          <div className="space-y-4 animate-slide-up">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold mb-4">Détails du colis</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description du contenu</Label>
                      <Textarea
                        id="description"
                        placeholder="Ex: Vêtements, documents, etc."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="min-h-24"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Poids approximatif (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Ex: 5"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Taille du colis</Label>
                      <RadioGroup
                        value={formData.size}
                        onValueChange={(value) => setFormData({ ...formData, size: value })}
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="small"
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.size === "small"
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <RadioGroupItem value="small" id="small" />
                            <div className="flex-1">
                              <p className="font-medium">Petit</p>
                              <p className="text-sm text-muted-foreground">Moins de 30cm</p>
                            </div>
                          </Label>
                          <Label
                            htmlFor="medium"
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.size === "medium"
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <RadioGroupItem value="medium" id="medium" />
                            <div className="flex-1">
                              <p className="font-medium">Moyen</p>
                              <p className="text-sm text-muted-foreground">30cm à 60cm</p>
                            </div>
                          </Label>
                          <Label
                            htmlFor="large"
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.size === "large"
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <RadioGroupItem value="large" id="large" />
                            <div className="flex-1">
                              <p className="font-medium">Grand</p>
                              <p className="text-sm text-muted-foreground">Plus de 60cm</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-card border-t border-border p-4 z-50">
        <Button size="lg" className="w-full h-14 text-base" onClick={handleNext}>
          {step === 3 ? "Choisir un transporteur" : "Continuer"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
