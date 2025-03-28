import { Suspense } from "react"
import { BusSearchResults } from "@/components/bus-search-results"
import { BusSearchFilters } from "@/components/bus-search-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HomeSearchForm } from "@/components/home-search-form"
import { ArrowLeft } from "lucide-react"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { source?: string; destination?: string; date?: string }
}) {
  const { source = "", destination = "", date = "" } = searchParams

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <HomeSearchForm />
        </CardContent>
      </Card>

      {source && destination ? (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">
                {source} to {destination}
              </h1>
              <div className="text-sm text-gray-500">{formattedDate}</div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Button variant="link" className="p-0 h-auto text-primary" asChild>
                <a href={`/search?source=${destination}&destination=${source}&date=${date}`}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> View return buses
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <BusSearchFilters />
            </div>
            <div className="lg:col-span-3">
              <Suspense fallback={<div>Loading buses...</div>}>
                <BusSearchResults source={source} destination={destination} date={date} />
              </Suspense>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Search for Bus Tickets</h1>
          <p className="text-gray-500 mb-8">Please select your source, destination and travel date to find buses.</p>
        </div>
      )}
    </main>
  )
}

