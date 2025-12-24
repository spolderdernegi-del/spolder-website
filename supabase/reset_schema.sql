-- DANGER: Tüm tabloları siler ve yeniden oluşturur (veri kaybı!).
-- Çalıştırmadan önce yedek alın.

-- Drop existing tables (order to satisfy FKs if any)
DROP TABLE IF EXISTS public.files CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.blog CASCADE;
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.bank_info CASCADE;
DROP TABLE IF EXISTS public.board CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.settings CASCADE;

-- Recreate tables
CREATE TABLE public.categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.board (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  bio TEXT,
  image TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.bank_info (
  id BIGSERIAL PRIMARY KEY,
  bankName TEXT,
  accountHolder TEXT,
  iban TEXT,
  accountNumber TEXT,
  branch TEXT,
  swift TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  full_content TEXT,
  date TEXT,
  time TEXT,
  location TEXT,
  image TEXT,
  category TEXT,
  capacity TEXT,
  registered TEXT DEFAULT '0',
  status TEXT DEFAULT 'Açık',
  publishStatus TEXT DEFAULT 'draft',
  showInSlider BOOLEAN DEFAULT false,
  slug TEXT,
  metaTitle TEXT,
  metaDescription TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  category TEXT,
  author TEXT,
  date TEXT,
  publishStatus TEXT DEFAULT 'draft',
  showInSlider BOOLEAN DEFAULT false,
  slug TEXT,
  metaTitle TEXT,
  metaDescription TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blog (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  category TEXT,
  author TEXT,
  date TEXT,
  publishStatus TEXT DEFAULT 'draft',
  showInSlider BOOLEAN DEFAULT false,
  slug TEXT,
  metaTitle TEXT,
  metaDescription TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  image TEXT,
  category TEXT,
  status TEXT DEFAULT 'Devam Ediyor',
  start_date TEXT,
  end_date TEXT,
  publishStatus TEXT DEFAULT 'draft',
  showInSlider BOOLEAN DEFAULT false,
  slug TEXT,
  metaTitle TEXT,
  metaDescription TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.files (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_type TEXT,
  file_size BIGINT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policies (read public, writes authenticated)
CREATE POLICY read_categories ON public.categories FOR SELECT USING (true);
CREATE POLICY read_board ON public.board FOR SELECT USING (true);
CREATE POLICY read_bank_info ON public.bank_info FOR SELECT USING (true);
CREATE POLICY read_events ON public.events FOR SELECT USING (true);
CREATE POLICY read_news ON public.news FOR SELECT USING (true);
CREATE POLICY read_blog ON public.blog FOR SELECT USING (true);
CREATE POLICY read_projects ON public.projects FOR SELECT USING (true);
CREATE POLICY read_files ON public.files FOR SELECT USING (true);
CREATE POLICY read_settings ON public.settings FOR SELECT USING (true);

CREATE POLICY write_categories ON public.categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_categories ON public.categories FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_categories ON public.categories FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_board ON public.board FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_board ON public.board FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_board ON public.board FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_bank_info ON public.bank_info FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_bank_info ON public.bank_info FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_bank_info ON public.bank_info FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_events ON public.events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_events ON public.events FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_events ON public.events FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_news ON public.news FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_news ON public.news FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_news ON public.news FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_blog ON public.blog FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_blog ON public.blog FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_blog ON public.blog FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_projects ON public.projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_projects ON public.projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_projects ON public.projects FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_files ON public.files FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_files ON public.files FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_files ON public.files FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY write_settings ON public.settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY update_settings ON public.settings FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY delete_settings ON public.settings FOR DELETE USING (auth.uid() IS NOT NULL);

-- Grants for PostgREST
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Indexes
CREATE INDEX IF NOT EXISTS categories_type_idx ON public.categories(type);
CREATE INDEX IF NOT EXISTS board_order_idx ON public.board("order");
CREATE INDEX IF NOT EXISTS events_created_at_idx ON public.events(created_at DESC);
CREATE INDEX IF NOT EXISTS events_publishStatus_idx ON public.events(publishStatus);
CREATE INDEX IF NOT EXISTS events_showInSlider_idx ON public.events(showInSlider);
CREATE INDEX IF NOT EXISTS news_created_at_idx ON public.news(created_at DESC);
CREATE INDEX IF NOT EXISTS news_publishStatus_idx ON public.news(publishStatus);
CREATE INDEX IF NOT EXISTS blog_created_at_idx ON public.blog(created_at DESC);
CREATE INDEX IF NOT EXISTS blog_publishStatus_idx ON public.blog(publishStatus);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS projects_publishStatus_idx ON public.projects(publishStatus);
CREATE INDEX IF NOT EXISTS files_created_at_idx ON public.files(created_at DESC);

-- Reload PostgREST schema cache
SELECT pg_notify('pgrst', 'reload schema');
