import React, { useState } from 'react';

interface CalculationResult {
  square: number;
  squareRoot: number;
}

const SquareRootCalculator: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    if (isNaN(num)) {
      setError('Please enter a valid number');
      setResult(null);
      return;
    }
    if (num < 0) {
      setError('Cannot calculate square root of negative numbers');
      setResult(null);
      return;
    }
    setError(null);
    setResult({
      square: num * num,
      squareRoot: Math.sqrt(num)
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setNumber(value);
      setError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Square & Square Root Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number
            </label>
            <input
              type="text"
              value={number}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="Enter a number"
            />
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
            disabled={!number}
          >
            Calculate
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-gray-900 dark:text-white">
                Square: <span className="font-bold">{result.square}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Square Root: <span className="font-bold">{result.squareRoot.toFixed(6)}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Square & Square Root
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Square: Multiply a number by itself (n²)</li>
              <li>• Square Root: Number which produces given number when multiplied by itself (√n)</li>
              <li>• Cannot calculate square root of negative numbers</li>
              <li>• Results are rounded to 6 decimal places</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareRootCalculator; 