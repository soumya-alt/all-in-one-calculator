import React, { useState } from 'react';

type BitwiseOperation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'SHIFT_LEFT' | 'SHIFT_RIGHT';

interface BitwiseResult {
  decimal: number;
  binary: string;
  hexadecimal: string;
}

const BitwiseCalculator: React.FC = () => {
  const [operation, setOperation] = useState<BitwiseOperation>('AND');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [shiftAmount, setShiftAmount] = useState('');
  const [result, setResult] = useState<BitwiseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (value: string): boolean => {
    return /^[0-9]*$/.test(value);
  };

  const calculateBitwise = () => {
    setError(null);
    try {
      const num1 = parseInt(firstNumber);
      let resultValue: number;

      switch (operation) {
        case 'NOT':
          if (isNaN(num1)) {
            throw new Error('Please enter a valid number');
          }
          resultValue = ~num1;
          break;

        case 'SHIFT_LEFT':
        case 'SHIFT_RIGHT':
          if (isNaN(num1)) {
            throw new Error('Please enter a valid number');
          }
          const shift = parseInt(shiftAmount);
          if (isNaN(shift)) {
            throw new Error('Please enter a valid shift amount');
          }
          resultValue = operation === 'SHIFT_LEFT' ? (num1 << shift) : (num1 >>> shift);
          break;

        default:
          const num2 = parseInt(secondNumber);
          if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Please enter valid numbers');
          }
          switch (operation) {
            case 'AND':
              resultValue = num1 & num2;
              break;
            case 'OR':
              resultValue = num1 | num2;
              break;
            case 'XOR':
              resultValue = num1 ^ num2;
              break;
            default:
              throw new Error('Invalid operation');
          }
      }

      setResult({
        decimal: resultValue,
        binary: resultValue.toString(2).padStart(32, '0'),
        hexadecimal: resultValue.toString(16).toUpperCase(),
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during calculation');
      }
      setResult(null);
    }
  };

  const clearInputs = () => {
    setFirstNumber('');
    setSecondNumber('');
    setShiftAmount('');
    setResult(null);
    setError(null);
  };

  const handleNumberChange = (value: string, setter: (value: string) => void) => {
    if (value === '' || validateInput(value)) {
      setter(value);
      setError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Bitwise Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => {
                setOperation(e.target.value as BitwiseOperation);
                clearInputs();
              }}
              className="select"
            >
              <option value="AND">AND (&amp;)</option>
              <option value="OR">OR (|)</option>
              <option value="XOR">XOR (^)</option>
              <option value="NOT">NOT (~)</option>
              <option value="SHIFT_LEFT">Left Shift (&lt;&lt;)</option>
              <option value="SHIFT_RIGHT">Right Shift (&gt;&gt;&gt;)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Number (Decimal)
            </label>
            <input
              type="text"
              value={firstNumber}
              onChange={(e) => handleNumberChange(e.target.value, setFirstNumber)}
              className="input"
              placeholder="Enter first number"
            />
          </div>

          {operation !== 'NOT' && operation !== 'SHIFT_LEFT' && operation !== 'SHIFT_RIGHT' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Second Number (Decimal)
              </label>
              <input
                type="text"
                value={secondNumber}
                onChange={(e) => handleNumberChange(e.target.value, setSecondNumber)}
                className="input"
                placeholder="Enter second number"
              />
            </div>
          )}

          {(operation === 'SHIFT_LEFT' || operation === 'SHIFT_RIGHT') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Shift Amount
              </label>
              <input
                type="text"
                value={shiftAmount}
                onChange={(e) => handleNumberChange(e.target.value, setShiftAmount)}
                className="input"
                placeholder="Enter shift amount"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculateBitwise}
              className="btn btn-primary flex-1"
            >
              Calculate
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
                Decimal: <span className="font-medium">{result.decimal}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Binary: <span className="font-medium">{result.binary}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Hexadecimal: <span className="font-medium">0x{result.hexadecimal}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Bitwise Operations
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• AND (&amp;): Sets each bit to 1 if both bits are 1</li>
              <li>• OR (|): Sets each bit to 1 if at least one bit is 1</li>
              <li>• XOR (^): Sets each bit to 1 if exactly one bit is 1</li>
              <li>• NOT (~): Inverts all the bits</li>
              <li>• Left Shift (&lt;&lt;): Shifts bits left by specified amount</li>
              <li>• Right Shift (&gt;&gt;&gt;): Shifts bits right by specified amount</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitwiseCalculator; 