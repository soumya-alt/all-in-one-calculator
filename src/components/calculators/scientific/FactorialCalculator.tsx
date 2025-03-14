import React, { useState } from 'react';

interface CalculationResult {
  factorial: number;
  doubleFactorial: number;
  permutation?: number;
}

const FactorialCalculator: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateFactorial = (n: number): number => {
    if (n < 0) throw new Error('Cannot calculate factorial of negative numbers');
    if (n > 170) throw new Error('Number too large, would cause overflow');
    if (n === 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const calculateDoubleFactorial = (n: number): number => {
    if (n < 0) throw new Error('Cannot calculate double factorial of negative numbers');
    if (n > 300) throw new Error('Number too large, would cause overflow');
    if (n === 0 || n === 1) return 1;
    let result = n;
    for (let i = n - 2; i > 0; i -= 2) result *= i;
    return result;
  };

  const calculate = () => {
    const num = parseInt(number);
    if (isNaN(num)) {
      setError('Please enter a valid integer');
      setResult(null);
      return;
    }
    if (!Number.isInteger(parseFloat(number))) {
      setError('Please enter a whole number');
      setResult(null);
      return;
    }

    try {
      setResult({
        factorial: calculateFactorial(num),
        doubleFactorial: calculateDoubleFactorial(num)
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error occurred');
      setResult(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setNumber(value);
      setError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Factorial Calculator
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
              placeholder="Enter a non-negative integer"
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
                Factorial ({number}!): <span className="font-bold">{result.factorial}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Double Factorial ({number}!!): <span className="font-bold">{result.doubleFactorial}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Factorials
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Factorial (n!): Product of all positive integers ≤ n</li>
              <li>• Double Factorial (n!!): Product of all integers ≤ n with same parity</li>
              <li>• Only defined for non-negative integers</li>
              <li>• Limited to numbers ≤ 170 to avoid overflow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactorialCalculator; 