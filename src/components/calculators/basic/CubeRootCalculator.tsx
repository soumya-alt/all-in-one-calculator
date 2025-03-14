import React, { useState } from 'react';

interface CalculationResult {
  cube: number;
  cubeRoot: number;
}

const CubeRootCalculator: React.FC = () => {
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
    setError(null);
    setResult({
      cube: num * num * num,
      cubeRoot: Math.cbrt(num)
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
          Cube & Cube Root Calculator
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
                Cube: <span className="font-bold">{result.cube}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Cube Root: <span className="font-bold">{result.cubeRoot.toFixed(6)}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Cube & Cube Root
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Cube: Multiply a number by itself three times (n³)</li>
              <li>• Cube Root: Number which produces given number when cubed (∛n)</li>
              <li>• Cube root exists for all real numbers</li>
              <li>• Results are rounded to 6 decimal places</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeRootCalculator; 