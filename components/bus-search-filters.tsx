"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function BusSearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [departureTime, setDepartureTime] = useState<string>("")
  const [busType, setBusType] = useState<string>("")

  const busTypes = [
    { id: "ac-sleeper", label: "A/C Sleeper" },
    { id: "non-ac-sleeper", label: "Non-A/C Sleeper" },
    { id: "ac-seater", label: "A/C Seater" },
    { id: "non-ac-seater", label: "Non-A/C Seater" },
    { id: "volvo", label: "Volvo" },
  ]

  const amenities = [
    { id: "wifi", label: "WiFi" },
    { id: "charging", label: "Charging Point" },
    { id: "entertainment", label: "Entertainment" },
    { id: "refreshments", label: "Refreshments" },
    { id: "blanket", label: "Blanket" },
  ]

  const handleReset = () => {
    setPriceRange([0, 2000])
    setDepartureTime("")
    setBusType("")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Filters</span>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible defaultValue="price" className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-2">
                <Slider
                  value={priceRange}
                  min={0}
                  max={2000}
                  step={100}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="departure">
            <AccordionTrigger className="text-base font-medium">Departure Time</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-2 space-y-3">
                <Select value={departureTime} onValueChange={setDepartureTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (06:00 - 12:00)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12:00 - 16:00)</SelectItem>
                    <SelectItem value="evening">Evening (16:00 - 20:00)</SelectItem>
                    <SelectItem value="night">Night (20:00 - 06:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bustype">
            <AccordionTrigger className="text-base font-medium">Bus Type</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-2 space-y-3">
                <Select value={busType} onValueChange={setBusType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select bus type" />
                  </SelectTrigger>
                  <SelectContent>
                    {busTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="amenities">
            <AccordionTrigger className="text-base font-medium">Amenities</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-2 space-y-3">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox id={amenity.id} />
                    <Label htmlFor={amenity.id} className="text-sm font-normal">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="operators">
            <AccordionTrigger className="text-base font-medium">Bus Operators</AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 pb-2 space-y-3">
                {[
                  { id: "tnstc", label: "TNSTC" },
                  { id: "kpn", label: "KPN Travels" },
                  { id: "srs", label: "SRS Travels" },
                  { id: "ybm", label: "YBM Travels" },
                  { id: "parveen", label: "Parveen Travels" },
                ].map((operator) => (
                  <div key={operator.id} className="flex items-center space-x-2">
                    <Checkbox id={operator.id} />
                    <Label htmlFor={operator.id} className="text-sm font-normal">
                      {operator.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}

