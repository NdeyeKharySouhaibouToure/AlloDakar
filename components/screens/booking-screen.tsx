"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle2 } from "lucide-react"

interface BookingScreenProps {
  tripId: string
  seats: number
}

export function BookingScreen({ tripId, seats }: BookingScreenProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("wave")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock trip data
  const trip = {
    from: "Dakar",
    to: "Touba",
    date: "Aujourd'hui, 15 Jan",
    time: "08:00",
    price: 15000,
    driver: "Moussa Ndiaye",
  }

  const totalPrice = trip.price * seats
  const serviceFee = Math.round(totalPrice * 0.05)
  const finalTotal = totalPrice + serviceFee

  const paymentMethods = [
    { id: "wave", name: "Wave", icon: Wallet, available: true },
    { id: "orange", name: "Orange Money", icon: Wallet, available: true },
    { id: "free", name: "Free Money", icon: Wallet, available: true },
    { id: "cash", name: "Payer en espèces", icon: Banknote, available: true },
  ]

  const handleConfirmBooking = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    router.push(`/trip/${tripId}/confirmation`)
  }

  return (
    <div className="min-h-screen bg-background pb-32">
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
        <h1 className="font-bold text-lg">Confirmation de réservation</h1>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Trip Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Récapitulatif du trajet</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trajet</span>
                <span className="font-medium">
                  {trip.from} → {trip.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{trip.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heure</span>
                <span className="font-medium">{trip.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conducteur</span>
                <span className="font-medium">{trip.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Places</span>
                <Badge variant="secondary">{seats}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Détails du prix</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prix par place × {seats}</span>
                <span className="font-medium">{totalPrice.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frais de service</span>
                <span className="font-medium">{serviceFee.toLocaleString()} FCFA</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary text-lg">{finalTotal.toLocaleString()} FCFA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-4">Mode de paiement</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <Label
                      key={method.id}
                      htmlFor={method.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="flex-1 font-medium">{method.name}</span>
                      {paymentMethod === method.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </Label>
                  )
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              En confirmant cette réservation, vous acceptez nos conditions générales. Le conducteur sera notifié et
              vous recevrez une confirmation par SMS.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-card border-t border-border p-4 z-50">
        <Button size="lg" className="w-full h-14 text-base" onClick={handleConfirmBooking} disabled={isProcessing}>
          {isProcessing ? (
            "Traitement en cours..."
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Confirmer et payer {finalTotal.toLocaleString()} FCFA
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
