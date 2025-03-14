import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import BasicCalculator from './calculators/BasicCalculator'
import ScientificCalculator from './calculators/ScientificCalculator'
import FinancialCalculator from './calculators/FinancialCalculator'
import EngineeringCalculator from './calculators/EngineeringCalculator'
import DateTimeCalculator from './calculators/DateTimeCalculator'
import StatisticsCalculator from './calculators/StatisticsCalculator'
import ComputerScienceCalculator from './calculators/ComputerScienceCalculator'

interface MainContentProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

const calculatorRoutes = [
  { path: '/', label: 'Basic' },
  { path: '/scientific', label: 'Scientific' },
  { path: '/financial', label: 'Financial' },
  { path: '/engineering', label: 'Engineering' },
  { path: '/datetime', label: 'DateTime' },
  { path: '/statistics', label: 'Statistics' },
  { path: '/computer-science', label: 'Computer Science' },
]

const MainContent: React.FC<MainContentProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const getCurrentIndex = () => {
    return calculatorRoutes.findIndex(route => route.path === location.pathname)
  }

  useKeyboardShortcuts({
    'alt+arrowleft': () => {
      const currentIndex = getCurrentIndex()
      if (currentIndex > 0) {
        navigate(calculatorRoutes[currentIndex - 1].path)
      }
    },
    'alt+arrowright': () => {
      const currentIndex = getCurrentIndex()
      if (currentIndex < calculatorRoutes.length - 1) {
        navigate(calculatorRoutes[currentIndex + 1].path)
      }
    },
    '1': () => navigate('/'),
    '2': () => navigate('/scientific'),
    '3': () => navigate('/financial'),
    '4': () => navigate('/engineering'),
    '5': () => navigate('/datetime'),
    '6': () => navigate('/statistics'),
    '7': () => navigate('/computer-science'),
  })

  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-lg font-medium text-gray-900 dark:text-white">
          Calculator Suite
        </h1>
        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <Routes>
            <Route path="/" element={<BasicCalculator />} />
            <Route path="/scientific" element={<ScientificCalculator />} />
            <Route path="/financial" element={<FinancialCalculator />} />
            <Route path="/engineering" element={<EngineeringCalculator />} />
            <Route path="/datetime" element={<DateTimeCalculator />} />
            <Route path="/statistics" element={<StatisticsCalculator />} />
            <Route path="/computer-science" element={<ComputerScienceCalculator />} />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default MainContent 