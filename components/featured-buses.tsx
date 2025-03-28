import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Wifi, Monitor, Coffee, UsbIcon as UsbDrive } from "lucide-react"
import Link from "next/link"

export function FeaturedBuses() {
  const buses = [
    {
      id: 1,
      name: "TNSTC Volvo",
      rating: 4.5,
      amenities: ["wifi", "entertainment", "refreshments", "usb"],
      imageUrl: "/placeholder.svg?height=200&width=350",
      description:
        "Premium luxury coach with reclining seats and extra legroom from Tamil Nadu State Transport Corporation.",
    },
    {
      id: 2,
      name: "KPN Travels",
      rating: 4.7,
      amenities: ["wifi", "entertainment", "usb"],
      imageUrl: "/placeholder.svg?height=200&width=350",
      description: "Comfortable travel with modern amenities and professional service across Tamil Nadu.",
    },
    {
      id: 3,
      name: "SRS Travels",
      rating: 4.6,
      amenities: ["wifi", "entertainment", "refreshments", "usb"],
      imageUrl: "/placeholder.svg?height=200&width=350",
      description: "Sleeper bus designed for overnight journeys between major Tamil Nadu cities.",
    },
  ]

  const amenityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    entertainment: <Monitor className="h-4 w-4" />,
    refreshments: <Coffee className="h-4 w-4" />,
    usb: <UsbDrive className="h-4 w-4" />,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {buses.map((bus) => (
        <Card key={bus.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <img src={bus.imageUrl || "/placeholder.svg"} alt={bus.name} className="w-full h-48 object-cover" />

          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">{bus.name}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{bus.rating}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{bus.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {bus.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                  {amenityIcons[amenity as keyof typeof amenityIcons]}
                  <span className="capitalize">{amenity}</span>
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 px-6 py-4">
            <Button asChild className="w-full">
              <Link href={`/buses/${bus.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

