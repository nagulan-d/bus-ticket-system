import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function BookingsPage() {
  // In a real app, this would be fetched from an API
  const bookings = [
    {
      id: "TN8X4Z2Y",
      status: "Upcoming",
      date: "2023-08-15",
      source: "Chennai",
      destination: "Coimbatore",
      busName: "TNSTC Volvo",
      departureTime: "21:00",
      arrivalTime: "05:30",
      seats: ["2", "3"],
      totalAmount: 1785,
    },
    {
      id: "TN7P9Q3R",
      status: "Completed",
      date: "2023-07-20",
      source: "Madurai",
      destination: "Chennai",
      busName: "KPN Travels",
      departureTime: "22:30",
      arrivalTime: "06:15",
      seats: ["12"],
      totalAmount: 750,
    },
    {
      id: "TN5L2M4N",
      status: "Cancelled",
      date: "2023-06-10",
      source: "Coimbatore",
      destination: "Tirunelveli",
      busName: "SRS Travels",
      departureTime: "20:00",
      arrivalTime: "04:30",
      seats: ["8", "9"],
      totalAmount: 1600,
      refundAmount: 1440,
    },
  ]

  const upcomingBookings = bookings.filter((booking) => booking.status === "Upcoming")
  const completedBookings = bookings.filter((booking) => booking.status === "Completed")
  const cancelledBookings = bookings.filter((booking) => booking.status === "Cancelled")

  const renderBookingCard = (booking: (typeof bookings)[0]) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-500">Booking ID: {booking.id}</span>
              {booking.status === "Upcoming" && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Upcoming
                </Badge>
              )}
              {booking.status === "Completed" && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Completed
                </Badge>
              )}
              {booking.status === "Cancelled" && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Cancelled
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-bold">
              {booking.source} to {booking.destination}
            </h3>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">
              {new Date(booking.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm text-gray-600">From</div>
              <div className="font-medium">{booking.source}</div>
              <div className="text-sm text-gray-500">{booking.departureTime}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm text-gray-600">To</div>
              <div className="font-medium">{booking.destination}</div>
              <div className="text-sm text-gray-500">{booking.arrivalTime}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm text-gray-600">Bus</div>
              <div className="font-medium">{booking.busName}</div>
              <div className="text-sm text-gray-500">Seats: {booking.seats.join(", ")}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t">
          <div className="mb-4 sm:mb-0">
            <div className="text-sm text-gray-600">Total Amount</div>
            <div className="font-medium">₹{booking.totalAmount.toFixed(2)}</div>
            {booking.refundAmount && (
              <div className="text-sm text-green-600">Refunded: ₹{booking.refundAmount.toFixed(2)}</div>
            )}
          </div>

          <div className="flex gap-2">
            {booking.status === "Upcoming" && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/confirmation?bookingId=${booking.id}`}>
                    <ExternalLink className="h-4 w-4 mr-1" /> View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  Cancel
                </Button>
              </>
            )}
            {booking.status === "Completed" && (
              <Button variant="outline" size="sm" asChild>
                <Link href="#">
                  <Download className="h-4 w-4 mr-1" /> Download
                </Link>
              </Button>
            )}
            {booking.status === "Cancelled" && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/confirmation?bookingId=${booking.id}`}>
                  <ExternalLink className="h-4 w-4 mr-1" /> View
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Upcoming <span className="ml-1 text-xs">({upcomingBookings.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed <span className="ml-1 text-xs">({completedBookings.length})</span>
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled <span className="ml-1 text-xs">({cancelledBookings.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(renderBookingCard)
            ) : (
              <div className="text-center py-12">
                <div className="text-xl font-semibold mb-2">No upcoming bookings</div>
                <p className="text-gray-500 mb-6">You don't have any upcoming trips</p>
                <Button asChild>
                  <Link href="/">Book a Trip</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedBookings.length > 0 ? (
              completedBookings.map(renderBookingCard)
            ) : (
              <div className="text-center py-12">
                <div className="text-xl font-semibold mb-2">No completed bookings</div>
                <p className="text-gray-500">You haven't completed any trips yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map(renderBookingCard)
            ) : (
              <div className="text-center py-12">
                <div className="text-xl font-semibold mb-2">No cancelled bookings</div>
                <p className="text-gray-500">You don't have any cancelled bookings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

