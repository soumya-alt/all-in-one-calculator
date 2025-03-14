import React, { useState } from 'react';
import { BaseCalculator, useCalculator } from '../BaseCalculator';

interface PowerRootCalculatorState {
  value: string;
  power: string;
  calculationType: 'power' | 'root';
  result: number | null;
}

const PowerRootCalculator: React.FC = () => {
  const [state, setState] = useState<PowerRootCalculatorState>({
    value: '',
    power: '2',
    calculationType: 'power',
    result: null,
  });

  const { handleCalculation } = useCalculator();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = async () => {
    const result = await handleCalculation(async () => {
      const value = parseFloat(state.value);
      const power = parseFloat(state.power);

      if (isNaN(value) || isNaN(power)) {
        return { value: null, error: 'Please enter valid numbers' };
      }

      if (state.calculationType === 'root') {
        if (power === 0) {
          return { value: null, error: 'Root power cannot be zero' };
        }
        if (value < 0 && power % 2 === 0) {
          return { value: null, error: 'Cannot calculate even root of a negative number' };
        }
      }

      let calculatedResult: number;
      if (state.calculationType === 'power') {
        calculatedResult = Math.pow(value, power);
      } else {
        calculatedResult = Math.pow(value, 1 / power);
      }

      return { value: calculatedResult };
    });

    if (!result.error) {
      setState(prev => ({ ...prev, result: result.value }));
    }
  };

  const getCommonPowers = () => {
    return state.calculationType === 'power'
      ? [
          { value: '2', label: 'Square (²)' },
          { value: '3', label: 'Cube (³)' },
          { value: '4', label: 'Fourth Power (⁴)' },
          { value: '5', label: 'Fifth Power (⁵)' },
        ]
      : [
          { value: '2', label: 'Square Root (√)' },
          { value: '3', label: 'Cube Root (∛)' },
          { value: '4', label: 'Fourth Root (∜)' },
          { value: '5', label: 'Fifth Root (⁵√)' },
        ];
  };

  const getResultLabel = () => {
    const value = parseFloat(state.value);
    const power = parseFloat(state.power);
    
    if (state.calculationType === 'power') {
      return `${value} ^ ${power}`;
    } else {
      const rootSymbols: { [key: string]: string } = {
        '2': '√',
        '3': '∛',
        '4': '∜',
      };
      const rootSymbol = rootSymbols[power] || `${power}√`;
      return `${rootSymbol}${value}`;
    }
  };

  return (
    <BaseCalculator
      title="Power & Root Calculator"
      description="Calculate powers, square roots, cube roots, and nth roots of numbers."
    >
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Calculation Type
          </label>
          <select
            name="calculationType"
            value={state.calculationType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="power">Power (x^n)</option>
            <option value="root">Root (ⁿ√x)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number
          </label>
          <input
            type="number"
            name="value"
            value={state.value}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {state.calculationType === 'power' ? 'Power' : 'Root'}
          </label>
          <select
            name="power"
            value={state.power}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            {getCommonPowers().map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
            <option value="custom">Custom</option>
          </select>
          {state.power === 'custom' && (
            <input
              type="number"
              name="power"
              value={state.power}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder={`Enter custom ${state.calculationType === 'power' ? 'power' : 'root'}`}
              min="1"
              step="1"
            />
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate
        </button>

        {state.result !== null && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {getResultLabel()} = {state.result.toFixed(6)}
            </p>
          </div>
        )}
      </div>
    </BaseCalculator>
  );
};

export default PowerRootCalculator; 