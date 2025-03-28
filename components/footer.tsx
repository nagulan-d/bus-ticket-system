import Link from "next/link"
import { Bus, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bus className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TN Bus</span>
            </div>
            <p className="text-gray-600 text-sm">
              Book bus tickets online for travel across Tamil Nadu. Find the best deals on bus tickets.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Bus Tickets", href: "/search" },
                { label: "My Bookings", href: "/bookings" },
                { label: "Offers", href: "/offers" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Routes</h3>
            <ul className="space-y-2">
              {[
                { label: "Chennai to Coimbatore", href: "/search?source=Chennai&destination=Coimbatore" },
                { label: "Chennai to Madurai", href: "/search?source=Chennai&destination=Madurai" },
                { label: "Coimbatore to Chennai", href: "/search?source=Coimbatore&destination=Chennai" },
                { label: "Madurai to Chennai", href: "/search?source=Madurai&destination=Chennai" },
                { label: "Salem to Coimbatore", href: "/search?source=Salem&destination=Coimbatore" },
              ].map((route, i) => (
                <li key={i}>
                  <Link href={route.href} className="text-gray-600 hover:text-primary text-sm">
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2">
              {[
                { label: "FAQs", href: "/faqs" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Refund Policy", href: "/refund" },
                { label: "Contact Support", href: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-gray-600 hover:text-primary text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} TN Bus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

