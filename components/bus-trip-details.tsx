import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Wifi, Coffee, UsbIcon as UsbDrive, Monitor, ArrowRight } from "lucide-react"

type BusTripDetailsProps = {
  bus: {
    id: string
    name: string
    type: string
    departure: string
    arrival: string
    duration: string
    price: number
    rating: number
    amenities: string[]
  }
  source: string
  destination: string
}

export function BusTripDetails({ bus, source, destination }: BusTripDetailsProps) {
  const amenityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    usb: <UsbDrive className="h-4 w-4" />,
    refreshments: <Coffee className="h-4 w-4" />,
    entertainment: <Monitor className="h-4 w-4" />,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold">{bus.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>{bus.type}</span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {bus.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y py-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Departure</div>
              <div className="font-bold text-xl">{bus.departure}</div>
              <div className="text-sm mt-1">{source}</div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <Clock className="h-4 w-4" /> {bus.duration}
              </div>
              <div className="relative w-32 h-px bg-gray-300 my-2">
                <ArrowRight className="h-4 w-4 absolute -right-1 -top-2 text-gray-400" />
              </div>
              <div className="text-xs text-gray-500">Direct Trip</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Arrival</div>
              <div className="font-bold text-xl">{bus.arrival}</div>
              <div className="text-sm mt-1">{destination}</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {bus.amenities.map((amenity) => (
                <Badge key={amenity} className="flex items-center gap-1">
                  {amenityIcons[amenity as keyof typeof amenityIcons]}
                  <span className="capitalize">{amenity}</span>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Cancellation Policy</h4>
            <div className="text-sm text-gray-600">
              <ul className="list-disc pl-5 space-y-1">
                <li>Free cancellation up to 24 hours before departure</li>
                <li>50% refund if cancelled between 24 and 12 hours before departure</li>
                <li>No refund for cancellations less than 12 hours before departure</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

