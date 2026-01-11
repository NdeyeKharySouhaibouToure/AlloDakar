"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react"

export function HelpScreen() {
  const router = useRouter()

  const faqItems = [
    {
      question: "Comment réserver un trajet?",
      answer: "Recherchez votre destination, sélectionnez un trajet et confirmez votre réservation.",
    },
    {
      question: "Comment envoyer un colis?",
      answer: "Allez dans l'onglet Colis, créez une demande et choisissez un transporteur.",
    },
    {
      question: "Modes de paiement acceptés",
      answer: "Wave, Orange Money, Free Money et paiement en espèces au conducteur.",
    },
    {
      question: "Politique d'annulation",
      answer: "Annulation gratuite jusqu'à 2h avant le départ. Remboursement sous 48h.",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-6">
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
          <h1 className="font-bold text-lg">Aide & Support</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Contact Options */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">NOUS CONTACTER</h2>
          <Card>
            <CardContent className="p-0">
              <button className="flex items-center gap-4 w-full p-4 border-b hover:bg-muted/50 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Chat en direct</p>
                  <p className="text-sm text-muted-foreground">Disponible 24/7</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="flex items-center gap-4 w-full p-4 border-b hover:bg-muted/50 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Téléphone</p>
                  <p className="text-sm text-muted-foreground">+221 33 123 45 67</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="flex items-center gap-4 w-full p-4 hover:bg-muted/50 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">support@allodakar.sn</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">QUESTIONS FRÉQUENTES</h2>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
