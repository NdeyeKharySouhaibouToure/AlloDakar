"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bell, Moon, Globe, Shield, CreditCard, ChevronRight } from "lucide-react"

export function SettingsScreen() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

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
          <h1 className="font-bold text-lg">Paramètres</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Preferences */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">PRÉFÉRENCES</h2>
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="notifications" className="cursor-pointer">
                    Notifications
                  </Label>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="darkMode" className="cursor-pointer">
                    Mode sombre
                  </Label>
                </div>
                <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <button className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Langue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Français</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">COMPTE</h2>
          <Card>
            <CardContent className="p-0">
              <button className="flex items-center justify-between w-full p-4 border-b hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Sécurité et confidentialité</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Moyens de paiement</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Legal */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">LÉGAL</h2>
          <Card>
            <CardContent className="p-0">
              <button className="flex items-center justify-between w-full p-4 border-b hover:bg-muted/50 transition-colors">
                <span className="font-medium">Conditions d'utilisation</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="flex items-center justify-between w-full p-4 border-b hover:bg-muted/50 transition-colors">
                <span className="font-medium">Politique de confidentialité</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                <span className="font-medium">À propos</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* App Info */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">Allô Dakar - 2026</p>
        </div>
      </div>
    </div>
  )
}
