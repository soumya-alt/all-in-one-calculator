import React, { useState } from 'react';

const ProbabilityCalculator: React.FC = () => {
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [operation, setOperation] = useState<'combination' | 'permutation'>('combination');
  const [result, setResult] = useState<number | null>(null);

  const factorial = (num: number): number => {
    if (num < 0) return NaN;
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
  };

  const calculate = () => {
    const nValue = parseInt(n);
    const rValue = parseInt(r);

    if (isNaN(nValue) || isNaN(rValue)) return;

    if (nValue < 0 || rValue < 0) {
      alert('Values must be non-negative');
      return;
    }

    if (rValue > nValue) {
      alert('r cannot be greater than n');
      return;
    }

    if (nValue > 170) {
      alert('n is too large. Maximum supported value is 170.');
      return;
    }

    try {
      if (operation === 'combination') {
        // nCr = n! / (r! * (n-r)!)
        const result = factorial(nValue) / (factorial(rValue) * factorial(nValue - rValue));
        setResult(result);
      } else {
        // nPr = n! / (n-r)!
        const result = factorial(nValue) / factorial(nValue - rValue);
        setResult(result);
      }
    } catch (error) {
      alert('Error in calculation. Please check your input values.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Probability Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as 'combination' | 'permutation')}
              className="select"
            >
              <option value="combination">Combination (nCr)</option>
              <option value="permutation">Permutation (nPr)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              n (total items)
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="input"
              placeholder="Enter n"
              min="0"
              max="170"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              r (items to choose)
            </label>
            <input
              type="number"
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="input"
              placeholder="Enter r"
              min="0"
            />
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {operation === 'combination' ? (
                  <>
                    {n}C{r} = {result.toLocaleString()}
                  </>
                ) : (
                  <>
                    {n}P{r} = {result.toLocaleString()}
                  </>
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {operation === 'combination' ? (
                  'Number of ways to choose r items from n items, where order does not matter'
                ) : (
                  'Number of ways to arrange r items from n items, where order matters'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProbabilityCalculator; 