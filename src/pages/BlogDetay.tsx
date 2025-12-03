import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogDatabase = [
  {
    id: 1,
    title: "Spor Politikalarında Yeni Yaklaşımlar",
    excerpt: "Modern spor politikalarının toplum üzerindeki etkilerini ve gelecek vizyonunu ele alan kapsamlı bir analiz.",
    fullContent: "Modern spor politikalarının toplum üzerindeki etkilerini ve gelecek vizyonunu ele alan kapsamlı bir analiz. Spor, sadece bireysel başarı değil, toplumsal gelişim ve kalkınmanın da bir aracı olarak görülmeli. Yeni yaklaşımlar, katılımcılık, şeffaflık ve bilimselliği önemsiyor.\n\nBu yazıda, spor politikalarında yenilikçi yaklaşımların nasıl uygulanabileceği ve toplumsal etkisinin nasıl arttırılabileceği ele alınmaktadır.",
    date: "28 Kasım 2024",
    author: "Dr. Ahmet Yılmaz",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80",
    category: "Analiz",
  },
  {
    id: 2,
    title: "Kadın Sporculara Destek Programları",
    excerpt: "Türkiye'de kadın sporcuların karşılaştığı zorluklar ve çözüm önerileri üzerine bir değerlendirme.",
    fullContent: "Türkiye'de kadın sporcuların karşılaştığı zorluklar, fırsatlar ve çözüm önerileri üzerine kapsamlı bir değerlendirme. Kadın sporcuların eğitim, finansman ve kültürel destek konularında yaşadıkları engelleri ortadan kaldırmak için neler yapılabilir?\n\nDestek programları, mentorluk ve fırsat eşitliği sağlanması gerekmektedir.",
    date: "25 Kasım 2024",
    author: "Prof. Elif Kaya",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop&q=80",
    category: "Araştırma",
  },
  {
    id: 3,
    title: "Spor ve Sürdürülebilirlik",
    excerpt: "Çevre dostu spor tesisleri ve sürdürülebilir spor etkinlikleri hakkında güncel gelişmeler.",
    fullContent: "Çevre dostu spor tesisleri ve sürdürülebilir spor etkinlikleri hakkında güncel gelişmeler. Spor organizasyonları düşük karbon ayak izi ile gerçekleştirilmeli ve çevre koruma önlemleri alınmalıdır.\n\nSürdürülebilir spor, gelecek nesillerin de bu sporları yaşayabilmesi için oldukça önemlidir.",
    date: "20 Kasım 2024",
    author: "Mehmet Demir",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&auto=format&fit=crop&q=80",
    category: "Görüş",
  },
  {
    id: 4,
    title: "Dijital Dönüşüm ve Spor",
    excerpt: "Teknolojinin spor dünyasındaki dönüştürücü etkisi ve geleceğe yönelik öngörüler.",
    fullContent: "Teknolojinin spor dünyasındaki dönüştürücü etkisi ve geleceğe yönelik öngörüler. Yapay zeka, veri analizi ve dijital platformlar sporların nasıl oynanıp izlendiğini tamamen değiştirmiştir.\n\nGelecekteki spor deneyimleri daha interaktif ve erişilebilir olacaktır.",
    date: "15 Kasım 2024",
    author: "Zeynep Arslan",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    category: "Teknoloji",
  },
  {
    id: 5,
    title: "Engelli Sporculara Eşit Fırsatlar",
    excerpt: "Engelli bireylerin spora erişimi ve paralimpik hareketin Türkiye'deki gelişimi.",
    fullContent: "Engelli bireylerin spora erişimi ve paralimpik hareketin Türkiye'deki gelişimi. Her birey kabiliyetine bakılmaksızın spor yapma ve fiziksel aktivitelere katılma hakkına sahiptir.\n\nErişilebilir spor tesisleri ve programları tüm bireylerin katılımını sağlamalıdır.",
    date: "10 Kasım 2024",
    author: "Ali Öztürk",
    image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=1200&auto=format&fit=crop&q=80",
    category: "Sosyal",
  },
  {
    id: 6,
    title: "Gençlik ve Spor Kültürü",
    excerpt: "Z kuşağının spor alışkanlıkları ve spor kültürünün gençler arasında yaygınlaştırılması.",
    fullContent: "Z kuşağının spor alışkanlıkları ve spor kültürünün gençler arasında yaygınlaştırılması. Sosyal medya ve dijital platformlar gençlerin spor kültürüne katılımını etkilemektedir.\n\nGeleneksel spor türlerinin yanı sıra e-sporlar ve yeni spor aktiviteleri de gençleri çekmeye başlamıştır.",
    date: "5 Kasım 2024",
    author: "Selin Yıldız",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&auto=format&fit=crop&q=80",
    category: "Gençlik",
  },
];

const BlogDetay = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogDatabase.find((b) => b.id === parseInt(id || "0"));

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog Yazısı Bulunamadı</h1>
            <Link to="/blog">
              <Button>Blog Sayfasına Dön</Button>
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
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom mx-auto">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                {blog.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                {blog.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-8">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="max-w-3xl">
              <article className="prose prose-invert max-w-none mb-8">
                {blog.fullContent.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-foreground/90 text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </article>

              <div className="py-8 border-t border-border">
                <Button onClick={() => window.history.back()} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Geri Dön
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetay;
