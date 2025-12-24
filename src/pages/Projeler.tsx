import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
  status: string;
  content: string;
  author: string;
}

const Projeler = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err: any) {
      console.error("Projeler yükleme hatası:", err);
      setError("Projeler yüklenemedi");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-green py-20">
          <div className="container-custom mx-auto px-4 md:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Projelerimiz
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Spor politikalarını geliştirmek için yürüttüğümüz projeler
            </p>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="section-padding text-center">
            <p className="text-muted-foreground">Projeler yükleniyor...</p>
          </section>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <section className="section-padding text-center">
            <p className="text-muted-foreground text-lg">Henüz proje bulunmamaktadır.</p>
            <p className="text-muted-foreground text-sm mt-2">Admin panelinden proje ekleyerek başlayabilirsiniz.</p>
          </section>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <section className="section-padding">
            <div className="container-custom mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <article key={project.id} className="bg-card rounded-lg overflow-hidden shadow-card card-hover group">
                    {project.image && (
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 to-transparent" />
                        <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {project.status}
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <Link to={`/proje/${project.id}`}>
                        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                        <Link to={`/proje/${project.id}`}>
                          Detaylar
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Projeler;
