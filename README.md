# FSAAI — Private AI Video Studio

Responsive Next.js starter with single-user username/password authentication.

## Login setup
1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Choose a password and create its bcrypt hash:
   `node -e "const b=require('bcryptjs'); console.log(b.hashSync('YOUR_PASSWORD',12))"`
4. Set `ADMIN_PASSWORD_HASH` to that output.
5. Generate `AUTH_SECRET` using `openssl rand -base64 48`.
6. Run `npm run dev`; open `http://localhost:3000`.

Username defaults to `Saleeth`. The password is not pre-set; only you should choose it. Do not share it or commit `.env.local`.

## Cloud video generation
The UI and secure API integration point are prepared, but no provider is connected yet. Choose a provider, add its server-side credentials, and implement its documented request, upload and job-polling contract in `app/api/generate/route.ts`. Cloud providers may charge per video; free use is not guaranteed. Never expose API keys in browser code.
