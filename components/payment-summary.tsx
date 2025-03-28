import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

type PaymentSummaryProps = {
  bus: {
    name: string
    price: number
  }
}

export function PaymentSummary({ bus }: PaymentSummaryProps) {
  const baseFare = bus.price
  const tax = baseFare * 0.05 // GST for transport in India is 5%
  const serviceFee = 50
  const total = baseFare + tax + serviceFee

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Bus</span>
            <span>{bus.name}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Selected Seats</span>
            <span>2, 3</span>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Base Fare (2 seats)</span>
            <span>₹{(baseFare * 2).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">GST (5%)</span>
            <span>₹{(tax * 2).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Service Fee</span>
            <span>₹{serviceFee.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-b py-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{(total * 2).toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-green-500 h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Safe & Secure</h4>
              <p className="text-xs text-gray-600 mt-1">
                We use secure transmission and encrypted storage to protect your personal information.
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 space-y-2">
          <p>By completing this booking, you agree to our terms and conditions and cancellation policy.</p>
          <p>Cancellation charges may apply as per the policy mentioned earlier.</p>
        </div>
      </CardContent>
    </Card>
  )
}

