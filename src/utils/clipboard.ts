import { useNotification } from '../contexts/NotificationContext'

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}

export function useCopyToClipboard() {
  const { showNotification } = useNotification()

  const copyWithNotification = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      showNotification('success', 'Copied to clipboard')
    } else {
      showNotification('error', 'Failed to copy to clipboard')
    }
    return success
  }

  return copyWithNotification
} 