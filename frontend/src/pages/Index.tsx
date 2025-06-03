import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturesSection } from '@/components/FeaturesSection';
import { WorkshopStatsSection } from '@/components/WorkshopStatsSection';
import { Sponsors } from '@/components/Sponsors';
import { Footer } from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <main id="content" className="relative">
        <FeaturesSection />
        <WorkshopStatsSection />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
