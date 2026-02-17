# Netlify Not Detecting Push Automatically – Fix Guide

If Netlify doesn't trigger a deploy when you push to GitHub, use one of these solutions.

---

## Solution 1: Netlify Build Hook (Recommended)

This triggers a Netlify deploy right after your script pushes to GitHub.

### Step 1: Create a Build Hook in Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site (bereketfikre.netlify.app)
3. **Site configuration** → **Build & deploy** → **Continuous deployment**
4. Scroll to **Build hooks**
5. Click **Add build hook**
6. Name it: `Deploy from script`
7. Branch: `main`
8. Click **Save**
9. **Copy the generated URL** (looks like `https://api.netlify.com/build_hooks/xxxxx`)

### Step 2: Set the Build Hook URL

**Option A – Environment variable (one-time per session):**
```powershell
$env:NETLIFY_BUILD_HOOK_URL = "https://api.netlify.com/build_hooks/YOUR_HOOK_ID"
npm run build
node scripts/deploy-to-main.js
```

**Option B – `.env.deploy` file (persistent):**

1. Create `.env.deploy` in the project root:
   ```
   NETLIFY_BUILD_HOOK_URL=https://api.netlify.com/build_hooks/YOUR_HOOK_ID
   ```
2. Add `.env.deploy` to `.gitignore` (do not commit the URL)
3. Update the deploy script or run with: `Get-Content .env.deploy | ForEach-Object { $var = $_.Split('='); [Environment]::SetEnvironmentVariable($var[0], $var[1], 'Process') }; node scripts/deploy-to-main.js`

**Option C – PowerShell profile (persistent):**

Add to your PowerShell profile:
```powershell
$env:NETLIFY_BUILD_HOOK_URL = "https://api.netlify.com/build_hooks/YOUR_HOOK_ID"
```

### Step 3: Deploy

```powershell
npm run build
node scripts/deploy-to-main.js
```

The script will push to GitHub and then trigger Netlify via the build hook.

---

## Solution 2: Fix GitHub Webhook (Netlify Auto-Detect)

If you prefer Netlify to auto-detect pushes without a build hook:

### 1. Check Netlify GitHub App

1. Netlify Dashboard → **Site configuration** → **Build & deploy** → **Continuous deployment**
2. Confirm **Repository** shows `bereketfikre2021-sudo/Portfolio`
3. If it says "Not connected", click **Link repository** and reconnect

### 2. Check GitHub App Permissions

1. GitHub → **Settings** → **Applications** → **Installed GitHub Apps**
2. Find **Netlify**
3. Click **Configure**
4. Ensure **Portfolio** has **Read and write** access
5. Save

### 3. Check Branch Settings

1. Netlify Dashboard → **Site configuration** → **Build & deploy** → **Continuous deployment**
2. **Production branch** must be `main` (not `master`)

### 4. Reinstall Netlify GitHub App

1. Netlify Dashboard → **Site configuration** → **Build & deploy**
2. Under **Build settings**, click **Link repository**
3. Disconnect the current repo
4. Reconnect and authorize again

### 5. Verify Webhook in GitHub

1. GitHub repo → **Settings** → **Webhooks**
2. Find the Netlify webhook
3. Check **Recent Deliveries** for failed requests
4. If there are failures, try **Redeliver** or recreate the webhook via Netlify

---

## Quick Reference

| Issue | Fix |
|-------|-----|
| Netlify not deploying on push | Use **Solution 1** (Build Hook) |
| Wrong branch | Set Production branch to `main` in Netlify |
| Repo not connected | Re-link in Netlify Build & deploy |
| Webhook failing | Reinstall Netlify GitHub App |

---

## Manual Deploy (Fallback)

If both solutions fail:

1. Netlify Dashboard → **Deploys**
2. Click **Trigger deploy** → **Deploy site**
3. Or use Netlify CLI: `netlify deploy --prod --dir=build`
