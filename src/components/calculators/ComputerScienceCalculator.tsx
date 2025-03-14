import React, { useState } from 'react'

type CalculationType = 'number-conversion' | 'bitwise' | 'hash' | 'complexity'

interface ComputerScienceInputs {
  number?: string
  fromBase?: number
  toBase?: number
  firstNumber?: string
  secondNumber?: string
  operation?: string
  text?: string
  algorithm?: string
  inputSize?: number
}

const ComputerScienceCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('number-conversion')
  const [inputs, setInputs] = useState<ComputerScienceInputs>({})
  const [result, setResult] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const convertNumber = () => {
    const { number, fromBase, toBase } = inputs
    if (!number || !fromBase || !toBase) throw new Error('All fields are required')

    const decimal = parseInt(number, parseInt(String(fromBase)))
    if (isNaN(decimal)) throw new Error('Invalid number for given base')

    return decimal.toString(parseInt(String(toBase)))
  }

  const performBitwiseOperation = () => {
    const { firstNumber, secondNumber, operation } = inputs
    if (!firstNumber || !secondNumber || !operation) throw new Error('All fields are required')

    const a = parseInt(firstNumber, 2)
    const b = parseInt(secondNumber, 2)
    if (isNaN(a) || isNaN(b)) throw new Error('Invalid binary numbers')

    let result: number
    switch (operation) {
      case 'AND':
        result = a & b
        break
      case 'OR':
        result = a | b
        break
      case 'XOR':
        result = a ^ b
        break
      case 'NOT':
        result = ~a
        break
      case 'SHIFT_LEFT':
        result = a << 1
        break
      case 'SHIFT_RIGHT':
        result = a >> 1
        break
      default:
        throw new Error('Invalid operation')
    }

    return result.toString(2).padStart(Math.max(firstNumber.length, secondNumber.length), '0')
  }

  const calculateHash = () => {
    const { text } = inputs
    if (!text) throw new Error('Text is required')

    // Simple hash function for demonstration
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }

    return hash.toString(16)
  }

  const calculateComplexity = () => {
    const { algorithm, inputSize } = inputs
    if (!algorithm || !inputSize) throw new Error('Algorithm and input size are required')

    const n = parseInt(String(inputSize))
    if (isNaN(n) || n < 1) throw new Error('Invalid input size')

    let complexity: string
    switch (algorithm) {
      case 'constant':
        complexity = 'O(1)'
        break
      case 'logarithmic':
        complexity = `O(log n) ≈ ${Math.log2(n).toFixed(2)} operations`
        break
      case 'linear':
        complexity = `O(n) = ${n} operations`
        break
      case 'linearithmic':
        complexity = `O(n log n) ≈ ${(n * Math.log2(n)).toFixed(2)} operations`
        break
      case 'quadratic':
        complexity = `O(n²) = ${n * n} operations`
        break
      case 'cubic':
        complexity = `O(n³) = ${n * n * n} operations`
        break
      case 'exponential':
        complexity = `O(2ⁿ) = ${Math.pow(2, n)} operations`
        break
      default:
        throw new Error('Invalid algorithm')
    }

    return complexity
  }

  const handleCalculate = () => {
    try {
      let calculatedResult: string
      switch (calculationType) {
        case 'number-conversion':
          calculatedResult = convertNumber()
          break
        case 'bitwise':
          calculatedResult = performBitwiseOperation()
          break
        case 'hash':
          calculatedResult = calculateHash()
          break
        case 'complexity':
          calculatedResult = calculateComplexity()
          break
        default:
          throw new Error('Invalid calculation type')
      }
      setResult(calculatedResult)
    } catch (error) {
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('An error occurred')
      }
    }
  }

  const renderInputs = () => {
    switch (calculationType) {
      case 'number-conversion':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number
              </label>
              <input
                type="text"
                name="number"
                value={inputs.number || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Base
              </label>
              <select
                name="fromBase"
                value={inputs.fromBase || ''}
                onChange={handleInputChange}
                className="calculator-input"
              >
                <option value="">Select base</option>
                <option value="2">Binary (2)</option>
                <option value="8">Octal (8)</option>
                <option value="10">Decimal (10)</option>
                <option value="16">Hexadecimal (16)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Base
              </label>
              <select
                name="toBase"
                value={inputs.toBase || ''}
                onChange={handleInputChange}
                className="calculator-input"
              >
                <option value="">Select base</option>
                <option value="2">Binary (2)</option>
                <option value="8">Octal (8)</option>
                <option value="10">Decimal (10)</option>
                <option value="16">Hexadecimal (16)</option>
              </select>
            </div>
          </>
        )
      case 'bitwise':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Binary Number
              </label>
              <input
                type="text"
                name="firstNumber"
                value={inputs.firstNumber || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter binary number (e.g., 1010)"
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
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="XOR">XOR</option>
                <option value="NOT">NOT</option>
                <option value="SHIFT_LEFT">Shift Left</option>
                <option value="SHIFT_RIGHT">Shift Right</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Second Binary Number
              </label>
              <input
                type="text"
                name="secondNumber"
                value={inputs.secondNumber || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter binary number (e.g., 1100)"
              />
            </div>
          </>
        )
      case 'hash':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Text to Hash
            </label>
            <input
              type="text"
              name="text"
              value={inputs.text || ''}
              onChange={handleInputChange}
              className="calculator-input"
              placeholder="Enter text to hash"
            />
          </div>
        )
      case 'complexity':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Algorithm
              </label>
              <select
                name="algorithm"
                value={inputs.algorithm || ''}
                onChange={handleInputChange}
                className="calculator-input"
              >
                <option value="">Select algorithm complexity</option>
                <option value="constant">Constant - O(1)</option>
                <option value="logarithmic">Logarithmic - O(log n)</option>
                <option value="linear">Linear - O(n)</option>
                <option value="linearithmic">Linearithmic - O(n log n)</option>
                <option value="quadratic">Quadratic - O(n²)</option>
                <option value="cubic">Cubic - O(n³)</option>
                <option value="exponential">Exponential - O(2ⁿ)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Input Size (n)
              </label>
              <input
                type="number"
                name="inputSize"
                value={inputs.inputSize || ''}
                onChange={handleInputChange}
                className="calculator-input"
                placeholder="Enter input size"
                min="1"
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
        Computer Science Calculator
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
          <option value="number-conversion">Number Base Conversion</option>
          <option value="bitwise">Bitwise Operations</option>
          <option value="hash">Hash Calculator</option>
          <option value="complexity">Algorithm Complexity</option>
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
              Result
            </h3>
            <p className="text-xl font-mono text-primary-600 dark:text-primary-400">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComputerScienceCalculator 