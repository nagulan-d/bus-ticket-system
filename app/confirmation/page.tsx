import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, MapPin, Bus, User } from "lucide-react"

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { bookingId?: string }
}) {
  const { bookingId = "TN" + Math.random().toString(36).substring(2, 8).toUpperCase() } = searchParams

  // In a real app, this would be fetched from an API based on the booking ID
  const bookingDetails = {
    id: bookingId,
    status: "Confirmed",
    date: "2023-08-15",
    source: "Chennai",
    destination: "Coimbatore",
    busName: "TNSTC Volvo",
    busType: "A/C Sleeper",
    departureTime: "21:00",
    arrivalTime: "05:30",
    seats: ["2", "3"],
    passengers: [
      { name: "Rajesh Kumar", age: 32, gender: "Male" },
      { name: "Priya Rajesh", age: 28, gender: "Female" },
    ],
    totalAmount: 1785,
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your booking has been confirmed. Your booking ID is{" "}
            <span className="font-semibold">{bookingDetails.id}</span>
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">Date:</span>
              </div>
              <span className="font-medium">
                {new Date(bookingDetails.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-gray-600">From</div>
                    <div className="font-medium">{bookingDetails.source}</div>
                    <div className="text-sm text-gray-500">{bookingDetails.departureTime}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-gray-600">To</div>
                    <div className="font-medium">{bookingDetails.destination}</div>
                    <div className="text-sm text-gray-500">{bookingDetails.arrivalTime}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Bus className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{bookingDetails.busName}</div>
                  <div className="text-sm text-gray-500">{bookingDetails.busType}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div>
                  <div className="text-sm text-gray-600">Seats</div>
                  <div className="font-medium">{bookingDetails.seats.join(", ")}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                  <div className="font-medium">₹{bookingDetails.totalAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Passenger Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingDetails.passengers.map((passenger, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="font-medium">{passenger.name}</div>
                    <div className="text-sm text-gray-500">
                      {passenger.age} years | {passenger.gender}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Download Ticket
          </Button>
          <Button asChild>
            <Link href="/">Book Another Trip</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

