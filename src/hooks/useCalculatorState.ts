import { useState, useCallback } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import { useLoading } from '../contexts/LoadingContext'
import { ValidationError } from '../utils/validation'

interface UseCalculatorStateProps<T> {
  initialInputs: T
  validateInputs?: (inputs: T) => ValidationError[]
  calculate: (inputs: T) => Promise<string | null> | string | null
}

export function useCalculatorState<T>({
  initialInputs,
  validateInputs,
  calculate
}: UseCalculatorStateProps<T>) {
  const [inputs, setInputs] = useState<T>(initialInputs)
  const [result, setResult] = useState<string | null>(null)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const { showNotification } = useNotification()
  const { setIsLoading } = useLoading()

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }))
    setErrors([])
  }, [])

  const handleCalculate = useCallback(async () => {
    try {
      setIsLoading(true)
      setErrors([])

      if (validateInputs) {
        const validationErrors = validateInputs(inputs)
        if (validationErrors.length > 0) {
          setErrors(validationErrors)
          validationErrors.forEach(error => {
            showNotification('error', error.message)
          })
          return
        }
      }

      const calculatedResult = await calculate(inputs)
      setResult(calculatedResult)
      
      if (calculatedResult) {
        showNotification('success', 'Calculation completed successfully')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      showNotification('error', errorMessage)
      setResult(`Error: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }, [inputs, calculate, validateInputs, showNotification, setIsLoading])

  const clearCalculator = useCallback(() => {
    setInputs(initialInputs)
    setResult(null)
    setErrors([])
  }, [initialInputs])

  const getFieldError = useCallback((fieldName: string) => {
    return errors.find(error => error.field === fieldName)?.message
  }, [errors])

  return {
    inputs,
    setInputs,
    result,
    setResult,
    errors,
    handleInputChange,
    handleCalculate,
    clearCalculator,
    getFieldError,
  }
} 