'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';
import { getCookie, setCookie } from '@/services/cookies';
import { baseThemes } from '@/types';

interface ThemeContextType {
  theme: baseThemes;
  setTheme: Dispatch<SetStateAction<baseThemes>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  setTheme: () => {}
});
export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ className, children }: { className: string, children: ReactNode }) {
  const [theme, setTheme] = useState<baseThemes>('default');

  useEffect(() => {
    const darkMode = getCookie('dark_mode') === 'true';
    setTheme(darkMode ? 'dark' : 'default');
  }, []);

  useEffect(() => {
    setCookie('dark_mode', theme === 'dark' ? 'true' : 'false');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`ThemeProvider ${theme} ${className}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
