import { teamMembers } from '@/app/data/team';
import { cafeInfo } from '@/app/data/cafe-info';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target, Users } from 'lucide-react';

export function About() {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Heart className="h-8 w-8 text-amber-700" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            More than just a cafe, we're a community
          </p>
        </div>

        {/* Story and Mission */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-700 p-2 rounded-lg mr-3">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Our Journey
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {cafeInfo.story}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-700 p-2 rounded-lg mr-3">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {cafeInfo.mission}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-amber-700" />
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h3>
            <p className="text-lg text-gray-600">
              The passionate people behind your favorite coffee
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-amber-700 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





