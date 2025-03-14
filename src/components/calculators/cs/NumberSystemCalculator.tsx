import React, { useState } from 'react';

type NumberSystem = 'binary' | 'octal' | 'decimal' | 'hexadecimal';

interface ConversionResult {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

const NumberSystemCalculator: React.FC = () => {
  const [inputSystem, setInputSystem] = useState<NumberSystem>('decimal');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (value: string, system: NumberSystem): boolean => {
    switch (system) {
      case 'binary':
        return /^[01]*$/.test(value);
      case 'octal':
        return /^[0-7]*$/.test(value);
      case 'decimal':
        return /^[0-9]*$/.test(value);
      case 'hexadecimal':
        return /^[0-9A-Fa-f]*$/.test(value);
      default:
        return false;
    }
  };

  const convertNumber = () => {
    setError(null);
    if (!inputValue) {
      setError('Please enter a value');
      setResult(null);
      return;
    }

    try {
      let decimalValue: number;

      // Convert input to decimal first
      switch (inputSystem) {
        case 'binary':
          decimalValue = parseInt(inputValue, 2);
          break;
        case 'octal':
          decimalValue = parseInt(inputValue, 8);
          break;
        case 'decimal':
          decimalValue = parseInt(inputValue, 10);
          break;
        case 'hexadecimal':
          decimalValue = parseInt(inputValue, 16);
          break;
        default:
          throw new Error('Invalid number system');
      }

      if (isNaN(decimalValue)) {
        throw new Error('Invalid number format');
      }

      // Convert decimal to all systems
      const result: ConversionResult = {
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
      };

      setResult(result);
    } catch (err) {
      setError('Invalid input format');
      setResult(null);
    }
  };

  const handleInputChange = (value: string) => {
    if (value === '' || validateInput(value, inputSystem)) {
      setInputValue(value);
      setError(null);
    } else {
      setError(`Invalid ${inputSystem} number`);
    }
  };

  const clearInputs = () => {
    setInputValue('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Number System Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Input Number System
            </label>
            <select
              value={inputSystem}
              onChange={(e) => {
                setInputSystem(e.target.value as NumberSystem);
                clearInputs();
              }}
              className="select"
            >
              <option value="binary">Binary (Base-2)</option>
              <option value="octal">Octal (Base-8)</option>
              <option value="decimal">Decimal (Base-10)</option>
              <option value="hexadecimal">Hexadecimal (Base-16)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Input Value
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="input"
              placeholder={`Enter ${inputSystem} number`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={convertNumber}
              className="btn btn-primary flex-1"
            >
              Convert
            </button>
            <button
              onClick={clearInputs}
              className="btn btn-secondary flex-1"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Binary: <span className="font-medium">{result.binary}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Octal: <span className="font-medium">{result.octal}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Decimal: <span className="font-medium">{result.decimal}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Hexadecimal: <span className="font-medium">{result.hexadecimal}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Number System Information
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Binary: Uses digits 0-1 (Base-2)</li>
              <li>• Octal: Uses digits 0-7 (Base-8)</li>
              <li>• Decimal: Uses digits 0-9 (Base-10)</li>
              <li>• Hexadecimal: Uses digits 0-9 and A-F (Base-16)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberSystemCalculator; 