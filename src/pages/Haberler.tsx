import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    title: "Spor Ekonomisi Raporu 2024 Yayınlandı",
    excerpt: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı. Raporda spor sektörünün GSYH'ye katkısı analiz edildi.",
    date: "12 Aralık 2024",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80",
    category: "Araştırma",
  },
  {
    id: 2,
    title: "Yerel Yönetimler ve Spor Forumu Gerçekleşti",
    excerpt: "Belediyelerin spor politikalarını ele aldığımız forum büyük ilgi gördü. 50'den fazla belediye temsilcisi katıldı.",
    date: "8 Aralık 2024",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=80",
    category: "Etkinlik",
  },
  {
    id: 3,
    title: "Avrupa Spor Şartı Türkçe'ye Çevrildi",
    excerpt: "Avrupa Konseyi'nin yeni Spor Şartı'nın Türkçe çevirisi derneğimiz tarafından tamamlandı.",
    date: "5 Aralık 2024",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80",
    category: "Yayın",
  },
  {
    id: 4,
    title: "Gençlik ve Spor Bakanlığı ile Protokol",
    excerpt: "Bakanlık ile spor politikaları alanında işbirliği protokolü imzalandı.",
    date: "1 Aralık 2024",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80",
    category: "Kurumsal",
  },
  {
    id: 5,
    title: "Spor ve Medya Çalıştayı",
    excerpt: "Medya profesyonelleri ve spor yöneticilerinin katıldığı çalıştay başarıyla tamamlandı.",
    date: "28 Kasım 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    category: "Etkinlik",
  },
  {
    id: 6,
    title: "Olimpik Hareket ve Türkiye Analizi",
    excerpt: "Türkiye'nin olimpik performansına ilişkin detaylı analiz raporumuz yayınlandı.",
    date: "25 Kasım 2024",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
    category: "Araştırma",
  },
];

const Haberler = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-green py-20">
          <div className="container-custom mx-auto px-4 md:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Haberler
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              SPOlDER'den en güncel haberler ve gelişmeler
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <article key={item.id} className="bg-card rounded-lg overflow-hidden shadow-card card-hover">
                  <div className="relative h-52">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Devamı <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Daha Fazla Haber Yükle
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Haberler;
