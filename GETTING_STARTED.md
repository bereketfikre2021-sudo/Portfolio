# Getting Started — Complete Setup Guide

This guide will walk you through setting up the complete backend and admin panel from scratch.

---

## Prerequisites

- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)
- Accounts needed:
  - [Neon PostgreSQL](https://console.neon.tech) (free tier)
  - [Cloudinary](https://cloudinary.com) (free tier)
  - Gmail account (for email notifications)

---

## Step 1: Set Up Neon PostgreSQL

1. Go to [console.neon.tech](https://console.neon.tech) and sign up
2. Click **"Create Project"**
3. Name it `bereketfikre-portfolio`
4. Copy the connection string — it looks like:
   ```
   postgresql://username:password@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
5. Save this string — you'll need it in `.env`

---

## Step 2: Set Up Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and sign up
2. From the Dashboard, copy:
   - **Cloud Name** (e.g. `dxxx`)
   - **API Key** (e.g. `123456789012345`)
   - **API Secret** (e.g. `abcdef...`)
3. Save these — you'll need them in `.env`

---

## Step 3: Generate JWT Secrets

Open a terminal and run:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this **twice** to get two different secrets:
- First result → `JWT_SECRET`
- Second result → `JWT_REFRESH_SECRET`

Save these for `.env`.

---

## Step 4: Set Up Gmail App Password

1. Enable 2FA on your Google account: [myaccount.google.com/security](https://myaccount.google.com/security)
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create an App Password:
   - App: **Mail**
   - Device: **Other (Custom name)** → "Portfolio Backend"
4. Google will generate a 16-character password like `xxxx xxxx xxxx xxxx`
5. Copy this (remove spaces) → this is your `EMAIL_PASS`

---

## Step 5: Backend Setup

```bash
cd Backend
npm install
```

### Create `.env` file

```bash
cp .env.example .env
```

Now edit `.env` and fill in all the values:

```bash
# Server
NODE_ENV=development
PORT=5000

# Database (from Step 1)
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# JWT (from Step 3)
JWT_SECRET=your_first_64_char_secret_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_second_64_char_secret_here
JWT_REFRESH_EXPIRES_IN=7d

# Admin (you can change these)
ADMIN_EMAIL=admin@bereketfikre.et
ADMIN_PASSWORD=YourStrongPassword123!
ADMIN_NAME=Bereket Fikre

# Cloudinary (from Step 2)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=https://bereketfikre.et
ADMIN_URL=http://localhost:3000

# Email (from Step 4)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=bereketfikre2021@gmail.com
EMAIL_PASS=your_16_char_app_password_no_spaces
EMAIL_FROM=bereketfikre2021@gmail.com
EMAIL_TO=bereketfikre2021@gmail.com

# Rate Limiting (defaults are fine)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=10
CONTACT_RATE_LIMIT_MAX=5
```

### Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to Neon (creates all tables)
npm run db:push

# Seed initial data (admin user + services + FAQs + partners)
npm run db:seed
```

You should see:
```
✅ Admin user created: admin@bereketfikre.et
✅ Service created: Brand Identity
✅ Service created: Creative Direction
...
✨ Database seed completed successfully!
```

**⚠️ IMPORTANT: Write down your admin credentials! You'll need them to log in.**

### Start Backend

```bash
npm run dev
```

You should see:
```
✅ Database connected
🚀 Server running on port 5000 [development]
📡 API base URL: http://localhost:5000/api
🔍 Health check: http://localhost:5000/health
```

**Test it:** Open http://localhost:5000/health in your browser.  
You should see: `{"status":"ok","env":"development","timestamp":"..."}`

✅ **Backend is running!**

---

## Step 6: Admin Panel Setup

Open a **NEW terminal** (keep the backend running):

```bash
cd Admin
npm install
```

### Create `.env` file

```bash
# Windows (PowerShell)
echo "VITE_API_URL=http://localhost:5000/api" | Out-File -Encoding utf8 .env

# macOS/Linux
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### Start Admin Panel

```bash
npm run dev
```

You should see:
```
  VITE v6.0.3  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Open:** http://localhost:3000

✅ **Admin panel is running!**

---

## Step 7: First Login

1. Go to http://localhost:3000
2. You'll see the login page
3. Enter the credentials from your Backend `.env`:
   - **Email:** `admin@bereketfikre.et` (or whatever you set)
   - **Password:** `YourStrongPassword123!` (or whatever you set)
4. Click **"Sign in"**

✅ **You're in!**

### ⚠️ IMMEDIATELY Change Your Password

1. Click **Settings** in the sidebar
2. Scroll to "Change Password"
3. Enter your current password
4. Enter a new strong password (8+ chars, uppercase, lowercase, number)
5. Click **"Update Password"**
6. You'll be logged out — log back in with your new password

---

## Step 8: Add Your First Project

1. Click **Projects** in the sidebar
2. Click **"Add Project"**
3. Fill in:
   - Title: "My First Project"
   - Category: "Brand Identity · Fashion"
   - Short Description: "A brand identity project"
   - Full Description: "Complete brand identity including logo, colors, and typography."
   - Technologies: "Adobe Illustrator, Photoshop" (press Enter after each)
4. Upload a thumbnail image (drag & drop)
5. Set Status to **"Published"**
6. Click **"Create Project"**

✅ **First project created!**

---

## Step 9: Verify the API

Open http://localhost:5000/api/projects in your browser.

You should see JSON with your project:
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "My First Project",
      "slug": "my-first-project",
      ...
    }
  ],
  "pagination": { ... }
}
```

✅ **API is working!**

---

## Step 10: Connect Your Frontend

Your frontend currently uses Formspree. Let's switch it to your backend.

### Option A: Update Frontend to Use Your Backend

In `Frontend/src/components/Contact.jsx`:
```javascript
// Change this:
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mandzwvb';

