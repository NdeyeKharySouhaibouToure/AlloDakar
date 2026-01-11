"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, ArrowRight } from "lucide-react"
import { useAuthContext } from "@/components/providers/auth-provider"

export function LoginScreen() {
  const router = useRouter()
  const { sendOTP } = useAuthContext()
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await sendOTP(phone)

      if (result.error) {
        setError(result.error)
        return
      }

      // Navigate to OTP screen with phone number
      router.push(`/login/otp?phone=${encodeURIComponent(phone)}`)
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/chatgpt-20image-2011-20janv.png"
              alt="Allô Dakar"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Bienvenue</h1>
          <p className="text-primary-foreground/80 text-sm">Connectez-vous pour continuer</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0">
          <CardContent className="p-6">
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Numéro de téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+221 77 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-11 h-12 text-base"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Vous recevrez un code de vérification par SMS</p>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button type="submit" className="w-full h-12 text-base" size="lg" disabled={isLoading}>
                {isLoading ? (
                  "Envoi en cours..."
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
                Pas encore de compte?{" "}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <p className="text-center text-xs text-primary-foreground/60 mt-6 px-4">
          En continuant, vous acceptez nos{" "}
          <Link href="/terms" className="underline">
            Conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="underline">
            Politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  )
}
