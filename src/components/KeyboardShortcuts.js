import React, { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openProjectRequestModal } = useContext(ModalContext);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+/': (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    },
    'escape': (e) => {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Ctrl', '/'], description: 'Show/hide keyboard shortcuts' },
    { keys: ['Esc'], description: 'Close modal or dialog' },
    { keys: ['Tab'], description: 'Navigate between interactive elements' },
    { keys: ['Shift', 'Tab'], description: 'Navigate backwards' },
    { keys: ['Enter'], description: 'Activate button or link' },
    { keys: ['Space'], description: 'Activate button (when focused)' },
    { keys: ['Ctrl', 'K'], description: 'Open project request form' },
    { keys: ['Home'], description: 'Scroll to top' },
    { keys: ['End'], description: 'Scroll to bottom' },
  ];

  return (
    <div
      className="keyboard-shortcuts-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="keyboard-shortcuts-content">
        <div className="keyboard-shortcuts-header">
          <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
          <button
            className="keyboard-shortcuts-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close keyboard shortcuts"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="keyboard-shortcuts-list">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="keyboard-shortcut-item">
              <div className="keyboard-shortcut-keys">
                {shortcut.keys.map((key, keyIndex) => (
                  <React.Fragment key={keyIndex}>
                    <kbd>{key}</kbd>
                    {keyIndex < shortcut.keys.length - 1 && <span>+</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="keyboard-shortcut-description">{shortcut.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;



