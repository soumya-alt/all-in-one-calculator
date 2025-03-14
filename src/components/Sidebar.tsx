import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import {
  CalculatorIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  CogIcon,
  ClockIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const calculatorCategories = [
  { name: 'Basic', icon: CalculatorIcon, path: '/' },
  { name: 'Scientific', icon: BeakerIcon, path: '/scientific' },
  { name: 'Financial', icon: CurrencyDollarIcon, path: '/financial' },
  { name: 'Engineering', icon: CogIcon, path: '/engineering' },
  { name: 'Date & Time', icon: ClockIcon, path: '/datetime' },
  { name: 'Statistics', icon: ChartBarIcon, path: '/statistics' },
  { name: 'Computer Science', icon: ComputerDesktopIcon, path: '/computer-science' },
]

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Calculator Suite
            </h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {calculatorCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <category.icon className="w-6 h-6 mr-3" />
                {category.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 mr-3" />
              ) : (
                <MoonIcon className="w-6 h-6 mr-3" />
              )}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar 