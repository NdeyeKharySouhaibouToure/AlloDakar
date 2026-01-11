"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, Package, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileLayoutProps {
  children: ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/search", icon: Search, label: "Recherche" },
    { href: "/parcels", icon: Package, label: "Colis" },
    { href: "/profile", icon: User, label: "Profil" },
  ]

  const hideBottomNav = ["/login", "/register", "/onboarding"].includes(pathname)

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Bottom Navigation */}
      {!hideBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-card border-t border-border z-50 safe-bottom">
          <div className="flex items-center justify-around h-16 px-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground active:text-primary",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "animate-bounce-subtle")} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}

      {/* Floating Action Button (for driver mode) */}
      {pathname === "/" && (
        <Link
          href="/driver/create-trip"
          className="fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        >
          <Plus className="h-6 w-6" />
        </Link>
      )}
    </div>
  )
}
