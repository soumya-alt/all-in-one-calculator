import React, { useState } from 'react'
import { useCalculatorShortcuts } from '../../hooks/useCalculatorShortcuts'

type CalculationType = 'unit-conversion' | 'electrical' | 'mechanical'
type UnitCategory = 'length' | 'mass' | 'temperature' | 'pressure' | 'force'

interface EngineeringInputs {
  value?: number
  fromUnit?: string
  toUnit?: string
  voltage?: number
  current?: number
  resistance?: number
  force?: number
  distance?: number
  time?: number
  mass?: number
  velocity?: number
}

interface UnitConversion {
  [key: string]: number
}

const unitConversions: Record<UnitCategory, UnitConversion> = {
  length: {
    'm': 1,
    'km': 1000,
    'cm': 0.01,
    'mm': 0.001,
    'in': 0.0254,
    'ft': 0.3048,
    'yd': 0.9144,
    'mi': 1609.344,
  },
  mass: {
    'kg': 1,
    'g': 0.001,
    'mg': 0.000001,
    'lb': 0.45359237,
    'oz': 0.028349523125,
  },
  temperature: {
    'C': 1,
    'F': 1,
    'K': 1,
  },
  pressure: {
    'Pa': 1,
    'kPa': 1000,
    'MPa': 1000000,
    'bar': 100000,
    'psi': 6894.76,
    'atm': 101325,
  },
  force: {
    'N': 1,
    'kN': 1000,
    'lbf': 4.448222,
    'kgf': 9.80665,
  },
}

const EngineeringCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('unit-conversion')
  const [unitCategory, setUnitCategory] = useState<UnitCategory>('length')
  const [inputs, setInputs] = useState<EngineeringInputs>({})
  const [result, setResult] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: name === 'fromUnit' || name === 'toUnit' ? value : parseFloat(value) || 0
    }))
  }

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number
    
    // Convert to Celsius first
    switch (from) {
      case 'C':
        celsius = value
        break
      case 'F':
        celsius = (value - 32) * 5/9
        break
      case 'K':
        celsius = value - 273.15
        break
      default:
        return value
    }

    // Convert from Celsius to target unit
    switch (to) {
      case 'C':
        return celsius
      case 'F':
        return (celsius * 9/5) + 32
      case 'K':
        return celsius + 273.15
      default:
        return celsius
    }
  }

  const convertUnit = () => {
    const { value, fromUnit, toUnit } = inputs
    if (!value || !fromUnit || !toUnit) throw new Error('All fields are required')

    if (unitCategory === 'temperature') {
      return convertTemperature(value, fromUnit, toUnit)
    }

    const fromValue = unitConversions[unitCategory][fromUnit]
    const toValue = unitConversions[unitCategory][toUnit]
    return (value * fromValue) / toValue
  }

  const calculateElectrical = () => {
    const { voltage, current, resistance } = inputs
    
    if (voltage && current) {
      return {
        resistance: voltage / current,
        power: voltage * current,
      }
    } else if (voltage && resistance) {
      return {
        current: voltage / resistance,
        power: Math.pow(voltage, 2) / resistance,
      }
    } else if (current && resistance) {
      return {
        voltage: current * resistance,
        power: Math.pow(current, 2) * resistance,
      }
    }
    
    throw new Error('Please provide any two values')
  }

  const calculateMechanical = () => {
    const { force, distance, time, mass, velocity } = inputs

    if (force && distance) {
      return {
        work: force * distance,
        power: time ? (force * distance) / time : null,
      }
    } else if (mass && velocity) {
      return {
        kineticEnergy: 0.5 * mass * Math.pow(velocity, 2),
        momentum: mass * velocity,
      }
    }

    throw new Error('Please provide required values')
  }

  const handleCalculate = () => {
    try {
      let calculatedResult: any
      switch (calculationType) {
        case 'unit-conversion':
          calculatedResult = convertUnit()
          setResult(typeof calculatedResult === 'number' ? calculatedResult.toFixed(6) : String(calculatedResult))
          break
        case 'electrical':
          calculatedResult = calculateElectrical()
          setResult(Object.entries(calculatedResult)
            .map(([key, value]) => `${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`)
            .join('\n'))
          break
        case 'mechanical':
          calculatedResult = calculateMechanical()
          setResult(Object.entries(calculatedResult)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => `${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`)
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

  const renderUnitConversionInputs = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Unit Category
        </label>
        <select
          className="calculator-input"
          value={unitCategory}
          onChange={(e) => setUnitCategory(e.target.value as UnitCategory)}
        >
          <option value="length">Length</option>
          <option value="mass">Mass</option>
          <option value="temperature">Temperature</option>
          <option value="pressure">Pressure</option>
          <option value="force">Force</option>
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
          placeholder="Enter value"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          From Unit
        </label>
        <select
          name="fromUnit"
          value={inputs.fromUnit || ''}
          onChange={handleInputChange}
          className="calculator-input"
        >
          <option value="">Select unit</option>
          {Object.keys(unitConversions[unitCategory]).map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          To Unit
        </label>
        <select
          name="toUnit"
          value={inputs.toUnit || ''}
          onChange={handleInputChange}
          className="calculator-input"
        >
          <option value="">Select unit</option>
          {Object.keys(unitConversions[unitCategory]).map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>
    </>
  )

  const renderElectricalInputs = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Voltage (V)
        </label>
        <input
          type="number"
          name="voltage"
          value={inputs.voltage || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter voltage"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current (A)
        </label>
        <input
          type="number"
          name="current"
          value={inputs.current || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter current"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Resistance (Ω)
        </label>
        <input
          type="number"
          name="resistance"
          value={inputs.resistance || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter resistance"
        />
      </div>
    </>
  )

  const renderMechanicalInputs = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Force (N)
        </label>
        <input
          type="number"
          name="force"
          value={inputs.force || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter force"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Distance (m)
        </label>
        <input
          type="number"
          name="distance"
          value={inputs.distance || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter distance"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Time (s)
        </label>
        <input
          type="number"
          name="time"
          value={inputs.time || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter time"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mass (kg)
        </label>
        <input
          type="number"
          name="mass"
          value={inputs.mass || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter mass"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Velocity (m/s)
        </label>
        <input
          type="number"
          name="velocity"
          value={inputs.velocity || ''}
          onChange={handleInputChange}
          className="calculator-input"
          placeholder="Enter velocity"
        />
      </div>
    </>
  )

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Engineering Calculator
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
          <option value="unit-conversion">Unit Conversion</option>
          <option value="electrical">Electrical Calculations</option>
          <option value="mechanical">Mechanical Calculations</option>
        </select>
      </div>

      <div className="space-y-4">
        {calculationType === 'unit-conversion' && renderUnitConversionInputs()}
        {calculationType === 'electrical' && renderElectricalInputs()}
        {calculationType === 'mechanical' && renderMechanicalInputs()}

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

export default EngineeringCalculator 