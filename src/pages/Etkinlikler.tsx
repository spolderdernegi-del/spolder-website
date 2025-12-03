import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "Uluslararası Spor Hukuku Konferansı",
    description: "Spor hukukunun güncel sorunlarını tartışacağımız uluslararası konferans.",
    date: "25",
    month: "Ara",
    year: "2024",
    time: "09:00 - 17:00",
    location: "Ankara Hilton Hotel",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Spor Yönetimi Eğitim Programı",
    description: "Spor yöneticileri için kapsamlı sertifika programı.",
    date: "10",
    month: "Oca",
    year: "2025",
    time: "10:00 - 16:00",
    location: "İstanbul",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Kadın ve Spor Sempozyumu",
    description: "Kadınların spordaki rolünü tartışacağımız akademik sempozyum.",
    date: "18",
    month: "Oca",
    year: "2025",
    time: "09:30 - 18:00",
    location: "İzmir Kültür Merkezi",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Spor Ekonomisi Zirvesi",
    description: "Türkiye'nin spor ekonomisini masaya yatıracağımız zirve toplantısı.",
    date: "05",
    month: "Şub",
    year: "2025",
    time: "09:00 - 17:00",
    location: "Ankara",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80",
    status: "upcoming",
  },
];

const Etkinlikler = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-blue py-20">
          <div className="container-custom mx-auto px-4 md:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Etkinlikler
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Yaklaşan etkinliklerimize katılın
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="section-padding">
          <div className="container-custom mx-auto">
            <div className="space-y-8">
              {events.map((event) => (
                <article key={event.id} className="bg-card rounded-lg overflow-hidden shadow-card card-hover">
                  <div className="flex flex-col md:flex-row">
                    {/* Date Box */}
                    <div className="md:w-32 shrink-0 bg-gradient-green p-6 flex flex-row md:flex-col items-center justify-center text-primary-foreground">
                      <span className="text-4xl font-bold">{event.date}</span>
                      <span className="text-lg uppercase ml-2 md:ml-0">{event.month}</span>
                      <span className="text-sm ml-2 md:ml-0 md:mt-1">{event.year}</span>
                    </div>
                    
                    {/* Image */}
                    <div className="md:w-64 shrink-0">
                      <img src={event.image} alt={event.title} className="w-full h-48 md:h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display font-bold text-xl text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-secondary" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-secondary" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="turquoise" size="sm">
                          Kayıt Ol <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Etkinlikler;
