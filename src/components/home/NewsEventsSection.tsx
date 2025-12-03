import { Calendar, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const news = [
  {
    id: 1,
    title: "Spor Ekonomisi Raporu 2024 Yayınlandı",
    excerpt: "Türkiye'nin spor ekonomisine ilişkin kapsamlı raporumuz kamuoyuyla paylaşıldı.",
    date: "12 Ara 2024",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80",
    category: "Haber",
  },
  {
    id: 2,
    title: "Yerel Yönetimler ve Spor Forumu",
    excerpt: "Belediyelerin spor politikalarını ele aldığımız forum büyük ilgi gördü.",
    date: "8 Ara 2024",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=80",
    category: "Haber",
  },
];

const events = [
  {
    id: 1,
    title: "Uluslararası Spor Hukuku Konferansı",
    date: "25",
    month: "Ara",
    location: "Ankara",
  },
  {
    id: 2,
    title: "Spor Yönetimi Eğitim Programı",
    date: "10",
    month: "Oca",
    location: "İstanbul",
  },
  {
    id: 3,
    title: "Kadın ve Spor Sempozyumu",
    date: "18",
    month: "Oca",
    location: "İzmir",
  },
];

const announcements = [
  {
    id: 1,
    title: "2025 Yılı Üyelik Başvuruları Başladı",
    date: "10 Ara 2024",
  },
  {
    id: 2,
    title: "Yeni Yayınımız: Spor ve Medya",
    date: "5 Ara 2024",
  },
  {
    id: 3,
    title: "Staj Başvuruları Açıldı",
    date: "1 Ara 2024",
  },
];

const NewsEventsSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Haberler
              </h2>
              <Link to="/haberler">
                <Button variant="ghost" size="sm" className="group">
                  Tümü
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((item) => (
                <article key={item.id} className="bg-card rounded-lg overflow-hidden shadow-card card-hover">
                  <div className="relative h-48">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Events & Announcements Column */}
          <div className="space-y-8">
            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Etkinlikler
                </h2>
                <Link to="/etkinlikler">
                  <Button variant="ghost" size="sm">
                    Tümü
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-4 bg-card rounded-lg p-4 shadow-soft card-hover"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gradient-green flex flex-col items-center justify-center text-primary-foreground shrink-0">
                      <span className="text-xl font-bold">{event.date}</span>
                      <span className="text-xs uppercase">{event.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                        {event.title}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        📍 {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Duyurular
                </h2>
              </div>

              <div className="bg-card rounded-lg shadow-soft overflow-hidden">
                {announcements.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      index !== announcements.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <Bell className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;
