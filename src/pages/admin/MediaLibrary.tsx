import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { toast } from "@/lib/toast";

interface MediaItem {
  id: number;
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

const AdminMediaLibrary = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<number[]>([]);

  useEffect(() => {
    checkAuth();
    loadMedia();
  }, []);

  const checkAuth = () => {
    const simpleAuth = localStorage.getItem("adminAuth");
    if (simpleAuth !== "true") {
      navigate("/admin/login");
      return;
    }
    setLoading(false);
  };

  const loadMedia = () => {
    const stored = localStorage.getItem('spolder_media_library');
    const mediaData = stored ? JSON.parse(stored) : [];
    setMedia(mediaData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMedia: MediaItem = {
          id: Date.now() + Math.random(),
          url: reader.result as string,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString()
        };

        const stored = localStorage.getItem('spolder_media_library');
        const mediaData = stored ? JSON.parse(stored) : [];
        mediaData.unshift(newMedia);
        localStorage.setItem('spolder_media_library', JSON.stringify(mediaData));
        
        loadMedia();
        toast.success(`"${file.name}" yüklendi!`);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id: number) => {
    const item = media.find(m => m.id === id);
    if (!confirm(`"${item?.name}" silinecek. Emin misiniz?`)) return;

    const filtered = media.filter(m => m.id !== id);
    localStorage.setItem('spolder_media_library', JSON.stringify(filtered));
    loadMedia();
    toast.success('Medya silindi!');
  };

  const handleBulkDelete = () => {
    if (selectedMedia.length === 0) {
      toast.warning('Lütfen silinecek medyaları seçin');
      return;
    }

    if (!confirm(`${selectedMedia.length} medya silinecek. Emin misiniz?`)) return;

    const filtered = media.filter(m => !selectedMedia.includes(m.id));
    localStorage.setItem('spolder_media_library', JSON.stringify(filtered));
    setSelectedMedia([]);
    loadMedia();
    toast.success(`${selectedMedia.length} medya silindi!`);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL kopyalandı!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Yükleniyor...</div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-foreground">Medya Kütüphanesi</h1>
          </div>
          <div className="flex gap-2">
            {selectedMedia.length > 0 && (
              <Button onClick={handleBulkDelete} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Seçilenleri Sil ({selectedMedia.length})
              </Button>
            )}
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Button className="flex items-center gap-2 pointer-events-none">
                <Upload className="w-4 h-4" />
                Görsel Yükle
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom mx-auto px-4 py-8">
        {/* Arama */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Medya ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Medya Grid */}
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? 'Medya bulunamadı' : 'Henüz medya yüklenmemiş'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden group relative"
              >
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedMedia.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMedia([...selectedMedia, item.id]);
                      } else {
                        setSelectedMedia(selectedMedia.filter(id => id !== item.id));
                      }
                    }}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>

                <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatFileSize(item.size)}
                  </p>
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(item.url)}
                      className="flex-1 text-xs"
                    >
                      URL Kopyala
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* İstatistikler */}
        <div className="mt-8 bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-semibold text-foreground mb-4">İstatistikler</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Toplam Medya</p>
              <p className="text-2xl font-bold text-foreground">{media.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Toplam Boyut</p>
              <p className="text-2xl font-bold text-foreground">
                {formatFileSize(media.reduce((sum, item) => sum + item.size, 0))}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Seçili</p>
              <p className="text-2xl font-bold text-foreground">{selectedMedia.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Görseller</p>
              <p className="text-2xl font-bold text-foreground">
                {media.filter(m => m.type.startsWith('image/')).length}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMediaLibrary;
