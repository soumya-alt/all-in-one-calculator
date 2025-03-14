import React, { useState } from 'react'

type CalculationType = 'descriptive' | 'probability' | 'correlation' | 'z-score'

interface StatisticsInputs {
  data?: string
  probability?: number
  trials?: number
  xData?: string
  yData?: string
  value?: number
  mean?: number
  stdDev?: number
}

const StatisticsCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('descriptive')
  const [inputs, setInputs] = useState<StatisticsInputs>({})
  const [result, setResult] = useState<{ [key: string]: number } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const parseDataString = (data: string): number[] => {
    return data.split(',')
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => parseFloat(num))
      .filter(num => !isNaN(num))
  }

  const calculateDescriptiveStats = () => {
    const { data } = inputs
    if (!data) throw new Error('Data is required')

    const numbers = parseDataString(data)
    if (numbers.length === 0) throw new Error('Invalid data format')

    const sum = numbers.reduce((a, b) => a + b, 0)
    const mean = sum / numbers.length
    const sortedNumbers = [...numbers].sort((a, b) => a - b)
    const median = sortedNumbers.length % 2 === 0
      ? (sortedNumbers[numbers.length / 2 - 1] + sortedNumbers[numbers.length / 2]) / 2
      : sortedNumbers[Math.floor(numbers.length / 2)]
    
    const mode = numbers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1
      return acc
    }, {} as { [key: number]: number })
    
    const modeValue = Object.entries(mode).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    
    const variance = numbers.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / numbers.length
    const stdDev = Math.sqrt(variance)

    return {
      mean,
      median,
      mode: parseFloat(modeValue),
      variance,
      stdDev,
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      range: Math.max(...numbers) - Math.min(...numbers),
    }
  }

  const calculateProbability = () => {
    const { probability, trials } = inputs
    if (!probability || !trials) throw new Error('Probability and trials are required')

    const p = parseFloat(String(probability))
    const n = parseInt(String(trials))
    
    if (p < 0 || p > 1) throw new Error('Probability must be between 0 and 1')
    if (n < 1) throw new Error('Trials must be positive')

    const expectedValue = n * p
    const variance = n * p * (1 - p)
    const stdDev = Math.sqrt(variance)

    return {
      expectedValue,
      variance,
      stdDev,
    }
  }

  const calculateCorrelation = () => {
    const { xData, yData } = inputs
    if (!xData || !yData) throw new Error('Both X and Y data are required')

    const xNumbers = parseDataString(xData)
    const yNumbers = parseDataString(yData)

    if (xNumbers.length !== yNumbers.length) throw new Error('X and Y data must have same length')
    if (xNumbers.length === 0) throw new Error('Invalid data format')

    const n = xNumbers.length
    const sumX = xNumbers.reduce((a, b) => a + b, 0)
    const sumY = yNumbers.reduce((a, b) => a + b, 0)
    const sumXY = xNumbers.reduce((acc, curr, i) => acc + curr * yNumbers[i], 0)
    const sumX2 = xNumbers.reduce((acc, curr) => acc + curr * curr, 0)
    const sumY2 = yNumbers.reduce((acc, curr) => acc + curr * curr, 0)

    const correlation = (n * sumXY - sumX * sumY) /
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    return {
      correlation,
      r2: correlation * correlation,
    }
  }

  const calculateZScore = () => {
    const { value, mean, stdDev } = inputs
    if (!value || !mean || !stdDev) throw new Error('Value, mean, and standard deviation are required')

    const zScore = (parseFloat(String(value)) - parseFloat(String(mean))) / parseFloat(String(stdDev))
    const probability = (1 + Math.erf(zScore / Math.sqrt(2))) / 2

    return {
      zScore,
      probability,
    }
  }

  const handleCalculate = () => {
    try {
      let calculatedResult
      switch (calculationType) {
        case 'descriptive':
          calculatedResult = calculateDescriptiveStats()
          break
        case 'probability':
          calculatedResult = calculateProbability()
          break
        case 'correlation':
          calculatedResult = calculateCorrelation()
          break
        case 'z-score':
          calculatedResult = calculateZScore()
          break
        default:
          throw new Error('Invalid calculation type')
      }
      setResult(calculatedResult)
    } catch (error) {
      setResult(null)
    }
  }

  const renderInputs = () => {
    switch (calculationType) {
      case 'descriptive':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data (comma-separated numbers)
            </label>
            <textarea
              name="data"
              value={inputs.data || ''}
              onChange={handleInputChange}
              className="calculator-input h-32"
              placeholder="Enter numbers separated by commas (e.g., 1, 2, 3, 4, 5)"
            />
          </div>
        )
      case 'probability':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Probability (0-1)
              </label>
              <input
                type="number"
                name="probability"
                value={inputs.probability || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter probability"
                step="0.01"
                min="0"
                max="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Trials
              </label>
              <input
                type="number"
                name="trials"
                value={inputs.trials || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter number of trials"
                min="1"
              />
            </div>
          </>
        )
      case 'correlation':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                X Data (comma-separated numbers)
              </label>
              <textarea
                name="xData"
                value={inputs.xData || ''}
                onChange={handleInputChange}
                className="calculator-input h-24"
                placeholder="Enter X values separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Y Data (comma-separated numbers)
              </label>
              <textarea
                name="yData"
                value={inputs.yData || ''}
                onChange={handleInputChange}
                className="calculator-input h-24"
                placeholder="Enter Y values separated by commas"
              />
            </div>
          </>
        )
      case 'z-score':
        return (
          <>
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
                placeholder="Enter value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mean
              </label>
              <input
                type="number"
                name="mean"
                value={inputs.mean || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter mean"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Standard Deviation
              </label>
              <input
                type="number"
                name="stdDev"
                value={inputs.stdDev || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter standard deviation"
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Statistics Calculator
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
          <option value="descriptive">Descriptive Statistics</option>
          <option value="probability">Probability</option>
          <option value="correlation">Correlation</option>
          <option value="z-score">Z-Score</option>
        </select>
      </div>

      <div className="space-y-4">
        {renderInputs()}

        <button
          className="calculator-button w-full mt-6"
          onClick={handleCalculate}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Results
            </h3>
            <div className="space-y-2">
              {Object.entries(result).map(([key, value]) => (
                <p key={key} className="text-gray-800 dark:text-gray-200">
                  <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>{' '}
                  {value.toFixed(4)}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatisticsCalculator 