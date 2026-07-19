# Google Analytics Data API — Reusable Implementation
## Stack: Node.js + Express + React (Admin Dashboard)

---

## 1. Dependencies

```bash
# Backend
npm install @google-analytics/data

# No extra frontend deps needed
```

---

## 2. Environment Variables

Add to `.env` (local) and your hosting platform (Render / Railway / etc.):

```env
GA_PROPERTY_ID=your_numeric_property_id       # e.g. 524149509
GA_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### How to get these values:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project (or use existing)
3. Enable **Google Analytics Data API**
4. Create a **Service Account** → generate a JSON key
5. From the JSON key file extract:
   - `client_email` → `GA_CLIENT_EMAIL`
   - `private_key`  → `GA_PRIVATE_KEY`
6. Go to [GA4](https://analytics.google.com) → Admin → Property Access Management
7. Add the service account email as **Viewer**
8. Copy the numeric **Property ID** from GA4 Admin → `GA_PROPERTY_ID`

---

## 3. Backend — Analytics Service

**`src/services/analytics.service.js`**

```javascript
'use strict';

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// ── Init client ───────────────────────────────────────────────────────────────
let _client = null;

function getClient() {
  if (_client) return _client;

  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!process.env.GA_PROPERTY_ID || !process.env.GA_CLIENT_EMAIL || !privateKey) {
    throw new Error('GA credentials not configured. Set GA_PROPERTY_ID, GA_CLIENT_EMAIL, GA_PRIVATE_KEY.');
  }

  _client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key:  privateKey,
    },
  });
  return _client;
}

const propertyId = () => `properties/${process.env.GA_PROPERTY_ID}`;

// ── Cache (5 min TTL) ─────────────────────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

async function cached(key, fn) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return hit.data;
  const data = await fn();
  cache.set(key, { data, ts: Date.now() });
  return data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function dim(row, idx = 0) { return row.dimensionValues?.[idx]?.value ?? '(none)'; }
function met(row, idx = 0) { return parseInt(row.metricValues?.[idx]?.value ?? '0', 10); }

function toRows(rows = [], dimIdx = 0, metIdx = 0) {
  return rows.map((r) => ({ dimension: dim(r, dimIdx), value: met(r, metIdx) }));
}

// ── Today / week / month helpers ─────────────────────────────────────────────
function today() {
  return new Date().toISOString().slice(0, 10);
}
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

// ── Exported report functions ─────────────────────────────────────────────────

async function getOverview() {
  return cached('overview', async () => {
    const client = getClient();
    const pid = propertyId();

    const [todayRes, weekRes, monthRes, totalsRes, bounceRes] = await Promise.all([
      client.runReport({ property: pid, dateRanges: [{ startDate: today(), endDate: today() }], metrics: [{ name: 'activeUsers' }] }),
      client.runReport({ property: pid, dateRanges: [{ startDate: daysAgo(7), endDate: today() }], metrics: [{ name: 'activeUsers' }] }),
      client.runReport({ property: pid, dateRanges: [{ startDate: daysAgo(30), endDate: today() }], metrics: [{ name: 'activeUsers' }] }),
      client.runReport({ property: pid, dateRanges: [{ startDate: '2020-01-01', endDate: today() }], metrics: [{ name: 'totalUsers' }, { name: 'screenPageViews' }, { name: 'averageSessionDuration' }] }),
      client.runReport({ property: pid, dateRanges: [{ startDate: daysAgo(30), endDate: today() }], metrics: [{ name: 'bounceRate' }] }),
    ]);

    return {
      visitorsToday:       met(todayRes[0].rows?.[0]),
      visitorsThisWeek:    met(weekRes[0].rows?.[0]),
      visitorsThisMonth:   met(monthRes[0].rows?.[0]),
      totalUsers:          met(totalsRes[0].rows?.[0], 0),
      pageViews:           met(totalsRes[0].rows?.[0], 1),
      avgSessionDuration:  Math.round(parseFloat(totalsRes[0].rows?.[0]?.metricValues?.[2]?.value ?? '0')),
      bounceRate:          Math.round(parseFloat(bounceRes[0].rows?.[0]?.metricValues?.[0]?.value ?? '0') * 100),
    };
  });
}

