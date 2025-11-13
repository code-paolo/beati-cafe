import { Heart, Leaf, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Every cup is crafted with love and dedication to the art of coffee.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We source ethically and support sustainable farming practices.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections and creating a space where everyone belongs.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Uncompromising standards from bean selection to final pour.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to excellence in every aspect of what we do
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border border-amber-100 hover:border-amber-300 bg-white"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-amber-700" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
