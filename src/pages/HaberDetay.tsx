import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface News {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

const newsDatabase: News[] = [
  {
    id: 1,
    title: "Spor Ekonomisi Raporu 2024 Yayınlandı",
    excerpt: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı.",
    content: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı. Raporda spor sektörünün GSYH'ye katkısı, istihdam rakamları ve gelecek projeksiyonları detaylı şekilde analiz edildi. Araştırmamız, spor sektörünün Türkiye ekonomisindeki yerini ve potansiyelini ortaya koyuyor.\n\nRaporda öne çıkan bulgular arasında sporun ekonomik katkısının arttığı, ancak potansiyelin altında kaldığı görülüyor. Spor turizminin geliştirilmesi, spor tesislerinin etkin kullanımı ve profesyonel spor kulüplerinin finansal sürdürülebilirliği gibi konularda öneriler sunuluyor.",
    date: "12 Aralık 2024",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80",
    category: "Araştırma",
    author: "SPOLDER",
  },
  {
    id: 2,
    title: "Yerel Yönetimler ve Spor Forumu Gerçekleşti",
    excerpt: "Belediyelerin spor politikalarını ele aldığımız forum büyük ilgi gördü.",
    content: "Belediyelerin spor politikalarını ele aldığımız forum büyük ilgi gördü. 50'den fazla belediye temsilcisi katıldı. Forumda yerel yönetimlerin spor politikalarındaki rolü, bütçe planlaması ve tesis yönetimi konuları masaya yatırıldı.\n\nKatılımcılar, yerel spor politikalarının geliştirilmesi, spor tesislerinin toplum hizmeti açısından yönetimi ve spor kulüplerinin desteklenmesi konularında deneyimlerini paylaştı.",
    date: "8 Aralık 2024",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=80",
    category: "Etkinlik",
    author: "SPOLDER",
  },
  {
    id: 3,
    title: "Avrupa Spor Şartı Türkçe'ye Çevrildi",
    excerpt: "Avrupa Konseyi'nin yeni Spor Şartı'nın Türkçe çevirisi derneğimiz tarafından tamamlandı.",
    content: "Avrupa Konseyi'nin yeni Spor Şartı'nın Türkçe çevirisi derneğimiz tarafından tamamlandı. Şart, tüm bireylerin spor yapma hakkını ve sporla ilgili temel ilkeleri içeriyor. Çeviri çalışması, Türkiye'deki spor politikalarının geliştirilmesine katkı sağlayacak.\n\nSpor Şartı, herkes için spor, dopingle mücadele, sporun etik değerleri ve sporda şiddetin önlenmesi gibi konuları kapsıyor. Şartın Türkçe metni, politika yapıcılar ve spor yöneticileri için bir kaynak olacak.",
    date: "5 Aralık 2024",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80",
    category: "Yayın",
    author: "SPOLDER",
  },
  {
    id: 4,
    title: "Gençlik ve Spor Bakanlığı ile Protokol",
    excerpt: "Bakanlık ile spor politikaları alanında işbirliği protokolü imzalandı.",
    content: "Gençlik ve Spor Bakanlığı ile spor politikaları alanında işbirliği protokolü imzalandı. Protokol kapsamında araştırma projeleri, eğitim programları ve politika önerileri geliştirilecek.\n\nİşbirliği kapsamında spor politikalarının izlenmesi, değerlendirilmesi ve geliştirilmesi için ortak çalışmalar yürütülecek. Bakanlığın politika yapım sürecine akademik katkı sağlanması hedefleniyor.",
    date: "1 Aralık 2024",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80",
    category: "Kurumsal",
    author: "SPOLDER",
  },
  {
    id: 5,
    title: "Spor ve Medya Çalıştayı",
    excerpt: "Medya profesyonelleri ve spor yöneticilerinin katıldığı çalıştay başarıyla tamamlandı.",
    content: "Medya profesyonelleri ve spor yöneticilerinin katıldığı çalıştay başarıyla tamamlandı. Çalıştayda sporun medyada temsili, spor gazeteciliğinin geleceği ve dijital medyanın spor üzerindeki etkileri tartışıldı.\n\nKatılımcılar, spor medyasının kalitesinin artırılması, etik ilkelere uyulması ve dijital dönüşümün fırsatları konularında önerilerde bulundu.",
    date: "28 Kasım 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    category: "Etkinlik",
    author: "SPOLDER",
  },
  {
    id: 6,
    title: "Olimpik Hareket ve Türkiye Analizi",
    excerpt: "Türkiye'nin olimpik performansına ilişkin detaylı analiz raporumuz yayınlandı.",
    content: "Türkiye'nin olimpik performansına ilişkin detaylı analiz raporumuz yayınlandı. Raporda Türkiye'nin olimpiyat tarihindeki başarıları, güçlü ve geliştirilmesi gereken alanlar incelendi. Gelecek olimpiyatlar için stratejik öneriler sunuldu.\n\nAnaliz, Türkiye'nin olimpik hedeflerine ulaşması için sporcu yetiştirme sisteminin güçlendirilmesi, bilimsel destek mekanizmalarının geliştirilmesi ve uluslararası rekabete hazırlık süreçlerinin iyileştirilmesi gerektiğini gösteriyor.",
    date: "25 Kasım 2024",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
    category: "Araştırma",
    author: "SPOLDER",
  },
];

const HaberDetay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const haber = newsDatabase.find((n) => n.id === parseInt(id || "0"));

  if (!haber) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Haber Bulunamadı</h1>
            <Link to="/haberler">
              <Button>Haberler Sayfasına Dön</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Image */}
        <section className="relative h-96">
          <img
            src={haber.image}
            alt={haber.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom mx-auto">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                {haber.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                {haber.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{haber.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{haber.date}</span>
                  </div>
                </div>

                {/* Article Content */}
                <article className="prose prose-invert max-w-none mb-8">
                  {(haber.content || haber.excerpt).split("\n").map((paragraph, index) => (
                    <p key={index} className="text-foreground/90 text-lg leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </article>

                {/* Share & Back */}
                <div className="flex gap-4 py-8 border-t border-border">
                  <Button
                    onClick={() => navigate("/haberler")}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Haberler'e Dön
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="bg-card rounded-lg p-6 h-fit">
                <h3 className="font-display text-lg font-bold text-foreground mb-6">
                  İlgili Haberler
                </h3>
                <div className="space-y-4">
                  {(() => {
                    try {
                      const storedNews = localStorage.getItem('spolder_news');
                      if (!storedNews) return null;
                      const allNews: News[] = JSON.parse(storedNews);
                      return allNews
                        .filter((n) => n.id !== haber.id)
                        .slice(0, 3)
                        .map((relatedNews) => (
                          <Link
                            to={`/haber/${relatedNews.id}`}
                            key={relatedNews.id}
                            className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <h4 className="font-medium text-sm text-foreground hover:text-primary transition-colors line-clamp-2">
                              {relatedNews.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-2">{relatedNews.date}</p>
                          </Link>
                        ));
                    } catch {
                      return null;
                    }
                  })()}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HaberDetay;
