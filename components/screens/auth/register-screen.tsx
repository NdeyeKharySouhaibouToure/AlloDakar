"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, User, Mail, ArrowRight, ArrowLeft } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function RegisterScreen() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to OTP screen
    router.push(`/login/otp?phone=${encodeURIComponent(formData.phone)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex flex-col p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <div className="relative z-10 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-primary-foreground hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center pb-8">
        <div className="w-full max-w-md relative z-10 animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-white/90 p-4 rounded-2xl backdrop-blur-sm shadow-xl">
                <Image
                  src="/images/chatgpt-20image-2011-20janv.png"
                  alt="Allô Dakar"
                  width={180}
                  height={54}
                  className="h-12 w-auto"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">Créer un compte</h1>
            <p className="text-primary-foreground/80 text-sm">Rejoignez la communauté Allô Dakar</p>
          </div>

          {/* Register Card */}
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prénom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Abdou"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-11 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom</label>
                    <Input
                      type="text"
                      placeholder="Bah"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="abdou.bah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11 h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="+221 77 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-11 h-11"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Vous recevrez un code de vérification par SMS</p>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    J'accepte les{" "}
                    <Link href="/terms" className="text-primary font-semibold hover:underline">
                      Conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link href="/privacy" className="text-primary font-semibold hover:underline">
                      Politique de confidentialité
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base mt-6"
                  size="lg"
                  disabled={isLoading || !acceptTerms}
                >
                  {isLoading ? (
                    "Création..."
                  ) : (
                    <>
                      Continuer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Déjà un compte?{" "}
                  <Link href="/login" className="text-primary font-semibold hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
