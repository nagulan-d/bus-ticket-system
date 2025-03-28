"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function PopularRoutes() {
  const router = useRouter()

  const routes = [
    { from: "Chennai", to: "Coimbatore", price: "₹800", time: "7h 30m" },
    { from: "Chennai", to: "Madurai", price: "₹750", time: "8h 15m" },
    { from: "Chennai", to: "Tiruchirappalli", price: "₹600", time: "6h 30m" },
    { from: "Coimbatore", to: "Madurai", price: "₹450", time: "4h 00m" },
    { from: "Madurai", to: "Tirunelveli", price: "₹350", time: "3h 30m" },
    { from: "Salem", to: "Chennai", price: "₹500", time: "5h 45m" },
  ]

  const handleRouteSelect = (from: string, to: string) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const searchParams = new URLSearchParams({
      source: from,
      destination: to,
      date: tomorrow.toISOString().split("T")[0],
    })

    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {routes.map((route, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">{route.from}</div>
              <ArrowRight className="mx-2 text-gray-400" />
              <div className="text-xl font-semibold">{route.to}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <div>Starting from {route.price}</div>
              <div>{route.time}</div>
            </div>
            <Button onClick={() => handleRouteSelect(route.from, route.to)} variant="outline" className="w-full mt-2">
              View Buses
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

