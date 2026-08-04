import { CallToAction } from "@/components/home/CallToAction";
import { FeaturesSection } from "@/components/home/FeatureSection";
import { Footer } from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { Navbar } from "@/components/home/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff9ee]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CallToAction/>
      </main>
      <Footer />
    </div>
  );
}