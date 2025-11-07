import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [resolvedTheme, setResolvedTheme] = useState('dark');

  useEffect(() => {
    // Get saved theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    // Set the theme (only dark or light)
    setResolvedTheme(theme);
    root.classList.add(theme);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      return 'light';
    });
  };

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      toggleTheme,
      setTheme: setThemeMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
