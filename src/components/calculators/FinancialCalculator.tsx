import React, { useState } from 'react'

type CalculationType = 'compound-interest' | 'loan-emi' | 'simple-interest'

interface CalculationInputs {
  principal: number
  rate: number
  time: number
  frequency?: number
}

const FinancialCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('compound-interest')
  const [inputs, setInputs] = useState<CalculationInputs>({
    principal: 0,
    rate: 0,
    time: 0,
    frequency: 12,
  })
  const [result, setResult] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const calculateCompoundInterest = () => {
    const { principal, rate, time, frequency } = inputs
    const r = rate / 100
    const n = frequency || 1
    const t = time
    const amount = principal * Math.pow(1 + r/n, n*t)
    return amount - principal
  }

  const calculateSimpleInterest = () => {
    const { principal, rate, time } = inputs
    return (principal * rate * time) / 100
  }

  const calculateLoanEMI = () => {
    const { principal, rate, time } = inputs
    const r = (rate/100)/12
    const n = time * 12
    const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    return emi
  }

  const handleCalculate = () => {
    try {
      let calculatedResult: number
      switch (calculationType) {
        case 'compound-interest':
          calculatedResult = calculateCompoundInterest()
          break
        case 'simple-interest':
          calculatedResult = calculateSimpleInterest()
          break
        case 'loan-emi':
          calculatedResult = calculateLoanEMI()
          break
        default:
          calculatedResult = 0
      }
      setResult(calculatedResult)
    } catch (error) {
      setResult(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Financial Calculator
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
          <option value="compound-interest">Compound Interest</option>
          <option value="simple-interest">Simple Interest</option>
          <option value="loan-emi">Loan EMI</option>
        </select>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Principal Amount
          </label>
          <input
            type="number"
            name="principal"
            value={inputs.principal}
            onChange={handleInputChange}
            className="calculator-input"
            placeholder="Enter principal amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            name="rate"
            value={inputs.rate}
            onChange={handleInputChange}
            className="calculator-input"
            placeholder="Enter interest rate"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time (in years)
          </label>
          <input
            type="number"
            name="time"
            value={inputs.time}
            onChange={handleInputChange}
            className="calculator-input"
            placeholder="Enter time period"
          />
        </div>

        {calculationType === 'compound-interest' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Compounding Frequency (per year)
            </label>
            <input
              type="number"
              name="frequency"
              value={inputs.frequency}
              onChange={handleInputChange}
              className="calculator-input"
              placeholder="Enter compounding frequency"
            />
          </div>
        )}

        <button
          className="calculator-button w-full mt-6"
          onClick={handleCalculate}
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Result
            </h3>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {calculationType === 'loan-emi'
                ? `Monthly EMI: ${result.toFixed(2)}`
                : `Interest Amount: ${result.toFixed(2)}`}
            </p>
            {calculationType === 'loan-emi' && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Total Payment: {(result * inputs.time * 12).toFixed(2)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FinancialCalculator 