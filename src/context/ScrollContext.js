import React, { createContext, useContext, useEffect, useState } from 'react';

const ScrollContext = createContext({ scrollPercent: 0, scrollY: 0, isScrollToTopVisible: false });

export function ScrollProvider({ children }) {
  const [state, setState] = useState({
    scrollPercent: 0,
    scrollY: 0,
    isScrollToTopVisible: false,
  });

  useEffect(() => {
    let ticking = false;
    let cachedScrollHeight = 0;
    let cachedClientHeight = 0;
    let recalculateTimeout = null;

    const updateCache = () => {
      const body = document.body;
      const docEl = document.documentElement;
      cachedScrollHeight = Math.max(
        body.scrollHeight,
        docEl.scrollHeight,
        body.offsetHeight,
        docEl.offsetHeight
      );
      cachedClientHeight = window.innerHeight || docEl.clientHeight;
    };

    const updateProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset ?? document.documentElement.scrollTop ?? document.body.scrollTop;
          if (cachedScrollHeight === 0) {
            updateCache();
          } else if (recalculateTimeout === null) {
            recalculateTimeout = setTimeout(() => {
              (typeof requestIdleCallback !== 'undefined'
                ? requestIdleCallback
                : (cb) => setTimeout(cb, 0))(() => {
                updateCache();
                recalculateTimeout = null;
              }, { timeout: 1000 });
            }, 500);
          }
          const scrollable = cachedScrollHeight - cachedClientHeight;
          const scrollPercent = scrollable > 0
            ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100))
            : 0;
          setState({
            scrollPercent,
            scrollY: scrollTop,
            isScrollToTopVisible: scrollTop > 300,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    let resizeTicking = false;
    const handleResize = () => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          updateCache();
          updateProgress();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    };

    requestAnimationFrame(() => {
      updateCache();
      updateProgress();
    });
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', () => {
      requestAnimationFrame(() => {
        updateCache();
        updateProgress();
      });
    });
    if (document.readyState === 'complete') {
      (typeof requestIdleCallback !== 'undefined'
        ? (cb) => requestIdleCallback(cb, { timeout: 2000 })
        : (cb) => setTimeout(cb, 0))(() => {
        updateCache();
        updateProgress();
      });
    }

    return () => {
      if (recalculateTimeout) clearTimeout(recalculateTimeout);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ScrollContext.Provider value={state}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}
