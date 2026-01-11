"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, ArrowRight } from "lucide-react"

export function SearchScreen() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">Rechercher un trajet</h1>
        <p className="text-primary-foreground/80 text-sm">Trouvez le trajet idéal pour vous</p>
      </header>

      {/* Search Form */}
      <div className="px-4 py-6 space-y-4">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Départ</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    placeholder="Ville de départ"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="pl-11 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Arrivée</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-accent" />
                  <Input
                    placeholder="Ville d'arrivée"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="pl-11 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-11 h-12" />
                </div>
              </div>
            </div>

            <Button className="w-full h-12 mt-6" size="lg">
              Rechercher
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Recherches récentes</h2>
          <div className="space-y-2">
            {["Dakar → Touba", "Dakar → Saint-Louis", "Thiès → Kaolack"].map((search) => (
              <Button
                key={search}
                variant="outline"
                className="w-full justify-start h-12 text-left bg-transparent"
                onClick={() => {
                  const [fromCity, toCity] = search.split(" → ")
                  setFrom(fromCity)
                  setTo(toCity)
                }}
              >
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                {search}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