async function getTopPages() {
  return cached('topPages', async () => {
    const [res] = await getClient().runReport({
      property: propertyId(),
      dateRanges: [{ startDate: daysAgo(30), endDate: today() }],
      dimensions: [{ name: 'pagePath' }],
      metrics:    [{ name: 'screenPageViews' }],
      orderBys:   [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    });
    return toRows(res.rows);
  });
}

async function getTrafficSources() {
  return cached('trafficSources', async () => {
    const [res] = await getClient().runReport({
      property: propertyId(),
      dateRanges: [{ startDate: daysAgo(30), endDate: today() }],
      dimensions: [{ name: 'sessionSource' }],
      metrics:    [{ name: 'sessions' }],
      orderBys:   [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    });
    return toRows(res.rows);
  });
}

async function getCountries() {
  return cached('countries', async () => {
    const [res] = await getClient().runReport({
      property: propertyId(),
      dateRanges: [{ startDate: daysAgo(30), endDate: today() }],
      dimensions: [{ name: 'country' }],
      metrics:    [{ name: 'activeUsers' }],
      orderBys:   [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 10,
    });
    return toRows(res.rows);
  });
}

async function getDevices() {
  return cached('devices', async () => {
    const [res] = await getClient().runReport({
      property: propertyId(),
      dateRanges: [{ startDate: daysAgo(30), endDate: today() }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics:    [{ name: 'activeUsers' }],
      orderBys:   [{ metric: { metricName: 'activeUsers' }, desc: true }],
    });
    return toRows(res.rows);
  });
}

async function getBrowsers() {
  return cached('browsers', async () => {
    const [res] = await getClient().runReport({
      property: propertyId(),
      dateRanges: [{ startDate: daysAgo(30), endDate: today() }],
      dimensions: [{ name: 'browser' }],
      metrics:    [{ name: 'activeUsers' }],
      orderBys:   [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 8,
    });
    return toRows(res.rows);
  });
}

async function getRealtimeUsers() {
  return cached('realtime', async () => {
    const [res] = await getClient().runRealtimeReport({
      property: propertyId(),
      metrics: [{ name: 'activeUsers' }],
    });
    return { activeUsers: met(res.rows?.[0]) };
  });
}

module.exports = { getOverview, getTopPages, getTrafficSources, getCountries, getDevices, getBrowsers, getRealtimeUsers };
```

---

## 4. Backend — Controller

**`src/controllers/analytics.controller.js`**

```javascript
const analyticsService = require('../services/analytics.service');
const { success, error } = require('../utils/response');
const logger = require('../utils/logger');

async function run(res, fn) {
  try {
    return success(res, await fn());
  } catch (err) {
    logger.error(`GA API error: ${err.message}`);
    return error(res, `Analytics error: ${err.message}`, 503);
  }
}

const getOverview       = (req, res) => run(res, analyticsService.getOverview);
const getTopPages       = (req, res) => run(res, analyticsService.getTopPages);
const getTrafficSources = (req, res) => run(res, analyticsService.getTrafficSources);
const getCountries      = (req, res) => run(res, analyticsService.getCountries);
const getDevices        = (req, res) => run(res, analyticsService.getDevices);
const getBrowsers       = (req, res) => run(res, analyticsService.getBrowsers);
const getRealtimeUsers  = (req, res) => run(res, analyticsService.getRealtimeUsers);

const getAll = async (req, res) => {
  try {
    const [overview, topPages, trafficSources, countries, devices, browsers, realtime] =
      await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getTopPages(),
        analyticsService.getTrafficSources(),
        analyticsService.getCountries(),
        analyticsService.getDevices(),
        analyticsService.getBrowsers(),
        analyticsService.getRealtimeUsers(),
      ]);
    return success(res, { overview, topPages, trafficSources, countries, devices, browsers, realtime });
  } catch (err) {
    logger.error(`GA API error (all): ${err.message}`);
    return error(res, `Analytics error: ${err.message}`, 503);
  }
};

module.exports = { getOverview, getTopPages, getTrafficSources, getCountries, getDevices, getBrowsers, getRealtimeUsers, getAll };
```

---

## 5. Backend — Routes

**`src/routes/analytics.routes.js`**

```javascript
const { Router } = require('express');
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/analytics.controller');

const router = Router();
router.use(authenticate); // all routes require valid admin JWT

router.get('/all',             ctrl.getAll);
router.get('/overview',        ctrl.getOverview);
router.get('/top-pages',       ctrl.getTopPages);
router.get('/traffic-sources', ctrl.getTrafficSources);
router.get('/countries',       ctrl.getCountries);
router.get('/devices',         ctrl.getDevices);
router.get('/browsers',        ctrl.getBrowsers);
router.get('/realtime',        ctrl.getRealtimeUsers);

module.exports = router;
```

**Register in `app.js`:**
```javascript
const analyticsRoutes = require('./routes/analytics.routes');
app.use('/api/admin/analytics', analyticsRoutes);
```

---

## 6. Frontend — Dashboard Section (React + TanStack Query)

```jsx
// In your dashboard component:

const { data: gaData, isLoading: gaLoading, isError: gaError } = useQuery({
  queryKey: ['analytics'],
  queryFn: () => api.get('/admin/analytics/all').then((r) => r.data.data),
  retry: false,
  staleTime: 5 * 60 * 1000, // 5 min cache
});

const ga = gaData || null;

// Render:
{gaLoading && <p>Loading analytics...</p>}

{gaError && (
  <p>Analytics not available — add GA credentials to environment variables.
     GA_PROPERTY_ID · GA_CLIENT_EMAIL · GA_PRIVATE_KEY</p>
)}

{ga && (
  <div>
    <p>Today: {ga.overview.visitorsToday}</p>
    <p>This week: {ga.overview.visitorsThisWeek}</p>
    <p>This month: {ga.overview.visitorsThisMonth}</p>
    <p>Total users: {ga.overview.totalUsers}</p>
    <p>Page views: {ga.overview.pageViews}</p>
    <p>Avg session: {ga.overview.avgSessionDuration}s</p>
    <p>Bounce rate: {ga.overview.bounceRate}%</p>
    {ga.realtime?.activeUsers != null && <p>{ga.realtime.activeUsers} active now</p>}
    {/* top pages, traffic sources, countries, devices, browsers — all in ga.* */}
  </div>
)}
```

---

## 7. Checklist for a new project

- [ ] `npm install @google-analytics/data` in backend
- [ ] Create Google Cloud project + enable GA Data API
- [ ] Create Service Account + download JSON key
- [ ] Add service account email as Viewer in GA4 Admin
- [ ] Set `GA_PROPERTY_ID`, `GA_CLIENT_EMAIL`, `GA_PRIVATE_KEY` in env
- [ ] Copy `analytics.service.js`, `analytics.controller.js`, `analytics.routes.js`
- [ ] Register route in `app.js`
- [ ] Add frontend query + UI components
