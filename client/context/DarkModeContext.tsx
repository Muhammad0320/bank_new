import { createContext, useEffect, type ReactNode } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface DarkModeType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeType | null>(null);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  });

  if (typeof setIsDarkMode !== 'function') return;

  if (typeof isDarkMode !== 'boolean') return;

  const toggleDarkMode = () => setIsDarkMode(mode => !mode);

  const value: DarkModeType = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {' '}
      {children}{' '}
    </DarkModeContext.Provider>
  );
};
