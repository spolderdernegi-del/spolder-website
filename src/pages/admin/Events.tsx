import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Edit, Trash2, Save, X, MapPin, Search, Filter } from "lucide-react";
import { toast } from "@/lib/toast";
import { logActivity } from "@/lib/activityLog";

interface Event {
  id: number;
  title: string;
  excerpt: string;
  full_content: string;
  date: string;
  time: string;
  location: string;
  location_lat?: number;
  location_lng?: number;
  image: string;
  category: string;
  capacity: string;
  registered: string;
  status: string;
  publishStatus: 'draft' | 'published';
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  showInSlider?: boolean;
}

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [locationMode, setLocationMode] = useState<'manual' | 'map'>('manual');
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    full_content: "",
    date: "",
    time: "",
    location: "",
    location_lat: 0,
    location_lng: 0,
    image: "",
    category: "",
    capacity: "",
    registered: "0",
    status: "Açık",
    publishStatus: "published" as 'draft' | 'published',
    slug: "",
    metaTitle: "",
    metaDescription: "",
    showInSlider: false,
  });

  useEffect(() => {
    checkAuth();
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    try {
      const storedCategories = localStorage.getItem('spolder_categories');
      const categoriesData = storedCategories ? JSON.parse(storedCategories) : [];
      setCategories(categoriesData.filter((c: any) => c.type === 'events'));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const checkAuth = async () => {
    // Basit auth kontrolü
    const simpleAuth = localStorage.getItem("adminAuth");
    if (simpleAuth === "true") {
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchEvents = async () => {
    try {
      const storedEvents = localStorage.getItem('spolder_events');
      const eventsData = storedEvents ? JSON.parse(storedEvents) : [];
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return formData.image;

    setUploading(true);
    try {
      // Base64'e çevir ve imagePreview'i kullan (zaten base64 olarak var)
      return imagePreview;
    } catch (error) {
      console.error('Görsel yükleme hatası:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      // Slug oluştur (eğer yoksa)
      const slug = formData.slug || formData.title.toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

      const dataToSave = { ...formData, image: imageUrl, slug };
      const storedEvents = localStorage.getItem('spolder_events');
      const eventsData = storedEvents ? JSON.parse(storedEvents) : [];

      if (editingEvent) {
        const index = eventsData.findIndex((e: Event) => e.id === editingEvent.id);
        if (index !== -1) {
          eventsData[index] = { ...dataToSave, id: editingEvent.id };
          logActivity('update', 'event', formData.title);
          toast.success(`"${formData.title}" başarıyla güncellendi!`);
        }
      } else {
        const newEvent = { ...dataToSave, id: Date.now() };
        eventsData.unshift(newEvent);
        logActivity('create', 'event', formData.title);
        toast.success(`"${formData.title}" başarıyla oluşturuldu!`);
      }

      localStorage.setItem('spolder_events', JSON.stringify(eventsData));
      resetForm();
      fetchEvents();
    } catch (error: any) {
      toast.error("Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      excerpt: event.excerpt,
      full_content: event.full_content,
      date: event.date,
      time: event.time,
      location: event.location,
      location_lat: event.location_lat || 0,
      location_lng: event.location_lng || 0,
      image: event.image,
      category: event.category,
      capacity: event.capacity,
      registered: event.registered,
      status: event.status,
      publishStatus: event.publishStatus || 'published',
      slug: event.slug || '',
      metaTitle: event.metaTitle || '',
      metaDescription: event.metaDescription || '',
      showInSlider: event.showInSlider || false,
    });
    setImagePreview(event.image || "");
    setImageFile(null);
    if (event.location_lat && event.location_lng) {
      setLocationMode('map');
    }
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) return;

    try {
      const storedEvents = localStorage.getItem('spolder_events');
      const eventsData = storedEvents ? JSON.parse(storedEvents) : [];
      const event = eventsData.find((e: Event) => e.id === id);
      const filtered = eventsData.filter((e: Event) => e.id !== id);
      localStorage.setItem('spolder_events', JSON.stringify(filtered));
      
      if (event) {
        logActivity('delete', 'event', event.title);
        toast.success(`"${event.title}" başarıyla silindi!`);
      }
      
      fetchEvents();
    } catch (error: any) {
      toast.error("Hata: " + error.message);
    }
  };

  const handleBulkDelete = () => {
    if (selectedEvents.length === 0) {
      toast.warning('Lütfen silinecek etkinlikleri seçin');
      return;
    }

    if (!confirm(`${selectedEvents.length} etkinlik silinecek. Emin misiniz?`)) return;

    try {
      const storedEvents = localStorage.getItem('spolder_events');
      const eventsData = storedEvents ? JSON.parse(storedEvents) : [];
      const filtered = eventsData.filter((e: Event) => !selectedEvents.includes(e.id));
      localStorage.setItem('spolder_events', JSON.stringify(filtered));
      
      logActivity('delete', 'event', `${selectedEvents.length} etkinlik`);
      toast.success(`${selectedEvents.length} etkinlik başarıyla silindi!`);
      
      setSelectedEvents([]);
      fetchEvents();
    } catch (error: any) {
      toast.error("Hata: " + error.message);
    }
  };

  const togglePublishStatus = (event: Event) => {
    try {
      const storedEvents = localStorage.getItem('spolder_events');
      const eventsData = storedEvents ? JSON.parse(storedEvents) : [];
      const index = eventsData.findIndex((e: Event) => e.id === event.id);
      
      if (index !== -1) {
        const newStatus = event.publishStatus === 'published' ? 'draft' : 'published';
        eventsData[index].publishStatus = newStatus;
        localStorage.setItem('spolder_events', JSON.stringify(eventsData));
        
        logActivity(newStatus === 'published' ? 'publish' : 'unpublish', 'event', event.title);
        toast.success(`"${event.title}" ${newStatus === 'published' ? 'yayınlandı' : 'taslağa alındı'}!`);
        
        fetchEvents();
      }
    } catch (error: any) {
      toast.error("Hata: " + error.message);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setImageFile(null);
    setImagePreview("");
    setLocationMode('manual');
    setFormData({
      title: "",
      excerpt: "",
      full_content: "",
      date: "",
      time: "",
      location: "",
      location_lat: 0,
      location_lng: 0,
      image: "",
      category: "",
      capacity: "",
      registered: "0",
      status: "Açık",
      publishStatus: "published",
      slug: "",
      metaTitle: "",
      metaDescription: "",
      showInSlider: false,
    });
  };

  // Filtrelenmiş ve aranmış etkinlikler
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || event.category === filterCategory;
    const matchesStatus = !filterStatus || event.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
            <h1 className="text-2xl font-bold text-foreground">Etkinlik Yönetimi</h1>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Etkinlik
          </Button>
        </div>
      </header>

      <main className="container-custom mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editingEvent ? "Etkinlik Düzenle" : "Yeni Etkinlik Ekle"}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Başlık *</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Kategori seçin...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tarih</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Saat</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Konum</label>
                  
                  <div className="flex gap-2 mb-3">
                    <Button
                      type="button"
                      variant={locationMode === 'manual' ? 'default' : 'outline'}
                      onClick={() => setLocationMode('manual')}
                      className="flex-1"
                    >
                      Manuel Giriş
                    </Button>
                    <Button
                      type="button"
                      variant={locationMode === 'map' ? 'default' : 'outline'}
                      onClick={() => setLocationMode('map')}
                      className="flex-1"
                    >
                      Haritadan Seç
                    </Button>
                  </div>

                  {locationMode === 'manual' ? (
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="İstanbul Kongre Merkezi"
                    />
                  ) : (
                    <div className="space-y-3">
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Konum adı (örn: İstanbul Kongre Merkezi)"
                        className="mb-2"
                      />
                      <div 
                        className="relative w-full h-80 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden cursor-crosshair border-2 border-slate-200 dark:border-slate-700"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          
                          const lat = 41.0082 + (y / rect.height - 0.5) * 0.1;
                          const lng = 28.9784 + (x / rect.width - 0.5) * 0.1;
                          
                          setFormData({ 
                            ...formData, 
                            location_lat: parseFloat(lat.toFixed(6)),
                            location_lng: parseFloat(lng.toFixed(6))
                          });
                        }}
                        style={{
                          backgroundImage: 'url(https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/28.9784,41.0082,12,0/800x600@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {formData.location_lat !== 0 && formData.location_lng !== 0 && (
                          <div 
                            className="absolute w-8 h-8 -ml-4 -mt-8 pointer-events-none"
                            style={{
                              left: `${((formData.location_lng - 28.9784) / 0.1 + 0.5) * 100}%`,
                              top: `${((formData.location_lat - 41.0082) / 0.1 + 0.5) * 100}%`
                            }}
                          >
                            <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
                          </div>
                        )}
                      </div>
                      {formData.location_lat !== 0 && formData.location_lng !== 0 && (
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Seçili Koordinatlar: {formData.location_lat.toFixed(6)}, {formData.location_lng.toFixed(6)}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Kapasite</label>
                  <Input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Kayıtlı</label>
                  <Input
                    type="number"
                    value={formData.registered}
                    onChange={(e) => setFormData({ ...formData, registered: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Durum</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Açık">Açık</option>
                    <option value="Devam Ediyor">Devam Ediyor</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Görsel</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                  />
                  {imagePreview && (
                    <div className="mt-3 border rounded-lg p-2">
                      <img 
                        src={imagePreview} 
                        alt="Önizleme" 
                        className="max-w-full h-48 object-cover rounded"
                      />
                      {imageFile && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Boyut: {(imageFile.size / 1024).toFixed(2)} KB
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Özet</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">İçerik</label>
                <Textarea
                  value={formData.full_content}
                  onChange={(e) => setFormData({ ...formData, full_content: e.target.value })}
                  rows={6}
                />
              </div>

              {/* SEO Metadata Bölümü */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  🔍 SEO Ayarları (Opsiyonel)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      URL Slug
                      <span className="text-xs text-muted-foreground ml-2">(Otomatik oluşturulur)</span>
                    </label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="ornek-etkinlik-basligi"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Meta Başlık
                      <span className="text-xs text-muted-foreground ml-2">(Google'da görünecek başlık)</span>
                    </label>
                    <Input
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder={formData.title || "Etkinlik başlığı buraya"}
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.metaTitle?.length || 0}/60 karakter
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Meta Açıklama
                      <span className="text-xs text-muted-foreground ml-2">(Google'da görünecek açıklama)</span>
                    </label>
                    <Textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder={formData.excerpt || "Etkinlik hakkında kısa açıklama"}
                      rows={2}
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.metaDescription?.length || 0}/160 karakter
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Yayın Durumu</label>
                <select
                  value={formData.publishStatus}
                  onChange={(e) => setFormData({ ...formData, publishStatus: e.target.value as 'draft' | 'published' })}
                  className="w-full p-2 border border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-slate-950 text-foreground"
                >
                  <option value="draft">Taslak</option>
                  <option value="published">Yayınla</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showInSlider"
                  checked={formData.showInSlider}
                  onChange={(e) => setFormData({ ...formData, showInSlider: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700"
                />
                <label htmlFor="showInSlider" className="text-sm font-medium text-foreground cursor-pointer">
                  Ana Sayfada Slider'da Göster
                  <span className="text-xs text-muted-foreground ml-2">(Haber/Proje sliderlarında görünür)</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">İçerik</label>
                <Textarea
                  value={formData.full_content}
                  onChange={(e) => setFormData({ ...formData, full_content: e.target.value })}
                  rows={6}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {loading ? "Kaydediliyor..." : "Kaydet"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  İptal
                </Button>
              </div>
            </form>

            {/* Önizleme Bölümü */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-foreground mb-4">Önizleme</h3>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Etkinlik görseli" 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {formData.title || "Etkinlik Başlığı"}
                </h2>
                {formData.category && (
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
                    {formData.category}
                  </span>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  {formData.date && <span>📅 {formData.date}</span>}
                  {formData.time && <span>🕐 {formData.time}</span>}
                  {formData.location && <span>📍 {formData.location}</span>}
                  {formData.capacity && <span>👥 Kapasite: {formData.capacity}</span>}
                  <span className={`px-2 py-0.5 rounded ${formData.status === 'Açık' ? 'bg-green-100 text-green-700' : formData.status === 'Devam Ediyor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {formData.status}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {formData.excerpt || "Etkinlik özeti burada görünecek..."}
                </p>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {formData.full_content ? (
                    <div style={{ whiteSpace: 'pre-wrap' }}>{formData.full_content}</div>
                  ) : (
                    <p className="text-muted-foreground italic">Etkinlik içeriği burada görünecek...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Arama ve Filtreleme Araçları */}
        {!showForm && events.length > 0 && (
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Arama */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Etkinlik ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Kategori Filtresi */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-slate-950 text-foreground"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Durum Filtresi */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-slate-950 text-foreground"
              >
                <option value="">Tüm Durumlar</option>
                <option value="draft">Taslak</option>
                <option value="published">Yayınlanmış</option>
              </select>
            </div>

            {/* Toplu İşlemler */}
            {selectedEvents.length > 0 && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleBulkDelete}
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Seçilenleri Sil ({selectedEvents.length})
                </Button>
                <Button
                  onClick={() => setSelectedEvents([])}
                  variant="outline"
                  size="sm"
                >
                  Seçimi Temizle
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {loading && events.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Yükleniyor...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchTerm || filterCategory || filterStatus ? 'Arama kriterlerine uygun etkinlik bulunamadı' : 'Henüz etkinlik eklenmemiş'}
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4"
              >
                <div className="flex items-start gap-4">
                  {/* Seçim Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEvents([...selectedEvents, event.id]);
                      } else {
                        setSelectedEvents(selectedEvents.filter(id => id !== event.id));
                      }
                    }}
                    className="mt-1.5 w-5 h-5 cursor-pointer"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                          {event.publishStatus === 'draft' ? (
                            <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
                              Taslak
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                              Yayında
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.excerpt}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>📅 {event.date}</span>
                      <span>🕐 {event.time}</span>
                      <span>📍 {event.location}</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <Button
                      size="sm"
                      variant={event.publishStatus === 'published' ? 'default' : 'outline'}
                      onClick={() => togglePublishStatus(event)}
                      title={event.publishStatus === 'published' ? 'Taslağa Al' : 'Yayınla'}
                    >
                      {event.publishStatus === 'published' ? '👁️' : '📝'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminEvents;
