"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type SeatsLayoutProps = {
  busId: string
  totalSeats: number
}

export function SeatsLayout({ busId, totalSeats }: SeatsLayoutProps) {
  // In a real app, this would come from an API
  const [bookedSeats] = useState<number[]>([3, 7, 12, 15, 18, 23, 28, 31, 34, 37])
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])

  const isBusSleeper = busId === "bus1" || busId === "bus3"

  // Generate seat layout based on bus type
  const generateSeats = () => {
    if (isBusSleeper) {
      // Sleeper bus layout - typical Tamil Nadu sleeper bus layout with upper and lower berths
      const lowerDeck = Array.from({ length: Math.min(totalSeats, 20) }, (_, i) => i + 1)
      const upperDeck = totalSeats > 20 ? Array.from({ length: totalSeats - 20 }, (_, i) => i + 21) : []

      return (
        <div className="space-y-8">
          {upperDeck.length > 0 && (
            <div>
              <h3 className="font-medium mb-4">Upper Deck</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {upperDeck.filter((num) => num % 2 !== 0).map((seatNum) => renderSeat(seatNum))}
                </div>
                <div className="space-y-2">
                  {upperDeck.filter((num) => num % 2 === 0).map((seatNum) => renderSeat(seatNum))}
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-4">Lower Deck</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {lowerDeck.filter((num) => num % 2 !== 0).map((seatNum) => renderSeat(seatNum))}
              </div>
              <div className="space-y-2">
                {lowerDeck.filter((num) => num % 2 === 0).map((seatNum) => renderSeat(seatNum))}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      // Regular seater bus layout - typical Tamil Nadu seater layout (2+2 with aisle)
      const seats = Array.from({ length: totalSeats }, (_, i) => i + 1)
      const rows = Math.ceil(totalSeats / 4)

      return (
        <div>
          <div className="flex justify-center mb-8">
            <div className="border rounded p-2 text-sm">Driver</div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {seats.map((seatNum) => (
              <div
                key={seatNum}
                className={cn(
                  "flex justify-center",
                  seatNum % 4 === 3 && "pr-6", // Aisle on the right side
                )}
              >
                {renderSeat(seatNum)}
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  const renderSeat = (seatNum: number) => {
    const isBooked = bookedSeats.includes(seatNum)
    const isSelected = selectedSeats.includes(seatNum)

    return (
      <button
        key={seatNum}
        disabled={isBooked}
        onClick={() => toggleSeatSelection(seatNum)}
        className={cn(
          "w-12 h-12 border rounded-md flex items-center justify-center relative",
          isBooked && "bg-gray-200 cursor-not-allowed",
          isSelected && "bg-primary text-white",
          !isBooked && !isSelected && "hover:border-primary",
        )}
      >
        {seatNum}
        {isBusSleeper && (
          <div className="absolute -top-2 -right-2">
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                isBooked ? "bg-red-500" : isSelected ? "bg-green-500" : "bg-gray-300",
              )}
            />
          </div>
        )}
      </button>
    )
  }

  const toggleSeatSelection = (seatNum: number) => {
    setSelectedSeats((prev) => (prev.includes(seatNum) ? prev.filter((num) => num !== seatNum) : [...prev, seatNum]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center space-x-8 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border rounded"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 border rounded"></div>
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary border rounded"></div>
          <span className="text-sm">Selected</span>
        </div>
      </div>

      <div className="overflow-x-auto py-4">{generateSeats()}</div>

      {selectedSeats.length > 0 && (
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between mb-4">
            <span>Selected Seats:</span>
            <span className="font-medium">{selectedSeats.sort((a, b) => a - b).join(", ")}</span>
          </div>
          <div className="text-sm text-gray-600">
            Total amount: <span className="font-medium">₹{selectedSeats.length * 850}</span>
          </div>
        </div>
      )}
    </div>
  )
}

