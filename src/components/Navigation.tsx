import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { calculatorCategories } from '../routes/calculatorRoutes';
import * as Icons from '@heroicons/react/24/outline';

interface IconProps {
  name: string;
  className?: string;
}

const DynamicIcon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname === path;
  const isActiveCategory = (category: string) =>
    location.pathname.startsWith(`/${category.toLowerCase().split(' ')[0]}`);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Navigation */}
      <nav
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white dark:bg-gray-800 overflow-y-auto transition-transform duration-200 ease-in-out z-30 md:relative md:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calculators</h2>
            <button
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <DynamicIcon name="XMarkIcon" className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {calculatorCategories.map(category => (
              <div key={category.name} className="space-y-2">
                <div
                  className={`flex items-center space-x-2 text-sm font-medium ${
                    isActiveCategory(category.name)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <DynamicIcon name={category.icon} className="h-5 w-5" />
                  <span>{category.name}</span>
                </div>

                <div className="ml-6 space-y-1">
                  {category.routes.map(route => (
                    <Link
                      key={route.path}
                      to={route.path}
                      onClick={onClose}
                      className={`flex items-center space-x-2 px-2 py-1.5 text-sm rounded-md transition-colors ${
                        isActiveRoute(route.path)
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <DynamicIcon name={route.icon} className="h-4 w-4" />
                      <span>{route.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation; 