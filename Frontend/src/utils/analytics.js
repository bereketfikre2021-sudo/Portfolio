/**
 * Google Analytics 4 (GA4) — analytics utility
 *
 * Usage:
 *   Set VITE_GA_MEASUREMENT_ID in your .env file (e.g. G-XXXXXXXXXX).
 *   Analytics only initialises in production (import.meta.env.PROD).
 *   All functions are safe no-ops when GA is not available.
 *
 * Strict Mode safety:
 *   A module-level `_initialised` flag prevents double-initialisation
 *   caused by React Strict Mode running effects twice in development.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Prevent duplicate script injection from React Strict Mode double-invoke
let _initialised = false;

// ─── Initialisation ──────────────────────────────────────────────────────────

/**
 * Bootstraps GA4. Call once in App.jsx useEffect.
 * No-op if: not production, ID missing, or already called.
 */
export function initGoogleAnalytics() {
  if (_initialised) return;
  if (!GA_ID || !import.meta.env.PROD) return;

  // Set up the dataLayer queue before the script loads
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());

  // Disable automatic page_view — we fire it manually on route change
  window.gtag('config', GA_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  // Inject the GA4 script tag asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  _initialised = true;
}

// ─── Core helpers ─────────────────────────────────────────────────────────────

/** Returns true when gtag is available and we are in production. */
const isReady = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  !!GA_ID;

// ─── Page views ───────────────────────────────────────────────────────────────

/**
 * Track a page view. Called automatically by usePageTracking() on every
 * React Router navigation. Also available for manual use.
 *
 * @param {string} [path] - Defaults to window.location.pathname + search
 * @param {string} [title] - Defaults to document.title
 */
export function trackPageView(path, title) {
  if (!isReady()) return;
  window.gtag('event', 'page_view', {
    page_path: path || window.location.pathname + window.location.search,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

// ─── Generic event ────────────────────────────────────────────────────────────

/**
 * Send any custom GA4 event.
 *
 * @param {string} eventName - GA4 event name (snake_case recommended)
 * @param {object} [params]  - Additional event parameters
 */
export function trackEvent(eventName, params = {}) {
  if (!isReady()) return;
  window.gtag('event', eventName, params);
}

// ─── Specific tracking helpers ────────────────────────────────────────────────

/**
 * Track a portfolio project card click / modal open.
 * @param {string} projectName
 */
export function trackProjectView(projectName) {
  trackEvent('view_project', {
    event_category: 'Portfolio',
    event_label: projectName,
    project_name: projectName,
  });
}

/**
 * Track a successful contact form submission.
 * @param {string} [method] - e.g. 'contact_form' | 'project_request'
 */
export function trackContactForm(method = 'contact_form') {
  trackEvent('generate_lead', {
    event_category: 'Contact',
    event_label: method,
    method,
  });
}

/**
 * Track a file download (e.g. CV / resume).
 * @param {string} fileName
 */
export function trackDownload(fileName) {
  trackEvent('file_download', {
    event_category: 'Downloads',
    event_label: fileName,
    file_name: fileName,
  });
}

/**
 * Track an outbound social / external link click.
 * @param {string} platform - e.g. 'behance' | 'linkedin' | 'upwork'
 * @param {string} [url]
 */
export function trackExternalLink(platform, url) {
  trackEvent('click_external_link', {
    event_category: 'Social',
    event_label: platform,
    platform,
    link_url: url || '',
  });
}

/**
 * Track a CTA button click (e.g. "Explore Work", "Get in Touch").
 * @param {string} label
 * @param {string} [location] - Section where the CTA lives
 */
export function trackCTA(label, location = '') {
  trackEvent('click_cta', {
    event_category: 'CTA',
    event_label: label,
    cta_label: label,
    cta_location: location,
  });
}

/**
 * Track a case study modal open.
 * @param {string} title
 */
export function trackCaseStudyView(title) {
  trackEvent('view_case_study', {
    event_category: 'Insights',
    event_label: title,
    content_title: title,
  });
}

/**
 * Track a blog post modal open.
 * @param {string} title
 */
export function trackBlogView(title) {
  trackEvent('view_blog_post', {
    event_category: 'Insights',
    event_label: title,
    content_title: title,
  });
}
