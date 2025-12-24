import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string | null;
  category: string;
  author: string;
}

const Haberler = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setNewsItems(data || []);
    } catch (err: any) {
      console.error("Haberler yükleme hatası:", err);
      setError("Haberler yüklenemedi");
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, newsItems.length));
  };

  const visibleNews = newsItems.slice(0, visibleCount);
  const hasMore = visibleCount < newsItems.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-green py-20">
          <div className="container-custom mx-auto px-4 md:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Haberler
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              SPOLDER'den en güncel haberler ve gelişmeler
            </p>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="section-padding text-center">
            <p className="text-muted-foreground">Haberler yükleniyor...</p>
          </section>
        )}

        {/* Empty State */}
        {!loading && newsItems.length === 0 && (
          <section className="section-padding text-center">
            <p className="text-muted-foreground text-lg">Henüz haber bulunmamaktadır.</p>
            <p className="text-muted-foreground text-sm mt-2">Admin panelinden haber ekleyerek başlayabilirsiniz.</p>
          </section>
        )}

        {/* News Grid */}
        {!loading && newsItems.length > 0 && (
          <section className="section-padding">
            <div className="container-custom mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleNews.map((item) => (
                  <Link
                    to={`/haber/${item.id}`}
                    key={item.id}
                    className="bg-card rounded-lg overflow-hidden shadow-card card-hover block"
                  >
                    {item.image && (
                      <div className="relative h-52">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {item.category}
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                        <Button size="sm" className="text-white bg-foreground hover:bg-foreground/80">
                          Devamı
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <Button onClick={loadMore} variant="outline" size="lg">
                    Daha Fazla Haber Yükle
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Haberler;
