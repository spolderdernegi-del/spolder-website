-- Haberler Tablosu - Temiz Kurulum
-- Önce varsa sil, sonra sıfırdan oluştur

DROP TABLE IF EXISTS public.news CASCADE;

CREATE TABLE public.news (
  id BIGSERIAL PRIMARY KEY,
  baslik TEXT NOT NULL,
  kategori TEXT,
  tarih TEXT,
  yazar TEXT,
  gorsel TEXT,
  ozet TEXT,
  icerik TEXT,
  slug TEXT,
  meta_baslik TEXT,
  meta_aciklama TEXT,
  yayin_durumu TEXT DEFAULT 'taslak',
  sliderda_goster BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS aktif et
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Policies: Okuma herkese açık, yazma authenticated VEYA geçici bypass
CREATE POLICY read_news ON public.news FOR SELECT USING (true);
CREATE POLICY write_news ON public.news FOR INSERT WITH CHECK (true);
CREATE POLICY update_news ON public.news FOR UPDATE USING (true);
CREATE POLICY delete_news ON public.news FOR DELETE USING (true);

-- Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.news TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.news TO authenticated;

-- Indexes
CREATE INDEX news_created_at_idx ON public.news(created_at DESC);
CREATE INDEX news_yayin_durumu_idx ON public.news(yayin_durumu);
CREATE INDEX news_sliderda_goster_idx ON public.news(sliderda_goster);

-- Şema önbelleğini yenile
SELECT pg_notify('pgrst', 'reload schema');
