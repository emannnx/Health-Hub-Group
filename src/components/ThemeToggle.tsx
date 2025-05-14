
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Toggle 
      aria-label="Toggle theme" 
      pressed={isDark} 
      onPressedChange={toggleTheme}
      className="rounded-full p-2 hover:bg-muted transition-all duration-300"
    >
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all duration-300" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
};

export default ThemeToggle;