// To this:
const API_ENDPOINT = 'http://localhost:5000/api/contact';
```

In `Frontend/src/components/ProjectRequestModal.jsx`:
```javascript
// Change this:
await fetch('https://formspree.io/f/mandzwvb', { ... })

// To this:
await fetch('http://localhost:5000/api/project-request', { ... })
```

### Option B: Keep Formspree for Now

You can leave the frontend as-is and only use the admin panel to manage content. The frontend still pulls from its hardcoded data files.

---

## You're Done! 🎉

You now have:
- ✅ Backend API running on http://localhost:5000
- ✅ Admin panel running on http://localhost:3000
- ✅ Database with tables and seed data
- ✅ Image uploads configured with Cloudinary
- ✅ Email notifications configured
- ✅ Your first project created

---

## Next Steps

1. **Explore the Admin Panel**
   - Add services, insights, testimonials, FAQs
   - Upload images
   - Try dark mode (toggle in header)

2. **Test Contact Forms**
   - Submit a test contact message
   - Check your email for notification
   - View it in Admin → Contact Messages

3. **Add Real Content**
   - Projects from your portfolio
   - Your services
   - Client testimonials
   - Case studies

4. **Deploy to Production**
   - Backend → Render (see `Backend/README.md`)
   - Admin → Netlify (see `Admin/README.md`)
   - Update frontend API URLs

---

## Troubleshooting

### Backend won't start
- **Error: Missing environment variable**
  - Check `.env` has all required variables
  - Run `npm run db:generate` again

- **Error: Can't connect to database**
  - Verify your Neon connection string
  - Check the database is active in Neon console

### Admin panel shows "Network Error"
- Make sure backend is running on port 5000
- Check `Admin/.env` has correct `VITE_API_URL`
- Check browser console for CORS errors

### Can't log in
- Verify credentials match what's in `Backend/.env`
- Check backend terminal for error logs
- Try running `npm run db:seed` again

### Image upload fails
- Verify Cloudinary credentials are correct
- Check file size < 10MB
- Check file type (jpg, png, webp, svg, gif)

### Email notifications not working
- Use Gmail **App Password**, not your regular password
- Enable 2FA on Google account first
- Check `EMAIL_USER` and `EMAIL_PASS` in Backend `.env`

---

## Need Help?

1. Check the logs in your backend terminal
2. Check browser console for frontend errors
3. Review `Backend/README.md` for API docs
4. Review `PROJECT_SUMMARY.md` for architecture details

---

**Happy coding! 🚀**
