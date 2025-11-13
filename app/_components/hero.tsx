import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee, ArrowRight } from 'lucide-react';
import { cafeInfo } from '@/app/data/cafe-info';

export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo Icon */}
          <div className="flex justify-center mb-8" data-aos="fade-down">
            <div className="bg-amber-700 p-6 rounded-full shadow-2xl">
              <Coffee className="h-16 w-16 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6" data-aos="fade-up" data-aos-delay="100">
            {cafeInfo.name}
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-8 font-light" data-aos="fade-up" data-aos-delay="200">
            {cafeInfo.tagline}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            Experience the perfect blend of comfort and quality. From artisan
            coffee to freshly baked pastries, we craft every moment with care.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="400">
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-white hover:bg-amber-50 border-2 border-amber-700 text-amber-800 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                Explore Menu
              </Button>
            </Link>
          </div>

          {/* Opening Hours Quick Info */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="500">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <p className="text-sm text-gray-600 mb-1">Weekdays</p>
              <p className="font-semibold text-gray-900">{cafeInfo.hours.weekdays}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md">
              <p className="text-sm text-gray-600 mb-1">Weekends</p>
              <p className="font-semibold text-gray-900">{cafeInfo.hours.weekends}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-aos="fade-up" data-aos-delay="600">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
