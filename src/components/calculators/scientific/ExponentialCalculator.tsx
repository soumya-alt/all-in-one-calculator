import React, { useState } from 'react';

interface CalculationResult {
  power: number;
  root: number;
}

const ExponentialCalculator: React.FC = () => {
  const [base, setBase] = useState<string>('');
  const [exponent, setExponent] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const baseNum = parseFloat(base);
    const expNum = parseFloat(exponent);
    
    if (isNaN(baseNum) || isNaN(expNum)) {
      setError('Please enter valid numbers');
      setResult(null);
      return;
    }

    try {
      const powerResult = Math.pow(baseNum, expNum);
      const rootResult = Math.pow(baseNum, 1/expNum);
      
      if (isNaN(powerResult) || isNaN(rootResult) || !isFinite(powerResult) || !isFinite(rootResult)) {
        setError('Result is undefined or too large');
        setResult(null);
        return;
      }

      setError(null);
      setResult({
        power: powerResult,
        root: rootResult
      });
    } catch (err) {
      setError('Calculation error occurred');
      setResult(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setter(value);
      setError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Exponents & Powers Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Base Number
            </label>
            <input
              type="text"
              value={base}
              onChange={(e) => handleInputChange(e, setBase)}
              className="input w-full"
              placeholder="Enter base number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Exponent/Root
            </label>
            <input
              type="text"
              value={exponent}
              onChange={(e) => handleInputChange(e, setExponent)}
              className="input w-full"
              placeholder="Enter exponent/root value"
            />
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
            disabled={!base || !exponent}
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
                Power ({base}^{exponent}): <span className="font-bold">{result.power.toFixed(6)}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Root ({base}^(1/{exponent})): <span className="font-bold">{result.root.toFixed(6)}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Exponents & Powers
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Power: Base number raised to the exponent (x^n)</li>
              <li>• Root: Base number raised to 1/exponent (x^(1/n))</li>
              <li>• Handles both positive and negative numbers</li>
              <li>• Results are rounded to 6 decimal places</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExponentialCalculator; 