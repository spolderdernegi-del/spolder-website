import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Spor Ekonomisi Raporu 2024 Yayınlandı",
    description: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı. Raporda spor sektörünün GSYH'ye katkısı analiz edildi.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&auto=format&fit=crop&q=80",
    date: "12 Aralık 2024",
    category: "Araştırma",
  },
  {
    id: 2,
    title: "Yerel Yönetimler ve Spor Forumu Gerçekleşti",
    description: "Belediyelerin spor politikalarını ele aldığımız forum büyük ilgi gördü. 50'den fazla belediye temsilcisi katıldı.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&auto=format&fit=crop&q=80",
    date: "8 Aralık 2024",
    category: "Etkinlik",
  },
  {
    id: 3,
    title: "Avrupa Spor Şartı Türkçe'ye Çevrildi",
    description: "Avrupa Konseyi'nin yeni Spor Şartı'nın Türkçe çevirisi derneğimiz tarafından tamamlandı.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&auto=format&fit=crop&q=80",
    date: "5 Aralık 2024",
    category: "Yayın",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite/90 via-anthracite/60 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container-custom mx-auto px-4 md:px-8 flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-up">
          {/* Category Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            {slides[currentSlide].category}
          </span>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            {slides[currentSlide].title}
          </h1>

          {/* Description */}
          <p className="text-lg text-primary-foreground/90 leading-relaxed max-w-xl">
            {slides[currentSlide].description}
          </p>

          {/* Date */}
          <div className="flex items-center gap-2 text-primary-foreground/70">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{slides[currentSlide].date}</span>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-4">
            <Link to={`/haber/${slides[currentSlide].id}`}>
              <Button variant="hero" size="lg">
                Devamını Oku
              </Button>
            </Link>
            <Link to="/haberler">
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Tüm Haberler
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-3">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
