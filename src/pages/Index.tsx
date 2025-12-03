import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import MissionVisionValues from "@/components/home/MissionVisionValues";
import AboutSection from "@/components/home/AboutSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSlider />
        <MissionVisionValues />
        <AboutSection />
        <NewsEventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
