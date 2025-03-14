import { useKeyboardShortcuts } from './useKeyboardShortcuts'
import { useCopyToClipboard } from '../utils/clipboard'

interface CalculatorShortcutsProps {
  onCalculate?: () => void
  onClear?: () => void
  result?: string | null
  onCopy?: () => void
}

export function useCalculatorShortcuts({
  onCalculate,
  onClear,
  result,
  onCopy,
}: CalculatorShortcutsProps) {
  const copyToClipboard = useCopyToClipboard()

  useKeyboardShortcuts({
    'enter': (e) => {
      if (onCalculate && !e.isComposing) {
        onCalculate()
      }
    },
    'ctrl+c': async () => {
      if (onCopy) {
        onCopy()
      } else if (result) {
        await copyToClipboard(result)
      }
    },
    'escape': () => {
      if (onClear) {
        onClear()
      }
    },
  })
} 