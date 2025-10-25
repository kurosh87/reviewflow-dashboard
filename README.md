# ReviewFlow Dashboard

**Next.js admin dashboard for ReviewFlow WordPress plugin**

Deployed on Vercel, connects to WordPress REST API for centralized review management.

---

## Features

✅ **Dashboard Overview** - Stats, charts, quick actions
✅ **Review Moderation** - Approve/reject/delete reviews
✅ **Security Monitoring** - Rate limits, violations
✅ **Analytics** - Charts, trends, insights
✅ **Settings Management** - Configure ReviewFlow remotely

---

## Quick Deploy to Vercel

### 1. Push to GitHub

```bash
cd reviewflow-dashboard
git init
git add .
git commit -m "Initial commit: ReviewFlow Dashboard"
git remote add origin https://github.com/YOUR_USERNAME/reviewflow-dashboard.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `reviewflow-dashboard`
4. Configure environment variables:
   - `WORDPRESS_URL` = https://your-wordpress-site.com
   - `WORDPRESS_USERNAME` = your-admin-username
   - `WORDPRESS_APP_PASSWORD` = (create in WordPress)
   - `NEXTAUTH_SECRET` = (generate random string)
5. Click "Deploy"

### 3. Create WordPress Application Password

1. WordPress Admin → Users → Profile
2. Scroll to "Application Passwords"
3. Name: "ReviewFlow Dashboard"
4. Click "Add New Application Password"
5. Copy the generated password
6. Use in Vercel environment variables

---

## Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your WordPress credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## WordPress Setup

The ReviewFlow WordPress plugin must have the admin API enabled.

Ensure this file exists and is loaded:
```
wp-content/plugins/reviewflow/includes/class-reviewflow-admin-api.php
```

It provides these endpoints:
- `GET /wp-json/reviewflow/v1/admin/dashboard/stats`
- `GET /wp-json/reviewflow/v1/admin/reviews/pending`
- `POST /wp-json/reviewflow/v1/admin/reviews/{id}/approve`
- And more...

---

## Environment Variables

### Required:
- `WORDPRESS_URL` - Your WordPress site URL
- `WORDPRESS_USERNAME` - Admin username
- `WORDPRESS_APP_PASSWORD` - Application password

### Optional:
- `NEXTAUTH_SECRET` - For session encryption
- `NEXT_PUBLIC_SUPABASE_URL` - For direct Supabase access
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

---

## Architecture

```
Dashboard (Vercel) → WordPress REST API → Supabase
                   ↑
                   Authentication via Application Passwords
```

**Benefits:**
- Centralized admin interface
- Fast Vercel edge delivery
- Secure WordPress authentication
- Real-time data from Supabase

---

## Security

- ✅ WordPress Application Passwords (not main password)
- ✅ HTTPS required
- ✅ Admin capabilities checked on every request
- ✅ Security headers configured
- ✅ Environment variables for secrets

---

## Deployment

Automatically deployed on every push to `main` branch via Vercel.

---

**Built with Next.js 14, TypeScript, Tailwind CSS**
