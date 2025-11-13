import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { cafeInfo } from "@/app/data/cafe-info";

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-700 to-orange-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-aos="fade-up">
            Ready for Your Perfect Cup?
          </h2>
          <p className="text-xl mb-12 text-amber-50" data-aos="fade-up" data-aos-delay="100">
            Visit us today and experience the difference that passion and
            quality make
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" data-aos="fade-up" data-aos-delay="200">
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-white text-amber-800 hover:bg-amber-50 hover:text-amber-900 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                View Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-amber-900 text-white hover:bg-amber-950 border-2 border-amber-900 hover:border-amber-950 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                Find Us
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30" data-aos="fade-right" data-aos-delay="300">
              <MapPin className="h-6 w-6 mb-3 mx-auto text-white" />
              <p className="font-semibold mb-1 text-white">Visit Us</p>
              <p className="text-sm text-white/90">{cafeInfo.address}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30" data-aos="fade-left" data-aos-delay="300">
              <Phone className="h-6 w-6 mb-3 mx-auto text-white" />
              <p className="font-semibold mb-1 text-white">Call Us</p>
              <p className="text-sm text-white/90">{cafeInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
