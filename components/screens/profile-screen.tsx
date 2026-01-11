"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronRight, User, History, Settings, HelpCircle, LogOut, Star, Shield } from "lucide-react"
import Link from "next/link"

export function ProfileScreen() {
  const menuItems = [
    { icon: User, label: "Mes informations", href: "/profile/info" },
    { icon: History, label: "Historique des trajets", href: "/profile/history" },
    { icon: Star, label: "Mes avis", href: "/profile/reviews" },
    { icon: Settings, label: "Paramètres", href: "/profile/settings" },
    { icon: HelpCircle, label: "Aide & Support", href: "/profile/help" },
  ]

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">Mon Profil</h1>
        </div>
      </header>

      {/* Profile Card */}
      <div className="px-4 -mt-12 relative z-20 mb-6">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">AB</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Abdou Bah</h2>
                <p className="text-sm text-muted-foreground mb-2">+221 77 123 45 67</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 text-accent fill-current" />
                    <span className="text-xs font-semibold text-accent">4.8</span>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                    <Shield className="h-3 w-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">Vérifié</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Trajets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">8</p>
                <p className="text-xs text-muted-foreground">Avis</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-xs text-muted-foreground">Colis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-md transition-shadow active:scale-98 transition-transform">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Se déconnecter
        </Button>
      </div>
    </div>
  )
}
