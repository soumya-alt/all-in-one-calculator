import React, { useState } from 'react';

interface DescriptiveStats {
  mean: number;
  median: number;
  mode: number[];
  range: number;
  variance: number;
  standardDeviation: number;
  quartiles: {
    q1: number;
    q2: number;
    q3: number;
  };
  count: number;
  sum: number;
}

const DescriptiveStatsCalculator: React.FC = () => {
  const [numbers, setNumbers] = useState<string>('');
  const [result, setResult] = useState<DescriptiveStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseNumbers = (input: string): number[] => {
    return input
      .split(/[,\s]+/)
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => {
        const parsed = parseFloat(num);
        if (isNaN(parsed)) {
          throw new Error(`Invalid number: ${num}`);
        }
        return parsed;
      });
  };

  const calculateMean = (nums: number[]): number => {
    return nums.reduce((sum, num) => sum + num, 0) / nums.length;
  };

  const calculateMedian = (nums: number[]): number => {
    const sorted = [...nums].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  };

  const calculateMode = (nums: number[]): number[] => {
    const frequency: { [key: number]: number } = {};
    nums.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    const maxFrequency = Math.max(...Object.values(frequency));
    return Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFrequency)
      .map(([num, _]) => parseFloat(num));
  };

  const calculateQuartiles = (nums: number[]): { q1: number; q2: number; q3: number } => {
    const sorted = [...nums].sort((a, b) => a - b);
    const q2 = calculateMedian(sorted);
    
    const lowerHalf = sorted.slice(0, Math.floor(sorted.length / 2));
    const upperHalf = sorted.slice(Math.ceil(sorted.length / 2));
    
    return {
      q1: calculateMedian(lowerHalf),
      q2,
      q3: calculateMedian(upperHalf)
    };
  };

  const calculateVariance = (nums: number[], mean: number): number => {
    return nums.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / nums.length;
  };

  const calculate = () => {
    setError(null);
    try {
      const numberArray = parseNumbers(numbers);
      
      if (numberArray.length < 2) {
        throw new Error('Please enter at least two numbers');
      }

      const mean = calculateMean(numberArray);
      const variance = calculateVariance(numberArray, mean);
      const quartiles = calculateQuartiles(numberArray);

      setResult({
        mean,
        median: quartiles.q2,
        mode: calculateMode(numberArray),
        range: Math.max(...numberArray) - Math.min(...numberArray),
        variance,
        standardDeviation: Math.sqrt(variance),
        quartiles,
        count: numberArray.length,
        sum: numberArray.reduce((sum, num) => sum + num, 0)
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
    setNumbers('');
    setResult(null);
    setError(null);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Descriptive Statistics Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter Numbers
            </label>
            <textarea
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              className="input min-h-[100px]"
              placeholder="Enter numbers separated by commas or spaces (e.g., 1, 2, 3, 4, 5)"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tip: You can paste numbers directly from a spreadsheet
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Count: <span className="font-medium">{result.count}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Sum: <span className="font-medium">{formatNumber(result.sum)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Mean: <span className="font-medium">{formatNumber(result.mean)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Median: <span className="font-medium">{formatNumber(result.median)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Mode: <span className="font-medium">{result.mode.map(formatNumber).join(', ')}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Range: <span className="font-medium">{formatNumber(result.range)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Variance: <span className="font-medium">{formatNumber(result.variance)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Std Dev: <span className="font-medium">{formatNumber(result.standardDeviation)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Q1: <span className="font-medium">{formatNumber(result.quartiles.q1)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Q3: <span className="font-medium">{formatNumber(result.quartiles.q3)}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Statistical Measures
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Mean: Average of all numbers</li>
              <li>• Median: Middle value when sorted</li>
              <li>• Mode: Most frequent value(s)</li>
              <li>• Range: Difference between max and min</li>
              <li>• Variance: Average squared deviation from mean</li>
              <li>• Standard Deviation: Square root of variance</li>
              <li>• Quartiles: Values that divide data into four parts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptiveStatsCalculator; 