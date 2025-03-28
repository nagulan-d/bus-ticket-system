"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Smartphone, Landmark } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PaymentForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)

      // Generate a random booking ID
      const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase()

      // Navigate to confirmation page
      router.push(`/confirmation?bookingId=${bookingId}`)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="card" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Card
          </TabsTrigger>
          <TabsTrigger value="upi" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" /> UPI
          </TabsTrigger>
          <TabsTrigger value="netbanking" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" /> Net Banking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="card">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" type="password" placeholder="123" maxLength={3} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input id="nameOnCard" placeholder="John Doe" required />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upi">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" placeholder="yourname@upi" required />
              </div>

              <div className="text-sm text-gray-500 mt-2">
                <p>You will receive a payment request on your UPI app.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="netbanking">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Select Bank</Label>
                <RadioGroup defaultValue="sbi">
                  {[
                    { value: "sbi", label: "State Bank of India" },
                    { value: "hdfc", label: "HDFC Bank" },
                    { value: "icici", label: "ICICI Bank" },
                    { value: "axis", label: "Axis Bank" },
                    { value: "other", label: "Other Banks" },
                  ].map((bank) => (
                    <div key={bank.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={bank.value} id={bank.value} />
                      <Label htmlFor={bank.value}>{bank.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processing Payment..." : "Pay Now"}
      </Button>
    </form>
  )
}

