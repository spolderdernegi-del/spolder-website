import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

// Tüm içerikler (haberler, bloglar, vb.)
const allContent = [
  {
    id: "haber-1",
    type: "Haber",
    title: "Spor Ekonomisi Raporu 2024 Yayınlandı",
    excerpt: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı.",
    content: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı. Raporda spor sektörünün GSYH'ye katkısı, istihdam sayıları analiz edilmiştir.",
    date: "12 Aralık 2024",
    author: "SPOlDER Araştırma Ekibi",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80",
    category: "Araştırma",
    link: "/haber/1",
  },
  {
    id: "haber-2",
    type: "Haber",
    title: "Yerel Yönetimler ve Spor Forumu Gerçekleşti",
    excerpt: "Belediyelerin spor politikalarını ele aldığımız forum büyük ilgi gördü.",
    content: "Yerel Yönetimler ve Spor Forumu, 50'den fazla belediye temsilcisinin katılımıyla gerçekleşti.",
    date: "8 Aralık 2024",
    author: "SPOlDER Etkinlikler Ekibi",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=80",
    category: "Etkinlik",
    link: "/haber/2",
  },
  {
    id: "haber-3",
    type: "Haber",
    title: "Avrupa Spor Şartı Türkçe'ye Çevrildi",
    excerpt: "Avrupa Konseyi'nin yeni Spor Şartı'nın Türkçe çevirisi derneğimiz tarafından tamamlandı.",
    content: "Avrupa Konseyi tarafından kabul edilen yeni Spor Şartı'nın Türkçe çevirisi, SPOlDER tarafından tamamlanmıştır.",
    date: "5 Aralık 2024",
    author: "Çeviri Ekibi",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80",
    category: "Yayın",
    link: "/haber/3",
  },
  {
    id: "blog-1",
    type: "Blog",
    title: "Spor Politikalarında Yeni Yaklaşımlar",
    excerpt: "Modern spor politikalarının toplum üzerindeki etkilerini ele alan kapsamlı bir analiz.",
    content: "Modern spor politikalarının toplum üzerindeki etkileri, vizyonu, dijitalleşme ve yönetim anlayışı üzerine detaylı inceleme.",
    date: "28 Kasım 2024",
    author: "Dr. Ahmet Yılmaz",
    category: "Analiz",
    link: "/blog",
  },
  {
    id: "blog-2",
    type: "Blog",
    title: "Kadın Sporculara Destek Programları",
    excerpt: "Türkiye'de kadın sporcuların karşılaştığı zorluklar ve çözüm önerileri.",
    content: "Türkiye'de kadın sporcuların karşılaştığı zorluklar, fırsatlar ve çözüm önerileri üzerine kapsamlı değerlendirme.",
    date: "25 Kasım 2024",
    author: "Prof. Elif Kaya",
    category: "Araştırma",
    link: "/blog",
  },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Arama sonuçlarını filtrele
  const results = query
    ? allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.excerpt.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="container-custom mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Arama Sonuçları
            </h1>
            <p className="text-muted-foreground">
              "{query}" için <strong>{results.length}</strong> sonuç bulundu
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((item) => (
                  <Link
                    to={item.link}
                    key={item.id}
                    className="block bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                            {item.type}
                          </span>
                          <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-2 hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-foreground mb-2">Sonuç Bulunamadı</h2>
                <p className="text-muted-foreground mb-6">
                  "{query}" için uygun içerik bulunamadı. Lütfen arama teriminizi değiştirip tekrar deneyin.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
