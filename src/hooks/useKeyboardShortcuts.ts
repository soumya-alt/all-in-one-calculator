import { useEffect, useCallback } from 'react'

type KeyHandler = (event: KeyboardEvent) => void
type ShortcutMap = Record<string, KeyHandler>

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    const isCtrl = event.ctrlKey || event.metaKey
    const isShift = event.shiftKey
    const isAlt = event.altKey

    const shortcutKey = [
      isCtrl ? 'ctrl+' : '',
      isShift ? 'shift+' : '',
      isAlt ? 'alt+' : '',
      key,
    ].join('')

    const handler = shortcuts[shortcutKey]
    if (handler) {
      event.preventDefault()
      handler(event)
    }
  }, [shortcuts])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Example usage:
// const shortcuts = {
//   'ctrl+s': () => handleSave(),
//   'ctrl+z': () => handleUndo(),
//   'ctrl+y': () => handleRedo(),
//   'escape': () => handleClose(),
// }
// useKeyboardShortcuts(shortcuts) 