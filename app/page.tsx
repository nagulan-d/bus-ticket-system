import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Bus, Calendar } from "lucide-react"
import { HomeSearchForm } from "@/components/home-search-form"
import { PopularRoutes } from "@/components/popular-routes"
import { FeaturedBuses } from "@/components/featured-buses"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Bus Tickets Online</h1>
              <p className="text-lg mb-8 opacity-90">
                Simple, fast & convenient way to book bus tickets in Tamil Nadu.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <HomeSearchForm />
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Bus travel illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Routes</h2>
          <PopularRoutes />
        </div>
      </section>

      {/* Featured Buses */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Bus Services</h2>
          <FeaturedBuses />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Booking",
                description: "Book your bus tickets in just a few clicks with our simple interface.",
                icon: <Search className="h-10 w-10 text-primary" />,
              },
              {
                title: "Secure Payments",
                description: "Multiple secure payment options with instant confirmation.",
                icon: <Bus className="h-10 w-10 text-primary" />,
              },
              {
                title: "24/7 Support",
                description: "Our support team is available around the clock to assist you.",
                icon: <Calendar className="h-10 w-10 text-primary" />,
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90">Sign up now and get special offers on your first booking</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              <Link href="/sign-up">Sign Up Now</Link>
            </Button>
            <Button variant="secondary" size="lg">
              <Link href="/search">Search Buses</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

