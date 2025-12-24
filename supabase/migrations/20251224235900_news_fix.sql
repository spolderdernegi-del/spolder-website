-- Unique-version migration to fix public.news visibility, policies, and grants
-- Safe/idempotent: drops existing policies, ensures grants, and reloads PostgREST schema

DO $$
BEGIN
  -- Ensure table exists
  CREATE TABLE IF NOT EXISTS public.news (
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

  ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

  -- Drop existing policies if present to avoid name conflicts
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='news' AND policyname='read_all_news') THEN
    DROP POLICY read_all_news ON public.news;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='news' AND policyname='insert_all_news') THEN
    DROP POLICY insert_all_news ON public.news;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='news' AND policyname='update_all_news') THEN
    DROP POLICY update_all_news ON public.news;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='news' AND policyname='delete_all_news') THEN
    DROP POLICY delete_all_news ON public.news;
  END IF;

  -- Recreate policies (temporarily broad writes; will tighten to auth.uid())
  CREATE POLICY read_all_news ON public.news FOR SELECT USING (true);
  CREATE POLICY insert_all_news ON public.news FOR INSERT WITH CHECK (true);
  CREATE POLICY update_all_news ON public.news FOR UPDATE USING (true);
  CREATE POLICY delete_all_news ON public.news FOR DELETE USING (true);

  -- Grants for PostgREST exposure and authenticated writes
  GRANT USAGE ON SCHEMA public TO anon, authenticated;
  GRANT SELECT ON TABLE public.news TO anon;
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.news TO authenticated;

  -- Indexes
  CREATE INDEX IF NOT EXISTS news_created_at_idx ON public.news(created_at DESC);
  CREATE INDEX IF NOT EXISTS news_publishStatus_idx ON public.news(publishStatus);
END $$;

-- Force PostgREST schema reload
SELECT pg_notify('pgrst', 'reload schema');
