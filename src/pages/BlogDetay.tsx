import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const blogDatabase: BlogPost[] = [
  {
    id: 1,
    title: "Spor Politikalarında Yeni Yaklaşımlar",
    excerpt: "Modern spor politikalarının toplum üzerindeki etkilerini ve gelecek vizyonunu ele alan kapsamlı bir analiz.",
    content: "Modern spor politikalarının toplum üzerindeki etkilerini ve gelecek vizyonunu ele alan kapsamlı bir analiz. Spor, sadece fiziksel bir aktivite olmaktan çıkıp toplumsal dönüşümün bir aracı haline gelmiştir.\n\nSpor politikaları, toplumsal cinsiyet eşitliği, sosyal içerme, sağlıklı yaşam ve ekonomik kalkınma gibi alanlarda önemli bir rol oynamaktadır. Günümüzde spor politikalarının tasarımında katılımcılık, sürdürülebilirlik ve erişilebilirlik ilkeleri ön plana çıkmaktadır.\n\nGelecekte spor politikalarının daha kapsayıcı, veri odaklı ve toplumun tüm kesimlerine ulaşan bir yapıda olması beklenmektedir.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
    author: "Dr. Ahmet Yılmaz",
    date: "28 Kasım 2024",
    category: "Analiz",
  },
  {
    id: 2,
    title: "Kadın Sporculara Destek Programları",
    excerpt: "Türkiye'de kadın sporcuların karşılaştığı zorluklar ve çözüm önerileri üzerine bir değerlendirme.",
    content: "Türkiye'de kadın sporcuların karşılaştığı zorluklar ve çözüm önerileri üzerine bir değerlendirme. Kadınların spora katılımı, toplumsal cinsiyet eşitliği açısından kritik bir göstergedir.\n\nKadın sporcular, sosyal baskı, ekonomik zorluklar, tesis eksikliği ve temsil sorunları gibi birçok engellekarşılaşmaktadır. Bu engellerin aşılması için kapsamlı politika ve program desteğine ihtiyaç vardır.\n\nMentorluk programları, burs destekleri, tesis yatırımları ve farkındalık kampanyaları, kadınların spora katılımını artırmanın etkili yollarıdır. Başarılı kadın sporcuların rol model olması da gençlerin spora yönelmesinde önemli bir faktördür.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
    author: "Prof. Elif Kaya",
    date: "25 Kasım 2024",
    category: "Araştırma",
  },
  {
    id: 3,
    title: "Spor ve Sürdürülebilirlik",
    excerpt: "Çevre dostu spor tesisleri ve sürdürülebilir spor etkinlikleri hakkında güncel gelişmeler.",
    content: "Çevre dostu spor tesisleri ve sürdürülebilir spor etkinlikleri hakkında güncel gelişmeler. İklim değişikliği ve çevre sorunları, spor sektörünü de yakından ilgilendirmektedir.\n\nSpor tesislerinin enerji tüketimi, büyük organizasyonların karbon ayak izi ve doğal kaynakların kullanımı, sürdürülebilirlik açısından önemli konulardır. Yeşil binalar, yenilenebilir enerji kullanımı ve atık yönetimi gibi uygulamalar yaygınlaşmaktadır.\n\nUluslararası spor organizasyonları, sürdürülebilirlik kriterlerini şartlarına ekleyerek sektörü dönüştürmeye çalışmaktadır. Türkiye'de de yerel ve ulusal düzeyde çevre dostu spor politikalarının geliştirilmesi gerekmektedir.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop",
    author: "Mehmet Demir",
    date: "20 Kasım 2024",
    category: "Görüş",
  },
  {
    id: 4,
    title: "Dijital Dönüşüm ve Spor",
    excerpt: "Teknolojinin spor dünyasındaki dönüştürücü etkisi ve geleceğe yönelik öngörüler.",
    content: "Teknolojinin spor dünyasındaki dönüştürücü etkisi ve geleceğe yönelik öngörüler. Dijital teknolojiler, sporun her alanında köklü değişimlere yol açmaktadır.\n\nYapay zeka, büyük veri analitiği, giyilebilir teknolojiler ve sanal gerçeklik, sporcuların performansını artırmak, antrenman yöntemlerini geliştirmek ve taraftar deneyimini zenginleştirmek için kullanılmaktadır.\n\nE-spor'un yükselişi, dijitalleşmenin spor kavramını nasıl genişlettiğinin önemli bir göstergesidir. Gelecekte teknoloji ve sporun entegrasyonunun daha da derinleşmesi beklenmektedir.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    author: "Zeynep Arslan",
    date: "15 Kasım 2024",
    category: "Teknoloji",
  },
  {
    id: 5,
    title: "Engelli Sporculara Eşit Fırsatlar",
    excerpt: "Engelli bireylerin spora erişimi ve paralimpik hareketin Türkiye'deki gelişimi.",
    content: "Engelli bireylerin spora erişimi ve paralimpik hareketin Türkiye'deki gelişimi. Her birey, kabiliyetine bakılmaksızın spor yapma ve fiziksel aktivitelere katılma hakkına sahiptir.\n\nErişilebilir spor tesisleri, özel eğitim programları ve destek hizmetleri, engelli bireylerin spora katılımı için kritik öneme sahiptir. Paralimpik hareket, engelli sporcuların yeteneklerini sergileyebilecekleri platformlar sunmaktadır.\n\nTürkiye'de engelli sporlarının gelişimi için tesis yatırımları, antrenör eğitimi ve farkındalık çalışmalarına ihtiyaç vardır. Toplumsal tutum değişikliği, engelli bireylerin spor yoluyla sosyal içermesinin sağlanmasında kilit rol oynar.",
    image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&h=400&fit=crop",
    author: "Ali Öztürk",
    date: "10 Kasım 2024",
    category: "Sosyal",
  },
  {
    id: 6,
    title: "Gençlik ve Spor Kültürü",
    excerpt: "Z kuşağının spor alışkanlıkları ve spor kültürünün gençler arasında yaygınlaştırılması.",
    content: "Z kuşağının spor alışkanlıkları ve spor kültürünün gençler arasında yaygınlaştırılması. Gençlerin spor yapma alışkanlıkları, dijitalleşme ve yaşam tarzı değişiklikleriyle dönüşmektedir.\n\nGeleneksel takım sporlarının yanı sıra bireysel sporlar, fitnes ve ekstrem sporlar gençler arasında popülerlik kazanmaktadır. Sosyal medyanın rolü, gençlerin spor tercihlerini ve motivasyonlarını şekillendirmede önemli bir faktördür.\n\nOkul sporları, toplum merkezleri ve gençlik programları, spor kültürünün yaygınlaştırılmasında temel araçlardır. Gençlerin ilgi ve ihtiyaçlarına uygun, esnek ve çeşitli spor fırsatları sunulması gerekmektedir.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop",
    author: "Selin Yıldız",
    date: "5 Kasım 2024",
    category: "Gençlik",
  },
];

const BlogDetay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = blogDatabase.find((p) => p.id === parseInt(id || "0"));

  if (!post) {
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
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom mx-auto">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-8">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="max-w-3xl">
              <article className="prose prose-invert max-w-none mb-8">
                {(post.content || post.excerpt).split("\n").map((paragraph, index) => (
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
