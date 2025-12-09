import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Tag } from "lucide-react";

interface Category {
  id: number;
  name: string;
  type: 'events' | 'news' | 'blog' | 'projects' | 'files';
  color: string;
  created_at: string;
}

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "events" as 'events' | 'news' | 'blog' | 'projects' | 'files',
    color: "#3B82F6",
  });

  useEffect(() => {
    checkAuth();
    fetchCategories();
  }, []);

  const checkAuth = async () => {
    const simpleAuth = localStorage.getItem("adminAuth");
    if (simpleAuth !== "true") {
      navigate("/admin/login");
    }
  };

  const fetchCategories = () => {
    try {
      const storedCategories = localStorage.getItem('spolder_categories');
      const categoriesData = storedCategories ? JSON.parse(storedCategories) : [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const storedCategories = localStorage.getItem('spolder_categories');
      const categoriesData = storedCategories ? JSON.parse(storedCategories) : [];

      if (editingCategory) {
        const index = categoriesData.findIndex((c: Category) => c.id === editingCategory.id);
        if (index !== -1) {
          categoriesData[index] = { ...formData, id: editingCategory.id, created_at: editingCategory.created_at };
        }
      } else {
        const newCategory = { ...formData, id: Date.now(), created_at: new Date().toISOString() };
        categoriesData.push(newCategory);
      }

      localStorage.setItem('spolder_categories', JSON.stringify(categoriesData));
      resetForm();
      fetchCategories();
    } catch (error: any) {
      alert("Hata: " + error.message);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      color: category.color,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) return;

    try {
      const storedCategories = localStorage.getItem('spolder_categories');
      const categoriesData = storedCategories ? JSON.parse(storedCategories) : [];
      const filtered = categoriesData.filter((c: Category) => c.id !== id);
      localStorage.setItem('spolder_categories', JSON.stringify(filtered));
      fetchCategories();
    } catch (error: any) {
      alert("Hata: " + error.message);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      type: "events",
      color: "#3B82F6",
    });
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'events': return 'Etkinlikler';
      case 'news': return 'Haberler';
      case 'blog': return 'Blog';
      case 'projects': return 'Projeler';
      case 'files': return 'Dosyalar';
      default: return type;
    }
  };

  const getCategoriesByType = (type: string) => {
    return categories.filter(c => c.type === type);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Kategori Yönetimi</h1>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Kategori
          </Button>
        </div>
      </header>

      <main className="container-custom mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editingCategory ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Kategori Adı *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Konferans, Seminer, vb."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">İçerik Türü *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="events">Etkinlikler</option>
                    <option value="news">Haberler</option>
                    <option value="blog">Blog</option>
                    <option value="projects">Projeler</option>
                    <option value="files">Dosyalar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Renk</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="#3B82F6"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Kaydet
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  İptal
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {['events', 'news', 'blog', 'projects', 'files'].map((type) => (
            <div key={type} className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                {getTypeLabel(type)} Kategorileri
              </h3>
              
              {getCategoriesByType(type).length === 0 ? (
                <p className="text-sm text-muted-foreground">Henüz kategori eklenmemiş</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getCategoriesByType(type).map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium text-sm">{category.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminCategories;
