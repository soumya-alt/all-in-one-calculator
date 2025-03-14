import { useState, useCallback } from 'react'
import { useLoading } from '../contexts/LoadingContext'
import { useNotification } from '../contexts/NotificationContext'

type CalculationFunction<T, R> = (input: T) => Promise<R> | R

export function useCalculation<T, R>(calculationFn: CalculationFunction<T, R>) {
  const [result, setResult] = useState<R | null>(null)
  const { setIsLoading } = useLoading()
  const { showNotification } = useNotification()

  const calculate = useCallback(async (input: T) => {
    setIsLoading(true)
    try {
      const calculatedResult = await calculationFn(input)
      setResult(calculatedResult)
      showNotification('success', 'Calculation completed successfully')
      return calculatedResult
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      showNotification('error', errorMessage)
      setResult(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [calculationFn, setIsLoading, showNotification])

  return {
    result,
    calculate,
    setResult,
  }
} 