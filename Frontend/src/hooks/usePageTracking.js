/**
 * usePageTracking
 *
 * Listens to React Router's location changes and fires a GA4 page_view
 * on every navigation. Import and call once inside AppContent (or wherever
 * your router lives).
 *
 * This site uses a single-page layout with hash/scroll navigation, so
 * "pages" are tracked via the hash fragment when present.
 */

import { useEffect, useRef } from 'react';
import { trackPageView } from '../utils/analytics';

export function usePageTracking() {
  // Track the last path we sent so we never fire duplicates (Strict Mode safety)
  const lastTracked = useRef(null);

  useEffect(() => {
    const fire = () => {
      const path = window.location.pathname + window.location.search + window.location.hash;
      if (path === lastTracked.current) return;
      lastTracked.current = path;
      trackPageView(path, document.title);
    };

    // Fire once on mount (initial load)
    fire();

    // Listen for hash changes (single-page scroll navigation)
    window.addEventListener('hashchange', fire);
    // Listen for History API pushState / popstate (if any modal uses routing)
    window.addEventListener('popstate', fire);

    return () => {
      window.removeEventListener('hashchange', fire);
      window.removeEventListener('popstate', fire);
    };
  }, []);
}
