import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  status: string;
  start_date: string;
}

const projectsDatabase: Project[] = [
  {
    id: 1,
    title: "Spor ve Toplum Araştırması",
    description: "Türkiye genelinde spor alışkanlıklarını ve spor tesislerine erişimi inceleyen kapsamlı araştırma projesi.",
    content: "Türkiye genelinde spor alışkanlıklarını ve spor tesislerine erişimi inceleyen kapsamlı araştırma projesi. Bu proje, toplumun spor yapma alışkanlıklarını, spor tesislerine erişim durumunu ve sporun toplumsal etkilerini analiz etmektedir.\n\nAraştırma kapsamında 81 ilde anket çalışmaları yürütülmekte, spor tesislerinin dağılımı haritalanmakta ve farklı demografik grupların spor alışkanlıkları karşılaştırılmaktadır. Proje sonuçları, spor politikalarının geliştirilmesine katkı sağlayacaktır.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80",
    status: "Devam Ediyor",
    category: "Araştırma",
    start_date: "2024-01-15",
  },
  {
    id: 2,
    title: "Yerel Spor Politikaları Rehberi",
    description: "Belediyelere yönelik spor politikası geliştirme rehberi hazırlama projesi.",
    content: "Belediyelere yönelik spor politikası geliştirme rehberi hazırlama projesi. Yerel yönetimlerin spor alanlarındaki rolü ve sorumlulukları gün geçtikçe artmaktadır.\n\nBu proje kapsamında, belediyelerin spor politikası oluşturması, tesis yönetimi, bütçe planlaması ve toplumsal spor programları geliştirmesi için kapsamlı bir rehber hazırlanmıştır. Rehber, en iyi uygulamalar ve örnek vaka çalışmaları içermektedir.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=80",
    status: "Tamamlandı",
    category: "Eğitim",
    start_date: "2023-06-01",
  },
  {
    id: 3,
    title: "Spor Ekonomisi İzleme Sistemi",
    description: "Türkiye'nin spor ekonomisini takip eden dijital platform geliştirme projesi.",
    content: "Türkiye'nin spor ekonomisini takip eden dijital platform geliştirme projesi. Spor sektörünün ekonomik katkılarını düzenli olarak izlemek ve raporlamak amacıyla bir dijital platform geliştirilmektedir.\n\nPlatform, spor sektörünün GSYH'ye katkısı, istihdam rakamları, yatırım verileri ve uluslararası karşılaştırmaları içerecektir. Veriler, politika yapıcılar, araştırmacılar ve sektör akterleri tarafından kullanılabilecektir.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80",
    status: "Devam Ediyor",
    category: "Teknoloji",
    start_date: "2024-03-01",
  },
  {
    id: 4,
    title: "Kadın Sporcu Destek Programı",
    description: "Kadın sporcuların kariyer gelişimini destekleyen mentorluk ve eğitim programı.",
    content: "Kadın sporcuların kariyer gelişimini destekleyen mentorluk ve eğitim programı. Kadın sporcuların karşılaştığı zorlukları aşmak ve başarılı kariyer yolları oluşturmaları için kapsamlı bir destek programı yürütülmektedir.\n\nProgram kapsamında mentorluk, liderlik eğitimi, kariyer danışmanlığı ve ağ oluşturma fırsatları sunulmaktadır. Başarılı kadın sporcular, genç sporculara rehberlik etmektedir.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
    status: "Devam Ediyor",
    category: "Sosyal",
    start_date: "2024-02-01",
  },
  {
    id: 5,
    title: "Okul Sporları Analiz Raporu",
    description: "Türkiye'deki okul sporları sisteminin kapsamlı analizi ve politika önerileri.",
    content: "Türkiye'deki okul sporları sisteminin kapsamlı analizi ve politika önerileri. Okul sporları, gençlerin spor alışkanlıkları kazanması ve yetenekli sporcuların keşfedilmesi açısından kritik öneme sahiptir.\n\nBu projede, okul sporlarının mevcut durumu, karşılaşılan sorunlar ve geliştirilmesi gereken alanlar analiz edilmiştir. Rapor, politika yapıcılar ve eğitim kurumları için somut öneriler içermektedir.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80",
    status: "Tamamlandı",
    category: "Araştırma",
    start_date: "2023-09-01",
  },
  {
    id: 6,
    title: "Engelli Sporları Erişilebilirlik Projesi",
    description: "Engelli bireylerin spora erişimini artırmaya yönelik kapsamlı araştırma ve savunuculuk projesi.",
    content: "Engelli bireylerin spora erişimini artırmaya yönelik kapsamlı araştırma ve savunuculuk projesi. Tüm bireylerin spor yapma hakkına sahip olması ilkesinden hareketle, engelli bireylerin karşılaştığı engellerin tespit edilmesi ve çözüm önerileri geliştirilmesi hedeflenmektedir.\n\nProje kapsamında tesis erişilebilirliği denetimi, engelli sporcu eğitim programları ve farkındalık kampanyaları yürütülecektir.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
    status: "Planlanıyor",
    category: "Sosyal",
    start_date: "2025-01-01",
  },
];

const ProjeDetay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const proje = projectsDatabase.find((p) => p.id === parseInt(id || "0"));

  if (!proje) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Proje Bulunamadı</h1>
            <Link to="/projeler">
              <Button>Projeler Sayfasına Dön</Button>
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
            src={proje.image}
            alt={proje.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-secondary text-primary-foreground text-xs font-medium rounded-full">
                  {proje.category}
                </span>
                <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                  {proje.status}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                {proje.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-secondary/10 to-primary/10 py-8">
          <div className="container-custom mx-auto px-4">
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{proje.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{proje.date}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="max-w-3xl">
              <article className="prose prose-invert max-w-none mb-8">
                {proje.fullContent.split("\n\n").map((paragraph, index) => (
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

export default ProjeDetay;
