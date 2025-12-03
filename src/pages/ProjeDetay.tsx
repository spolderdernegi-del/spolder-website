import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const projectDatabase = [
  {
    id: 1,
    title: "Spor ve Toplum Araştırması",
    excerpt: "Türkiye genelinde spor alışkanlıklarını ve spor tesislerine erişimi inceleyen kapsamlı araştırma projesi.",
    fullContent: "Spor ve Toplum Araştırması, Türkiye genelinde spor alışkanlıklarını, spor tesislerine erişimi ve toplumun spor dünyasına bakış açısını inceleyen kapsamlı bir araştırma projesidir. Bu araştırma, spor politikalarının geliştirilmesine temel oluşturmaktadır.\n\nAraştırmanın sonuçları, spor alanında yapılan yatırımların ve politikaların daha etkili olmasını sağlamıştır.",
    date: "Başlangıç: 2020",
    author: "SPOlDER Araştırma Ekibi",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&auto=format&fit=crop&q=80",
    category: "Araştırma",
    status: "Devam Ediyor",
  },
  {
    id: 2,
    title: "Yerel Spor Politikaları Rehberi",
    excerpt: "Belediyelere yönelik spor politikası geliştirme rehberi hazırlama projesi.",
    fullContent: "Yerel Spor Politikaları Rehberi, Türkiye'deki belediyelerin spor alanında daha etkili politikalar geliştirmelerine yardımcı olmak amacıyla hazırlanan kapsamlı bir kılavuzdur. Rehberde, spor tesisleri planlaması, finansman ve halk katılımı gibi konular ele alınmıştır.\n\nBu rehber, belediyelerin spor yatırımlarında bilimsel temelli kararlar almalarını sağlamaktadır.",
    date: "Başlangıç: 2021",
    author: "SPOlDER Proje Koordinatörleri",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&auto=format&fit=crop&q=80",
    category: "Rehber",
    status: "Tamamlandı",
  },
  {
    id: 3,
    title: "Spor Ekonomisi İzleme Sistemi",
    excerpt: "Türkiye'nin spor ekonomisini takip eden dijital platform geliştirme projesi.",
    fullContent: "Spor Ekonomisi İzleme Sistemi, Türkiye'nin spor ekonomisine ilişkin verileri gerçek zamanlı takip eden ve analiz eden dijital bir platformdur. Sistem, spor endüstrisinin ekonomik katkısını, istihdam durumunu ve gelişim trendlerini göstermektedir.\n\nBu platform, spor alanında çalışanlar ve karar alıcılar için önemli bir bilgi kaynağıdır.",
    date: "Başlangıç: 2022",
    author: "SPOlDER Teknoloji Ekibi",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&auto=format&fit=crop&q=80",
    category: "Teknoloji",
    status: "Devam Ediyor",
  },
  {
    id: 4,
    title: "Kadın Sporcu Destek Programı",
    excerpt: "Kadın sporcuların kariyer gelişimini destekleyen mentorluk ve eğitim programı.",
    fullContent: "Kadın Sporcu Destek Programı, kadın sporcuların kariyer gelişimini, eğitim imkanlarını ve finansal desteğini sağlayan kapsamlı bir programdır. Program, mentorluk, staj fırsatları ve finansal burslar sunmaktadır.\n\nBu program, Türkiye'de kadın sporcuların daha görünür ve başarılı olmasını sağlamaya yönelik bir girişimdir.",
    date: "Başlangıç: 2021",
    author: "SPOlDER Spor Kalkınma Ekibi",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&auto=format&fit=crop&q=80",
    category: "Sosyal",
    status: "Devam Ediyor",
  },
  {
    id: 5,
    title: "Okul Sporları Analiz Raporu",
    excerpt: "Türkiye'deki okul sporları sisteminin kapsamlı analizi ve politika önerileri.",
    fullContent: "Okul Sporları Analiz Raporu, Türkiye'deki okul sporları sisteminin kapsamlı bir analizi ve geleceğe yönelik politika önerilerini içermektedir. Rapor, okul sporlarının gelişimi, öğrenci katılımı ve kaynaklandırma konularını ele almaktadır.\n\nBu rapor, eğitim ve spor bakanlıkları tarafından politika oluştururken referans olarak kullanılmıştır.",
    date: "Başlangıç: 2019",
    author: "SPOlDER Eğitim Ekibi",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&auto=format&fit=crop&q=80",
    category: "Eğitim",
    status: "Tamamlandı",
  },
  {
    id: 6,
    title: "Engelli Sporları Erişilebilirlik Projesi",
    excerpt: "Engelli bireylerin spora erişimini artırmaya yönelik kapsamlı araştırma ve savunuculuk projesi.",
    fullContent: "Engelli Sporları Erişilebilirlik Projesi, engelli bireylerin spora ve fiziksel aktivitelere erişimini artırmak amacıyla yürütülen kapsamlı bir araştırma ve savunuculuk projesidir. Proje, engelli sporcuların karşılaştığı engellerin belirlenmesi ve çözüm önerileri getirilmesini hedeflemektedir.\n\nProje kapsamında, erişilebilir spor tesisleri ve programları hakkında öneriler sunulmaktadır.",
    date: "Başlangıç: 2023",
    author: "SPOlDER İçerme Ekibi",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80",
    category: "Erişilebilirlik",
    status: "Planlanıyor",
  },
];

const ProjeDetay = () => {
  const { id } = useParams<{ id: string }>();
  const proje = projectDatabase.find((p) => p.id === parseInt(id || "0"));

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
