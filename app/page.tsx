import { cmsGetFirst, cmsSearch } from '@/lib/api';
import type { HeroContent, AboutContent, FaqItem } from '@/lib/types';
import HeroSection from '@/components/sections/HeroSection';
import ProductsSection from '@/components/sections/ProductsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import AboutSection from '@/components/sections/AboutSection';
import FaqSection from '@/components/sections/FaqSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';

export const revalidate = 60;

export default async function HomePage() {
  // Fetch all CMS data in parallel — fallback gracefully if CMS unavailable
  const [hero, about, faqs] = await Promise.all([
    cmsGetFirst<HeroContent>('cp_hero').catch(() => null),
    cmsGetFirst<AboutContent>('cp_about').catch(() => null),
    cmsSearch<FaqItem>('cp_faq', {
      orderBy: { field: 'order_index', sort: 'asc' },
    }).catch(() => []),
  ]);

  return (
    <>
      {/* Hero / Home */}
      <HeroSection data={hero} />

      {/* Product Catalog */}
      <ProductsSection />

      {/* About GlamComm */}
      <AboutSection data={about} />

      {/* Past Events Portfolio — uses built-in EO fallback until CMS is populated with event data */}
      <PortfolioSection />

      {/* Client Testimonials — uses built-in GlamComm testimonials */}
      <TestimonialsSection items={[]} />

      {/* FAQ */}
      <FaqSection items={faqs} />

      {/* Contact / Get a Quote */}
      <ContactSection />
    </>
  );
}
