"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useAuthContext } from "@/components/providers/auth-provider"

export function OTPScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""
  const { verifyOTP, sendOTP } = useAuthContext()

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const otpCode = otp.join("")
      const result = await verifyOTP(phone, otpCode)

      if (result.error) {
        setError(result.error)
        return
      }

      // Check if user profile exists
      if (result.user) {
        router.push("/")
      } else {
        router.push("/register")
      }
    } catch (err) {
      setError("Code invalide. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setCountdown(60)
    setError(null)
    try {
      await sendOTP(phone)
    } catch (err) {
      setError("Échec de l'envoi du code")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex flex-col p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <div className="relative z-10 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-primary-foreground hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md relative z-10 animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-white/90 p-4 rounded-2xl backdrop-blur-sm shadow-xl">
                <Image
                  src="/images/chatgpt-20image-2011-20janv.png"
                  alt="Allô Dakar"
                  width={200}
                  height={60}
                  className="h-14 w-auto"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">Vérification</h1>
            <p className="text-primary-foreground/80 text-sm">
              Code envoyé au <span className="font-semibold">{phone}</span>
            </p>
          </div>

          {/* OTP Card */}
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6">
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Code de vérification</label>
                  <div className="flex gap-2 justify-between">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="h-14 text-center text-2xl font-bold"
                        required
                      />
                    ))}
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  size="lg"
                  disabled={isLoading || otp.some((d) => !d)}
                >
                  {isLoading ? (
                    "Vérification..."
                  ) : (
                    <>
                      Vérifier
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Renvoyer le code dans <span className="font-semibold text-primary">{countdown}s</span>
                  </p>
                ) : (
                  <Button variant="link" onClick={handleResend} className="text-primary font-semibold">
                    Renvoyer le code
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
