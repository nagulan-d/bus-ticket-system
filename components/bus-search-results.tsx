"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowRight, Wifi, Coffee, UsbIcon as UsbDrive, Monitor } from "lucide-react"

type BusSearchResultsProps = {
  source: string
  destination: string
  date: string
}

export function BusSearchResults({ source, destination, date }: BusSearchResultsProps) {
  const router = useRouter()

  // This would normally come from an API call
  const buses = [
    {
      id: "bus1",
      name: "TNSTC Volvo",
      type: "A/C Sleeper",
      departure: "21:00",
      arrival: "05:30",
      duration: "8h 30m",
      price: 850,
      rating: 4.5,
      availableSeats: 23,
      amenities: ["wifi", "usb", "refreshments"],
    },
    {
      id: "bus2",
      name: "KPN Travels",
      type: "A/C Seater",
      departure: "22:30",
      arrival: "06:15",
      duration: "7h 45m",
      price: 750,
      rating: 4.7,
      availableSeats: 12,
      amenities: ["wifi", "usb"],
    },
    {
      id: "bus3",
      name: "SRS Travels",
      type: "A/C Sleeper Deluxe",
      departure: "21:30",
      arrival: "05:00",
      duration: "7h 30m",
      price: 950,
      rating: 4.6,
      availableSeats: 18,
      amenities: ["wifi", "usb", "refreshments", "entertainment"],
    },
    {
      id: "bus4",
      name: "YBM Travels",
      type: "Non-A/C Seater",
      departure: "20:00",
      arrival: "05:30",
      duration: "9h 30m",
      price: 450,
      rating: 4.0,
      availableSeats: 8,
      amenities: ["usb"],
    },
  ]

  const handleSelectBus = (busId: string) => {
    router.push(`/bus/${busId}?source=${source}&destination=${destination}&date=${date}`)
  }

  const amenityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    usb: <UsbDrive className="h-4 w-4" />,
    refreshments: <Coffee className="h-4 w-4" />,
    entertainment: <Monitor className="h-4 w-4" />,
  }

  const sortOptions = ["departure", "duration", "price", "rating"]
  const [sortBy, setSortBy] = useState("departure")

  // Sort buses based on selected option
  const sortedBuses = [...buses].sort((a, b) => {
    switch (sortBy) {
      case "departure":
        return a.departure.localeCompare(b.departure)
      case "duration":
        return a.duration.localeCompare(b.duration)
      case "price":
        return a.price - b.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">{buses.length} buses found</div>
        <Tabs value={sortBy} onValueChange={setSortBy} className="w-[300px]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <TabsList>
              {sortOptions.map((option) => (
                <TabsTrigger key={option} value={option} className="capitalize">
                  {option}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {sortedBuses.length > 0 ? (
        <div className="space-y-4">
          {sortedBuses.map((bus) => (
            <Card key={bus.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-9 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{bus.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <span>{bus.type}</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            {bus.rating}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {bus.availableSeats} seats left
                          </Badge>
                        </div>
                      </div>

                      <div className="flex mt-4 md:mt-0 gap-8">
                        <div className="text-center">
                          <div className="font-bold">{bus.departure}</div>
                          <div className="text-xs text-gray-500">{source}</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="text-xs text-gray-500 mb-1">{bus.duration}</div>
                          <div className="relative w-16 h-px bg-gray-300 mx-2">
                            <ArrowRight className="h-3 w-3 absolute -right-1 -top-1.5 text-gray-400" />
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="font-bold">{bus.arrival}</div>
                          <div className="text-xs text-gray-500">{destination}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {bus.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                          {amenityIcons[amenity as keyof typeof amenityIcons]}
                          <span className="capitalize">{amenity}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-3 bg-gray-50 p-6 flex flex-col justify-center items-center">
                    <div className="text-2xl font-bold mb-1">₹{bus.price}</div>
                    <div className="text-xs text-gray-500 mb-4">per person</div>

                    <Button onClick={() => handleSelectBus(bus.id)} className="w-full">
                      View Seats
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-xl font-semibold mb-2">No buses found</div>
          <p className="text-gray-500 mb-6">Try changing your search criteria</p>
        </div>
      )}
    </div>
  )
}

