import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, Award, Globe } from "lucide-react";

const boardMembers = [
  { name: "Dr. Ahmet Yılmaz", role: "Başkan", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
  { name: "Prof. Dr. Ayşe Kaya", role: "Başkan Yardımcısı", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80" },
  { name: "Doç. Dr. Mehmet Demir", role: "Genel Sekreter", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80" },
  { name: "Dr. Zeynep Çelik", role: "Sayman", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80" },
];

const Hakkimizda = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-green py-20">
          <div className="container-custom mx-auto px-4 md:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Hakkımızda
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              SPOlDER Spor Politikaları Derneği'ni tanıyın
            </p>
          </div>
        </section>

        {/* President Message */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Başkan Mesajı
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Sporun Gücüne İnanıyoruz
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  "SPOlDER olarak, sporun sadece bir fiziksel aktivite olmadığına, aynı zamanda toplumsal 
                  dönüşümün önemli bir aracı olduğuna inanıyoruz. Kurulduğumuz günden bu yana, bilimsel 
                  temelli spor politikalarının geliştirilmesi için çalışıyoruz."
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  "Amacımız, Türkiye'nin spor ekosistemini güçlendirmek ve herkesin spor yapma hakkını 
                  savunmaktır. Bu yolda tüm paydaşlarımızla birlikte yürümeye devam edeceğiz."
                </p>
                <p className="font-display font-bold text-foreground">
                  Dr. Ahmet Yılmaz
                  <span className="font-normal text-muted-foreground block text-sm">
                    SPOlDER Başkanı
                  </span>
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                  alt="Başkan"
                  className="rounded-lg shadow-elevated w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision Values */}
        <section className="section-padding bg-muted">
          <div className="container-custom mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Misyon", text: "Türkiye'de spor politikalarının bilimsel temellere dayalı olarak geliştirilmesine katkı sağlamak.", color: "primary" },
                { icon: Eye, title: "Vizyon", text: "Spor politikaları alanında ulusal ve uluslararası düzeyde öncü bir sivil toplum kuruluşu olmak.", color: "secondary" },
                { icon: Heart, title: "Değerler", text: "Bilimsellik, şeffaflık, katılımcılık, yenilikçilik ve sürdürülebilirlik.", color: "turquoise" },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-lg p-8 shadow-card text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
                    item.color === "primary" ? "bg-primary/10 text-primary" :
                    item.color === "secondary" ? "bg-secondary/10 text-secondary" :
                    "bg-turquoise/10 text-turquoise"
                  }`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board Members */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Ekibimiz</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Yönetim Kurulu
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardMembers.map((member) => (
                <div key={member.name} className="bg-card rounded-lg overflow-hidden shadow-card card-hover text-center">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-foreground">{member.name}</h3>
                    <p className="text-primary text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Hakkimizda;
