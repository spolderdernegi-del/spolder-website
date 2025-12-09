-- SPOLDER Admin Panel Tabloları

-- Events tablosu
CREATE TABLE IF NOT EXISTS public.events (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    full_content TEXT,
    date TEXT,
    time TEXT,
    location TEXT,
    image TEXT,
    category TEXT,
    capacity TEXT,
    registered TEXT DEFAULT '0',
    status TEXT DEFAULT 'Açık',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News tablosu
CREATE TABLE IF NOT EXISTS public.news (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT,
    author TEXT,
    date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects tablosu
CREATE TABLE IF NOT EXISTS public.projects (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    image TEXT,
    category TEXT,
    status TEXT DEFAULT 'Devam Ediyor',
    start_date TEXT,
    end_date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Files tablosu
CREATE TABLE IF NOT EXISTS public.files (
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

-- RLS (Row Level Security) Politikaları
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Public SELECT (herkes okuyabilir)
CREATE POLICY "Enable read access for all users" ON public.events FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.news FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.files FOR SELECT USING (true);

-- Authenticated INSERT (giriş yapanlar ekleyebilir)
CREATE POLICY "Enable insert for authenticated users" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for authenticated users" ON public.news FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for authenticated users" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for authenticated users" ON public.files FOR INSERT WITH CHECK (true);

-- Authenticated UPDATE (giriş yapanlar güncelleyebilir)
CREATE POLICY "Enable update for authenticated users" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Enable update for authenticated users" ON public.news FOR UPDATE USING (true);
CREATE POLICY "Enable update for authenticated users" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Enable update for authenticated users" ON public.files FOR UPDATE USING (true);

-- Authenticated DELETE (giriş yapanlar silebilir)
CREATE POLICY "Enable delete for authenticated users" ON public.events FOR DELETE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.news FOR DELETE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.projects FOR DELETE USING (true);
CREATE POLICY "Enable delete for authenticated users" ON public.files FOR DELETE USING (true);

-- Indexes (performans için)
CREATE INDEX IF NOT EXISTS events_created_at_idx ON public.events(created_at DESC);
CREATE INDEX IF NOT EXISTS news_created_at_idx ON public.news(created_at DESC);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS files_created_at_idx ON public.files(created_at DESC);
