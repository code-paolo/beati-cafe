import { Coffee, Droplets, ThermometerSun, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ProcessSection() {
  const steps = [
    {
      icon: Coffee,
      title: 'Source',
      description: 'We carefully select premium beans from sustainable farms around the world.',
      color: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
    {
      icon: ThermometerSun,
      title: 'Roast',
      description: 'Our master roasters craft the perfect roast profile for each origin.',
      color: 'bg-orange-100',
      iconColor: 'text-orange-700',
    },
    {
      icon: Droplets,
      title: 'Brew',
      description: 'Expert baristas prepare each cup with precision and passion.',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-700',
    },
    {
      icon: Sparkles,
      title: 'Enjoy',
      description: 'Experience the perfect cup in our cozy, welcoming atmosphere.',
      color: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Coffee className="h-8 w-8 text-amber-700" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From bean to cup, we ensure every step delivers exceptional quality
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative" data-aos="fade-up" data-aos-delay={index * 100}>
                {/* Connecting Line - Hidden on mobile, shown on larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-amber-200 to-transparent" />
                )}
                
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-amber-50/30 h-full">
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${step.iconColor}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
