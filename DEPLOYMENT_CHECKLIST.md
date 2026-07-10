# Production Deployment Checklist

Use this checklist to deploy your backend and admin panel to production.

---

## Pre-Deployment

### Backend
- [ ] All tests pass locally (`npm run dev` works)
- [ ] `.env.example` is up to date
- [ ] No `.env` file in Git (check `.gitignore`)
- [ ] Database schema is finalized
- [ ] Seed script works
- [ ] All API endpoints tested
- [ ] CORS origins configured correctly
- [ ] Rate limits configured
- [ ] Error logging configured (Winston)
- [ ] Email notifications work

### Admin Panel
- [ ] All features work locally
- [ ] No console errors
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] All forms validated
- [ ] Image upload works
- [ ] Build succeeds (`npm run build`)

---

## Backend Deployment (Render)

### 1. Prepare GitHub Repository

```bash
cd Backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
git push -u origin main
```

### 2. Set Up Neon Database (Production)

- [ ] Create a new Neon project for production (or use existing)
- [ ] Copy the production connection string
- [ ] Keep it handy for Render environment variables

### 3. Deploy to Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `bereketfikre-backend`
   - **Environment:** Node
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for better performance)

4. **Environment Variables** — Add all from `.env.example`:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `5000` (or leave blank) |
| `DATABASE_URL` | Your Neon production connection string |
| `JWT_SECRET` | Same as local (or generate new) |
| `JWT_EXPIRES_IN` | `15m` |
| `JWT_REFRESH_SECRET` | Same as local (or generate new) |
| `JWT_REFRESH_EXPIRES_IN` | `7d` |
| `ADMIN_EMAIL` | `admin@bereketfikre.et` |
| `ADMIN_PASSWORD` | **Strong password** (you'll change it after first login) |
| `ADMIN_NAME` | `Bereket Fikre` |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `FRONTEND_URL` | `https://bereketfikre.et` |
| `ADMIN_URL` | Your admin panel URL (will add later) |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Your Gmail App Password |
| `EMAIL_FROM` | Same as `EMAIL_USER` |
| `EMAIL_TO` | Your email for notifications |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX` | `100` |
| `AUTH_RATE_LIMIT_MAX` | `10` |
| `CONTACT_RATE_LIMIT_MAX` | `5` |

5. Click **"Create Web Service"**
6. Wait for deployment (3-5 minutes)

### 4. Run Seed Script

Once deployed:
1. Go to your service → **Shell** tab
2. Run: `node prisma/seed.js`
3. Verify success message

### 5. Test Production API

- [ ] Visit: `https://your-backend.onrender.com/health`
- [ ] Should return: `{"status":"ok","env":"production",...}`
- [ ] Test login: `POST https://your-backend.onrender.com/api/auth/login`
- [ ] Test public endpoint: `GET https://your-backend.onrender.com/api/services`

✅ **Backend deployed!**

**Save your Render URL:** `https://your-backend.onrender.com`

---

## Admin Panel Deployment (Netlify)

### 1. Update Environment Variable

Edit `Admin/.env`:
```bash
VITE_API_URL=https://your-backend.onrender.com/api
```

### 2. Build for Production

```bash
cd Admin
npm run build
```

Verify the `dist/` folder was created with `index.html`.

### 3. Deploy to Netlify

#### Option A: Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag the `dist/` folder onto the upload area
4. Wait for deployment
5. Your site is live at `https://random-name.netlify.app`

#### Option B: GitHub (Recommended)
1. Push Admin to GitHub:
   ```bash
   cd Admin
   git init
   git add .
   git commit -m "Initial admin panel commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-admin.git
   git push -u origin main
   ```
2. Go to [app.netlify.com](https://app.netlify.com)
3. **New site from Git** → Connect GitHub → Select repo
4. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Environment variable:** `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Click **"Deploy site"**

### 4. Custom Domain (Optional)

In Netlify:
1. **Domain settings** → **Add custom domain**
2. Add: `admin.bereketfikre.et`
3. Configure DNS:
   - Add CNAME record: `admin` → `random-name.netlify.app`
4. Wait for DNS propagation (5-30 minutes)

### 5. Update Backend CORS

Go back to Render → Your backend → **Environment** → Edit `ADMIN_URL`:
```
ADMIN_URL=https://random-name.netlify.app
```
Or if using custom domain:
```
ADMIN_URL=https://admin.bereketfikre.et
```

Redeploy backend for CORS changes to take effect.

### 6. Test Production Admin

- [ ] Visit your Netlify URL
- [ ] Login with production credentials
- [ ] **IMMEDIATELY change password** (Settings → Change Password)
- [ ] Create a test project
- [ ] Upload an image
- [ ] Verify image appears in Cloudinary

✅ **Admin panel deployed!**

---

## Frontend Integration

### Update API URLs

In your frontend repo:

**`Frontend/src/components/Contact.jsx`:**
```javascript
const API_ENDPOINT = 'https://your-backend.onrender.com/api/contact';
```

**`Frontend/src/components/ProjectRequestModal.jsx`:**
```javascript
const API_URL = 'https://your-backend.onrender.com/api/project-request';
```

### Deploy Frontend

Follow your existing frontend deployment process. The forms will now submit to your backend instead of Formspree.

---

## Post-Deployment

### Security
- [ ] Change admin password immediately
- [ ] Verify rate limiting works (try spamming login)
- [ ] Test CORS (should only allow your domains)
- [ ] Enable HTTPS only (Render does this by default)
- [ ] Review Render logs for any errors

### Monitoring
- [ ] Set up Render monitoring alerts
- [ ] Test email notifications
- [ ] Monitor Neon database usage
- [ ] Monitor Cloudinary usage
- [ ] Check backend logs for errors

### Testing
- [ ] Submit contact form from live frontend
- [ ] Submit project request from live frontend
- [ ] Create content in admin → verify it appears on frontend
- [ ] Upload images → verify Cloudinary URLs work
- [ ] Test all CRUD operations
- [ ] Test on mobile device

### Content
- [ ] Delete test data
- [ ] Add your real portfolio projects
- [ ] Add your services
- [ ] Add testimonials
- [ ] Add FAQs
- [ ] Add partner logos

---

## Render Free Tier Notes

⚠️ **Render free tier spins down after 15 minutes of inactivity.**

**What this means:**
- First request after inactivity takes 30-60 seconds (cold start)
- Subsequent requests are fast
- Not ideal for production — consider paid plan ($7/month)

**Solutions:**
- Upgrade to paid plan (recommended)
- Use a cron job to ping `/health` every 10 minutes
- Accept the cold start delay

---

## Backup Strategy

### Database Backups (Neon)
- Neon automatically backs up your database
- You can restore from Neon console
- Export manually: `npx prisma db pull` → save schema

### Code Backups
- Everything is in Git
- Push to GitHub regularly
- Consider private repos for security

### Image Backups
- Cloudinary stores all images
- Can export via Cloudinary console
- Consider enabling Cloudinary backups

---

## Maintenance

### Weekly
- [ ] Check Render logs for errors
- [ ] Monitor Cloudinary usage
- [ ] Check email notifications working
- [ ] Review contact submissions

### Monthly
- [ ] Review and update dependencies (`npm outdated`)
- [ ] Check Neon database size
- [ ] Review rate limit logs
- [ ] Clean up old/archived submissions

### As Needed
- [ ] Respond to contact messages
- [ ] Add new portfolio projects
- [ ] Update services
- [ ] Add new testimonials

---

## Troubleshooting

### Backend won't deploy
- Check Render build logs
- Verify all environment variables are set
- Ensure `DATABASE_URL` is correct
- Check Node version in package.json engines

### Admin can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Look for errors in browser console
- Verify backend is running (health check)

### Images not uploading
- Check Cloudinary credentials
- Verify Cloudinary storage limits not exceeded
- Check Render logs for errors
- Test Cloudinary API with curl

### Forms not submitting
- Check frontend console for errors
- Verify API URLs are correct
- Check backend logs
- Test API endpoints with Postman

### Email notifications not working
- Verify Gmail App Password is correct
- Check `EMAIL_USER` and `EMAIL_PASS`
- Look for email errors in Render logs
- Test with a different recipient email

---

## Rollback Procedure

If something goes wrong:

1. **Backend:** Render → Deployments → Manually deploy previous commit
2. **Admin:** Netlify → Deploys → Restore previous deploy
3. **Database:** Neon → Restore from backup (if needed)

---

## Success Metrics

After deployment, you should have:
- ✅ Backend API running and accessible
- ✅ Admin panel running and accessible
- ✅ Database with all tables and seed data
- ✅ CORS configured correctly
- ✅ Image uploads working
- ✅ Email notifications working
- ✅ Admin password changed
- ✅ Frontend forms submitting to backend
- ✅ All content types manageable via admin
- ✅ Mobile-responsive admin panel
- ✅ HTTPS everywhere

---

## Cost Summary

| Service | Free Tier | Paid Tier |
|---|---|---|
| **Neon** | 0.5 GB storage, 100 hours compute | $19+/month |
| **Render** | 750 hours/month (1 service) | $7+/month per service |
| **Netlify** | 100 GB bandwidth | $19+/month |
| **Cloudinary** | 25 GB storage, 25 GB bandwidth | $99+/month |
| **Total** | **FREE** | ~$50+/month |

The free tier is sufficient for a personal portfolio with moderate traffic.

---

## Support

- Backend API docs: `Backend/README.md`
- Architecture: `PROJECT_SUMMARY.md`
- Local setup: `GETTING_STARTED.md`

---

**You're ready for production! 🚀**
