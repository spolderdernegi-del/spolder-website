## Setup

- Requirements:
	- Node.js 18+
	- Vercel (for hosting) or local `npm run dev`
	- Supabase project (URL + publishable anon key)

- Environment:
	- Copy `.env.example` to `.env.local` and fill values:
		- `VITE_SUPABASE_URL`
		- `VITE_SUPABASE_PUBLISHABLE_KEY`

- Development:
	- Install dependencies: `npm install`
	- Start dev server: `npm run dev`

## Supabase

- CLI link & migrations (already linked in this repo):
	- Push migrations: `npx supabase db push`
	- Schema includes tables: events, news, blog, projects, files, categories, board, bank_info, settings

## Deploy (Vercel)

1) In Vercel Project Settings → Environment Variables:
	 - `VITE_SUPABASE_URL` → https://<project-ref>.supabase.co
	 - `VITE_SUPABASE_PUBLISHABLE_KEY` → sb-publishable-...
2) Redeploy the project.
3) Verify admin CRUD and homepage slider items (showInSlider).

## Notes

- Media/Files currently store base64 in DB (`files.file_url`). For production at scale, move to Supabase Storage and save public URLs in `files`.

