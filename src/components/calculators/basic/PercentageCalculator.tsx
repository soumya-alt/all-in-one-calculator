import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculatePercentage = () => {
    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);

    if (isNaN(numValue) || isNaN(numPercentage)) {
      return;
    }

    setResult((numValue * numPercentage) / 100);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Percentage Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input"
              placeholder="Enter value"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Percentage
            </label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="input"
              placeholder="Enter percentage"
            />
          </div>

          <button
            onClick={calculatePercentage}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {percentage}% of {value} = {result}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator; 