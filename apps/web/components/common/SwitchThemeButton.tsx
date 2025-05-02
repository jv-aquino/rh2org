import type { Dispatch, SetStateAction } from "react";
import { Moon, Sun } from "lucide-react";

import { baseThemes } from '@/types';
import clsx from "clsx";

interface SwitchThemeButtonProps {
  className?: string;
  iconClassName?: string;
  theme: baseThemes;
  setTheme: Dispatch<SetStateAction<baseThemes>>;
}

function SwitchThemeButton({ className, iconClassName, theme, setTheme }: SwitchThemeButtonProps) {
  return ( 
    <button 
        className={clsx('transition-colors cursor-pointer', className)}
        onClick={() => {
          setTheme(theme === 'dark' ? 'default' : 'dark');
        }}
      >
        
        {theme === 'default' ? <Moon className={iconClassName} /> : <Sun className={iconClassName} />}
      </button>
   );
}

export default SwitchThemeButton;