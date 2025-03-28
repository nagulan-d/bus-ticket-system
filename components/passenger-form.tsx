"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export function PassengerForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)

      // Show success toast
      toast({
        title: "Passenger details saved",
        description: "Please proceed to payment",
      })

      // In a real app, you would submit the form data to an API
      // and then navigate to the payment tab or page
      const tabsList = document.querySelector('[role="tablist"]') as HTMLElement
      const paymentTab = tabsList?.querySelector('[value="payment"]') as HTMLElement
      if (paymentTab) {
        paymentTab.click()
      }
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Contact Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile Number</Label>
            <Input id="phone" type="tel" placeholder="9876543210" required />
          </div>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="font-medium">Passenger 1 Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter passenger name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" min="1" max="120" placeholder="Age" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup defaultValue="male" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="font-medium">Passenger 2 Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name2">Full Name</Label>
            <Input id="name2" placeholder="Enter passenger name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age2">Age</Label>
            <Input id="age2" type="number" min="1" max="120" placeholder="Age" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup defaultValue="male" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male2" />
              <Label htmlFor="male2">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female2" />
              <Label htmlFor="female2">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other2" />
              <Label htmlFor="other2">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            I agree to the terms and conditions and cancellation policy
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Continue to Payment"}
      </Button>
    </form>
  )
}

