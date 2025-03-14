import React, { useState } from 'react';
import Navigation from './Navigation';
import { useTheme } from '../contexts/ThemeContext';
import * as Icons from '@heroicons/react/24/outline';

interface IconProps {
  name: string;
  className?: string;
}

const DynamicIcon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsNavOpen(true)}
                className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <DynamicIcon name="Bars3Icon" className="h-6 w-6" />
              </button>
              <h1 className="ml-2 md:ml-0 text-xl font-bold text-gray-900 dark:text-white">
                All-in-One Calculator
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Toggle theme"
              >
                <DynamicIcon
                  name={theme === 'dark' ? 'SunIcon' : 'MoonIcon'}
                  className="h-6 w-6"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 