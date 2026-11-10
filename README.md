# FSAAI starter

A deployable Next.js starter for an AI video generation studio, using Supabase email-link sign-in and fal.ai inference. Deploys to Vercel.

## Requirements

- Node.js 20.9 or newer
- A Supabase project with email auth enabled
- A fal.ai account and an available text-to-video model
- A Vercel account for deployment

## Run locally

1. Copy `.env.example` to `.env.local`.
2. In Supabase, copy the Project URL and anon/publishable key into `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Set `FAL_KEY` to your fal.ai API key. Keep it private; do not prefix it with `NEXT_PUBLIC_`.
4. Set `FAL_MODEL_ID` to a text-to-video model available to your fal.ai account. The sample ID is a placeholder and model availability/output schemas may change.
5. In Supabase Auth URL Configuration, set the site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` as a redirect URL.
6. Install and start:

   ```bash
   npm install
   npm run dev
   ```

Open http://localhost:3000. The app requires Supabase credentials for sign-in. Supabase sends a one-time email link; configure SMTP in Supabase for production delivery.

## Vercel deployment

Import this project into Vercel as a Next.js app. Add the same four environment variables under Project Settings → Environment Variables, then deploy. In Supabase Auth URL Configuration, set the production site URL to your Vercel domain and add `https://YOUR-DOMAIN/auth/callback` as a redirect URL. Redeploy after changing environment variables.

## Model output note

The API expects the configured fal.ai model to accept `{ prompt }` and return `video.url` or `videos[0].url`. Check the selected model's current input/output schema on fal.ai. If its schema differs, update `app/api/generate/route.ts` to map the request and response. Generated media URLs may expire according to fal.ai's storage policy.

## Security

- No real API keys or credentials are included.
- `.env*` files are ignored by Git, except `.env.example`.
- fal.ai requests are made server-side; `FAL_KEY` is never exposed to the client.
- Generation route requires an authenticated Supabase user.
- Configure Supabase email rate limits and production SMTP before public launch.
