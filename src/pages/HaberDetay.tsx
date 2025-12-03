import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsDatabase = [
  {
    id: 1,
    title: "Spor Ekonomisi Raporu 2024 Yayınlandı",
    excerpt: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı. Raporda spor sektörünün GSYH'ye katkısı analiz edildi.",
    fullContent: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı. Raporda spor sektörünün GSYH'ye katkısı, istihdam sayıları ve sektörün gelecek projeksiyonları ayrıntılı biçimde analiz edilmiştir.\n\nRapor, spor endüstrisinin Türkiye ekonomisindeki rolünü ve potansiyelini ortaya koymakta, karar alıcılara bilimsel temelli öneriler sunmaktadır. Araştırmaya katkı sağlayan akademisyen, araştırmacı ve spor yöneticilerine teşekkür ederiz.",
    date: "12 Aralık 2024",
    author: "SPOlDER Araştırma Ekibi",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&auto=format&fit=crop&q=80",
    category: "Araştırma",
  },
  {
    id: 2,
    title: "Yerel Yönetimler ve Spor Forumu Gerçekleşti",
    excerpt: "Belediyelerin spor politikalarını ele aldığımız forum büyük ilgi gördü. 50'den fazla belediye temsilcisi katıldı.",
    fullContent: "Yerel Yönetimler ve Spor Forumu, Türkiye'nin çeşitli bölgelerinden 50'den fazla belediye temsilcisinin katılımıyla gerçekleşti. Forumdaki tartışmalar, belediyelerin spor tesisi yatırımları, halka açık spor alanları ve spor politikaları konularını kapsamıştır.\n\nForum sonucunda, belediyelerin spor yatırımlarına ilişkin ortak öneriler ve iyi uygulama örnekleri belgelenmiştir.",
    date: "8 Aralık 2024",
    author: "SPOlDER Etkinlikler Ekibi",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&auto=format&fit=crop&q=80",
    category: "Etkinlik",
  },
  {
    id: 3,
    title: "Avrupa Spor Şartı Türkçe'ye Çevrildi",
    excerpt: "Avrupa Konseyi'nin yeni Spor Şartı'nın Türkçe çevirisi derneğimiz tarafından tamamlandı.",
    fullContent: "Avrupa Konseyi tarafından kabul edilen yeni Spor Şartı'nın Türkçe çevirisi, SPOlDER tarafından tamamlanmıştır. Bu çevirinin, ulusal spor politikası yapıcılarına ve spor camiasının paydaşlarına önemli bir kaynak olacağı düşünülmektedir.",
    date: "5 Aralık 2024",
    author: "Çeviri Ekibi",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&auto=format&fit=crop&q=80",
    category: "Yayın",
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
                  {haber.fullContent.split("\n\n").map((paragraph, index) => (
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
                  {newsDatabase
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
                    ))}
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
