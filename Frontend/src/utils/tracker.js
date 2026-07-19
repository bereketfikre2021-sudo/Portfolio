/**
 * Built-in Analytics Tracker
 * Lightweight, privacy-first, no cookies — uses localStorage for visitor ID.
 * Sends beacons to POST /api/track on the backend.
 */

const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  'http://localhost:5000/api';

// ── IDs ───────────────────────────────────────────────────────────────────────
function getVisitorId() {
  let id = localStorage.getItem('_vid');
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('_vid', id); }
  return id;
}

function getSessionId() {
  let id = sessionStorage.getItem('_sid');
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('_sid', id); }
  return id;
}

// ── Device/browser detection ──────────────────────────────────────────────────
function getDevice() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return 'mobile';
  if (/iPad|Tablet/i.test(ua))  return 'tablet';
  return 'desktop';
}

function getBrowser() {
  const ua = navigator.userAgent;
  if (/Chrome/i.test(ua) && !/Edge|Edg/i.test(ua)) return 'Chrome';
  if (/Firefox/i.test(ua))  return 'Firefox';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Edge|Edg/i.test(ua)) return 'Edge';
  if (/OPR|Opera/i.test(ua)) return 'Opera';
  return 'Other';
}

function getOS() {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua))  return 'Windows';
  if (/Macintosh/i.test(ua)) return 'macOS';
  if (/iPhone|iPad/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Linux/i.test(ua))   return 'Linux';
  return 'Other';
}

function getTrafficSource(referrer) {
  if (!referrer) return 'direct';
  if (/google/i.test(referrer))    return 'google';
  if (/bing/i.test(referrer))      return 'bing';
  if (/facebook|instagram|twitter|linkedin|tiktok/i.test(referrer)) return 'social';
  return 'referral';
}

// ── Beacon sender ─────────────────────────────────────────────────────────────
function send(payload) {
  const url = `${API_BASE}/track`;
  const body = JSON.stringify({ visitorId: getVisitorId(), sessionId: getSessionId(), ...payload });
  // Use sendBeacon when available (survives page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
  } else {
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  }
}

// ── Session start ─────────────────────────────────────────────────────────────
let _sessionStarted = false;
export function startSession() {
  if (_sessionStarted) return;
  _sessionStarted = true;

  const ref = document.referrer;
  const params = new URLSearchParams(window.location.search);

  send({
    event: 'session_start',
    meta: {
      device:       getDevice(),
      browser:      getBrowser(),
      os:           getOS(),
      language:     navigator.language || 'unknown',
      referrer:     ref || null,
      utmSource:    params.get('utm_source')   || getTrafficSource(ref),
      utmMedium:    params.get('utm_medium')   || null,
      utmCampaign:  params.get('utm_campaign') || null,
      screenWidth:  window.screen.width,
      screenHeight: window.screen.height,
    },
  });

  // Ping every 30 seconds to update duration + lastSeenAt
  const pingInterval = setInterval(() => {
    send({ event: 'session_ping', duration: Date.now() - _sessionStart });
  }, 30000);

  // Final ping on page unload
  window.addEventListener('pagehide', () => {
    clearInterval(pingInterval);
    send({ event: 'session_ping', duration: Date.now() - _sessionStart });
  });
}

const _sessionStart = Date.now();

// ── Section view ──────────────────────────────────────────────────────────────
const _sectionTimes = {};

export function trackSectionView(section) {
  _sectionTimes[section] = Date.now();
  send({ event: 'section_view', target: section });
}

export function trackSectionLeave(section) {
  const entered = _sectionTimes[section];
  if (!entered) return;
  const duration = Date.now() - entered;
  send({ event: 'section_view', target: section, duration });
  delete _sectionTimes[section];
}

// ── Content view (project / insight) ─────────────────────────────────────────
const _contentTimes = {};

export function trackContentView(type, slug) {
  _contentTimes[slug] = Date.now();
  send({ event: 'content_view', target: type, targetId: slug });
}

export function trackContentLeave(type, slug) {
  const entered = _contentTimes[slug];
  if (!entered) return;
  send({ event: 'content_view', target: type, targetId: slug, duration: Date.now() - entered });
  delete _contentTimes[slug];
}

// ── Conversions ───────────────────────────────────────────────────────────────
export function trackConversion(action, value) {
  send({ event: 'conversion', target: action, value: value || null });
}

// ── Click tracking ────────────────────────────────────────────────────────────
export function trackClick(target, value) {
  send({ event: 'click', target, value: value || null });
}
