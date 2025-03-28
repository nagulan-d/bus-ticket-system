import { BusTripDetails } from "@/components/bus-trip-details"
import { SeatsLayout } from "@/components/seats-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentSummary } from "@/components/payment-summary"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BusDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { source?: string; destination?: string; date?: string }
}) {
  const { id } = params
  const { source = "Chennai", destination = "Coimbatore", date = "" } = searchParams

  // In a real app, this would be fetched from an API
  const bus = {
    id,
    name: id === "bus1" ? "TNSTC Volvo" : id === "bus2" ? "KPN Travels" : "SRS Travels",
    type: id === "bus1" ? "A/C Sleeper" : id === "bus2" ? "A/C Seater" : "A/C Sleeper Deluxe",
    departure: "21:00",
    arrival: "05:30",
    duration: "8h 30m",
    price: id === "bus1" ? 850 : id === "bus2" ? 750 : 950,
    rating: id === "bus1" ? 4.5 : id === "bus2" ? 4.7 : 4.6,
    amenities: ["wifi", "usb", "refreshments", "entertainment"],
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tomorrow"

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/search?source=${source}&destination=${destination}&date=${date}`}
          className="flex items-center text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to search results
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {source} to {destination}
        </h1>
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <BusTripDetails bus={bus} source={source} destination={destination} />

          <Card>
            <CardHeader>
              <CardTitle>Select Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <SeatsLayout busId={id} totalSeats={40} />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button asChild size="lg">
              <Link href={`/checkout?busId=${id}&source=${source}&destination=${destination}&date=${date}`}>
                Continue to Booking
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <PaymentSummary bus={bus} />
        </div>
      </div>
    </main>
  )
}

