"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export function HomeSearchForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!source || !destination || !date) return

    const searchParams = new URLSearchParams({
      source,
      destination,
      date: date.toISOString().split("T")[0],
    })

    router.push(`/search?${searchParams.toString()}`)
  }

  const tamilNaduCities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Thoothukudi",
    "Tiruppur",
    "Erode",
    "Vellore",
    "Thanjavur",
    "Dindigul",
    "Ranipet",
    "Sivakasi",
    "Karur",
    "Ooty",
    "Hosur",
    "Nagercoil",
    "Kanchipuram",
    "Kumarapalayam",
  ]

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          From
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger id="source" className="w-full pl-10 text-left">
              <SelectValue placeholder="Select source city" />
            </SelectTrigger>
            <SelectContent>
              {tamilNaduCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination" className="w-full pl-10 text-left">
              <SelectValue placeholder="Select destination city" />
            </SelectTrigger>
            <SelectContent>
              {tamilNaduCities
                .filter((city) => city !== source)
                .map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date of Journey
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full pl-10 text-left font-normal relative bg-white", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              {date ? format(date, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">
        Search Buses
      </Button>
    </form>
  )
}

