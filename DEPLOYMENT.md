# Deployment Guide

This project deploys automatically to Vercel via GitHub. Pushing to `staging` creates a preview, merging into `main` deploys to production.

---

## One-Time Vercel Setup

### 1. Import the repository
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import `guardium-group/cliffs_maintenance` from GitHub
4. Vercel will auto-detect Next.js — no framework config needed
5. Click **Deploy**

### 2. Set the production branch
1. In your Vercel project, go to **Settings → Git**
2. Set **Production Branch** to `main`
3. Save

### 3. Connect your custom domain
1. Go to **Settings → Domains**
2. Add your domain (e.g. `cliffstowing.com`)
3. Follow the DNS instructions Vercel provides (usually a CNAME or A record)
4. SSL is provisioned automatically — no action needed

---

## Daily Workflow

```
[your machine]  →  staging branch  →  Vercel preview URL
                →  merge to main   →  production (your domain)
```

### Making changes
```bash
# Make sure you're on staging
git checkout staging

# ... make your changes ...

git add .
git commit -m "your message"
git push guardium staging
```
Vercel will automatically build and post a **preview URL** in the GitHub branch.

### Deploying to production
```bash
git checkout main
git merge staging
git push guardium main
git checkout staging
```
Vercel will build and deploy to your production domain within ~1 minute.

---

## Toggling Maintenance Mode

Open `src/middleware.ts` and change line 3:

```ts
// Maintenance ON — all traffic redirected to /maintenance
const MAINTENANCE_MODE = true;

// Maintenance OFF — site loads normally
const MAINTENANCE_MODE = false;
```

Commit and push to `staging` to preview, then merge to `main` to go live.

---

## Environment Variables

This app currently has no required environment variables. If you add any in the future:

1. Go to **Vercel → Settings → Environment Variables**
2. Add each variable and set its scope (Production / Preview / Development)
3. Never commit `.env` files to the repository

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Check Vercel build logs; ensure all packages are in `dependencies` not `devDependencies` |
| Domain not resolving | DNS changes can take up to 48 hrs; verify records in your domain registrar |
| Maintenance page not showing | Confirm `MAINTENANCE_MODE = true` in `src/middleware.ts` and that changes are deployed |
| Preview not updating | Check the Vercel dashboard for a failed build; review the error log |
