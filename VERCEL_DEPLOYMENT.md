# Vercel Deployment Guide - AeroMind Nexus

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose: `samba06v/AeroMind`
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Other
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   Add these in Vercel Dashboard:
   ```
   DATABASE_URL=your_postgres_connection_string
   SESSION_SECRET=your_random_secret_key
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live!

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: aeromind-nexus
   - Directory: ./
   - Override settings: No

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## 🔧 Important Configuration

### Database Setup

For production, you need a PostgreSQL database. Options:

1. **Neon (Recommended - Free tier)**
   - Visit: https://neon.tech
   - Create free account
   - Create new project
   - Copy connection string
   - Add to Vercel environment variables

2. **Supabase**
   - Visit: https://supabase.com
   - Create project
   - Get connection string from Settings → Database

3. **Railway**
   - Visit: https://railway.app
   - Add PostgreSQL
   - Copy connection string

### Environment Variables in Vercel

Go to: Project Settings → Environment Variables

Add:
```
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=generate-random-32-char-string
NODE_ENV=production
PORT=3000
```

---

## 📝 Build Configuration

The project is configured with:

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

---

## 🐛 Troubleshooting

### Build Fails

1. **Check Node Version**
   - Vercel uses Node 18 by default
   - Add to `package.json`:
   ```json
   "engines": {
     "node": "18.x"
   }
   ```

2. **Missing Dependencies**
   - Ensure all dependencies are in `package.json`
   - Run `npm install` locally first

3. **TypeScript Errors**
   - Run `npm run check` locally
   - Fix any TypeScript errors

### Database Connection Issues

1. **Check Connection String**
   - Ensure DATABASE_URL is correct
   - Test connection locally first

2. **SSL Required**
   - Most cloud databases require SSL
   - Add `?sslmode=require` to connection string

3. **IP Whitelist**
   - Some databases require IP whitelisting
   - Add Vercel IPs or allow all IPs

### API Routes Not Working

1. **Check vercel.json**
   - Ensure routes are configured correctly

2. **Check Build Output**
   - Verify `dist/index.cjs` exists after build

3. **Check Logs**
   - Go to Vercel Dashboard → Deployments → View Logs

---

## 🎯 Post-Deployment

### 1. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 2. Initialize Database

After first deployment:
```bash
# Run migrations
npm run db:push
```

Or use Vercel CLI:
```bash
vercel env pull
npm run db:push
```

### 3. Test Your Deployment

Visit your Vercel URL:
- Main site: `https://your-project.vercel.app`
- Admin panel: `https://your-project.vercel.app/admin`
- API health: `https://your-project.vercel.app/api/health`

---

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch auto-deploys
- Pull requests get preview deployments
- Rollback available in Vercel Dashboard

---

## 📊 Monitoring

### Vercel Analytics
- Enable in Project Settings → Analytics
- Track page views, performance

### Error Tracking
- Check Vercel Dashboard → Logs
- Set up error notifications

---

## 💡 Tips

1. **Use Environment Variables**
   - Never commit secrets to Git
   - Use Vercel environment variables

2. **Preview Deployments**
   - Test changes in preview before production
   - Each PR gets its own URL

3. **Caching**
   - Vercel automatically caches static assets
   - API routes are serverless functions

4. **Limits**
   - Free tier: 100GB bandwidth/month
   - Serverless function timeout: 10s (free), 60s (pro)

---

## 🆘 Support

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Discord:** https://vercel.com/discord
- **GitHub Issues:** https://github.com/samba06v/AeroMind/issues

---

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Database created (Neon/Supabase/Railway)
- [ ] Environment variables configured
- [ ] vercel.json file present
- [ ] Build succeeds locally (`npm run build`)
- [ ] TypeScript check passes (`npm run check`)
- [ ] Deployed to Vercel
- [ ] Database migrations run
- [ ] Site accessible
- [ ] Admin panel working
- [ ] API endpoints responding

---

**Your AeroMind Nexus platform is ready for Vercel deployment!** 🚀
