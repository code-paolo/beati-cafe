import { Hero } from "./_components/hero";
import { ProcessSection } from "./_components/process-section";
import { FeaturedProducts } from "./_components/featured-products";
import { ValuesSection } from "./_components/values-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { CtaSection } from "./_components/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProcessSection />
      <FeaturedProducts />
      <ValuesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
