import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to callbacks
 * @param {Array} dependencies - Dependencies array for the effect
 */
export const useKeyboardShortcuts = (shortcuts, dependencies = []) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      const ctrlKey = e.ctrlKey || e.metaKey;
      const shiftKey = e.shiftKey;
      const altKey = e.altKey;

      // Build key combination string
      let combination = '';
      if (ctrlKey) combination += 'ctrl+';
      if (shiftKey) combination += 'shift+';
      if (altKey) combination += 'alt+';
      combination += key;

      // Check if combination matches any shortcut
      if (shortcuts[combination]) {
        e.preventDefault();
        shortcuts[combination](e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, dependencies);
};

export default useKeyboardShortcuts;

