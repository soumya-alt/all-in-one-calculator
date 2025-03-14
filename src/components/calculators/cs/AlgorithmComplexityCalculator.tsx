import React, { useState } from 'react';

type ComplexityType = 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n²)' | 'O(n³)' | 'O(2ⁿ)';

interface ComplexityResult {
  inputSize: number;
  results: {
    [key in ComplexityType]?: number;
  };
}

const AlgorithmComplexityCalculator: React.FC = () => {
  const [inputSize, setInputSize] = useState('');
  const [selectedComplexities, setSelectedComplexities] = useState<ComplexityType[]>([]);
  const [result, setResult] = useState<ComplexityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const complexityOptions: ComplexityType[] = [
    'O(1)',
    'O(log n)',
    'O(n)',
    'O(n log n)',
    'O(n²)',
    'O(n³)',
    'O(2ⁿ)'
  ];

  const calculateComplexity = (n: number, type: ComplexityType): number => {
    switch (type) {
      case 'O(1)':
        return 1;
      case 'O(log n)':
        return Math.log2(n);
      case 'O(n)':
        return n;
      case 'O(n log n)':
        return n * Math.log2(n);
      case 'O(n²)':
        return n * n;
      case 'O(n³)':
        return n * n * n;
      case 'O(2ⁿ)':
        return Math.pow(2, n);
      default:
        return 0;
    }
  };

  const handleComplexityToggle = (complexity: ComplexityType) => {
    setSelectedComplexities(prev => {
      if (prev.includes(complexity)) {
        return prev.filter(c => c !== complexity);
      } else {
        return [...prev, complexity];
      }
    });
  };

  const calculate = () => {
    setError(null);
    try {
      const n = parseInt(inputSize);
      if (isNaN(n) || n < 0) {
        throw new Error('Please enter a valid positive number');
      }
      if (n > 1000) {
        throw new Error('Input size should be less than or equal to 1000 to avoid overflow');
      }
      if (selectedComplexities.length === 0) {
        throw new Error('Please select at least one complexity type');
      }

      const results: { [key in ComplexityType]?: number } = {};
      selectedComplexities.forEach(complexity => {
        results[complexity] = calculateComplexity(n, complexity);
      });

      setResult({
        inputSize: n,
        results
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
    setInputSize('');
    setSelectedComplexities([]);
    setResult(null);
    setError(null);
  };

  const formatNumber = (num: number): string => {
    if (num > 1e6) {
      return num.toExponential(2);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Algorithm Complexity Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Input Size (n)
            </label>
            <input
              type="number"
              value={inputSize}
              onChange={(e) => setInputSize(e.target.value)}
              className="input"
              placeholder="Enter input size"
              min="0"
              max="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Time Complexities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {complexityOptions.map(complexity => (
                <label
                  key={complexity}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedComplexities.includes(complexity)}
                    onChange={() => handleComplexityToggle(complexity)}
                    className="form-checkbox"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {complexity}
                  </span>
                </label>
              ))}
            </div>
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
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                Results for input size n = {result.inputSize}:
              </p>
              {Object.entries(result.results).map(([complexity, value]) => (
                <p key={complexity} className="text-gray-700 dark:text-gray-300">
                  {complexity}: <span className="font-medium">{formatNumber(value)} operations</span>
                </p>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Common Time Complexities
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• O(1): Constant time - independent of input size</li>
              <li>• O(log n): Logarithmic time - typically for divide and conquer</li>
              <li>• O(n): Linear time - directly proportional to input size</li>
              <li>• O(n log n): Log-linear time - common in efficient sorting</li>
              <li>• O(n²): Quadratic time - nested iterations</li>
              <li>• O(n³): Cubic time - triple nested iterations</li>
              <li>• O(2ⁿ): Exponential time - recursive algorithms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmComplexityCalculator; 