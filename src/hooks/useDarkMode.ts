import { useEffect, useState } from 'react';

/**
 * Custom hook to manage Dark Mode state.
 * Syncs the state with Local Storage and toggles the 'dark' class on the documentElement (<html>).
 * 
 * @returns {{ isDarkMode: boolean, toggleDarkMode: () => void }} 
 * An object containing the current dark mode status and a toggle function.
 */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check local storage or system settings for theme preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  /**
   * Toggles the theme between dark and light modes.
   */
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleDarkMode };
}
