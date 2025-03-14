import React from 'react'

interface ShortcutInfo {
  key: string
  description: string
}

interface HelpDialogProps {
  isOpen: boolean
  onClose: () => void
}

const shortcuts: ShortcutInfo[] = [
  // Global shortcuts
  { key: 'Ctrl + B', description: 'Toggle sidebar' },
  { key: 'Ctrl + Shift + T', description: 'Toggle theme' },
  { key: 'Ctrl + /', description: 'Show keyboard shortcuts' },
  { key: 'Escape', description: 'Close sidebar or dialog' },
  
  // Calculator shortcuts
  { key: 'Enter', description: 'Calculate result' },
  { key: 'Ctrl + C', description: 'Copy result' },
  { key: 'Escape', description: 'Clear calculator inputs' },
  
  // Navigation shortcuts
  { key: '1-7', description: 'Quick switch between calculators' },
  { key: 'Alt + Left', description: 'Go back to previous calculator' },
  { key: 'Alt + Right', description: 'Go forward to next calculator' },
]

export default function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="flex items-center justify-between">
              <kbd className="rounded-lg bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                {shortcut.key}
              </kbd>
              <span className="text-sm text-gray-600 dark:text-gray-400">{shortcut.description}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-800"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
} 