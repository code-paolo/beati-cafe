"use client";

import { testimonials } from "@/app/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { CustomMarquee } from "@/components/custom-marquee";
import { Quote, Star } from "lucide-react";

// Helper function to censor names for privacy
function censorName(name: string): string {
  const parts = name.split(" ");
  return parts
    .map((part) => {
      if (part.length <= 2) {
        return part[0] + "*";
      } else if (part.length === 3) {
        return part[0] + "*" + part[2];
      } else {
        const stars = "*".repeat(part.length - 2);
        return part[0] + stars + part[part.length - 1];
      }
    })
    .join(" ");
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <Card className="w-[380px] group hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 bg-white rounded-2xl flex-shrink-0">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Top Section - Quote Icon & Rating */}
        <div className="flex items-start justify-between mb-4">
          <Quote className="h-10 w-10 text-amber-400 opacity-50" />
          <div className="flex gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
            ))}
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed mb-4 text-sm flex-grow">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="pt-3 border-t border-gray-200">
          <p className="font-bold text-gray-900 text-sm">
            {censorName(testimonial.name)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialCardAlt({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <Card className="w-[380px] group hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-2xl flex-shrink-0">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Top Section - Quote Icon & Rating */}
        <div className="flex items-start justify-between mb-4">
          <Quote className="h-10 w-10 text-amber-500 opacity-50" />
          <div className="flex gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
            ))}
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed mb-4 text-sm flex-grow">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="pt-3 border-t border-amber-200">
          <p className="font-bold text-gray-900 text-sm">
            {censorName(testimonial.name)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Quote className="h-8 w-8 text-amber-700" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from our valued community
          </p>
        </div>
      </div>

      {/* Marquee Container with padding to prevent cropping */}
      <div className="space-y-8 py-6">
        {/* Row 1 - Moves to the RIGHT → */}
        <CustomMarquee direction="right" speed={120} pauseOnHover={true} gap="2rem">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
          ))}
        </CustomMarquee>

        {/* Row 2 - Moves to the LEFT ← */}
        <CustomMarquee direction="left" speed={120} pauseOnHover={true} gap="2rem">
          {testimonials.map((testimonial, index) => (
            <TestimonialCardAlt
              key={`row2-${index}`}
              testimonial={testimonial}
            />
          ))}
        </CustomMarquee>
      </div>
    </section>
  );
}
