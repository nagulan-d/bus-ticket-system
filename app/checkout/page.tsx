import { PassengerForm } from "@/components/passenger-form"
import { PaymentForm } from "@/components/payment-form"
import { PaymentSummary } from "@/components/payment-summary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { busId?: string; source?: string; destination?: string; date?: string }
}) {
  const { busId = "bus1", source = "Chennai", destination = "Coimbatore", date = "" } = searchParams

  // In a real app, this would be fetched from an API
  const bus = {
    id: busId,
    name: busId === "bus1" ? "TNSTC Volvo" : busId === "bus2" ? "KPN Travels" : "SRS Travels",
    type: busId === "bus1" ? "A/C Sleeper" : busId === "bus2" ? "A/C Seater" : "A/C Sleeper Deluxe",
    departure: "21:00",
    arrival: "05:30",
    duration: "8h 30m",
    price: busId === "bus1" ? 850 : busId === "bus2" ? 750 : 950,
    rating: busId === "bus1" ? 4.5 : busId === "bus2" ? 4.7 : 4.6,
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
          href={`/bus/${busId}?source=${source}&destination=${destination}&date=${date}`}
          className="flex items-center text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to seat selection
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Complete Your Booking</h1>
        <div className="text-sm text-gray-500">
          {source} to {destination} | {formattedDate} | {bus.name}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="passenger" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="passenger">Passenger Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="passenger">
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <PassengerForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <PaymentSummary bus={bus} />
        </div>
      </div>
    </main>
  )
}

