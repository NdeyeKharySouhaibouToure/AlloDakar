"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Package, Shield, ArrowRight } from "lucide-react"

export function OnboardingScreen() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: MapPin,
      title: "Voyagez facilement",
      description: "Trouvez et réservez des trajets interurbains vers toutes les régions du Sénégal",
      color: "bg-primary",
    },
    {
      icon: Package,
      title: "Envoyez vos colis",
      description: "Transportez vos colis en toute sécurité entre les villes avec nos conducteurs de confiance",
      color: "bg-accent",
    },
    {
      icon: Shield,
      title: "Voyagez en confiance",
      description: "Tous nos conducteurs sont vérifiés et notés par la communauté pour votre sécurité",
      color: "bg-primary",
    },
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push("/login")
    }
  }

  const handleSkip = () => {
    router.push("/login")
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex flex-col p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl" />
      </div>

      {/* Skip button */}
      <div className="relative z-10 flex justify-end mb-4">
        <Button variant="ghost" onClick={handleSkip} className="text-primary-foreground hover:bg-white/10">
          Passer
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Logo */}
        <div className="mb-12">
          <div className="bg-white/90 p-6 rounded-3xl backdrop-blur-sm shadow-xl inline-block">
            <Image
              src="/images/chatgpt-20image-2011-20janv.png"
              alt="Allô Dakar"
              width={220}
              height={66}
              className="h-16 w-auto"
            />
          </div>
        </div>

        {/* Slide Content */}
        <div className="w-full max-w-md animate-slide-up">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div
                className={`h-24 w-24 rounded-full ${slide.color} mx-auto mb-6 flex items-center justify-center shadow-lg`}
              >
                <Icon className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-balance">{slide.title}</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">{slide.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pagination dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/40"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Next button */}
      <div className="relative z-10">
        <Button
          onClick={handleNext}
          size="lg"
          className="w-full h-14 text-base bg-white text-primary hover:bg-white/90"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Suivant
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          ) : (
            "Commencer"
          )}
        </Button>
      </div>
    </div>
  )
}
