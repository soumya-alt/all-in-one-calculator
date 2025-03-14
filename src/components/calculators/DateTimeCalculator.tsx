import React, { useState } from 'react'
import { useCalculatorShortcuts } from '../../hooks/useCalculatorShortcuts'

type CalculationType = 'date-difference' | 'time-zone' | 'date-arithmetic'
type TimeUnit = 'years' | 'months' | 'days' | 'hours' | 'minutes'

interface DateTimeInputs {
  startDate?: string
  endDate?: string
  dateTime?: string
  fromTimeZone?: string
  toTimeZone?: string
  date?: string
  unit?: TimeUnit
  value?: number
  operation?: 'add' | 'subtract'
}

const timeZones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
  'Pacific/Auckland',
]

const DateTimeCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('date-difference')
  const [inputs, setInputs] = useState<DateTimeInputs>({})
  const [result, setResult] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateDateDifference = () => {
    const { startDate, endDate } = inputs
    if (!startDate || !endDate) throw new Error('Both dates are required')

    const start = new Date(startDate)
    const end = new Date(endDate)
    
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30

    return {
      total_days: diffDays,
      breakdown: `${years} years, ${months} months, ${days} days`,
      hours: diffTime / (1000 * 60 * 60),
      minutes: diffTime / (1000 * 60),
      seconds: diffTime / 1000,
    }
  }

  const convertTimeZone = () => {
    const { dateTime, fromTimeZone, toTimeZone } = inputs
    if (!dateTime || !fromTimeZone || !toTimeZone) throw new Error('All fields are required')

    const date = new Date(dateTime)
    if (isNaN(date.getTime())) throw new Error('Invalid date/time')

    const options: Intl.DateTimeFormatOptions = {
      timeZone: toTimeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }

    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  const performDateArithmetic = () => {
    const { date, unit, value, operation } = inputs
    if (!date || !unit || !value || !operation) throw new Error('All fields are required')

    const baseDate = new Date(date)
    if (isNaN(baseDate.getTime())) throw new Error('Invalid date')

    const numValue = parseInt(String(value))
    const resultDate = new Date(baseDate)

    switch (unit) {
      case 'years':
        resultDate.setFullYear(baseDate.getFullYear() + (operation === 'add' ? numValue : -numValue))
        break
      case 'months':
        resultDate.setMonth(baseDate.getMonth() + (operation === 'add' ? numValue : -numValue))
        break
      case 'days':
        resultDate.setDate(baseDate.getDate() + (operation === 'add' ? numValue : -numValue))
        break
      case 'hours':
        resultDate.setHours(baseDate.getHours() + (operation === 'add' ? numValue : -numValue))
        break
      case 'minutes':
        resultDate.setMinutes(baseDate.getMinutes() + (operation === 'add' ? numValue : -numValue))
        break
    }

    return {
      result_date: resultDate.toISOString().split('T')[0],
      result_time: resultDate.toTimeString().split(' ')[0],
      full_datetime: resultDate.toISOString(),
    }
  }

  const handleCalculate = () => {
    try {
      let calculatedResult: any
      switch (calculationType) {
        case 'date-difference':
          calculatedResult = calculateDateDifference()
          setResult(Object.entries(calculatedResult)
            .map(([key, value]) => `${key.replace('_', ' ')}: ${value}`)
            .join('\n'))
          break
        case 'time-zone':
          calculatedResult = convertTimeZone()
          setResult(calculatedResult)
          break
        case 'date-arithmetic':
          calculatedResult = performDateArithmetic()
          setResult(Object.entries(calculatedResult)
            .map(([key, value]) => `${key.replace('_', ' ')}: ${value}`)
            .join('\n'))
          break
        default:
          throw new Error('Invalid calculation type')
      }
    } catch (error) {
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('An error occurred')
      }
    }
  }

  const clearCalculator = () => {
    setInputs({})
    setResult(null)
  }

  useCalculatorShortcuts({
    onCalculate: handleCalculate,
    onClear: clearCalculator,
    result,
  })

  const renderDateDifferenceInputs = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={inputs.startDate || ''}
          onChange={handleInputChange}
          className="calculator-input"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={inputs.endDate || ''}
          onChange={handleInputChange}
          className="calculator-input"
        />
      </div>
    </>
  )

  const renderTimeZoneInputs = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date and Time
        </label>
        <input
          type="datetime-local"
          name="dateTime"
          value={inputs.dateTime || ''}
          onChange={handleInputChange}
          className="calculator-input"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          From Time Zone
        </label>
        <select
          name="fromTimeZone"
          value={inputs.fromTimeZone || ''}
          onChange={handleInputChange}
          className="calculator-input"
        >
          <option value="">Select time zone</option>
          {timeZones.map(zone => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          To Time Zone
        </label>
        <select
          name="toTimeZone"
          value={inputs.toTimeZone || ''}
          onChange={handleInputChange}
          className="calculator-input"
        >
          <option value="">Select time zone</option>
          {timeZones.map(zone => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>
    </>
  )

  const renderDateArithmeticInputs = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date
        </label>
        <input
          type="datetime-local"
          name="date"
          value={inputs.date || ''}
          onChange={handleInputChange}
          className="calculator-input"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Operation
        </label>
        <select
          name="operation"
          value={inputs.operation || ''}
          onChange={handleInputChange}
          className="calculator-input"
        >
          <option value="">Select operation</option>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Value
        </label>
        <input
          type="number"
          name="value"
          value={inputs.value || ''}
          onChange={handleInputChange}
          className="calculator-input"
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Unit
        </label>
        <select
          name="unit"
          value={inputs.unit || ''}
          onChange={handleInputChange}
          className="calculator-input"
        >
          <option value="">Select unit</option>
          <option value="years">Years</option>
          <option value="months">Months</option>
          <option value="days">Days</option>
          <option value="hours">Hours</option>
          <option value="minutes">Minutes</option>
        </select>
      </div>
    </>
  )

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Date & Time Calculator
      </h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Calculation Type
        </label>
        <select
          className="calculator-input"
          value={calculationType}
          onChange={(e) => setCalculationType(e.target.value as CalculationType)}
        >
          <option value="date-difference">Date Difference</option>
          <option value="time-zone">Time Zone Conversion</option>
          <option value="date-arithmetic">Date Arithmetic</option>
        </select>
      </div>

      <div className="space-y-4">
        {calculationType === 'date-difference' && renderDateDifferenceInputs()}
        {calculationType === 'time-zone' && renderTimeZoneInputs()}
        {calculationType === 'date-arithmetic' && renderDateArithmeticInputs()}

        <button
          className="calculator-button w-full mt-6"
          onClick={handleCalculate}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Result
            </h3>
            <pre className="whitespace-pre-wrap font-mono text-primary-600 dark:text-primary-400">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default DateTimeCalculator 